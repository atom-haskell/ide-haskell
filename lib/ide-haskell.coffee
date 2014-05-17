ResultView = require './result-view'
UtilGhcMod = require './util-ghc-mod'
path = require 'path'

module.exports =
  # config defaults
  configDefaults:
    checkOnFileSave: true,
    lintOnFileSave: true,
    ghcModPath: 'ghc-mod'

  # views
  resultView: null
  resultViewShow: true

  # results for highlight in editors
  checkResults: []
  lintsResults: []

  activate: (state) ->
    return unless @isCabalized()

    # deserialize state
    @resultViewShow = state.resultViewShow

    # create backends
    @utilGhcMod = new UtilGhcMod

    # create views
    @resultView = new ResultView(state.resultView)

    # create commands
    atom.workspaceView.command 'ide-haskell:toggle-results', => @toggleResultView()
    atom.workspaceView.command 'ide-haskell:check', => @check()
    atom.workspaceView.command 'ide-haskell:lint', => @lint()
    atom.workspaceView.command 'ide-haskell:get-type', => @getType()

    # show views
    @resultView.attach() if @resultViewShow

  deactivate: ->
    @resultView.detach()
    @resultView = null

  serialize: ->
    resultView: @resultView.serialize()
    resultViewShow: @resultViewShow

  # check if project contains cabal file
  isCabalized: ->
    files = atom.project.getRootDirectory()?.getEntriesSync()
    return false if files is undefined
    for file in files
      return true if path.extname(file.getPath()) is '.cabal'
    return false

  # toggle result view
  toggleResultView: ->
    @resultViewShow = not @resultViewShow
    if @resultViewShow then @resultView.attach() else @resultView.detach()

  # ghc-mod check
  check: ->
    editorView = atom.workspaceView.getActiveView()
    fileName = atom.workspace.getActiveEditor()?.getPath()
    return unless editorView? or fileName?

    checkResults = []
    @resultView.increaseWorkingCounter()

    @utilGhcMod.check
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod check results:", result
        checkResults.push result
      onComplete: =>
        @resultView.renderCheck checkResults
        @resultView.decreaseWorkingCounter()
        @checkResults = checkResults

        # TODO update every opened editor with results

        # TODO should tree view must be updated with warning icons?


  # ghc-mod lint
  lint: ->

  # ghc-mod type
  getType: ->
