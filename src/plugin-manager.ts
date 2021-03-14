import {
  CompositeDisposable,
  Emitter,
  TextEditor,
  TextBuffer,
  Grammar,
  Disposable,
} from 'atom'
import { ResultsDB } from './results-db'
import { OutputPanel, IState as IOutputViewState } from './output-panel'
import { ConfigParamManager, IState as IParamState } from './config-params'
import { EditorControl } from './editor-control'
import { LinterSupport } from './linter-support'
import { TooltipRegistry } from './tooltip-registry'
import { CheckResultsProvider } from './check-results-provider'
import { StatusBarView } from './status-bar'
import { PrettifyEditorController } from './prettify'
import { EditorMarkControl } from './editor-mark-control'
import { BackendStatusController } from './backend-status'
import * as UPI from 'atom-haskell-upi'
import * as Linter from 'atom/linter'
import * as StatusBar from 'atom/status-bar'
import { handlePromise } from './utils'
import { ActionRegistry } from './actions-registry'
import { TooltipManager } from './tooltip-manager'

export { IParamState, IOutputViewState }

export type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection'

export interface IState {
  configParams: IParamState
}

export interface IEditorController {
  destroy(): void
}

export type IEditorControllerFactory = IEditorControllerFactoryT<
  IEditorController
>

export interface IEditorControllerFactoryT<T> {
  new (editor: TextEditor, manager: PluginManager): T
  supportsGrammar(grammar: string): boolean
}

export type ECMap<T extends IEditorController> = WeakMap<
  TextEditor,
  { controller: T; disposable: Disposable }
>

type InterfaceType<U> = U extends IEditorControllerFactoryT<infer T> ? T : never

export class PluginManager {
  public readonly resultsDB: ResultsDB
  public readonly configParamManager: ConfigParamManager
  public readonly tooltipRegistry: TooltipRegistry
  public readonly actionRegistry: ActionRegistry
  public readonly tooltipManager: TooltipManager
  private readonly checkResultsProvider?: CheckResultsProvider
  private linterSupport?: LinterSupport
  private readonly disposables = new CompositeDisposable()
  private readonly emitter: Emitter<
    {},
    {
      'did-save-buffer': TextBuffer
      'did-stop-changing': TextBuffer
    }
  > = new Emitter()
  private statusBarTile?: StatusBar.Tile
  private statusBarView?: StatusBarView
  private willSaveHandlers = new Set<UPI.TTextBufferCallback>()
  private readonly controllers = new Map<
    IEditorControllerFactory,
    ECMap<IEditorController>
  >()
  private readonly backendStatusController = new BackendStatusController()

  constructor(state: IState, public outputPanel: OutputPanel) {
    this.disposables.add(this.emitter)

    this.resultsDB = new ResultsDB()
    this.outputPanel.connectResults(this.resultsDB)
    this.outputPanel.connectBsc(this.backendStatusController)
    this.actionRegistry = new ActionRegistry(this)
    this.tooltipRegistry = new TooltipRegistry(this)
    this.tooltipManager = new TooltipManager(this)
    this.configParamManager = new ConfigParamManager(
      this.outputPanel,
      state.configParams,
    )

    this.disposables.add(
      this.addEditorController(EditorControl),
      this.addEditorController(PrettifyEditorController),
      this.addEditorController(EditorMarkControl),
      this.tooltipRegistry,
      this.actionRegistry,
    )
    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.checkResultsProvider = new CheckResultsProvider(this)
    }

    this.subscribeEditorController()
  }

  public deactivate() {
    this.resultsDB.destroy()
    this.disposables.dispose()
    if (this.checkResultsProvider) this.checkResultsProvider.destroy()

    handlePromise(this.outputPanel.reallyDestroy())
    this.configParamManager.destroy()
    this.removeStatusBar()
    if (this.linterSupport) {
      this.linterSupport.destroy()
      this.linterSupport = undefined
    }
  }

  public serialize(): IState {
    return {
      configParams: this.configParamManager.serialize(),
    }
  }

  public onWillSaveBuffer = (callback: UPI.TTextBufferCallback) => {
    this.willSaveHandlers.add(callback)
    return new Disposable(() => this.willSaveHandlers.delete(callback))
  }

  public onDidSaveBuffer = (callback: UPI.TTextBufferCallback) =>
    this.emitter.on('did-save-buffer', callback)

  public onDidStopChanging = (callback: UPI.TTextBufferCallback) =>
    this.emitter.on('did-stop-changing', callback)

  public async willSaveBuffer(buffer: TextBuffer) {
    return Promise.all(
      Array.from(this.willSaveHandlers.values()).map((f) => f(buffer)),
    )
  }

  public didSaveBuffer(buffer: TextBuffer) {
    return this.emitter.emit('did-save-buffer', buffer)
  }

  public didStopChanging(buffer: TextBuffer) {
    return this.emitter.emit('did-stop-changing', buffer)
  }

  public togglePanel() {
    handlePromise(atom.workspace.toggle(this.outputPanel))
  }

  public controller(editor: TextEditor): EditorControl | undefined {
    return this.controllerType(EditorControl, editor)
  }

  public controllerType<U extends IEditorControllerFactory>(
    factory: U,
    editor: TextEditor,
  ): InterfaceType<U> | undefined {
    const ecmap = this.controllers.get(factory)
    const rec = ecmap?.get(editor)
    return rec?.controller as InterfaceType<U>
  }

  public setLinter(linter: Linter.IndieDelegate) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'linter') {
      return
    }
    this.linterSupport = new LinterSupport(linter, this.resultsDB)
  }

  public nextError() {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') {
      return
    }
    this.outputPanel.showNextError()
  }

  public prevError() {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') {
      return
    }
    this.outputPanel.showPrevError()
  }

  public forceBackendStatus(pluginName: string, st: UPI.IStatus) {
    this.backendStatusController.forceBackendStatus(pluginName, st)
  }

  public getAwaiter(pluginName: string) {
    return this.backendStatusController.getAwaiter(pluginName)
  }

  public addEditorController<
    U extends IEditorController,
    T extends IEditorControllerFactoryT<U>
  >(factory: T): Disposable {
    if (this.controllers.has(factory)) {
      throw new Error(`Duplicate controller factory ${factory.toString()}`)
    }
    const map: ECMap<U> = new WeakMap()
    this.controllers.set(factory, map)
    return new Disposable(() => {
      this.controllers.delete(factory)
      for (const te of atom.workspace.getTextEditors()) {
        const rec = map.get(te)
        if (rec) rec.disposable.dispose()
      }
    })
  }

  public setStatusBar(sb: StatusBar.StatusBar) {
    this.statusBarView = new StatusBarView(
      this.outputPanel,
      this.backendStatusController,
    )
    this.statusBarTile = sb.addRightTile({
      item: this.statusBarView.element,
      priority: 100,
    })
  }

  public removeStatusBar() {
    if (this.statusBarTile) {
      this.statusBarTile.destroy()
      this.statusBarTile = undefined
    }
    if (this.statusBarView) {
      this.statusBarView.destroy()
      this.statusBarView = undefined
    }
  }

  private controllerOnGrammar(editor: TextEditor, grammar: Grammar) {
    for (const [factory, map] of this.controllers.entries()) {
      const rec = map.get(editor)
      if (!rec && factory.supportsGrammar(grammar.scopeName)) {
        const controller = new factory(editor, this)
        const disposable = new CompositeDisposable()
        disposable.add(
          new Disposable(() => {
            map.delete(editor)
            controller.destroy()
          }),
          editor.onDidDestroy(() => disposable.dispose()),
        )
        map.set(editor, { controller, disposable })
      } else if (rec && !factory.supportsGrammar(grammar.scopeName)) {
        rec.disposable.dispose()
      }
    }
  }

  // Observe text editors to attach controller
  private subscribeEditorController() {
    this.disposables.add(
      atom.workspace.observeTextEditors((editor) => {
        const editorDisp = new CompositeDisposable()
        editorDisp.add(
          editor.onDidChangeGrammar((grammar) => {
            this.controllerOnGrammar(editor, grammar)
          }),
          editor.onDidDestroy(() => {
            editorDisp.dispose()
            this.disposables.remove(editorDisp)
          }),
        )
        this.disposables.add(editorDisp)
        this.controllerOnGrammar(editor, editor.getGrammar())
      }),
    )
  }
}
