$ = require 'jquery'

{PluginManager} = require './plugin-manager'
{isCabalProject, getCabalProjectDir} = require './utils'
{CompositeDisposable} = require 'atom'
{getProjectSettings} = require './project-settings'


module.exports = IdeHaskell =
  _pluginManager: null
  _disposables: new CompositeDisposable

  config:
    checkOnFileSave:
      type: "boolean"
      default: true
      description: "Check file after save"
    lintOnFileSave:
      type: "boolean"
      default: true
      description: "Lint file after save"
    switchTabOnCheck:
      type: "boolean"
      default: true
      description: "Switch to error tab after file check finished"
    expressionTypeInterval:
      type: "integer"
      default: 300
      description: "After this period of time the process of getting the
                    expression type will be started"
    ghcModPath:
      type: "string"
      default: 'ghc-mod'
      description: "Path to `ghc-mod` utility"
    stylishHaskellPath:
      type: "string"
      default: 'stylish-haskell'
      description: "Path to `stylish-haskell` utility"
    autocompleteInfo:
      type: "boolean"
      default: true
      description: "Show info message about autocomplete-haskell on activation"

  isActive: ->
    !!@_pluginManager

  activate: (state) ->
    autocompleteHaskellInstalled =
      atom.packages.getAvailablePackageNames().some (pn) ->
        pn == 'autocomplete-haskell'
    unless autocompleteHaskellInstalled
      message = "
        Ide-haskell:
        Autocompletion has been delegated to autocomplete-haskell package.
        Please, install it.
        You can disable this message in ide-haskell settings.
        "
      atom.notifications.addInfo message, dismissable: true
      console.log message
    @initIdeHaskell(state)

    # if we did not activate (no cabal project),
    # set up an event to activate when a haskell file is opened
    @_disposables.add atom.workspace.onDidOpen (event) =>
      if not @isActive()
        item = event.item
        if item && item.getGrammar &&
           item.getGrammar().scopeName == "source.haskell"
          @initIdeHaskell(state)

  initIdeHaskell: (state) ->
    return if @isActive()

    settings = getProjectSettings()
    settings.root = getCabalProjectDir()
    settings.isCabalProject = (settings.root != null)

    return unless settings.isCabalProject

    $(window).on 'focus', => @updateMenu()

    @_pluginManager = new PluginManager(state)

    # global commands
    @_disposables.add atom.commands.add 'atom-workspace',
      'ide-haskell:toggle-output': =>
        @_pluginManager.togglePanel()
      'ide-haskell:check-file': =>
        @_pluginManager.checkFile()
      'ide-haskell:lint-file': =>
        @_pluginManager.lintFile()
      'ide-haskell:prettify-file': =>
        @_pluginManager.prettifyFile(true)

    @updateMenu()

  deactivate: ->
    return unless @isActive()

    $(window).off 'focus', => @updateMenu()

    @_pluginManager.deactivate()
    @_pluginManager = null

    # clear commands
    @_disposables.dispose()
    @_disposables = new CompositeDisposable

    clearMenu()

  serialize: ->
    return unless getProjectSettings().isCabalProject
    @_pluginManager.serialize()

  updateMenu: ->
    @clearMenu()
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

  clearMenu: ->
    atom.menu.template = (
      obj for obj in atom.menu.template when obj.label isnt "Haskell IDE"
    )
    atom.menu.update()

  provideAutocomplete: ->
    # register a single "provider" with autocomplete;
    # then we create one of our own CompleteProvider objects for each
    # editor. requestHandler forwards requests to the appropriate object.
    provider =
      selector: '.source.haskell',
      blacklist: '.source.haskell .comment'
      requestHandler: (options) ->
        return [] unless @_pluginManager
        @_pluginManager
          .autocompleteProviderForEditor(options.editor)
          ?.buildSuggestions()

    return {provider: provider}
