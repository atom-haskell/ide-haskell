ResultView = require './result-view'
UtilGhcMod = require './util-ghc-mod'

module.exports =
  resultView: null

  checkResults: []
  lintsResults: []

  activate: (state) ->
    # TODO Everything is activated when cabal project was loaded

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

  # ghc-mod check
  check: ->
    editorView = atom.workspaceView.getActiveView()
    fileName = atom.workspace.getActiveEditor()?.getPath()
    return unless editorView? or fileName?

    checkResults = []

    @utilGhcMod.check
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod check results:", result
        checkResults.push result
      onComplete: =>

        # TODO update every editor with result

        @resultView.renderCheck checkResults
        @checkResults = checkResults

  # ghc-mod lint
  lint: ->

  # ghc-mod type
  getType: ->
