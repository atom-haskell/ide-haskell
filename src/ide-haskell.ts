import {CompositeDisposable, Disposable} from 'atom'
import {PluginManager, IState} from './plugin-manager'
import {prettifyFile} from './prettify'
import {MAIN_MENU_LABEL} from './utils'
import {ILinterRegistry} from './linter-support'
import * as UPI from './upi-2'
import * as UPI3 from './upi-3'

// for typings
import {IShowTooltipParams} from './upi-3'
import {IStatus, ISeverityTabDefinition, IControlOpts, IElementObject, TControlDefinition} from './output-panel'
import {IResultItem, TSeverity} from './results-db'
import {IParamSpec} from './config-params'
import {TTooltipHandler, TTooltipFunction} from './tooltip-registry'
// end

let upiProvided = false
let disposables: CompositeDisposable | undefined
let pluginManager: PluginManager | undefined
let menu: CompositeDisposable | undefined

export {config} from './config'

function cleanConfig () { /*noop*/ }

declare interface IEventDesc {
  currentTarget: HTMLElement & { getModel (): AtomTypes.TextEditor }
  abortKeyBinding? (): void
}

export function activate (state: IState) {
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
            {dismissable: true})
        }
      },
      5000
    )
  }

  disposables = new CompositeDisposable()

  pluginManager = new PluginManager(state)

  // global commands
  disposables.add(atom.commands.add('atom-workspace', {
    'ide-haskell:toggle-output': () =>
      pluginManager && pluginManager.togglePanel()
  }))

  disposables.add(
    atom.commands.add('atom-text-editor[data-grammar~="haskell"]', {
      'ide-haskell:prettify-file': ({currentTarget}: IEventDesc) => {
        prettifyFile(currentTarget.getModel())
      },
      'ide-haskell:close-tooltip': ({currentTarget, abortKeyBinding}: IEventDesc) => {
        const controller = pluginManager && pluginManager.controller(currentTarget.getModel())
        if (!controller) { return }
        if (controller.tooltips.has()) {
          controller.tooltips.hide()
        } else if (abortKeyBinding) {
          abortKeyBinding()
        }
      },
      'ide-haskell:next-error': () => pluginManager && pluginManager.nextError(),
      'ide-haskell:prev-error': () => pluginManager && pluginManager.prevError()
    }))

  disposables.add(
    atom.commands.add('atom-text-editor[data-grammar~="cabal"]', {
      'ide-haskell:prettify-file': ({currentTarget}: IEventDesc) => {
        prettifyFile(currentTarget.getModel() , 'cabal')
      }
    }))

  atom.keymaps.add('ide-haskell', {
    'atom-text-editor[data-grammar~="haskell"]':
      {escape: 'ide-haskell:close-tooltip'}
  })

  menu = new CompositeDisposable()
  menu.add(atom.menu.add([{
    label: MAIN_MENU_LABEL,
    submenu: [
      {label: 'Prettify', command: 'ide-haskell:prettify-file'},
      {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
    ]}]))
}

export function deactivate () {
  pluginManager && pluginManager.deactivate()

  atom.keymaps.removeBindingsFromSource('ide-haskell')

  // clear commands
  disposables && disposables.dispose()

  menu && menu.dispose()
  atom.menu.update()
}

export function serialize () {
  if (pluginManager) {
     return pluginManager.serialize()
  }
}

export function provideUpi () {
  upiProvided = true
  // tslint:disable-next-line: no-non-null-assertion
  return {
     registerPlugin (disp: CompositeDisposable, pluginName: string) {
       // tslint:disable-next-line: no-non-null-assertion
       return UPI.instance(pluginManager!, disp, pluginName) // TODO: not entirely sure it's OK...
     }
   }
}

export function provideUpi3 () {
  upiProvided = true
  return {
    register (pluginName: string) {
      // tslint:disable-next-line: no-non-null-assertion
      return UPI3.instance(pluginManager!, pluginName) // TODO: not entirely sure it's OK...
    }
  }
}

export function consumeUpi3 (registration: UPI3.IRegistrationOptions) {
  upiProvided = true
  // tslint:disable-next-line: no-non-null-assertion
  return UPI3.consume(pluginManager!, registration) // TODO: not entirely sure it's OK...
}

export function consumeLinter (indieRegistry: ILinterRegistry): Disposable | undefined {
  if (!(disposables && pluginManager)) { return }
  const linter = indieRegistry.register({name: 'IDE-Haskell'})
  disposables.add(linter)
  pluginManager.setLinter(linter)
  return linter
}
