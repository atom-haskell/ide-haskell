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
    @autocompleteProviders = []   # all providers for autocompletion

    @disposables = new CompositeDisposable

    @createOutputViewPanel(state)
    @subscribeEditorController()
    @createPendingProcessController()
    @attachProcessControllerToOutputView()
    @registerAutocompleteProviders()
    @createCompletionDatabase()

  deactivate: ->
    @disposables.dispose();

    # @unregisterAutocompleteProviders()
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
      editor.haskellController?.resultsUpdated types

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputView(state.outputView, this)

  deleteOutputViewPanel: ->
    @outputView?.deactivate()
    @outputView = null

  removeController: (editor) ->
    editor.haskellController?.deactivate()
    editor.haskellController = null

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      editor.haskellController = new EditorControl(editor, this)
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

  # Working with autocomplete
  registerAutocompleteProviders: ->
    if atom.packages.isPackageLoaded('autocomplete-plus')
      atom.packages.activatePackage('autocomplete-plus')
        .then (pkg) =>
          @autocompleteModule = pkg.mainModule
          @attachAutocompleteToNewEditorViews()

  unregisterAutocompleteProviders: ->
    @autocompleteSubscription?.off()
    @autocompleteSubscription = null

    # remove all active providers
    @autocompleteProviders.forEach (provider) =>
      @autocompleteModule.unregisterProvider provider
    @autocompleteProviders = []

  attachAutocompleteToNewEditorViews: ->
    # going to leave this using the deprecated API until I am ready to upgrade autocomplete.
    # want to remove the usages of editorView in haskell-ide before I do that upgrade.
    @autocompleteSubscription = atom.workspaceView.eachEditorView (editorView) =>
      if editorView.attached and not editorView.mini
        provider = new CompleteProvider editorView, this
        @autocompleteModule.registerProviderForEditorView provider, editorView
        @autocompleteProviders.push provider

        editor = editorView.getModel()
        # if editor view will close, remove provider
        @disposables.add editor.onDidDestroy =>
          if (index = @autocompleteProviders.indexOf(provider)) isnt -1
            @autocompleteProviders.splice index
          @autocompleteModule.unregisterProvider provider

  # Building main completion database
  createCompletionDatabase: ->
    @mainCDB = new MainCompletionDatabase this
    @localCDB = {} # completion databases for uri


module.exports = {
  PluginManager
}
