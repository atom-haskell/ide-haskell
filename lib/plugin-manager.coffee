{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
utilStylishHaskell = require './util-stylish-haskell'
{CompositeDisposable, Emitter} = require 'atom'

class PluginManager

  constructor: (state, backend) ->
    @checkResults = {}            # all errors, warings and lints here

    @emitter = new Emitter

    @disposables = new CompositeDisposable
    @controllers = new WeakMap

    @createOutputViewPanel(state)
    @subscribeEditorController()

    @setBackend backend if backend?

  deactivate: ->
    @disposables.dispose()
    @backend?.shutdownBackend()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()

  setBackend: (backend) =>
    @backend = backend

    if @backend?
      @disposables.add @backend.onBackendActive =>
        @outputView.backendActive()
      @disposables.add @backend.onBackendIdle =>
        @outputView.backendIdle()

  togglePanel: ->
    @outputView?.toggle()

  checkFile: (editor) ->
    @checkOrLint editor,@backend?.checkBuffer,['error', 'warning']

  lintFile: (editor) ->
    @checkOrLint editor,@backend?.lintBuffer,['lint']

  checkOrLint: (editor, func, types) =>
    return unless func?
    @outputView?.pendingCheck()
    func editor.getBuffer(), (res) =>
      @checkResults[t] = (res.filter ({severity}) -> severity==t) for t in types
      @emitter.emit 'results-updated', {res: @checkResults, types}

  onResultsUpdated: (callback) =>
    @emitter.on 'results-updated', callback

  # File prettify
  prettifyFile: (editor) ->
    utilStylishHaskell.prettify editor.getText(),
      onComplete: (text) ->
        editor.setText(text)

  showType: (editor) ->
    @controllers?.get?(editor)?.showExpressionType()

  showInfo: (editor) ->
    @controllers?.get?(editor)?.showExpressionType(null,'getInfo')

  insertType: (editor) ->
    @controllers?.get?(editor)?.insertType()

  # Update internals with results.
  updateResults: (types, results) ->
    @checkResults[t] = [] for t in types
    @checkResults[r.type].push(r) for r in results

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputView(state.outputView, this)

  deleteOutputViewPanel: ->
    @outputView?.deactivate()
    @outputView = null

  addController: (editor) ->
    unless @controllers.get(editor)?
      @controllers.set(editor, new EditorControl(editor, this))
      @disposables.add editor.onDidDestroy () =>
        @removeController editor

  removeController: (editor) ->
    @controllers.get(editor)?.deactivate()
    @controllers.delete(editor)

  controllerOnGrammar: (editor, grammar) ->
    if grammar.scopeName == 'source.haskell'
      @addController editor
    else
      @removeController editor

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      @disposables.add editor.onDidChangeGrammar (grammar) =>
        @controllerOnGrammar editor, grammar
      @controllerOnGrammar editor, editor.getGrammar()

  deleteEditorControllers: ->
    for editor in atom.workspace.getTextEditors()
      @removeController editor


module.exports = {
  PluginManager
}
