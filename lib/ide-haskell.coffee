$ = require 'jquery'

{PluginManager} = require './plugin-manager'
{isCabalProject, getCabalProjectDir} = require './utils'
{CompositeDisposable} = require 'atom'
{getProjectSettings} = require './project-settings'

configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  switchTabOnCheck: true,
  expressionTypeInterval: 300,
  ghcModPath: 'ghc-mod',
  stylishHaskellPath: 'stylish-haskell'

_pluginManager = null           # plugin manager
_disposables = new CompositeDisposable

isActive = ->
  !!_pluginManager

activate = (state) ->
  initIdeHaskell(state)

  # if we did not activate (no cabal project), set up an event to activate when a haskell file is opened
  _disposables.add atom.workspace.onDidOpen (event) ->
    if not isActive()
      item = event.item
      if item && item.getGrammar && item.getGrammar().scopeName == "source.haskell"
        initIdeHaskell(state)

initIdeHaskell = (state) ->
  return if isActive()

  settings = getProjectSettings()
  settings.root = getCabalProjectDir()
  settings.isCabalProject = (settings.root != null)

  return unless settings.isCabalProject

  $(window).on 'focus', updateMenu

  _pluginManager = new PluginManager(state)

  # global commands
  _disposables.add atom.commands.add 'atom-workspace',
    'ide-haskell:toggle-output': ->
      _pluginManager.togglePanel()
    'ide-haskell:check-file': ->
      _pluginManager.checkFile()
    'ide-haskell:lint-file': ->
      _pluginManager.lintFile()
    'ide-haskell:prettify-file': ->
      _pluginManager.prettifyFile(true)

  updateMenu()

deactivate = ->
  return unless isActive()

  $(window).off 'focus', updateMenu

  _pluginManager.deactivate()
  _pluginManager = null

  # clear commands
  _disposables.dispose();
  _disposables = new CompositeDisposable

  clearMenu()

serialize = ->
  return unless getProjectSettings().isCabalProject
  _pluginManager.serialize()

updateMenu = ->
  clearMenu()
  return unless getProjectSettings().isCabalProject

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

provideAutocomplete = ->
  # register a single "provider" with autocomplete; then we create one of our own CompleteProvider objects for each
  # editor. requestHandler forwards requests to the appropriate object.
  provider =
    selector: '.source.haskell',
    blacklist: '.source.haskell .comment'
    requestHandler: (options) ->
      return [] unless _pluginManager
      _pluginManager.autocompleteProviderForEditor(options.editor)?.buildSuggestions();

  return {provider: provider}

module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize,
  provideAutocomplete
}
