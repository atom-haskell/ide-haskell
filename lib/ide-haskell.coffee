{$} = require 'atom'

{PluginManager} = require './plugin-manager'
{isCabalProject} = require './utils'


configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  switchTabOnCheck: true,
  expressionTypeInterval: 300,
  ghcModPath: 'ghc-mod',
  stylishHaskellPath: 'stylish-haskell'

_isCabalProject = false         # true if cabal project
_pluginManager = null           # plugin manager

activate = (state) ->
  _isCabalProject = isCabalProject()
  $(window).on 'focus', updateMenu
  return unless _isCabalProject

  _pluginManager = new PluginManager(state)

  # global commands
  atom.workspaceView.command 'ide-haskell:toggle-output', ->
    _pluginManager.togglePanel()
  atom.workspaceView.command 'ide-haskell:check-file', ->
    _pluginManager.checkFile()
  atom.workspaceView.command 'ide-haskell:lint-file', ->
    _pluginManager.lintFile()
  atom.workspaceView.command 'ide-haskell:prettify-file', ->
    _pluginManager.prettifyFile(true)

  updateMenu()

deactivate = ->
  $(window).off 'focus', updateMenu
  return unless _isCabalProject
  _isCabalProject = false

  _pluginManager.deactivate()
  _pluginManager = null

  # clear commands
  atom.workspaceView.off 'ide-haskell:toggle-output'
  atom.workspaceView.off 'ide-haskell:check-file'
  atom.workspaceView.off 'ide-haskell:lint-file'
  atom.workspaceView.off 'ide-haskell:prettify-output'

  clearMenu()

serialize = ->
  return unless _isCabalProject
  _pluginManager.serialize()

updateMenu = ->
  clearMenu()
  return unless _isCabalProject

  atom.menu.add [
    {
      label: 'Haskell IDE'
      submenu : [
        {label: 'Check', command: 'ide-haskell:check-file'},
        {label: 'Linter', command: 'ide-haskell:lint-file'},
        {label: 'Separator1', type: 'separator'},
        {label: 'Prettify', command: 'ide-haskell:prettify-file'},
        {label: 'Separator2', type: 'separator'},
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
