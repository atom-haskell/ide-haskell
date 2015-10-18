{PluginManager} = require './plugin-manager'
{MainMenuLabel, getEventType} = require './utils'
{CompositeDisposable} = require 'atom'
{prettifyFile} = require './binutils/prettify'
UPI = require './upi'

module.exports = IdeHaskell =
  pluginManager: null
  disposables: null
  menu: null

  config:
    onSavePrettify:
      type: "boolean"
      default: false
      description: "Run file through stylish-haskell before save"

    switchTabOnCheck:
      type: "boolean"
      default: true
      description: "Switch to error tab after file check finished"
    expressionTypeInterval:
      type: "integer"
      default: 300
      description: "Type/Info tooltip show delay, in ms"
    closeTooltipsOnCursorMove:
      type: 'boolean'
      default: false
    stylishHaskellPath:
      type: "string"
      default: 'stylish-haskell'
      description: "Path to `stylish-haskell` utility"
    cabalPath:
      type: "string"
      default: 'cabal'
      description: "Path to `cabal` utility, for `cabal format`"
    startupMessageIdeBackend:
      type: "boolean"
      default: true
      description: "Show info message about haskell-ide-backend service on
                    activation"

  cleanConfig: ->
    [ 'onSaveCheck'
    , 'onSaveLint'
    , 'onMouseHoverShow'
    , 'useLinter'
    ].forEach (item) ->
      atom.config.set "haskell-ghc-mod.#{item}", atom.config.get "ide-haskell.#{item}"
      atom.config.unset "ide-haskell.#{item}"

    [ 'useBackend'
    , 'useBuildBackend'
    ].forEach (item) ->
      atom.config.unset "ide-haskell.#{item}"

  activate: (state) ->
    @cleanConfig()

    @upiProvided = false

    if atom.config.get 'ide-haskell.startupMessageIdeBackend'
      setTimeout (=>
        unless @upiProvided
          atom.notifications.addWarning """
          Ide-Haskell needs backends that provide most of functionality.
          Please refer to README for details
          """,
          dismissable: true
        ), 5000

    @disposables = new CompositeDisposable

    @pluginManager = new PluginManager state

    # global commands
    @disposables.add atom.commands.add 'atom-workspace',
      'ide-haskell:toggle-output': =>
        @pluginManager.togglePanel()

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="haskell"]',
        'ide-haskell:prettify-file': ({target}) ->
          prettifyFile target.getModel()
        'ide-haskell:close-tooltip': ({target, abortKeyBinding}) =>
          if @pluginManager.controller(target.getModel()).hasTooltips()
            @pluginManager.controller(target.getModel()).hideTooltip()
          else
            abortKeyBinding?()
        'ide-haskell:next-error': ({target}) =>
          @pluginManager.nextError()
        'ide-haskell:prev-error': ({target}) =>
          @pluginManager.prevError()

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="cabal"]',
        'ide-haskell:prettify-file': ({target}) ->
          prettifyFile target.getModel(), 'cabal'

    atom.keymaps.add 'ide-haskell',
      'atom-text-editor[data-grammar~="haskell"]':
        'escape': 'ide-haskell:close-tooltip'

    @menu = new CompositeDisposable
    @menu.add atom.menu.add [
      label: MainMenuLabel
      submenu : [
        {label: 'Prettify', command: 'ide-haskell:prettify-file'}
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
      ]
    ]

  deactivate: ->
    @pluginManager.deactivate()
    @pluginManager = null

    atom.keymaps.removeBindingsFromSource 'ide-haskell'

    # clear commands
    @disposables.dispose()
    @disposables = null

    @menu.dispose()
    @menu = null
    atom.menu.update()

  serialize: ->
    @pluginManager?.serialize()

  provideUpi: ->
    @upiProvided = true
    new UPI(@pluginManager)
