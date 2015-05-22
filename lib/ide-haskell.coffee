{$} = require 'atom-space-pen-views'

{PluginManager} = require './plugin-manager'
{getCabalProjectDir} = require './utils'
{CompositeDisposable} = require 'atom'


module.exports = IdeHaskell =
  _pluginManager: null
  _disposables: new CompositeDisposable
  _project:
    isCabalProject: false # true if cabal project
    root: ""              # detected project root directory

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
    ideBackendInfo:
      type: "boolean"
      default: true
      description: "Show info message about haskell-ide-backend service on
                    activation"
    useBackend:
      type: "string"
      default: ''
      description: 'Name of backend to use. Leave empty for any. Consult
                    backend provider documentation for name.'

  isActive: ->
    !!@_pluginManager

  activate: (state) ->
    if atom.config.get('ide-haskell.autocompleteInfo')
      autocompleteHaskellInstalled =
        atom.packages.getAvailablePackageNames().some (pn) ->
          pn == 'autocomplete-haskell'
      unless autocompleteHaskellInstalled
        message = "
          Ide-haskell:
          Autocompletion has been delegated to autocomplete-haskell package.
          Please, install it, if you want autocompletion.
          You can disable this message in ide-haskell settings.
          "
        atom.notifications.addInfo message, dismissable: true
        console.log message

    if atom.config.get('ide-haskell.ideBackendInfo')
      setTimeout (=>
        unless @backend?
          message = "
            Ide-haskell:
            Ide-haskell requires a package providing haskell-ide-backend
            service.
            Only one such package should be activated at a time.
            Consider installing haskell-ghc-mod or other package, which
            provides haskell-ide-backend.
            You can disable this message in ide-haskell settings.
            "
          atom.notifications.addInfo message, dismissable: true
          console.log message
        ), 5000

    @backend = null
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

    @_project.root = getCabalProjectDir()
    @_project.isCabalProject = (@_project.root != null)

    return unless @_project.isCabalProject

    @_pluginManager = new PluginManager state, @backend
    $(window).on 'focus', => @updateMenu()

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
      'ide-haskell:shutdown-backend': =>
        @backend.shutdownBackend()

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
    return unless @_project.isCabalProject
    @_pluginManager.serialize()

  updateMenu: ->
    @clearMenu()
    return unless @_project.isCabalProject

    atom.menu.add [
      {
        label: 'Haskell IDE'
        submenu : [
          {label: 'Check', command: 'ide-haskell:check-file'},
          {label: 'Linter', command: 'ide-haskell:lint-file'},
          {label: 'Separator1', type: 'separator'},
          {label: 'Prettify', command: 'ide-haskell:prettify-file'},
          {label: 'Separator2', type: 'separator'},
          {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'},
          {label: 'Separator3', type: 'separator'},
          {label: 'Stop Backend', command: 'ide-haskell:shutdown-backend'}
        ]
      }
    ]

  clearMenu: ->
    atom.menu.template = (
      obj for obj in atom.menu.template when obj.label isnt "Haskell IDE"
    )
    atom.menu.update()

  consumeBackend_0_1_0: (service) ->
    return if @backend?
    bn = atom.config.get('ide-haskell.useBackend')
    return if !!bn and service.name()!=bn
    service.onDidDestroy =>
      @backend = null
      @_pluginManager?.setBackend @backend
    @backend = service
    @_pluginManager?.setBackend service
