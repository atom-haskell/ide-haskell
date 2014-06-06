{$} = require 'atom'

{PluginManager} = require './plugin-manager'
{isCabalProject} = require './utils'

# {HaskellProvider} = require './haskell-provider'
# {CompletionDatabase} = require './completion-db'


configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  switchTabOnCheck: true,
  expressionTypeInterval: 300,
  ghcModPath: 'ghc-mod'

_isCabalProject = false         # true if cabal project
_pluginManager = null           # plugin manager


# autocomplete = null             # auto-completion package
# completionSubs = null           # editor view subscription for completion
# providers = []                  # registered autocompletion providers
#
# completionData = null           # completion database
#
# pendingBackend = null           # pending operations here

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

  updateMenu()


  # # autocompletion
  # if atom.packages.isPackageLoaded('autocomplete-plus')
  #   atom.packages.activatePackage('autocomplete-plus')
  #     .then (pkg) =>
  #       autocomplete = pkg.mainModule
  #       registerProviders()
  #
  # # update completion database with external modules
  # completionData = new CompletionDatabase outputView
  # completionData.build()

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

  clearMenu()

  # completionSubs?.off()
  # completionSubs = null
  #
  # # remove completion providers
  # providers.forEach (provider) ->
  #   autocomplete.unregisterProvider provider
  # providers = []
  #
  # # clear completion database
  # completionData = null

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

# registerProviders = ->
#   completionSubs = atom.workspaceView.eachEditorView (editorView) ->
#     if editorView.attached and not editorView.mini
#       provider = new HaskellProvider editorView, completeDatabase, outputView
#       autocomplete.registerProviderForEditorView provider, editorView
#       providers.push provider
#

module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize
}
