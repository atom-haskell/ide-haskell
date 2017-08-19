import { CompositeDisposable, Disposable } from 'atom'

import { PluginManager } from '../plugin-manager'
import { MAIN_MENU_LABEL } from '../utils'

export * from './instance'

export function consume(pluginManager: PluginManager, options: UPI.IRegistrationOptions): Disposable {
  const { name, menu, messageTypes, events, controls, params, tooltip } = options
  const disp = new CompositeDisposable()

  if (menu) {
    const menuDisp = atom.menu.add([{
      label: MAIN_MENU_LABEL,
      submenu: [{ label: menu.label, submenu: menu.menu }],
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
        let v: UPI.TTextBufferCallback | UPI.TTextBufferCallback[] = events[k]
        if (!Array.isArray(v)) { v = [v] }
        for (const i of v) {
          disp.add(pluginManager[k](i))
        }
      }
    }
  }
  if (tooltip) {
    let handler: UPI.TTooltipHandler
    let priority: number | undefined
    let eventTypes: UPI.TEventRangeType[] | undefined
    if (typeof tooltip === 'function') {
      handler = tooltip
    } else {
      ({ handler, priority, eventTypes } = tooltip)
    }
    if (!priority) { priority = 100 }
    disp.add(pluginManager.tooltipRegistry.register(name, { priority, handler, eventTypes }))
  }
  if (controls) {
    for (const i of controls) {
      disp.add(pluginManager.outputPanel.addPanelControl(i))
    }
  }
  if (params) {
    for (const paramName of Object.keys(params)) {
      const spec = params[paramName]
      disp.add(
        pluginManager.configParamManager.add(name, paramName, spec),
      )
    }
  }

  return disp
}
