{$} = require 'atom'
{Subscriber} = require 'emissary'

{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
utilGhcMod = require './util-ghc-mod'
{isCabalProject} = require './utils'


configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  switchTabOnCheck: true,
  expressionTypeInterval: 300,
  ghcModPath: 'ghc-mod'


_isCabalProject = false
subscription = null
outputView = null

activate = (state) ->
  _isCabalProject = isCabalProject()
  $(window).on 'focus', updateMenu

  # activate only on cabal project
  return unless _isCabalProject
  updateMenu()

  # create global views
  outputView = new OutputView(state.outputView)

  # attach controller to every editor view
  subscription = atom.workspaceView.eachEditorView (editorView) ->
    new EditorControl(editorView, outputView)

  # global commands
  atom.workspaceView.command 'ide-haskell:toggle-output', ->
    outputView.toggle()
  atom.workspaceView.command 'ide-haskell:check-file', ->
    outputView.checkFile(utilGhcMod.check)
  atom.workspaceView.command 'ide-haskell:lint-file', ->
    outputView.checkFile(utilGhcMod.lint)

deactivate = ->
  $(window).off 'focus', updateMenu
  return unless _isCabalProject

  # remove menu
  clearMenu()

  # remove editor controllers from all opened views
  for editorView in atom.workspaceView.getEditorViews()
    editorView.control?.deactivate()

  # remove subscription
  subscription.off()
  subscription = null

  # clear commands
  atom.workspaceView.off 'ide-haskell:toggle-output'
  atom.workspaceView.off 'ide-haskell:check-file'
  atom.workspaceView.off 'ide-haskell:lint-file'

  # remove output panel
  outputView.deactivate()
  outputView = null

serialize = ->
  return unless _isCabalProject
  outputView: outputView.serialize()

updateMenu = ->
  clearMenu()
  return unless _isCabalProject

  atom.menu.add [
    {
      label: 'Haskell IDE'
      submenu : [
        {label: 'Check File', command: 'ide-haskell:check-file'},
        {label: 'Lint File', command: 'ide-haskell:lint-file'},
        {label: 'Separator1', type: 'separator'},
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
      ]
    }
  ]

clearMenu = ->
  atom.menu.template = (
    obj for obj in atom.menu.template when obj.label isnt "Haskell IDE"
  )
  atom.menu.update()


module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize
}
