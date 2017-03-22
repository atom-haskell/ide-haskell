/* tslint:disable:member-access */
import { CompositeDisposable, Point, TextEditor, Range } from 'atom'
import { MAIN_MENU_LABEL, getEventType } from '../utils'
import {PluginManager} from '../plugin-manager'
import {IStatus, ISeverityTabDefinition, IControlOpts} from '../output-panel'
import {IResultItem, TSeverity} from '../results-db'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {TPosition} from '../results-db'
import {Provider as MessageProvider} from '../results-db/provider'
import {IParamSpec} from '../config-params'
import {TTextBufferCallback} from '../editor-control'
import {TTooltipHandler, TTooltipFunction} from '../tooltip-registry'
import {DummyElement} from './dummy-element'

export interface IShowTooltipParams {
  editor: TextEditor
  pos: TPosition
  eventType?: TEventRangeType
  detail?: Object
  tooltip: TTooltipFunction
}

export interface IEventRangeParams {
  editor: TextEditor
  detail?: Object
  eventType?: TEventRangeType
  pos: TPosition
}

export interface IAtomMenuCommand {
  label: string
  command: string
}

export interface IAtomSubmenu {
  label: string
  submenu: TAtomMenu[]
}

export type TAtomMenu = IAtomMenuCommand | IAtomSubmenu

export type TEventRangeCallback<T> = (pars: {pos: Point, crange: Range, eventType: TEventRangeType}) => T

export function instance (pluginManager: PluginManager, outerDisposables: CompositeDisposable, pluginName: string) {
  return new UPIInstance(pluginManager, outerDisposables, pluginName)
}

export class UPIInstance {
  private messages: IResultItem[] = []
  private disposables = new CompositeDisposable()
  private messageProvider: MessageProvider
  constructor (
    private pluginManager: PluginManager, outerDisposables: CompositeDisposable, private pluginName: string
  ) {
    outerDisposables.add(this.disposables)
    this.messageProvider = pluginManager.resultsDB.registerProvider(pluginName)
    this.disposables.add(this.messageProvider)
  }
  /*
  Adds new sumbenu to 'Haskell IDE' menu item
  name -- submenu label, should be descriptive of a package
  menu -- Atom menu object

  Returns Disposable.
  */
  setMenu (name: string, menu: TAtomMenu[]) {
    let menuDisp
    this.disposables.add(menuDisp = atom.menu.add([{
      label: MAIN_MENU_LABEL,
      submenu: [ {label: name, submenu: menu} ]
    }
    ]))
    return menuDisp
  }

  /*
  Sets backend status
  status -- object
    status: one of 'progress', 'ready', 'error', 'warning'
    progress: float between 0 and 1, only relevant when status is 'progress'
              if 0 or undefined, progress bar is not shown
  */
  setStatus (status: IStatus) {
    return this.pluginManager.outputPanel.backendStatus(this.pluginName, status)
  }

  /*
  Add messages to ide-haskell output
  messages: Array of Object
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String or {<text | html>, highlighter?}, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  addMessages (newMessages: IResultItem[], types?: TSeverity[]) {
    this.messages.push(...newMessages)
    this.messageProvider.setMessages(this.messages)
  }

  /*
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
  setMessages (newMessages: IResultItem[], types: TSeverity[]) {
    this.messages = [...newMessages]
    this.messageProvider.setMessages(this.messages)
  }

  /*
  Clear all existing messages with `severity` in `types`
  This is shorthand from `setMessages([],types)`
  */
  clearMessages (types: TSeverity[]) {
    this.messages = this.messages.filter(({severity}) => !types.includes(severity))
    this.messageProvider.setMessages(this.messages)
  }

  /*
  Set possible message `severity` that your package will use.
  types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
    uriFilter: Bool, should uri filter apply to tab?
    autoScroll: Bool, should tab auto-scroll?

  This allows to define custom output panel tabs.
  */
  setMessageTypes (types: { [severity: string]: ISeverityTabDefinition}) {
    return (() => {
      const result = []
      for (const type of Object.keys(types)) {
        const opts = types[type]
        result.push(this.pluginManager.outputPanel.createTab(type, opts))
      }
      return result
    })()
  }

  /*
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

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
  onShouldShowTooltip (callback: TTooltipHandler) {
    const disp = this.pluginManager.tooltipRegistry.register(
      this.pluginName, {priority: 100, handler: callback}
    )
    this.disposables.add(disp)
    return disp
  }

  /*
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
  showTooltip ({editor, pos, eventType, detail, tooltip}: IShowTooltipParams) {
    if (!eventType) {
      eventType = getEventType(detail)
    }
    this.pluginManager.tooltipRegistry.showTooltip(
      editor, eventType, {pluginName: this.pluginName, tooltip}
    )
  }

  /*
  Convenience function. Will fire before Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  */
  onWillSaveBuffer (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onWillSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  /*
  Convenience function. Will fire after Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  */
  onDidSaveBuffer (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onDidSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  onDidStopChanging (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onDidStopChanging(callback)
    this.disposables.add(disp)
    return disp
  }

  /*
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
  addPanelControl (element: string | HTMLElement, opts: IControlOpts) {
    if (typeof element === 'string') {
      return this.pluginManager.outputPanel.addPanelControl({element, opts})
    } else {
      const newOpts: IControlOpts & {element: HTMLElement} = {...opts, element}
      return this.pluginManager.outputPanel.addPanelControl({element: DummyElement, opts: newOpts})
    }
  }

  /*
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
  addConfigParam (specs: { [paramName: string]: IParamSpec<Object> }) {
    const disp = new CompositeDisposable()
    for (const name of Object.keys(specs)) {
      const spec = specs[name]
      disp.add(
        this.pluginManager.configParamManager.add(this.pluginName, name, spec)
      )
    }
    return disp
  }

  /*
  getConfigParam(paramName) or getConfigParam(pluginName, paramName)

  returns a Promise that resolves to parameter
  value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  async getConfigParam (otherPluginName: string, name: string) {
    if (!name) {
      name = otherPluginName
      otherPluginName = this.pluginName
    }
    return this.pluginManager.configParamManager.get(otherPluginName, name)
  }

  /*
  setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

  value is optional. If omitted, a selection dialog will be presented to user.

  returns a Promise that resolves to parameter value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  async setConfigParam (otherPluginName: string, name: string, value?: Object) {
    if (value === undefined) {
      value = name
      name = otherPluginName
      otherPluginName = this.pluginName
    }
    return this.pluginManager.configParamManager.set(otherPluginName, name, value)
  }

  /*
  Utility function to extract event range/type for a given event

  editor: TextEditor, editor that generated event
  detail: event detail, ignored if eventType is set
  eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  pos: Point, or Point-like Object, event position, can be undefined
  controller: leave undefined, this is internal field

  callback: callback({pos, crange, eventType})
    pos: Point, event position
    crange: Range, event range
    eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  */
  withEventRange<T> ({editor, detail, eventType, pos}: IEventRangeParams, callback: TEventRangeCallback<T>) {
    let ppos: Point | undefined
    if (pos) { ppos = Point.fromObject(pos) }
    if (!eventType) { eventType = getEventType(detail) }
    const controller = this.pluginManager.controller(editor)
    if (!controller) { return }
    const res = controller.getEventRange(eventType)
    if (!res) { return }
    return callback(res)
  }
}
