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
    checkFile(utilGhcMod.check)
  atom.workspaceView.command 'ide-haskell:lint-file', ->
    checkFile(utilGhcMod.lint)

deactivate = ->
  outputView.detach()

serialize = ->
  outputView: outputView.serialize()

# check and lint file
checkFile = (checkFunction) ->
  fileName = atom.workspaceView.getActiveView().getEditor().getPath()
  return unless fileName?

  collectedResults = []
  checkFunction
    fileName: fileName
    onPrepare: (alteredTypes) ->
      outputView.prepare(alteredTypes)
    onResult: (result) ->
      collectedResults.push result
    onComplete: (alteredTypes) ->
      outputView.update(alteredTypes, collectedResults)


module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize
}
