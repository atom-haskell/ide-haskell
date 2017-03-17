'use babel'

import {CompositeDisposable, Emitter} from 'atom'
import ResultsDB from './results-db'
import {OutputPanel} from './output-panel'
import {ConfigParamManager} from './config-params'
import EditorControl from './editor-control'
import {LinterSupport} from './linter-support'

export default class PluginManager {
  constructor (state) {
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
    this.checkResults = null
    this.disposables.dispose()

    this.deleteEditorControllers()
    this.outputView.destroy()
    this.outputView = null
    this.configParamManager.destroy()
    this.configParamManager = null
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

  onShouldShowTooltip (callback) {
    return this.emitter.on('should-show-tooltip', callback)
  }

  onWillSaveBuffer (callback) {
    return this.emitter.on('will-save-buffer', callback)
  }

  onDidSaveBuffer (callback) {
    return this.emitter.on('did-save-buffer', callback)
  }

  onDidStopChanging (callback) {
    return this.emitter.on('did-stop-changing', callback)
  }

  togglePanel () {
    this.outputView.toggle()
  }

  updateEditorsWithResults (types) {
    for (let ed of atom.workspace.getTextEditors()) {
      let ctrl = this.controller(ed)
      if (ctrl) ctrl.updateResults(this.checkResults.filter({uri: ed.getPath()}), types)
    }
  }

  onResultsUpdated (callback) {
    return this.checkResults.onDidUpdate(callback)
  }

  controller (editor) {
    return this.controllers.get(editor)
  }

  addController (editor) {
    if (!this.controllers.has(editor)) {
      let controller = new EditorControl(editor)
      this.controllers.set(editor, controller)
      controller.disposables.add(
        editor.onDidDestroy(() => this.removeController(editor))
      , controller.onShouldShowTooltip(({editor, pos, eventType}) =>
          this.emitter.emit('should-show-tooltip', {editor, pos, eventType}))
      , controller.onWillSaveBuffer((buffer) => this.emitter.emit('will-save-buffer', buffer))
      , controller.onDidSaveBuffer((buffer) => this.emitter.emit('did-save-buffer', buffer))
      , controller.onDidStopChanging((editor) => this.emitter.emit('did-stop-changing', editor.getBuffer()))
      )
      controller.updateResults(this.checkResults.filter({uri: editor.getPath()}))
    }
  }

  setLinter (linter) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'linter') return
    this.linterSupport = new LinterSupport(linter, this.checkResults)
  }

  removeController (editor) {
    if (this.controllers.has(editor)) this.controllers.get(editor).deactivate()
    this.controllers.delete(editor)
  }

  controllerOnGrammar (editor, grammar) {
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

  addConfigParam (pluginName, specs) {
    return this.configParamManager.add(pluginName, specs)
  }

  getConfigParam (pluginName, name) {
    return this.configParamManager.get(pluginName, name)
  }

  setConfigParam (pluginName, name, value) {
    return this.configParamManager.set(pluginName, name, value)
  }
}
