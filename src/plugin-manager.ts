import {CompositeDisposable, Emitter, TextEditor, Point, TextBuffer, Grammar, Disposable} from 'atom'
import {ResultsDB} from './results-db'
import {OutputPanel, IState as IOutputViewState} from './output-panel'
import {ConfigParamManager, IState as IParamState} from './config-params'
import {EditorControl, TTextBufferCallback} from './editor-control'
import {LinterSupport, ILinter} from './linter-support'
import {TooltipRegistry} from './tooltip-registry'
import {CheckResultsProvider} from './check-results-provider'

export {IParamState, IOutputViewState}

export type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection'
type TShowTooltipCallbackParams = {editor: TextEditor, pos: Point, eventType: TEventType}
type TShowTooltipCallback = (pars: TShowTooltipCallbackParams) => void

export interface IState {
  outputView: IOutputViewState
  configParams: IParamState
}

export interface IEditorController {
  destroy (): void
}

export interface IEditorControllerFactory {
  new (editor: TextEditor, manager: PluginManager): IEditorController
}

export type ECMap<T extends IEditorController> = WeakMap<TextEditor, T>

export class PluginManager {
  public resultsDB: ResultsDB
  public outputPanel: OutputPanel
  public configParamManager: ConfigParamManager
  public tooltipRegistry: TooltipRegistry
  private linterSupport?: LinterSupport
  private disposables: CompositeDisposable
  private emitter: Emitter
  private controllers: ECMap<EditorControl>
  private controllerClasses: Set<{map?: ECMap<IEditorController>, factory: IEditorControllerFactory}>
  private editorDispMap: WeakMap<TextEditor, CompositeDisposable>
  constructor (state: IState) {
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)

    this.controllers = new WeakMap()
    this.controllerClasses = new Set()
    this.editorDispMap = new WeakMap()

    this.resultsDB = new ResultsDB()
    this.outputPanel = new OutputPanel(state.outputView, this.resultsDB)
    this.tooltipRegistry = new TooltipRegistry(this)
    this.configParamManager = new ConfigParamManager(this.outputPanel, state.configParams)

    this.addEditorController(EditorControl, this.controllers)
    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.addEditorController(CheckResultsProvider)
    }

    this.subscribeEditorController()
  }

  public deactivate () {
    this.resultsDB.destroy()
    this.disposables.dispose()

    this.deleteEditorControllers()
    this.outputPanel.destroy()
    this.configParamManager.destroy()
    if (this.linterSupport) {
      this.linterSupport.destroy()
      this.linterSupport = undefined
    }
  }

  public serialize (): IState {
    return {
      outputView: this.outputPanel.serialize(),
      configParams: this.configParamManager.serialize()
    }
  }

  public onWillSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('will-save-buffer', callback)
  }

  public onDidSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('did-save-buffer', callback)
  }

  public onDidStopChanging (callback: TTextBufferCallback) {
    return this.emitter.on('did-stop-changing', callback)
  }

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
    this.outputPanel.toggle()
  }

  public controller (editor: TextEditor) {
    return this.controllers.get(editor)
  }

  public setLinter (linter: ILinter) {
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

  public removeController (editor: TextEditor) {
    const disp = this.editorDispMap.get(editor)
    if (disp) {
      disp.dispose()
      this.disposables.remove(disp)
      this.editorDispMap.delete(editor)
    }
  }

  public addEditorController (factory: IEditorControllerFactory, map?: ECMap<IEditorController>) {
    this.controllerClasses.add({map, factory})
  }

  private controllerOnGrammar (editor: TextEditor, grammar: Grammar) {
    if (grammar.scopeName.match(/haskell$/)) {
      this.addController(editor)
    } else {
      this.removeController(editor)
    }
  }

  // Observe text editors to attach controller
  private subscribeEditorController () {
    this.disposables.add(
      atom.workspace.observeTextEditors((editor) => {
        this.disposables.add(
          editor.onDidChangeGrammar((grammar) => {
            this.controllerOnGrammar(editor, grammar)
          })
        )
        this.controllerOnGrammar(editor, editor.getGrammar())
      })
    )
  }

  private deleteEditorControllers () {
    for (const editor of atom.workspace.getTextEditors()) { this.removeController(editor) }
  }

  private addController (editor: TextEditor) {
    const disp = this.editorDispMap.get(editor) || new CompositeDisposable()
    if (!this.editorDispMap.has(editor)) {
      disp.add(editor.onDidDestroy(() => this.removeController(editor)))
      this.editorDispMap.set(editor, disp)
      this.disposables.add(disp)
    }
    for (const {map, factory} of this.controllerClasses) {
      if (!map || !map.has(editor)) {
        const controller = new factory(editor, this)
        if (map) { map.set(editor, controller) }
        disp.add(new Disposable(() => {
          if (map) { map.delete(editor) }
          controller.destroy()
        }))
      }
    }
  }
}
