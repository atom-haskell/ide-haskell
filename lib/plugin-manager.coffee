{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
{PendingBackend, Channel} = require './pending-backend'
{CompleteProvider} = require './complete-provider'
{MainCompletionDatabase} = require './completion-db'
utilGhcMod = require './util-ghc-mod'


class PluginManager

  constructor: (state) ->
    @checkResults = []            # all errors, warings and lints here
    @autocompleteProviders = []   # all providers for autocompletion

    @createOutputViewPanel(state)
    @subsribeEditorViewController()
    @createPendingProcessController()
    @attachProcessControllerToOutputView()
    # @registerAutocompleteProviders()
    # @createCompletionDatabase()

  deactivate: ->
    # @unregisterAutocompleteProviders()
    @detachProcessControllerToOutputView()
    @deletePendingProcessController()
    @deleteEditorViewControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()


  togglePanel: ->
    @outputView?.toggle()

  checkFile: ->
    @checkOrLintFile(utilGhcMod.check)

  lintFile: ->
    @checkOrLintFile(utilGhcMod.lint)


  # File check or lint.
  checkOrLintFile: (func) ->
    fileName = atom.workspaceView.getActiveView()?.getEditor().getPath()
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
        @updateAllEditorViewsWithResults affectedTypes
      onFailure: =>
        @outputView?.resultsUpdated null    # notify of error
    }

  # Update internals with results.
  updateResults: (types, results) ->
    @checkResults[t] = [] for t in types
    @checkResults[r.type].push(r) for r in results

  # Update every editor view with results
  updateAllEditorViewsWithResults: (types) ->
    for editorView in atom.workspaceView.getEditorViews()
      editorView.haskellController?.resultsUpdated types

  # Update the editor view with results.
  updateEditorView: (editorView, types = undefined) ->
    editorView.haskellController.resultsUpdated types

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputView(state.outputView, this)

  deleteOutputViewPanel: ->
    @outputView?.deactivate()
    @outputView = null

  # Subscribe on editor view for attaching controller.
  subsribeEditorViewController: ->
    @controlSubscription = atom.workspaceView.eachEditorView (editorView) =>
      editorView.haskellController = new EditorControl(editorView, this)

  deleteEditorViewControllers: ->
    for editorView in atom.workspaceView.getEditorViews()
      editorView.haskellController?.deactivate()
      editorView.haskellController = null

    @controlSubscription?.off()
    @controlSubscription = null

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
    @autocompleteSubscription = atom.workspaceView.eachEditorView (editorView) =>
      if editorView.attached and not editorView.mini
        provider = new CompleteProvider editorView, this
        @autocompleteModule.registerProviderForEditorView provider, editorView
        @autocompleteProviders.push provider

        # if editor view will close, remove provider
        editorView.on "editor:will-be-removed", =>
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
