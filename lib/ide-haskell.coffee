{PluginManager} = require './plugin-manager'
{getEventType} = require './utils'
{CompositeDisposable} = require 'atom'
BackendHelper = require 'atom-backend-helper'


module.exports = IdeHaskell =
  pluginManager: null
  disposables: null
  menu: null
  backendHelperDisp: null
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

  activate: (state) ->
    @disposables = new CompositeDisposable

    @backend = null
    @buildBackend = null

    @backendHelper = new BackendHelper 'ide-haskell',
      main: IdeHaskell
      backendInfo: 'startupMessageIdeBackend'
      backendName: 'haskell-ide-backend'
      backendVar: 'backend'

    @buildBackendHelper = new BackendHelper 'ide-haskell',
      main: IdeHaskell
      backendInfo: 'startupMessageIdeBackend'
      backendName: 'haskell-build-backend'
      backendVar: 'buildBackend'
      useBackend: 'useBuildBackend'

    @backendHelper.init()
    @buildBackendHelper.init()

    @pluginManager = new PluginManager state, @backend

    # global commands
    @disposables.add atom.commands.add 'atom-workspace',
      'ide-haskell:toggle-output': =>
        @pluginManager.togglePanel()
      'ide-haskell:shutdown-backend': =>
        @backend?.shutdownBackend?()
      'ide-haskell:build': =>
        @pluginManager.buildProject()
      'ide-haskell:clean': =>
        @pluginManager.cleanProject()

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="haskell"]',
        'ide-haskell:check-file': ({target}) =>
          @pluginManager.checkFile target.getModel()
        'ide-haskell:lint-file': ({target}) =>
          @pluginManager.lintFile target.getModel()
        'ide-haskell:prettify-file': ({target}) =>
          @pluginManager.prettifyFile target.getModel()
        'ide-haskell:show-type': ({target, detail}) =>
          @pluginManager.showTypeTooltip target.getModel(), null, getEventType(detail)
        'ide-haskell:show-info': ({target, detail}) =>
          @pluginManager.showInfoTooltip target.getModel(), null, getEventType(detail)
        'ide-haskell:insert-type': ({target, detail}) =>
          @pluginManager.insertType target.getModel(), getEventType(detail)
        'ide-haskell:insert-import': ({target, detail}) =>
          @pluginManager.insertImport target.getModel(), getEventType(detail)
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
        'ide-haskell:prettify-file': ({target}) =>
          @pluginManager.prettifyFile target.getModel(), 'cabal'

    @menu = new CompositeDisposable
    @menu.add atom.menu.add [
      label: 'Haskell IDE'
      submenu : [
        {label: 'Prettify', command: 'ide-haskell:prettify-file'}
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
      ]
    ]

  deactivate: ->
    @backendHelperDisp?.dispose()
    @buildBackendHelperDisp?.dispose()

    @pluginManager.deactivate()
    @pluginManager = null

    # clear commands
    @disposables.dispose()
    @disposables = null

    @backendHelper = null

    @clearMenu()

  serialize: ->
    @pluginManager?.serialize()

  clearMenu: ->
    @menu.dispose()
    @menu = null
    atom.menu.update()

  consumeBackend: (service) ->
    @backendHelperDisp = @backendHelper.consume service,
      success: =>
        @pluginManager?.setBackend @backend
        @menu.add atom.menu.add [
          label: 'Haskell IDE'
          submenu : [
            {label: 'Check', command: 'ide-haskell:check-file'}
            {label: 'Lint', command: 'ide-haskell:lint-file'}
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
      dispose: =>
        @pluginManager?.setBackend null

  consumeBuildBackend: (service) ->
    @buildBackendHelperDisp = @buildBackendHelper.consume service,
      success: =>
        @pluginManager?.setBuildBackend @backend
      dispose: =>
        @pluginManager?.setBuildBackend null
