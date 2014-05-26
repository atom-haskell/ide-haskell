{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
utilGhcMod = require './util-ghc-mod'

{isCabalProject} = require './utils'


configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  tabSwitchOnCheck: true,
  ghcModPath: 'ghc-mod'


outputView = null


activate = (state) ->
  # activate only on cabal project
  return unless isCabalProject()

  # create global views
  outputView = new OutputView(state.outputView)

  # attach controller to every editor view
  atom.workspaceView.eachEditorView (editorView) ->
    control = new EditorControl(editorView, outputView)

  # global commands
  atom.workspaceView.command 'ide-haskell:toggle-output', ->
    outputView.toggle()
  atom.workspaceView.command 'ide-haskell:check-file', ->
    outputView.checkFile(utilGhcMod.check)
  atom.workspaceView.command 'ide-haskell:lint-file', ->
    outputView.checkFile(utilGhcMod.lint)

deactivate = ->
  outputView.detach()

serialize = ->
  outputView: outputView.serialize()


module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize
}
