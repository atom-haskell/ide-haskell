import { CompositeDisposable, Emitter, TextEditor, TextBuffer, Grammar, Disposable } from 'atom'
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
import * as UPI from 'atom-haskell-upi'
import * as Linter from 'atom/linter'
import * as StatusBar from 'atom/status-bar'

export { IParamState, IOutputViewState }

export type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection'

export interface IState {
  configParams: IParamState
}

export interface IEditorController {
  destroy (): void
}

export type IEditorControllerFactory = IEditorControllerFactoryT<IEditorController>

export interface IEditorControllerFactoryT<T> {
  new (editor: TextEditor, manager: PluginManager): T
  supportsGrammar (grammar: string): boolean
}

export type ECMap<T extends IEditorController> = WeakMap<TextEditor, {controller: T, disposable: Disposable}>

export interface TMap extends Map<IEditorControllerFactory, ECMap<IEditorController>> {
  get<U extends IEditorController, T extends IEditorControllerFactoryT<U>> (key: T): ECMap<U>
  set<U extends IEditorController, T extends IEditorControllerFactoryT<U>> (key: T, val: ECMap<U>): this
}

export class PluginManager {
  public resultsDB: ResultsDB
  public configParamManager: ConfigParamManager
  public tooltipRegistry: TooltipRegistry
  private checkResultsProvider?: CheckResultsProvider
  private linterSupport?: LinterSupport
  private disposables = new CompositeDisposable()
  private emitter: Emitter<{}, {
    'will-save-buffer': TextBuffer
    'did-save-buffer': TextBuffer
    'did-stop-changing': TextBuffer
  }> = new Emitter()
  private statusBarTile?: StatusBar.Tile
  private statusBarView?: StatusBarView
  private controllers: TMap = new Map()
  constructor (state: IState, public outputPanel: OutputPanel) {
    this.disposables.add(this.emitter)

    this.resultsDB = new ResultsDB()
    this.outputPanel.connectResults(this.resultsDB)
    this.tooltipRegistry = new TooltipRegistry(this)
    this.configParamManager = new ConfigParamManager(this.outputPanel, state.configParams)

    this.disposables.add(
      this.addEditorController(EditorControl),
      this.addEditorController(PrettifyEditorController),
      this.addEditorController(EditorMarkControl),
    )
    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.checkResultsProvider = new CheckResultsProvider(this)
    }

    this.subscribeEditorController()
  }

  public deactivate () {
    this.resultsDB.destroy()
    this.disposables.dispose()
    this.checkResultsProvider && this.checkResultsProvider.destroy()

    // tslint:disable-next-line:no-floating-promises
    this.outputPanel.reallyDestroy()
    this.configParamManager.destroy()
    this.removeStatusBar()
    if (this.linterSupport) {
      this.linterSupport.destroy()
      this.linterSupport = undefined
    }
  }

  public serialize (): IState {
    return {
      configParams: this.configParamManager.serialize(),
    }
  }

  public onWillSaveBuffer = (callback: UPI.TTextBufferCallback) =>
    this.emitter.on('will-save-buffer', callback)

  public onDidSaveBuffer = (callback: UPI.TTextBufferCallback) =>
    this.emitter.on('did-save-buffer', callback)

  public onDidStopChanging = (callback: UPI.TTextBufferCallback) =>
    this.emitter.on('did-stop-changing', callback)

  public willSaveBuffer (buffer: TextBuffer) {
    return this.emitter.emit('will-save-buffer', buffer)
  }

  public didSaveBuffer (buffer: TextBuffer) {
    return this.emitter.emit('did-save-buffer', buffer)
  }

  public didStopChanging (buffer: TextBuffer) {
    return this.emitter.emit('did-stop-changing', buffer)
  }

  public togglePanel () {
    // tslint:disable-next-line:no-floating-promises
    atom.workspace.toggle(this.outputPanel)
  }

  public controller (editor: TextEditor): EditorControl | undefined {
    return this.controllerType(EditorControl, editor)
  }

  public controllerType<U extends IEditorController, T extends IEditorControllerFactoryT<U>> (
    factory: T, editor: TextEditor,
  ): U | undefined {
    const ecmap = this.controllers.get<U, T>(factory)
    const rec = ecmap && ecmap.get(editor)
    return rec && rec.controller
  }

  public setLinter (linter: Linter.IndieDelegate) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'linter') { return }
    this.linterSupport = new LinterSupport(linter, this.resultsDB)
  }

  public nextError () {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') { return }
    this.outputPanel.showNextError()
  }

  public prevError () {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') { return }
    this.outputPanel.showPrevError()
  }

  public backendStatus (pluginName: string, st: UPI.IStatus) {
    if (this.outputPanel) {
      this.outputPanel.backendStatus(pluginName, st)
    }
    if (this.statusBarView) {
      this.statusBarView.backendStatus(pluginName, st)
    }
  }

  public addEditorController<U extends IEditorController, T extends IEditorControllerFactoryT<U>> (
    factory: T,
  ): Disposable {
    if (this.controllers.has(factory)) {
      throw new Error(`Duplicate controller factory ${factory.toString()}`)
    }
    const map: ECMap<U> = new WeakMap()
    this.controllers.set(factory, map)
    return new Disposable(() => {
      this.controllers.delete(factory)
      for (const te of atom.workspace.getTextEditors()) {
        const rec = map.get(te)
        rec && rec.disposable.dispose()
      }
    })
  }

  public setStatusBar (sb: StatusBar.StatusBar) {
    this.statusBarView = new StatusBarView(this.outputPanel)
    this.statusBarTile = sb.addRightTile({
      item: this.statusBarView.element,
      priority: 100,
    })
  }

  public removeStatusBar () {
    if (this.statusBarTile) {
      this.statusBarTile.destroy()
      this.statusBarTile = undefined
    }
    if (this.statusBarView) {
      this.statusBarView.destroy()
      this.statusBarView = undefined
    }
  }

  private controllerOnGrammar (editor: TextEditor, grammar: Grammar) {
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
  private subscribeEditorController () {
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
