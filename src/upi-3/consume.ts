import { CompositeDisposable, Disposable } from 'atom'

import { PluginManager } from '../plugin-manager'
import { MAIN_MENU_LABEL, handlePromise } from '../utils'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType
import { Provider } from '../results-db/provider'

export interface FeatureSet {
  eventsReturnResults?: boolean
  supportsCommands?: boolean
  supportsActions?: boolean
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
    actions,
  } = options
  const disp = new CompositeDisposable()
  let messageProvider: Provider | undefined

  function registerEvent(
    cb: UPI.TSingleOrArray<UPI.TTextBufferCallback>,
    reg: (cb: UPI.TTextBufferCallback) => Disposable,
  ) {
    if (Array.isArray(cb)) {
      const disp = new CompositeDisposable()
      for (const i of cb) {
        disp.add(reg(wrapStatus(i)))
      }
      return disp
    } else {
      return reg(wrapStatus(cb))
    }
  }

  const awaiter = pluginManager.getAwaiter(name)

  function wrapStatus<Args extends Array<unknown>>(
    cb: (...args: Args) => ReturnType<UPI.TTextBufferCallback>,
  ) {
    return function(...args: Args): void {
      handlePromise(
        awaiter(() => cb(...args)).then(async (res) => {
          if (messageProvider && res !== undefined) {
            if (Array.isArray(res)) {
              messageProvider.setMessages(res)
            } else {
              const items = []
              for await (const item of res) {
                items.push(item)
                messageProvider.setMessages(items)
              }
            }
          }
        }),
      )
    }
  }

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
        registerEvent(events.onWillSaveBuffer, pluginManager.onWillSaveBuffer),
      )
    }
    if (events.onDidSaveBuffer) {
      disp.add(
        registerEvent(events.onDidSaveBuffer, pluginManager.onDidSaveBuffer),
      )
    }
    if (events.onDidStopChanging) {
      disp.add(
        registerEvent(
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
    disp.add(
      pluginManager.tooltipRegistry.register(name, {
        priority: priority ?? 100,
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
            wrapStatus(handler)(event.currentTarget)
          }),
        )
      }
    }
  }
  if (featureSet.supportsActions && actions) {
    let handler: UPI.TActionHandler
    let priority: number | undefined
    let eventTypes: TEventRangeType[] | undefined
    if (typeof actions === 'function') {
      handler = actions
    } else {
      ;({ handler, priority, eventTypes } = actions)
    }
    disp.add(
      pluginManager.actionRegistry.register(name, {
        priority: priority ?? 100,
        handler: async function(editor, range, types) {
          const actions = await Promise.resolve(handler(editor, range, types))
          if (!actions) return undefined
          if (!actions.length) return undefined
          return actions
        },
        eventTypes,
      }),
    )
  }

  return disp
}
