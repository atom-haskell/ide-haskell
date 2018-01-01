import { PluginManager, IState } from './plugin-manager'
import { prettifyFile } from './prettify'
import { MAIN_MENU_LABEL } from './utils'
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

export { config } from './config'

function cleanConfig() { /*noop*/ }

export function activate(state: IState) {
  cleanConfig()

  atom.views.getView(atom.workspace).classList.add('ide-haskell')

  // tslint:disable-next-line:no-unsafe-any
  require('etch').setScheduler(atom.views)

  upiProvided = false

  if (atom.config.get('ide-haskell.startupMessageIdeBackend')) {
    setTimeout(
      () => {
        if (!upiProvided) {
          atom.notifications.addWarning(
            `Ide-Haskell needs backends that provide most of functionality.
            Please refer to README for details`,
            { dismissable: true })
        }
      },
      5000,
    )
  }

  disposables = new CompositeDisposable()

  pluginManager = new PluginManager(state, outputPanel || new OutputPanel.OutputPanel())

  // global commands
  disposables.add(
    atom.commands.add('atom-workspace', {
      'ide-haskell:toggle-output': () => { pluginManager && pluginManager.togglePanel() },
      'ide-haskell:next-error': () => { pluginManager && pluginManager.nextError() },
      'ide-haskell:prev-error': () => { pluginManager && pluginManager.prevError() },
    }),
    atom.commands.add('atom-text-editor.ide-haskell', {
      'ide-haskell:prettify-file': ({ currentTarget }) => {
        // tslint:disable-next-line:no-floating-promises
        prettifyFile(currentTarget.getModel())
      },
    }),
    atom.commands.add('atom-text-editor.ide-haskell--has-tooltips', {
      'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }) => {
        const controller = pluginManager && pluginManager.controller(currentTarget.getModel())
        if (controller && controller.tooltips.has()) {
          controller.tooltips.hide()
        } else if (abortKeyBinding) {
          abortKeyBinding()
        }
      },
    }),
  )

  menu = new CompositeDisposable()
  menu.add(atom.menu.add([{
    label: MAIN_MENU_LABEL,
    submenu: [
      { label: 'Prettify', command: 'ide-haskell:prettify-file' },
      { label: 'Toggle Panel', command: 'ide-haskell:toggle-output' },
    ],
  }]))
}

export function deactivate() {
  pluginManager && pluginManager.deactivate()

  // clear commands
  disposables && disposables.dispose()

  menu && menu.dispose()
  atom.menu.update()
}

export function serialize() {
  if (pluginManager) {
    return pluginManager.serialize()
  }
  return undefined
}

export function deserializeOutputPanel(state: OutputPanel.IState) {
  outputPanel = new OutputPanel.OutputPanel(state)
  return outputPanel
}

export function provideUpi3(): UPI.IUPIRegistration {
  upiProvided = true
  return (options: UPI.IRegistrationOptions) => {
    if (!pluginManager) { throw new Error('IDE-Haskell failed to provide UPI instance: pluginManager is undefined') }
    return UPI3.instance(pluginManager, options)
  }
}

export function consumeUpi3(registration: UPI.IRegistrationOptions): Disposable | undefined {
  upiProvided = true
  if (pluginManager) {
    return UPI3.consume(pluginManager, registration)
  }
  return undefined
}

export function consumeLinter(register: (opts: {}) => Linter.IndieDelegate): Disposable | undefined {
  if (!(disposables && pluginManager)) { return undefined }
  const linter = register({ name: 'IDE-Haskell' })
  disposables.add(linter)
  pluginManager.setLinter(linter)
  return linter
}

export function consumeStatusBar(statusBar: StatusBar.StatusBar): Disposable | undefined {
  if (!pluginManager) { return undefined }
  pluginManager.setStatusBar(statusBar)
  return new Disposable(() => {
    if (pluginManager) {
      pluginManager.removeStatusBar()
    }
  })
}
