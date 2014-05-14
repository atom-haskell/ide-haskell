OutputView = require './output-view'

module.exports =
  outputView: null

  activate: (state) ->
    # TODO Everything is activated when cabal project was loaded

    atom.workspaceView.command 'ide-haskell:check', => @check()
    atom.workspaceView.command 'ide-haskell:lint', => @lint()
    atom.workspaceView.command 'ide-haskell:get-type', => @getType()

    @outputView = new OutputView(state.outputView)
    @outputView.attach()

    @outputView.add
      line: 1
      column: 2
      fname: 'aaa'
      type: 'Error'
      preview: 'preview'
      details: 'details'
    @outputView.add
      line: 1
      column: 2
      fname: 'aaa'
      type: 'Warning'
      preview: 'preview'
      details: 'details'
    @outputView.add
      line: 1
      column: 2
      fname: 'aaa'
      type: 'Lint'
      preview: 'preview'
      details: 'details'

  deactivate: ->
    @outputView.detach()
    @outputView = null

  serialize: ->
    outputView: @outputView.serialize()

  # ghc-mod check
  check: ->

  # ghc-mod lint
  lint: ->

  # ghc-mod type
  getType: ->
