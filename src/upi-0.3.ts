'use babel'

import {CompositeDisposable, Point, Disposable, TextBuffer, TextEditor} from 'atom'
import {MainMenuLabel, getEventType} from './utils'
import {PluginManager} from './plugin-manager'

export class UPIError extends Error {
  constructor(message: string) {
    super(message)
    Object.defineProperty(this, "name",
      {value: this.constructor.name})
    Object.defineProperty(this, "message",
      {value: message})
    Error.captureStackTrace(this, this.constructor)
  }
}

export class UPI {
  instances: Map<string, UPIInstance>
  disposables: CompositeDisposable
  constructor(private pluginManager: PluginManager) {
    this.instances = new Map
    this.disposables = new CompositeDisposable
    this.disposables.add(this.pluginManager.onShouldShowTooltip(this.shouldShowTooltip.bind(this)))
  }

  private async shouldShowTooltip({editor, pos, eventType}: {editor: TextEditor, pos: Point, eventType: TEventRangeType}) {
    let subs: Array<TTooltipHandlerSpec & {pluginName: string}> = []
    for(const [pluginName, inst] of this.instances.entries()) {
      for(const vs of inst.tooltipEvents.values()) {
        subs.push({pluginName, ...vs})
      }
    }
    subs.sort((a, b) => b.priority - a.priority)
    const controller = this.pluginManager.controller(editor)
    for (const {pluginName, handler} of subs) {
      try {
        const eventRange = this.getEventRange({controller, pos, eventType})
        if (!eventRange) continue
        const {crange, pos: newPos} = eventRange
        let tt = await Promise.resolve(handler(editor, crange, eventType))
        if (tt) {
          const {range, text} = tt
          controller.showTooltip(newPos, range, text, {eventType, subtype: 'external'})
          break
        } else {
          continue
        }
      } catch (e) {
        if (e.message) {
          console.warn(e)
          e = {
            status: 'warning',
            detail: e.message
          }
        }
        if (!e.ignore) {
          controller.hideTooltip({eventType})
          this.pluginManager.outputView.backendStatus(pluginName, e)
        }
      }
    }
  }


  /**
  Call this function in consumer to get actual interface

  @param name: Plugin package name
  @param consumer: callback :: UPIInstance -> ()
  @returns {Disposable}
  */
  public consume(options: any = {}) {
    const {name, menu, messageTypes, events, controls, params, consumer, tooltipEvent} = options
    if (!name)
      throw new UPIError("name has to be specified for UPI")
    if(this.instances.has(name))
      throw new UPIError(`Plugin ${name} already registered with UPI`)
    const instance = new UPIInstance(this.pluginManager, name, this)
    this.instances.set(name, instance)

    if (menu)
      instance.menu.set(menu)
    if (messageTypes)
      instance.messages.setTypes(messageTypes)
    if (events)
      for (const k of Object.keys(events)) {
        let v = events[k]
        if(!Array.isArray(v)) v = [v]
        for (const i of v)
          instance.events[k](i)
      }
    if (tooltipEvent) {
      let {priority, handler} = tooltipEvent
      if (!handler) {
        handler = tooltipEvent
      }
      if (!priority) priority = 100
      instance.tooltips.onShouldShowTooltip(priority, handler)
    }
    if (controls)
      for (const i of controls)
        instance.controls.add(i)
    if (params)
      for (const i of params)
        instance.params.add(i)

    consumer(instance)

    const disp = new Disposable(() => {
      this.instances.delete(name)
      instance.destroy()
    })
    this.disposables.add(disp)
    return disp
  }

  dispose () {
    this.disposables.dispose()
  }

  withEventRange<T>({editor, detail, eventType, pos, controller}: TEventRangeParamsInternal, callback: TEventRangeCallback<T>) {
    if (pos) pos = Point.fromObject(pos)
    if (!eventType) eventType = getEventType(detail)
    if (!controller) controller = this.pluginManager.controller(editor)
    if (!controller) return

    return callback(controller.getEventRange(pos, eventType), eventType)
  }

  getEventRange({editor, detail, eventType, pos, controller}: TEventRangeParamsInternal) : {pos: Point, crange: Range} | undefined {
    if (pos) pos = Point.fromObject(pos)
    if (!eventType) eventType = getEventType(detail)
    if (!controller) controller = this.pluginManager.controller(editor)
    if (!controller) return

    return controller.getEventRange(pos, eventType)
  }
}

interface TEventRangeParamsInternal {
  editor?: TextEditor
  controller: any
  detail?: any
  eventType: TEventRangeType
  pos: TPosition
}

class UPIInstance {
  public menu: IUPIMenu
  public messages: IUPIMessages
  public events: IUPIEvents
  public tooltips: IUPITooltips
  public controls: IUPIControls
  public params: IUPIParams
  public utils: IUPIUtils
  public tooltipEvents: Set<TTooltipHandlerSpec>
  private disposables: CompositeDisposable
  private destroyed: boolean
  constructor(pluginManager: PluginManager, pluginName: string, main: UPI) {
    this.disposables = new CompositeDisposable
    this.tooltipEvents = new Set
    this.destroyed = false
    let instance = this

    this.utils = {withEventRange: main.withEventRange.bind(main)}

    this.menu = {
      set({label, menu}) {
        const menuDisp = atom.menu.add([{
          label: MainMenuLabel,
          submenu: [ {label: label, submenu: menu} ]
        }])
        instance.disposables.add(menuDisp)
        return menuDisp
      }
    }
    this.messages = {
      status (status) {
        pluginManager.outputView.backendStatus(pluginName, status as any) //TODO Fix this
      },
      add (messages, types) {
        messages = messages.map((m) => {
          if (m.position)
            m.position = Point.fromObject(m.position)
          return m
        })
        pluginManager.checkResults.appendResults(messages, types)
      },
      set(messages, types) {
        messages = messages.map((m) => {
          if (m.position)
            m.position = Point.fromObject(m.position)
          return m
        })
        pluginManager.checkResults.setResults(messages, types)
      },
      clear (types) {
        pluginManager.checkResults.setResults([], types)
      },
      setTypes (types) {
        for (const type in types) {
          const opts = types[type]
          pluginManager.outputView.createTab(type, opts)
        }
      },
    }

    this.tooltips = {
      show ({editor, pos, eventType, detail, tooltip}) {
        const controller = pluginManager.controller(editor)
        main.withEventRange({controller, pos, detail, eventType}, ({crange, pos}, eventType) => {
          Promise.resolve(tooltip(crange)).then(({range, text, persistOnCursorMove}) =>
            controller.showTooltip(pos, range, text, {eventType, subtype: 'external', persistOnCursorMove}))
          .catch((status = {status: 'warning'}) => {
            if (status.message) {
              console.warn(status)
              status = {status: 'warning'}
            }
            if (!status.ignore) {
              controller.hideTooltip({eventType})
              instance.messages.status(status)
            }
          })
        })
      },
      onShouldShowTooltip (...args: any[]) {
        if (args.length < 2) {
          args.unshift(100)
        }
        const [priority, handler] = args
        const obj = {priority, handler}
        instance.tooltipEvents.add(obj)
        return new Disposable(() => instance.tooltipEvents.delete(obj))
      }
    }
    this.events = {
      onWillSaveBuffer (callback) {
        const disp = pluginManager.onWillSaveBuffer(callback)
        instance.disposables.add(disp)
        return disp
      },
      onDidSaveBuffer(callback) {
        const disp = pluginManager.onDidSaveBuffer(callback)
        instance.disposables.add(disp)
        return disp
      },
      onDidStopChanging(callback) {
        const disp = pluginManager.onDidStopChanging(callback)
        instance.disposables.add(disp)
        return disp
      }
    }
    this.controls = {
      add ({element, opts}) {
        return pluginManager.outputView.addPanelControl(element, opts)
      }
    }
    this.params = {
      add (spec) {
        return pluginManager.addConfigParam(pluginName, spec)
      },
      get (...args: any[]) {
        if(args.length < 2) {
          args.unshift(pluginName)
        }
        const [plugin, name] = args
        return pluginManager.getConfigParam(plugin, name)
      },
      set (...args: any[]) {
        if(args.length < 3) {
          args.unshift(pluginName)
        }
        const [plugin, name, value] = args
        return pluginManager.setConfigParam(plugin, name, value)
      }
    }
  }

  destroy () {
    this.disposables.dispose()
    this.tooltipEvents.clear()
    Object.getOwnPropertyNames(this).forEach((p) => {
      this[p] = null
    })
    this.destroyed = true
  }

  check () {
    if(this.destroyed)
      throw new UPIError('This UPI interface was destroyed')
    return this
  }
}

declare interface IUPIMenu {
  /**
  Adds new sumbenu to 'Haskell IDE' menu item

  @param name -- submenu label, should be descriptive of a package
  @param menu -- Atom menu object

  @returns Disposable.
  */
  set(options: {label: string, menu: any[]}) : Disposable
}

declare interface IUPINormalStatus {
  status: 'ready' | 'error' | 'warning'
}

declare interface IUPIProgressStatus {
  status: 'progress'
  progress?: number
}

declare type IUPIStatus = (IUPINormalStatus | IUPIProgressStatus) & {detail: string}

declare interface IUPIMessageText {
  text: string
  highlighter?: string
}

declare interface IUPIMessageHTML {
  html: string
}

declare type TSeverity = 'error' | 'warning' | 'lint' | string
declare type TPosition = Point | [number, number] | {row: number, column: number}
declare type TUPIText = String | IUPIMessageText | IUPIMessageHTML

declare interface IUPIMessage {
  uri?: string
  position?: TPosition
  message: TUPIText
  severity: TSeverity
}

declare interface ISeverityTabDefinition {
  uriFilter?: boolean
  autoScroll?: boolean
}

declare interface IUPIMessages {
  /**
  Sets backend status
  @param status {Object}
    status: one of 'progress', 'ready', 'error', 'warning'
    progress: float between 0 and 1, only relevant when status is 'progress'
              if 0 or undefined, progress bar is not shown
  */
  status (status: IUPIStatus): void

  /**
  Add messages to ide-haskell output
  @param messages: {Array<Object>}
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String or {<text | html>, highlighter?}, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  @param types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  add (messages: IUPIMessage[], types: TSeverity[]): void

  /**
  Set messages in ide-haskell output. Clears all existing messages with
  `severity` in `types`
  messages: Array of Object
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  set(messages: IUPIMessage[], types: TSeverity[]): void

  /**
  Clear all existing messages with `severity` in `types`
  This is shorthand from `setMessages([],types)`
  */
  clear (types: TSeverity[]): void

  /**
  Set possible message `severity` that your package will use.
  types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
    uriFilter: Bool, should uri filter apply to tab?
    autoScroll: Bool, should tab auto-scroll?

  This allows to define custom output panel tabs.
  */
  setTypes (types: {[severity: string]: ISeverityTabDefinition}): void
}

declare type TextBufferCallback = (buffer: TextBuffer) => void

declare interface IUPIEvents {
  /**
  Convenience function. Will fire before Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onWillSaveBuffer (callback: TextBufferCallback): Disposable

  /**
  Convenience function. Will fire after Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onDidSaveBuffer(callback: TextBufferCallback): Disposable

  /**
  Convenience function. Will fire after Haskell buffer has stopped changing for
  some fraction of a second (usually 300 ms).

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onDidStopChanging(callback: TextBufferCallback): Disposable
}
declare interface IShowTooltipParams {
  editor: TextEditor
  pos: TPosition
  eventType: TEventRangeType
  detail: any
  tooltip: TTooltipFunction
}
declare type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>
declare interface ITooltipData {
  range: Range
  text: TUPIText
  persistOnCursorMove?: boolean
}
declare type TTooltipHandler = (editor: TextEditor, crange: Range, type: TEventRangeType) => ITooltipData | Promise<ITooltipData>
declare interface IUPITooltips {
  /**
  Show tooltip in editor.

  editor: editor that will show tooltip
  pos: tooltip position
  eventType: one of 'context', 'keyboard' and 'mouse'
  detail: for automatic selection between 'context' and 'keyboard'.
          Ignored if 'eventType' is set.
  tooltip: function(crange)
    crange: Range, currently selected range in editor (possibly empty)

    Returns {range, text} or Promise
      range: Range, tooltip highlighting range
      persistOnCursorMove: Boolean, optional, default false, persist on cursor move regardless of settings
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip
  */
  show (params: IShowTooltipParams): void

  /**
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

  priority: event priority, higher value means higher priority,
            subscription with hightest priority will be called first.
  callback: callback(editor, crange, type)
    editor: TextEditor, editor that generated event
    crange: Range, cursor range that generated event.
    type: One of 'mouse', 'selection' -- type of event that triggered this

    Returns {range, text} or Promise.
      range: Range, tooltip highlighting range
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip

  returns Disposable
  */
  onShouldShowTooltip (priority: number, handler: TTooltipHandler): Disposable
  onShouldShowTooltip (handler: TTooltipHandler): Disposable
}
declare interface IControlOpts {
  id: string
  events: {[key: string]: Function}
  classes: string[]
  style: {[key: string]: string}
  attrs: {[key: string]: string}
}
declare interface IUPIControlDefinition {
  element: string | HTMLElement
  opts: IControlOpts
}
declare interface IUPIControls {
  /**
  Add a new control to ouptut panel heading.

  element: HTMLElement of control, or String with tag name
  opts: various options
    id: String, id
    events: Object, event callbacks, key is event name, e.g. "click",
            value is callback
    classes: Array of String, classes
    style: Object, css style, keys are style attributes, values are values
    attrs: Object, other attributes, keys are attribute names, values are values
    before: String, CSS selector of element, that this one should be inserted
            before, e.g. '#progressBar'

  Returns Disposable.
  */
  add (def: IUPIControlDefinition): Disposable
}
declare interface IParamSpec<T> {
  onChanged: (value: T) => void
  items: Array<T> | (() => Array<T>)
  itemTemplate: (item: T) => String
  itemFilterKey: string
  description?: string
  displayName?: string
  displayTemplate: (item: T) => String
  default: T
}
declare interface IUPIParams {
  /**
  addConfigParam
    param_name:
      onChanged: callback void(value)
      items: Array or callback Array(void)
      itemTemplate: callback, String(item), html template
      itemFilterKey: String, item filter key
      description: String [optional]
      displayName: String [optional, capitalized param_name default]
      displayTemplate: callback, String(item), string template
      default: item, default value

  Returns
    disp: Disposable
    change: object of change functions, keys being param_name
  */
  add (spec: {[param_name: string]: IParamSpec<any>}): Disposable

  /**
  getConfigParam(paramName) or getConfigParam(pluginName, paramName)

  returns a Promise that resolves to parameter
  value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  get<T> (plugin: string, name: string): Promise<T>
  get<T> (name: string): Promise<T>

  /**
  setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

  value is optional. If omitted, a selection dialog will be presented to user.

  returns a Promise that resolves to parameter value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  set<T> (plugin: string, name: string, value?: T): Promise<T>
  set<T> (name: string, value?: T): Promise<T>
}
declare type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
declare interface IEventRangeParams {
  editor: TextEditor
  detail?: any
  eventType: TEventRangeType
  pos: TPosition
  controller: undefined
}
declare type TEventRangeCallback<T> = (pars: {pos: Point, crange: Range}, eventType: TEventRangeType) => T
declare interface IUPIUtils {
  /**
  Utility function to extract event range/type for a given event

  editor: TextEditor, editor that generated event
  detail: event detail, ignored if eventType is set
  eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  pos: Point, or Point-like Object, event position, can be undefined
  controller: leave undefined, this is internal field

  callback: callback({pos, crange}, eventType)
    pos: Point, event position
    crange: Range, event range
    eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  */
  withEventRange<T>(params: IEventRangeParams, callback: TEventRangeCallback<T>): T | undefined
}
declare type TTooltipHandlerSpec = {priority: number, handler: TTooltipHandler}
