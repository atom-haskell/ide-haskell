{PluginManager} = require './plugin-manager'
{TooltipMessage, TooltipElement} = require './tooltip-view'
{getCabalProjectDir} = require './utils'
{CompositeDisposable} = require 'atom'
BackendHelper = require 'atom-backend-helper'


module.exports = IdeHaskell =
  pluginManager: null
  disposables: null
  menu: null
  backendHelperDisp: null

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
      enum: ['Nothing', 'Type', 'Info']
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
    useLinter:
      type: 'boolean'
      default: false
      description: 'Use Atom Linter service for check and lint
                    (requires restart)'

    hotkeyToggleOutput:
      type: "string"
      default: ''
      description: 'Hotkey to toggle output'
    hotkeyShutdownBackend:
      type: "string"
      default: ''
    hotkeyCheckFile:
      type: "string"
      default: ''
    hotkeyLintFile:
      type: "string"
      default: ''
    hotkeyPrettifyFile:
      type: "string"
      default: ''
    hotkeyShowType:
      type: "string"
      default: ''
    hotkeyShowInfo:
      type: "string"
      default: ''
    hotkeyInsertType:
      type: "string"
      default: ''
    hotkeyInsertImport:
      type: "string"
      default: ''
    hotkeyCloseTooltip:
      type: "string"
      default: 'escape'
    hotkeyNextError:
      type: "string"
      default: ''
    hotkeyPrevError:
      type: "string"
      default: ''

  hotkeys: {}

  watchKB: (option, source, command) ->
    @disposables.add atom.config.observe "ide-haskell.hotkey#{option}",
      (value) =>
        @hotkeys[option]?.dispose()
        if !value
          atom.menu.update()
          return
        kb = {}
        kb[value] = command
        kbb = {}
        kbb[source] = kb
        @hotkeys[option] = atom.keymaps.add 'ide-haskell.hotkeys', kbb
        atom.menu.update()

  setKB: (source, kbs) ->
    for o, c of kbs
      @watchKB o, source, c

  setHotkeys: ->
    @setKB 'atom-workspace',
      ToggleOutput: 'ide-haskell:toggle-output'
      ShutdownBackend: 'ide-haskell:shutdown-backend'
    @setKB 'atom-text-editor[data-grammar~="haskell"]',
      CheckFile: 'ide-haskell:check-file'
      LintFile: 'ide-haskell:lint-file'
      PrettifyFile: 'ide-haskell:prettify-file'
      ShowType: 'ide-haskell:show-type'
      ShowInfo: 'ide-haskell:show-info'
      InsertType: 'ide-haskell:insert-type'
      InsertImport: 'ide-haskell:insert-import'
      CloseTooltip: 'ide-haskell:close-tooltip'
      PrevError: 'ide-haskell:prev-error'
      NextError: 'ide-haskell:next-error'

  unsetHotkeys: ->
    d.dispose() for o, d of @hotkeys

  activate: (state) ->
    @disposables = new CompositeDisposable

    @disposables.add atom.views.addViewProvider TooltipMessage, (message) ->
      (new TooltipElement).setMessage message

    @backend = null

    @backendHelper = new BackendHelper 'ide-haskell',
      main: IdeHaskell
      backendInfo: 'startupMessageIdeBackend'
      backendName: 'haskell-ide-backend'

    @backendHelper.init()

    @pluginManager = new PluginManager state, @backend
    @updateMenu()

    # global commands
    @disposables.add atom.commands.add 'atom-workspace',
      'ide-haskell:toggle-output': =>
        @pluginManager.togglePanel()
      'ide-haskell:shutdown-backend': =>
        @backend?.shutdownBackend?()

    getEventType = (detail) ->
      if detail?.contextCommand?
        'context'
      else
        'keyboard'

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="haskell"]',
        'ide-haskell:check-file': ({target}) =>
          @pluginManager.checkFile target.getModel()
        'ide-haskell:lint-file': ({target}) =>
          @pluginManager.lintFile target.getModel()
        'ide-haskell:prettify-file': ({target}) =>
          @pluginManager.prettifyFile target.getModel()
        'ide-haskell:show-type': ({target, detail}) =>
          @pluginManager.controller(target.getModel()).showExpressionType null,
            getEventType(detail), 'getType'
        'ide-haskell:show-info': ({target, detail}) =>
          @pluginManager.controller(target.getModel()).showExpressionType null,
            getEventType(detail), 'getInfo'
        'ide-haskell:insert-type': ({target, detail}) =>
          @pluginManager.controller(target.getModel())
            .insertType getEventType(detail)
        'ide-haskell:insert-import': ({target, detail}) =>
          @pluginManager.controller(target.getModel())
            .insertImport getEventType(detail)
        'ide-haskell:close-tooltip': ({target, abortKeyBinding}) =>
          if @pluginManager.controller(target.getModel()).hasTooltips()
            @pluginManager.controller(target.getModel()).closeTooltips()
          else
            abortKeyBinding?()
        'ide-haskell:next-error': ({target}) =>
          @pluginManager.nextError()
        'ide-haskell:prev-error': ({target}) =>
          @pluginManager.prevError()

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="cabal"]',
        'ide-haskell:prettify-file': ({target}) =>
          @pluginManager.prettifyFile target.getModel(), 'cabal'

    @updateMenu()

    @setHotkeys()

  deactivate: ->
    return unless @isActive()

    @unsetHotkeys()

    @backendHelperDisp?.dispose()

    @pluginManager.deactivate()
    @pluginManager = null

    # clear commands
    @disposables.dispose()
    @disposables = null

    @backendHelper = null

    @clearMenu()

  serialize: ->
    @pluginManager?.serialize()

  updateMenu: ->
    return if @menu?

    @menu = new CompositeDisposable
    @menu.add atom.menu.add [
      label: 'Haskell IDE'
      submenu : [
        {label: 'Check', command: 'ide-haskell:check-file'},
        {label: 'Lint', command: 'ide-haskell:lint-file'},
        {label: 'Prettify', command: 'ide-haskell:prettify-file'},
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'},
        {label: 'Stop Backend', command: 'ide-haskell:shutdown-backend'}
      ]
    ]

    @menu.add atom.contextMenu.add
      'atom-text-editor[data-grammar~="haskell"]': [
        'label': 'Haskell IDE'
        'submenu': [
            'label': 'Show Type'
            'command': 'ide-haskell:show-type'
          ,
            'label': 'Show Info'
            'command': 'ide-haskell:show-info'
          ,
            'label': 'Insert Type'
            'command': 'ide-haskell:insert-type'
          ,
            'label': 'Insert Import'
            'command': 'ide-haskell:insert-import'
        ]
      ]

  clearMenu: ->
    @menu.dispose()
    @menu = null
    atom.menu.update()

  consumeBackend: (service) ->
    @backendHelperDisp = @backendHelper.consume service,
      success: =>
        @pluginManager?.setBackend @backend
      dispose: =>
        @pluginManager?.setBackend null
