'use babel'

import {CompositeDisposable, Emitter, TextEditor, Point, TextBuffer, Grammar} from 'atom'
import {ResultsDB, TUpdateCallback} from './results-db'
import {OutputPanel} from './output-panel'
import {ConfigParamManager, IParamSpec, IState as IParamState} from './config-params'
import {EditorControl} from './editor-control'
import {LinterSupport} from './linter-support'

type Linter = any // TODO: Steal this from atom-typescript

export type TEventType = 'keyboard' | 'context' | 'mouse' | 'selection'
type TShowTooltipCallbackParams = {editor: TextEditor, pos: Point, eventType: TEventType}
type TShowTooltipCallback = (pars: TShowTooltipCallbackParams) => void
export type TTextBufferCallback = (buffer: TextBuffer) => void

type IOutputViewState = any
export interface IState {
  outputView: IOutputViewState
  configParams: IParamState
}

export class PluginManager {
  public checkResults: ResultsDB
  public disposables: CompositeDisposable
  public controllers: WeakMap<TextEditor, EditorControl>
  public emitter: Emitter
  public outputView: OutputPanel
  public configParamManager: ConfigParamManager
  public linterSupport: LinterSupport | null
  constructor (state: IState) {
    this.checkResults = new ResultsDB()

    this.disposables = new CompositeDisposable()
    this.controllers = new WeakMap()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.disposables.add(
        this.onResultsUpdated(({types}) => this.updateEditorsWithResults(types))
      )
    }

    this.outputView = new OutputPanel(state.outputView, this.checkResults)

    this.subscribeEditorController()

    this.configParamManager = new ConfigParamManager(this.outputView, state.configParams)

    this.linterSupport = null
  }

  deactivate () {
    this.checkResults.destroy()
    this.disposables.dispose()

    this.deleteEditorControllers()
    this.outputView.destroy()
    this.configParamManager.destroy()
    if (this.linterSupport) {
      this.linterSupport.destroy()
      this.linterSupport = null
    }
  }

  serialize () {
    return {
      outputView: this.outputView.serialize(),
      configParams: this.configParamManager.serialize()
    }
  }

  onShouldShowTooltip (callback: TShowTooltipCallback) {
    return this.emitter.on('should-show-tooltip', callback)
  }

  onWillSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('will-save-buffer', callback)
  }

  onDidSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('did-save-buffer', callback)
  }

  onDidStopChanging (callback: TTextBufferCallback) {
    return this.emitter.on('did-stop-changing', callback)
  }

  togglePanel () {
    this.outputView.toggle()
  }

  updateEditorsWithResults (types: string[]) {
    for (let ed of atom.workspace.getTextEditors()) {
      let ctrl = this.controller(ed)
      if (ctrl) ctrl.updateResults(this.checkResults.filter({uri: ed.getPath()}), types)
    }
  }

  onResultsUpdated (callback: TUpdateCallback) {
    return this.checkResults.onDidUpdate(callback)
  }

  controller (editor: TextEditor) {
    return this.controllers.get(editor)
  }

  addController (editor: TextEditor) {
    if (!this.controllers.has(editor)) {
      let controller = new EditorControl(editor)
      this.controllers.set(editor, controller)
      controller.disposables.add(
        editor.onDidDestroy(() => this.removeController(editor))
      , controller.onShouldShowTooltip(({editor, pos, eventType}: TShowTooltipCallbackParams) =>
          this.emitter.emit('should-show-tooltip', {editor, pos, eventType}))
      , controller.onWillSaveBuffer((buffer: TextBuffer) => this.emitter.emit('will-save-buffer', buffer))
      , controller.onDidSaveBuffer((buffer: TextBuffer) => this.emitter.emit('did-save-buffer', buffer))
      , controller.onDidStopChanging((editor: TextEditor) => this.emitter.emit('did-stop-changing', editor.getBuffer()))
      )
      controller.updateResults(this.checkResults.filter({uri: editor.getPath()}))
    }
  }

  setLinter (linter: Linter) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'linter') return
    this.linterSupport = new LinterSupport(linter, this.checkResults)
  }

  removeController (editor: TextEditor) {
    let controller = this.controllers.get(editor)
    if (controller) {
      controller.deactivate()
      this.controllers.delete(editor)
    }
  }

  controllerOnGrammar (editor: TextEditor, grammar: Grammar) {
    if (grammar.scopeName.match(/haskell$/)) this.addController(editor)
    else this.removeController(editor)
  }

  // Observe text editors to attach controller
  subscribeEditorController () {
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

  deleteEditorControllers () {
    for (let editor of atom.workspace.getTextEditors()) { this.removeController(editor) }
  }

  nextError () {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') return
    this.outputView.showNextError()
  }

  prevError () {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin') return
    this.outputView.showPrevError()
  }

  addConfigParam (pluginName: string, specs: { [paramName: string]: IParamSpec<any> }) {
    return this.configParamManager.add(pluginName, specs)
  }

  getConfigParam (pluginName: string, name: string) {
    return this.configParamManager.get(pluginName, name)
  }

  setConfigParam (pluginName: string, name: string, value: any) {
    return this.configParamManager.set(pluginName, name, value)
  }
}
