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

export type TEventRangeCallback<T> = (pars: {
  /** event position */
  pos: Point
  /** event range */
  crange: Range
  /** event type */
  eventType: TEventRangeType
}) => T

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
    this.messageProvider = pluginManager.resultsDB.registerProvider()
    this.disposables.add(this.messageProvider)
  }
  /**
  Adds new sumbenu to 'Haskell IDE' menu item

  @param name submenu label, should be descriptive of a package
  @param menu Atom menu object
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

  /**
  Sets backend status

  @param status current backend status
  */
  setStatus (status: IStatus) {
    return this.pluginManager.backendStatus(this.pluginName, status)
  }

  /**
  Add messages to ide-haskell output

  @param messages array of messages
  @param types array, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  addMessages (newMessages: IResultItem[], types?: TSeverity[]) {
    this.messages.push(...newMessages)
    this.messageProvider.setMessages(this.messages)
  }

  /**
  Set messages in ide-haskell output. Clears all existing messages with
  `severity` in `types`

  @param messages: array of messages
  @param types array, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  setMessages (newMessages: IResultItem[], types: TSeverity[]) {
    this.messages = [...newMessages]
    this.messageProvider.setMessages(this.messages)
  }

  /**
  Clear all existing messages with `severity` in `types`

  @param types message severities to clean out
  */
  clearMessages (types: TSeverity[]) {
    this.messages = this.messages.filter(({severity}) => !types.includes(severity))
    this.messageProvider.setMessages(this.messages)
  }

  /**
  Set possible message `severity` that your package will use.
  This allows definition of custom output panel tabs.

  @param types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
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

  /**
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

  @param callback will be called to provide a tooltip once needed
  */
  onShouldShowTooltip (callback: TTooltipHandler) {
    const disp = this.pluginManager.tooltipRegistry.register(
      this.pluginName, {priority: 100, handler: callback}
    )
    this.disposables.add(disp)
    return disp
  }

  /**
  Show tooltip in editor.

  @param editor editor that will show tooltip
  @param pos tooltip position
  @param eventType type of event
  @param detail DOM event detail, for automatic event type selection, ignored if `eventType` is set.
  @param tooltip tooltip generator function
  */
  showTooltip ({editor, pos, eventType, detail, tooltip}: IShowTooltipParams) {
    if (!eventType) {
      eventType = getEventType(detail)
    }
    this.pluginManager.tooltipRegistry.showTooltip(
      editor, eventType, {pluginName: this.pluginName, tooltip}
    )
  }

  /**
  Convenience function. Will fire before Haskell buffer is saved.
  */
  onWillSaveBuffer (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onWillSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  /**
  Convenience function. Will fire after Haskell buffer is saved.
  */
  onDidSaveBuffer (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onDidSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  /**
  Convenience function. Will fire after Haskell buffer stoped changing.
  */
  onDidStopChanging (callback: TTextBufferCallback) {
    const disp = this.pluginManager.onDidStopChanging(callback)
    this.disposables.add(disp)
    return disp
  }

  /**
  Add a new control to ouptut panel heading.

  @param element HTMLElement of control, or string with tag name
  @param opts description of element
  */
  addPanelControl (element: string | HTMLElement, opts: IControlOpts) {
    if (typeof element === 'string') {
      return this.pluginManager.outputPanel.addPanelControl({element, opts})
    } else {
      const newOpts: IControlOpts & {element: HTMLElement} = {...opts, element}
      return this.pluginManager.outputPanel.addPanelControl({element: DummyElement, opts: newOpts})
    }
  }

  /**
  Add per-project configuration parameters to be managed by ide-haskell. This
  will also add a control element to output panel.

  @param specs specification of parameters
  @param paramName name of a parameter
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

  /**
  Get value of a config parameter, either for this plugin, or for another
  named plugin. If value isn't set and default is `undefined`, will show
  a selection dialog.

  @returns `Promise` that resolves to parameter value. If user cancels selection
  dialog, it will resolve to `undefined`
  */
  async getConfigParam (name: string): Promise<Object | undefined>
  // tslint:disable-next-line:unified-signatures
  async getConfigParam (otherPluginName: string, name: string): Promise<Object | undefined>
  async getConfigParam (otherPluginName: string, name?: string) {
    if (!name) {
      name = otherPluginName
      otherPluginName = this.pluginName
    }
    return this.pluginManager.configParamManager.get(otherPluginName, name)
  }

  /**
  @param name Parameter name
  @param value If omitted, a selection dialog will be presented to user.

  @returns a `Promise` that resolves to parameter value. If `value` is `undefined`
  and user cancels selection dialog, resolves to `undefined`
  */
  async setConfigParam (name: string, value?: Object) {
    return this.pluginManager.configParamManager.set(this.pluginName, name, value)
  }

  /**
  Utility function to extract event range/type for a given event

  @param editor editor that generated event
  @param detail event detail, ignored if `eventType` is set
  @param eventType type of event
  @param pos event position, can be undefined

  @param callback will be called immediately with event range/type as arguments
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
