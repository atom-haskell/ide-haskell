{PluginManager} = require './plugin-manager'
{MainMenuLabel, getEventType} = require './utils'
{CompositeDisposable} = require 'atom'
BackendHelper = require 'atom-backend-helper'
{prettifyFile} = require './binutils/prettify'
UPI = require './upi'

module.exports = IdeHaskell =
  pluginManager: null
  disposables: null
  menu: null
  buildBackendHelperDisp: null

  config:
    onSaveCheck:
      type: "boolean"
      default: true
      description: "Check file on save"
    onSaveLint:
      type: "boolean"
      default: true
      description: "Lint file on save"
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
    onMouseHoverShow:
      type: 'string'
      default: 'Type'
      enum: ['Nothing', 'Type', 'Info', 'Info, fallback to Type']
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
    useBackend:
      type: "string"
      default: ''
      description: 'Name of backend to use. Leave empty for any. Consult
                    backend provider documentation for name.'
    useBuildBackend:
      type: "string"
      default: ''
      description: 'Name of build backend to use. Leave empty for any. Consult
                    backend provider documentation for name.'
    useLinter:
      type: 'boolean'
      default: false
      description: 'Use Atom Linter service for check and lint
                    (requires restart)'

  cleanConfig: ->
    [ 'activateStandalone'
    , 'startupMessageAutocomplete' ].forEach (item) ->
      atom.config.unset "ide-haskell.#{item}"

    set = (config, confkey, group, command) ->
      if binding = atom.config.get("ide-haskell.#{confkey}")
        console.log binding
        config[group]         ?= {}
        config[group][binding] = "ide-haskell:#{command}"
      atom.config.unset "ide-haskell.#{confkey}"
      config
    db = [
        key: 'hotkeyToggleOutput'
        modify: (config, key) ->
          set config, key,
          'atom-workspace',
          'toggle-output'
      ,
        key: 'hotkeyShutdownBackend'
        modify: (config, key) ->
          set config, key,
          'atom-workspace',
          'shutdown-backend'
      ,
        key: 'hotkeyCheckFile'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'check-file'
      ,
        key: 'hotkeyLintFile'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'lint-file'
      ,
        key: 'hotkeyPrettifyFile'
        modify: (config, key) ->
          config = set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'prettify-file'
          set config, key,
          'atom-text-editor[data-grammar~="cabal"]',
          'prettify-file'
      ,
        key: 'hotkeyShowType'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'show-type'
      ,
        key: 'hotkeyShowInfo'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'show-info'
      ,
        key: 'hotkeyInsertType'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'insert-type'
      ,
        key: 'hotkeyInsertImport'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'insert-import'
      ,
        key: 'hotkeyCloseTooltip'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'close-tooltip'
      ,
        key: 'hotkeyNextError'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'next-error'
      ,
        key: 'hotkeyPrevError'
        modify: (config, key) ->
          set config, key,
          'atom-text-editor[data-grammar~="haskell"]',
          'prev-error'
    ]
    if (db.map(({key}) -> atom.config.get "ide-haskell.#{key}").some (val) -> val?)
      CSON = require 'season'
      kmp = atom.keymaps.getUserKeymapPath()
      config = {}
      console.log "updating keys"
      db.forEach ({key, modify}) ->
        console.log "updating #{key}"
        config = modify(config, key)
      cs = CSON.stringify config
      editorPromise = atom.workspace.open 'ide-haskell-keymap.cson'
      editorPromise.then (editor) ->
        editor.setText """# This is ide-haskell system message
        # Please add the following to your keymap
        # in order to preserve existing keybindings.
        # WARNING: This message will NOT be shown again!
        #{cs}
        """

  activate: (state) ->
    @cleanConfig()

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
    @buildBackendHelperDisp?.dispose()

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

  consumeBuildBackend: (service) ->
    backendMenu = new CompositeDisposable
    @buildBackendHelperDisp = @buildBackendHelper.consume service,
      success: =>
        @pluginManager?.setBuildBackend @buildBackend

        backendMenu.add atom.commands.add 'atom-workspace',
          'ide-haskell:build': =>
            @pluginManager.buildProject()
          'ide-haskell:clean': =>
            @pluginManager.cleanProject()

        backendMenu.add atom.menu.add [
          label: MainMenuLabel
          submenu : [
            {label: 'Build Project', command: 'ide-haskell:build'}
            {label: 'Clean Project', command: 'ide-haskell:clean'}
          ]
        ]

        if @buildBackend.getTargets?
          backendMenu.add atom.commands.add 'atom-workspace',
            'ide-haskell:set-build-target': =>
              @pluginManager.setTarget()
          backendMenu.add atom.menu.add [
            label: MainMenuLabel
            submenu : [
              {label: 'Set Build Target', command: 'ide-haskell:set-build-target'}
            ]
          ]

        if @buildBackend.getMenu?
          backendMenu.add atom.menu.add [
            label: MainMenuLabel
            submenu : [ @buildBackend.getMenu() ]
          ]
      dispose: =>
        backendMenu.dispose()
        @pluginManager?.setBuildBackend null

  provideUpi: ->
    new UPI(@pluginManager)
