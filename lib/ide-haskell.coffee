OutputView = require './output-view'
UtilGhcMod = require './util-ghc-mod'
path = require 'path'

module.exports =
  # config defaults
  configDefaults:
    checkOnFileSave: true,
    lintOnFileSave: true,
    ghcModPath: 'ghc-mod'

  # views
  outputView: null

  # results for highlight in editors
  checkResults: []
  lintsResults: []

  activate: (state) ->
    return unless @isCabalProject()

    # create backends
    @utilGhcMod = new UtilGhcMod

    # create views
    @outputView = new OutputView(state.outputView)

    # create commands
    atom.workspaceView.command 'ide-haskell:toggle-output', =>
      @outputView.toggle()
    atom.workspaceView.command 'ide-haskell:file-check', =>
      @check()
    atom.workspaceView.command 'ide-haskell:file-lint', =>
      @lint()
    atom.workspaceView.command 'ide-haskell:get-type', =>
      @getType()

    # buffers watch
    atom.workspaceView.eachEditorView (editorView) =>
      @handleEditorEvents editorView

  deactivate: ->
    @outputView.detach()
    @outputView = null

  serialize: ->
    outputView: @outputView.serialize()

  # check if project contains cabal file
  isCabalProject: ->
    files = atom.project.getRootDirectory()?.getEntriesSync()
    return false if files is undefined
    for file in files
      return true if path.extname(file.getPath()) is '.cabal'
    return false

  # check if file is haskell source code
  isHaskellized: (fname) ->
    if path.extname(fname) is '.hs'
      return true
    return false

  # handle editor event appeared here
  handleEditorEvents: (editorView) ->
    {editor, gutter} = editorView
    return unless @isHaskellized editor.getUri()
    buffer = editor.getBuffer()

    # check and lint on save
    buffer.on 'saved', (buffer) =>
      @check() if atom.config.get('ide-haskell.checkOnFileSave')
      @lint() if atom.config.get('ide-haskell.lintOnFileSave')

  # ghc-mod check
  check: (editorView = atom.workspaceView.getActiveView()) ->
    {editor, gutter} = editorView
    fileName = editor?.getPath()
    return unless editorView? or editor? or fileName?

    checkResults = []
    @outputView.increaseWorkingCounter()

    @utilGhcMod.check
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod check results:", result
        checkResults.push result
      onComplete: =>
        @outputView.renderCheck checkResults
        @outputView.decreaseWorkingCounter()
        @checkResults = checkResults

        # TODO update every opened editor with results


  # ghc-mod lint
  lint: ->

  # ghc-mod type
  getType: ->
