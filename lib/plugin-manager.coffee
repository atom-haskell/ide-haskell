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
    @backend.shutdownBackend()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()

  setBackend: (backend) =>
    @backend = backend

    @disposables.add @backend?.onBackendActive =>
      @outputView.backendActive()
    @disposables.add @backend?.onBackendIdle =>
      @outputView.backendIdle()

  togglePanel: ->
    @outputView?.toggle()

  checkFile: ->
    @checkOrLint(@backend?.checkBuffer,['error', 'warning'])

  lintFile: ->
    @checkOrLint(@backend?.lintBuffer,['lint'])

  checkOrLint: (func, types) =>
    return unless func?
    @outputView?.pendingCheck()
    func atom.workspace.getActiveTextEditor().getBuffer(), (res) =>
      @checkResults[t] = (res.filter ({severity}) -> severity==t) for t in types
      @emitter.emit 'results-updated', {res: @checkResults, types}

  onResultsUpdated: (callback) =>
    @emitter.on 'results-updated', callback

  # File prettify
  prettifyFile: ->
    editor = atom.workspace.getActiveTextEditor()

    utilStylishHaskell.prettify editor.getText(),
      onComplete: (text) ->
        editor.setText(text)

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

  removeController: (editor) ->
    @controllers.get(editor)?.deactivate()
    @controllers.delete(editor)

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      if not @controllers.get(editor)
        @controllers.set(editor, new EditorControl(editor, this))
        @disposables.add editor.onDidDestroy () =>
          @removeController editor

  deleteEditorControllers: ->
    for editor in atom.workspace.getTextEditors()
      @removeController editor


module.exports = {
  PluginManager
}
