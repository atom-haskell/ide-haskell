{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
{PendingBackend} = require './pending-backend'
utilGhcMod = require './util-ghc-mod'


class PluginManager

  checkResults: []          # all errors, warings and lints here

  constructor: (state) ->
    @createOutputViewPanel(state)
    @subsribeEditorViewController()
    @createPendingProcessController()
    @attachProcessControllerToOutputView()

  deactivate: ->
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
    params =
      fileName: fileName
      onResult: (oneResult) ->
        checkOrLintResults.push oneResult
      onComplete: (affectedTypes) =>
        @updateResults affectedTypes, checkOrLintResults
        @outputView?.resultsUpdated affectedTypes
        @updateAllEditorViewsWithResults affectedTypes
      onFailure: =>
        @outputView?.resultsUpdated null    # notify of error

    @pendingProcessController.start func, params

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
    @editorViewSubscription = atom.workspaceView.eachEditorView (editorView) =>
      editorView.haskellController = new EditorControl(editorView, this)

  deleteEditorViewControllers: ->
    for editorView in atom.workspaceView.getEditorViews()
      editorView.haskellController?.deactivate()
      editorView.haskellController = null

    @editorViewSubscription?.off()
    @editorViewSubscription = null

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

module.exports = {
  PluginManager
}
