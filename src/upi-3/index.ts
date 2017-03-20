import {CompositeDisposable, Disposable} from 'atom'

import {PluginManager} from '../plugin-manager'
import {TTextBufferCallback} from '../editor-control'
import {ISetTypesParams, IControlOpts} from '../output-panel'
import {IParamSpec} from '../config-params'
import {TTooltipHandler} from '../tooltip-registry'
import {MAIN_MENU_LABEL} from '../utils'

export interface IAtomMenuCommand {
  label: string
  command: string
}

export interface IAtomSubmenu {
  label: string
  submenu: TAtomMenu[]
}

interface IUPIControlSimpleDefinition {
  element: string
  opts: IControlOpts
}

interface IUPIControlCustomDefinition {
  element: Function
  opts: any
}

export type TUPIControlDefinition = IUPIControlCustomDefinition | IUPIControlSimpleDefinition

export type TAtomMenu = IAtomMenuCommand | IAtomSubmenu

export type TSingleOrArray<T> = T | T[]

export interface IRegistrationOptions {
  name: string
  menu?: {label: string, menu: TAtomMenu}
  messageTypes?: ISetTypesParams
  events?: {
    onWillSaveBuffer?: TSingleOrArray<TTextBufferCallback>
    onDidSaveBuffer?: TSingleOrArray<TTextBufferCallback>
    onDidStopChanging?: TSingleOrArray<TTextBufferCallback>
  }
  controls?: TUPIControlDefinition[]
  params?: {[paramName: string]: IParamSpec<any>}
  tooltip?: TTooltipHandler | {priority?: number, handler: TTooltipHandler}
}

export function consume (pluginManager: PluginManager, options: IRegistrationOptions): Disposable {
  const {name, menu, messageTypes, events, controls, params, tooltip} = options
  const disp = new CompositeDisposable()

  if (menu) {
    const menuDisp = atom.menu.add([{
      label: MAIN_MENU_LABEL,
      submenu: [ {label: menu.label, submenu: menu.menu} ]
    }])
    disp.add(menuDisp)
  }
  if (messageTypes) {
    // TODO: make disposable
    for (const type of Object.keys(messageTypes)) {
      const opts = messageTypes[type]
      pluginManager.outputPanel.createTab(type, opts)
    }
  }
  if (events) {
    for (const k in events) {
      if (k.startsWith('on') && pluginManager[k]) {
        let v: TTextBufferCallback | TTextBufferCallback[] = events[k]
        if (!Array.isArray(v)) { v = [v] }
        for (const i of v) {
          disp.add(pluginManager[k](i))
        }
      }
    }
  }
  if (tooltip) {
    let handler: TTooltipHandler, priority: number | undefined
    if (typeof tooltip === 'function') {
      handler = tooltip
    } else {
      ({handler, priority} = tooltip)
    }
    if (!priority) { priority = 100 }
    disp.add(pluginManager.tooltipRegistry.register(name, {priority, handler}))
  }
  if (controls) {
    for (const {element, opts} of controls) {
      disp.add(pluginManager.outputPanel.addPanelControl(element, opts))
    }
  }
  if (params) {
    disp.add(pluginManager.configParamManager.add(name, params))
  }

  return disp
}