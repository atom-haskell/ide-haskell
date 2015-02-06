{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
{PendingBackend, Channel} = require './pending-backend'
{CompleteProvider} = require './complete-provider'
{MainCompletionDatabase} = require './completion-db'
utilStylishHaskell = require './util-stylish-haskell'
utilGhcMod = require './util-ghc-mod'
{CompositeDisposable} = require 'atom'

class PluginManager

  constructor: (state) ->
    @checkResults = []            # all errors, warings and lints here

    @disposables = new CompositeDisposable
    @controllers = new WeakMap
    @completeProviders = new WeakMap

    @createPendingProcessController()
    @createCompletionDatabase()
    @createOutputViewPanel(state)
    @subscribeEditorController()
    @attachProcessControllerToOutputView()

  deactivate: ->
    @disposables.dispose();

    @detachProcessControllerToOutputView()
    @deletePendingProcessController()
    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()

  togglePanel: ->
    @outputView?.toggle()

  checkFile: ->
    @checkOrLintFile(utilGhcMod.check)

  lintFile: ->
    @checkOrLintFile(utilGhcMod.lint)

  # File prettify
  prettifyFile: ->
    editor = atom.workspace.getActiveTextEditor()
    fileName = editor?.getPath()
    return unless fileName?

    # first we should save current buffer if it was modified
    if editor.isModified()
      @checkTurnedOff = true
      editor.save()
      @checkTurnedOff = false

    # start prettifier - it must convert file in-place
    @pendingProcessController.start(
      Channel.prettify,
      utilStylishHaskell.prettify,
      { fileName: fileName })

  # File check or lint.
  checkOrLintFile: (func) ->
    return if @checkTurnedOff? and @checkTurnedOff
    editor = atom.workspace.getActiveTextEditor()
    fileName = editor?.getPath()
    return unless fileName?

    @outputView?.pendingCheck()
    checkOrLintResults = []

    @pendingProcessController.start Channel.checkAndLint, func, {
      fileName: fileName
      onResult: (oneResult) ->
        checkOrLintResults.push oneResult
      onComplete: (affectedTypes) =>
        @updateResults affectedTypes, checkOrLintResults
        @outputView?.resultsUpdated affectedTypes
        @updateAllEditorsWithResults affectedTypes
      onFailure: =>
        @outputView?.resultsUpdated null    # TODO notify of error
    }

  # Update internals with results.
  updateResults: (types, results) ->
    @checkResults[t] = [] for t in types
    @checkResults[r.type].push(r) for r in results

  # Update every editor view with results
  updateAllEditorsWithResults: (types) ->
    for editor in atom.workspace.getTextEditors()
      @controllers.get(editor)?.resultsUpdated types

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputView(state.outputView, this)

  deleteOutputViewPanel: ->
    @outputView?.deactivate()
    @outputView = null

  removeController: (editor) ->
    @controllers.get(editor)?.deactivate()
    @completeProviders.get(editor)?.dispose()
    @controllers.delete(editor)
    @completeProviders.delete(editor)

  autocompleteProviderForEditor: (editor) ->
    return null unless editor
    return @completeProviders.get(editor)

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      if not @controllers.get(editor)
        @controllers.set(editor, new EditorControl(editor, this))
        if not editor.mini
          # create a completion provider for the editor; note, there is only one provider object
          # that is actually registered with autocomplete (see provideAutocomplete()), but we use n instances of
          # these internally to manage per-file state.
          @completeProviders.set(editor, new CompleteProvider(editor, this))

        @disposables.add editor.onDidDestroy () =>
          @removeController editor

  deleteEditorControllers: ->
    for editor in atom.workspace.getTextEditors()
      @removeController editor

  # Work with precess controller
  createPendingProcessController: ->
    @pendingProcessController = new PendingBackend

  deletePendingProcessController: ->
    @pendingProcessController?.deactivate()
    @pendingProcessController = null

  # Attach process controller to output view
  attachProcessControllerToOutputView: ->
    @pendingProcessController.on 'backend-active', =>
      @outputView.backendActive()
    @pendingProcessController.on 'backend-idle', =>
      @outputView.backendIdle()

  detachProcessControllerToOutputView: ->
    @pendingProcessController.off 'backend-active'
    @pendingProcessController.off 'backend-idle'

  # Building main completion database
  createCompletionDatabase: ->
    @mainCDB = new MainCompletionDatabase this
    @localCDB = {} # completion databases for uri


module.exports = {
  PluginManager
}
