import { IEventDesc, CompositeDisposable, Disposable } from 'atom'
import { PluginManager, IState } from './plugin-manager'
import { prettifyFile } from './prettify'
import { MAIN_MENU_LABEL } from './utils'
import * as UPI2 from './upi-2'
import * as UPI3 from './upi-3'
import * as OutputPanel from './output-panel'

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
      'ide-haskell:prettify-file': ({ currentTarget }: IEventDesc) => {
        prettifyFile(currentTarget.getModel())
      },
    }),
    atom.commands.add('atom-text-editor.ide-haskell--has-tooltips', {
      'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }: IEventDesc) => {
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
}

export function deserializeOutputPanel(state: OutputPanel.IState) {
  outputPanel = new OutputPanel.OutputPanel(state)
  return outputPanel
}

export function provideUpi(): UPI2.IUPIProvided {
  upiProvided = true
  return {
    registerPlugin(disp, pluginName) {
      if (!pluginManager) { return undefined }
      return UPI2.instance(pluginManager, disp, pluginName)
    },
  }
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
}

export function consumeLinter(indieRegistry: Linter.IndieRegistry): Disposable | undefined {
  if (!(disposables && pluginManager)) { return undefined }
  const linter = indieRegistry.register({ name: 'IDE-Haskell' })
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
