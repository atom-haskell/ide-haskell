ResultView = require './result-view'
UtilGhcMod = require './util-ghc-mod'
path = require 'path'

module.exports =
  resultView: null

  checkResults: []
  lintsResults: []

  activate: (state) ->
    return unless @isCabalized()

    @resultView = new ResultView(state.resultView)
    @resultView.attach()

    @utilGhcMod = new UtilGhcMod

    atom.workspaceView.command 'ide-haskell:check', => @check()
    atom.workspaceView.command 'ide-haskell:lint', => @lint()
    atom.workspaceView.command 'ide-haskell:get-type', => @getType()

  deactivate: ->
    @resultView.detach()
    @resultView = null

  serialize: ->
    resultView: @resultView.serialize()

  # check if project contains cabal file
  isCabalized: ->
    files = atom.project.getRootDirectory()?.getEntriesSync()
    return false if files is undefined
    for file in files
      return true if path.extname(file.getPath()) is '.cabal'
    return false

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
