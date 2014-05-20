GutterControl = require './gutter-control'
UtilGhcMod = require './util-ghc-mod'
OutputView = require './output-view'

{ isCabalProject
, isHaskellized
} = require './utils'

module.exports =
  # config defaults
  configDefaults:
    checkOnFileSave: true,
    lintOnFileSave: true,
    tabSwitchOnCheck: true,
    ghcModPath: 'ghc-mod'

  activate: (state) ->
    return unless isCabalProject()

    # create backends
    @utilGhcMod = new UtilGhcMod

    # create views
    @outputView = new OutputView(state.outputView)

    # create controllers
    @gutterCtrl = new GutterControl

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

  # handle editor event appeared here
  handleEditorEvents: (editorView) ->
    editor = editorView.editor
    return unless isHaskellized editor.getUri()
    buffer = editor.getBuffer()

    # check and lint on save
    buffer.on 'saved', (buffer) =>
      @check() if atom.config.get('ide-haskell.checkOnFileSave')
      @lint() if atom.config.get('ide-haskell.lintOnFileSave')

    # editor was updated event, so update gutter
    editorView.on 'editor:display-updated', =>
      @gutterCtrl.renderView editorView

  # ghc-mod check
  check: (editorView = atom.workspaceView.getActiveView()) ->
    fileName = editorView?.editor?.getPath()
    return unless fileName?

    results = []
    @outputView.incCheckCounter()

    @utilGhcMod.check
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod check results:", result
        results.push result
      onComplete: =>
        @gutterCtrl.updateCheck results
        @outputView.renderCheck results
        @outputView.decCheckCounter()

  # ghc-mod lint
  lint: (editorView = atom.workspaceView.getActiveView()) ->
    fileName = editorView?.editor?.getPath()
    return unless fileName?

    results = []
    @outputView.incCheckCounter()

    @utilGhcMod.lint
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod lint results:", result
        results.push result
      onComplete: =>
        @gutterCtrl.updateLints results
        @outputView.renderLints results
        @outputView.decCheckCounter()

  # ghc-mod type
  getType: (editorView = atom.workspaceView.getActiveView()) ->
    editor = editorView?.editor
    fileName = editor?.getPath()
    point = editor?.getCursor().getBufferPosition()
    return unless editor? or pos? or fileName?

    @utilGhcMod.type
      fileName: fileName
      point: point
      onResult: (result) =>
        console.log "ghc-mod type results:", result
