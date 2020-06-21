import { CompositeDisposable, Disposable } from 'atom'

import { PluginManager } from '../plugin-manager'
import { MAIN_MENU_LABEL, handlePromise } from '../utils'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType
import { Provider } from '../results-db/provider'

export * from './instance'

export interface FeatureSet {
  eventsReturnResults?: boolean
  supportsCommands?: boolean
}

export function consume(
  pluginManager: PluginManager,
  options: UPI.IRegistrationOptions,
  featureSet: FeatureSet,
): Disposable {
  const {
    name,
    menu,
    messageTypes,
    events,
    controls,
    params,
    tooltip,
    commands,
  } = options
  const disp = new CompositeDisposable()
  let messageProvider: Provider | undefined

  if (menu) {
    const menuDisp = atom.menu.add([
      {
        label: MAIN_MENU_LABEL,
        submenu: [{ label: menu.label, submenu: menu.menu }],
      },
    ])
    disp.add(menuDisp)
  }
  if (messageTypes) {
    if (featureSet.eventsReturnResults) {
      messageProvider = pluginManager.resultsDB.registerProvider(
        Object.keys(messageTypes),
      )
    }
    for (const type of Object.keys(messageTypes)) {
      const opts = messageTypes[type]
      handlePromise(pluginManager.outputPanel.createTab(type, opts))
      disp.add(
        new Disposable(function() {
          handlePromise(pluginManager.outputPanel.removeTab(type))
        }),
      )
    }
  }
  if (events) {
    if (events.onWillSaveBuffer) {
      disp.add(
        registerEvent(
          name,
          pluginManager,
          messageProvider,
          events.onWillSaveBuffer,
          pluginManager.onWillSaveBuffer,
        ),
      )
    }
    if (events.onDidSaveBuffer) {
      disp.add(
        registerEvent(
          name,
          pluginManager,
          messageProvider,
          events.onDidSaveBuffer,
          pluginManager.onDidSaveBuffer,
        ),
      )
    }
    if (events.onDidStopChanging) {
      disp.add(
        registerEvent(
          name,
          pluginManager,
          messageProvider,
          events.onDidStopChanging,
          pluginManager.onDidStopChanging,
        ),
      )
    }
  }
  if (tooltip) {
    let handler: UPI.TTooltipHandler
    let priority: number | undefined
    let eventTypes: TEventRangeType[] | undefined
    if (typeof tooltip === 'function') {
      handler = tooltip
    } else {
      ;({ handler, priority, eventTypes } = tooltip)
    }
    if (priority === undefined) {
      priority = 100
    }
    disp.add(
      pluginManager.tooltipRegistry.register(name, {
        priority,
        handler,
        eventTypes,
      }),
    )
  }
  if (controls) {
    for (const i of controls) {
      disp.add(pluginManager.outputPanel.addPanelControl(i))
    }
  }
  if (params) {
    for (const paramName of Object.keys(params)) {
      const spec = params[paramName]
      disp.add(pluginManager.configParamManager.add(name, paramName, spec))
    }
  }
  if (featureSet.supportsCommands && commands) {
    for (const [target, cmds] of Object.entries(commands)) {
      if (cmds === undefined) continue
      for (const [cmd, handler] of Object.entries(cmds)) {
        disp.add(
          atom.commands.add(target, cmd, function(event) {
            wrapStatus(
              name,
              pluginManager,
              messageProvider,
              handler,
            )(event.currentTarget).catch(function(e: Error) {
              atom.notifications.addError(e.toString(), {
                detail: e.message,
                dismissable: true,
              })
            })
          }),
        )
      }
    }
  }

  return disp
}

function registerEvent(
  name: string,
  manager: PluginManager,
  provider: Provider | undefined,
  cb: UPI.TSingleOrArray<UPI.TTextBufferCallback>,
  reg: (cb: UPI.TTextBufferCallback) => Disposable,
) {
  if (Array.isArray(cb)) {
    const disp = new CompositeDisposable()
    for (const i of cb) {
      disp.add(reg(wrapStatus(name, manager, provider, i)))
    }
    return disp
  } else {
    return reg(wrapStatus(name, manager, provider, cb))
  }
}

function wrapStatus<Args extends Array<unknown>, R>(
  name: string,
  manager: PluginManager,
  provider: Provider | undefined,
  cb: (...args: Args) => R,
) {
  return async function(...args: Args) {
    try {
      manager.backendStatus(name, { status: 'progress', detail: '' })
      const res = await Promise.resolve(cb(...args))
      if (provider && Array.isArray(res)) provider.setMessages(res)
      manager.backendStatus(name, { status: 'ready', detail: '' })
    } catch (e) {
      manager.backendStatus(name, { status: 'warning', detail: `${e}` })
      console.warn(e)
    }
  }
}
