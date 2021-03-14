import { PluginManager, IState } from './plugin-manager'
import { prettifyFile } from './prettify'
import { MAIN_MENU_LABEL, handlePromise } from './utils'
import * as UPI3 from './upi-3'
import * as OutputPanel from './output-panel'
import * as AtomTypes from 'atom'
import * as UPI from 'atom-haskell-upi'
import * as Linter from 'atom/linter'
import * as StatusBar from 'atom/status-bar'
import CompositeDisposable = AtomTypes.CompositeDisposable
import Disposable = AtomTypes.Disposable

let upiProvided = false
let disposables: CompositeDisposable | undefined
let pluginManager: PluginManager | undefined
let outputPanel: OutputPanel.OutputPanel | undefined
let menu: CompositeDisposable | undefined

function cleanConfig() {
  /*noop*/
}

export function activate(state: IState) {
  cleanConfig()

  atom.views.getView(atom.workspace).classList.add('ide-haskell')

  require('etch').setScheduler(atom.views)

  upiProvided = false

  if (atom.config.get('ide-haskell.startupMessageIdeBackend')) {
    setTimeout(() => {
      if (!upiProvided) {
        atom.notifications.addWarning(
          `Ide-Haskell needs backends that provide most of functionality.
            Please refer to README for details`,
          { dismissable: true },
        )
      }
    }, 5000)
  }

  disposables = new CompositeDisposable()

  pluginManager = new PluginManager(state, deserializeOutputPanel())

  // global commands
  disposables.add(
    atom.commands.add('atom-workspace', {
      'ide-haskell:toggle-output': () => {
        if (pluginManager) pluginManager.togglePanel()
      },
      'ide-haskell:next-error': () => {
        if (pluginManager) pluginManager.nextError()
      },
      'ide-haskell:prev-error': () => {
        if (pluginManager) pluginManager.prevError()
      },
    }),
    atom.commands.add('atom-text-editor.ide-haskell', {
      'ide-haskell:prettify-file': ({ currentTarget }) => {
        handlePromise(prettifyFile(currentTarget.getModel()))
      },
    }),
    atom.commands.add('atom-text-editor.ide-haskell--has-tooltips', {
      'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }) => {
        const controller =
          pluginManager && pluginManager.controller(currentTarget.getModel())
        if (controller && controller.tooltips.has()) {
          controller.tooltips.hide()
        } else {
          abortKeyBinding()
        }
      },
    }),
  )

  menu = new CompositeDisposable()
  menu.add(
    atom.menu.add([
      {
        label: MAIN_MENU_LABEL,
        submenu: [
          { label: 'Prettify', command: 'ide-haskell:prettify-file' },
          { label: 'Toggle Panel', command: 'ide-haskell:toggle-output' },
        ],
      },
    ]),
  )
}

export function deactivate() {
  if (pluginManager) pluginManager.deactivate()

  // clear commands
  if (disposables) disposables.dispose()

  if (menu) menu.dispose()
  atom.menu.update()

  disposables = undefined
  pluginManager = undefined
  menu = undefined
  outputPanel = undefined
}

export function serialize() {
  if (pluginManager) {
    return pluginManager.serialize()
  }
  return undefined
}

export function deserializeOutputPanel(state?: OutputPanel.IState) {
  if (!outputPanel) outputPanel = new OutputPanel.OutputPanel(state)
  return outputPanel
}

function provideUpi3(features: UPI3.FeatureSet = {}) {
  return function(): UPI.IUPIRegistration {
    upiProvided = true
    return (options: UPI.IRegistrationOptions) => {
      if (!pluginManager) {
        throw new Error(
          'IDE-Haskell failed to provide UPI instance: pluginManager is undefined',
        )
      }
      return UPI3.instance(pluginManager, options, features)
    }
  }
}

// tslint:disable-next-line: variable-name
export const provideUpi3_0 = provideUpi3()
// tslint:disable-next-line: variable-name
export const provideUpi3_1 = provideUpi3({ eventsReturnResults: true })
// tslint:disable-next-line: variable-name
export const provideUpi3_2 = provideUpi3({
  eventsReturnResults: true,
  supportsCommands: true,
})
// tslint:disable-next-line: variable-name
export const provideUpi3_3 = provideUpi3({
  eventsReturnResults: true,
  supportsCommands: true,
  supportsActions: true,
})

function consumeUpi3(features: UPI3.FeatureSet = {}) {
  return function(
    registration: UPI.IRegistrationOptions,
  ): Disposable | undefined {
    upiProvided = true
    if (pluginManager) {
      return UPI3.consume(pluginManager, registration, features)
    }
    return undefined
  }
}

// tslint:disable-next-line: variable-name
export const consumeUpi3_0 = consumeUpi3({})
// tslint:disable-next-line: variable-name
export const consumeUpi3_1 = consumeUpi3({ eventsReturnResults: true })
// tslint:disable-next-line: variable-name
export const consumeUpi3_2 = consumeUpi3({
  eventsReturnResults: true,
  supportsCommands: true,
})

export function consumeLinter(
  register: (opts: {}) => Linter.IndieDelegate,
): Disposable | undefined {
  if (!(disposables && pluginManager)) {
    return undefined
  }
  const linter = register({ name: 'IDE-Haskell' })
  disposables.add(linter)
  pluginManager.setLinter(linter)
  return linter
}

export function consumeStatusBar(
  statusBar: StatusBar.StatusBar,
): Disposable | undefined {
  if (!pluginManager) {
    return undefined
  }
  pluginManager.setStatusBar(statusBar)
  return new Disposable(() => {
    if (pluginManager) {
      pluginManager.removeStatusBar()
    }
  })
}
