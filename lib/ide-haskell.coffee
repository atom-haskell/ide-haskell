{PluginManager} = require './plugin-manager'
{TooltipMessage,TooltipElement} = require './tooltip-view'
{getCabalProjectDir} = require './utils'
{CompositeDisposable} = require 'atom'


module.exports = IdeHaskell =
  pluginManager: null
  disposables: null
  menu: null
  project:
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
    prettifyOnFileSave:
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
    hotkeyToggleOutput:
      # 'ide-haskell:toggle-output': =>
      type: "string"
      default: ''
      description: 'Hotkey to toggle output'
    hotkeyShutdownBackend:
      # 'ide-haskell:shutdown-backend': =>
      type: "string"
      default: ''
    hotkeyCheckFile:
      # 'ide-haskell:check-file': ({target}) =>
      type: "string"
      default: ''
    hotkeyLintFile:
      # 'ide-haskell:lint-file': ({target}) =>
      type: "string"
      default: ''
    hotkeyPrettifyFile:
      # 'ide-haskell:prettify-file': ({target}) =>
      type: "string"
      default: ''
    hotkeyShowType:
      # 'ide-haskell:show-type': ({target}) =>
      type: "string"
      default: ''
    hotkeyShowInfo:
      # 'ide-haskell:show-info': ({target}) =>
      type: "string"
      default: ''
    hotkeyInsertType:
      # 'ide-haskell:insert-type': ({target}) =>
      type: "string"
      default: ''
    hotkeyCloseTooltip:
      type: "string"
      default: 'escape'

  hotkeys: {}

  watchKB: (option, source, command) ->
    @disposables.add atom.config.observe "ide-haskell.#{option}", (value) =>
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
    for o,c of kbs
      @watchKB o,source,c

  setHotkeys: ->
    @setKB 'atom-workspace',
      hotkeyToggleOutput: 'ide-haskell:toggle-output'
      hotkeyShutdownBackend: 'ide-haskell:shutdown-backend'
    @setKB 'atom-text-editor[data-grammar~="haskell"]',
      hotkeyCheckFile: 'ide-haskell:check-file'
      hotkeyLintFile: 'ide-haskell:lint-file'
      hotkeyPrettifyFile: 'ide-haskell:prettify-file'
      hotkeyShowType: 'ide-haskell:show-type'
      hotkeyShowInfo: 'ide-haskell:show-info'
      hotkeyInsertType: 'ide-haskell:insert-type'
      hotkeyCloseTooltip: 'ide-haskell:close-tooltip'

  unsetHotkeys: ->
    d.dispose() for o,d of @hotkeys

  isActive: ->
    !!@pluginManager

  activate: (state) ->
    @disposables = new CompositeDisposable

    @disposables.add atom.views.addViewProvider TooltipMessage, (message) ->
      (new TooltipElement).setMessage message

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
          bn = atom.config.get('ide-haskell.useBackend')
          if !bn
            message = "
              Ide-haskell:
              Ide-haskell requires a package providing haskell-ide-backend
              service.
              Consider installing haskell-ghc-mod or other package, which
              provides haskell-ide-backend.
              You can disable this message in ide-haskell settings.
              "
          else
            p=atom.packages.getActivePackage(bn)
            if p?
              message = "
                Ide-haskell:
                You have selected #{bn} as your backend provider, but it
                does not provide haskell-ide-backend service. You may need to
                update #{bn}.
                You can disable this message in ide-haskell settings.
                "
            else
              message = "
                Ide-haskell:
                You have selected #{bn} as your backend provider, but it
                failed to activate.
                Check your spelling and if #{bn} is installed and activated.
                You can disable this message in ide-haskell settings.
                "
          atom.notifications.addWarning message, dismissable: true
          console.log message
        ), 5000

    @backend = null
    @initIdeHaskell(state)
    @setHotkeys()

    # if we did not activate (no cabal project),
    # set up an event to activate when a haskell file is opened
    @disposables.add atom.workspace.onDidOpen (event) =>
      if not @isActive()
        item = event.item
        if item && item.getGrammar &&
           item.getGrammar().scopeName == "source.haskell"
          @initIdeHaskell(state)

  initIdeHaskell: (state) ->
    return if @isActive()

    @project.root = getCabalProjectDir()
    @project.isCabalProject = (@project.root != null)

    return unless @project.isCabalProject

    @pluginManager = new PluginManager state, @backend
    @updateMenu()

    # global commands
    @disposables.add atom.commands.add 'atom-workspace',
      'ide-haskell:toggle-output': =>
        @pluginManager.togglePanel()
      'ide-haskell:shutdown-backend': =>
        @backend.shutdownBackend()

    @disposables.add \
      atom.commands.add 'atom-text-editor[data-grammar~="haskell"]',
        'ide-haskell:check-file': ({target}) =>
          @pluginManager.checkFile target.getModel()
        'ide-haskell:lint-file': ({target}) =>
          @pluginManager.lintFile target.getModel()
        'ide-haskell:prettify-file': ({target}) =>
          @pluginManager.prettifyFile target.getModel()
        'ide-haskell:show-type': ({target}) =>
          @pluginManager.controller(target.getModel()).showExpressionType()
        'ide-haskell:show-info': ({target}) =>
          @pluginManager.controller(target.getModel()).showExpressionType null,
            'getInfo'
        'ide-haskell:insert-type': ({target}) =>
          @pluginManager.controller(target.getModel()).insertType()
        'ide-haskell:close-tooltip': ({target}) =>
          @pluginManager.controller(target.getModel()).closeTooltips()

    @updateMenu()

  deactivate: ->
    return unless @isActive()

    @unsetHotkeys()

    @pluginManager.deactivate()
    @pluginManager = null

    # clear commands
    @disposables.dispose()
    @disposables = null

    @clearMenu()

  serialize: ->
    return unless @project.isCabalProject
    @pluginManager.serialize()

  updateMenu: ->
    return if @menu?
    return unless @project.isCabalProject

    @menu = new CompositeDisposable
    @menu.add atom.menu.add [
      label: 'Haskell IDE'
      submenu : [
        {label: 'Check', command: 'ide-haskell:check-file'},
        {label: 'Linter', command: 'ide-haskell:lint-file'},
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
        ]
      ]

  clearMenu: ->
    @menu.dispose()
    @menu=null
    atom.menu.update()

  consumeBackend_0_1_0: (service) ->
    bn = atom.config.get('ide-haskell.useBackend')
    return if !!bn and service.name()!=bn
    if @backend?
      atom.notifications.addInfo "ide-haskell is already using
        backend #{@backend?.name?()}, and new backend #{service?.name?()}
        appeared. You can select one in ide-haskell settings.
        Will keep using #{@backend?.name?()} for now.", dismissable: true
      return
    return if @backend?
    service.onDidDestroy =>
      @backend = null
      @pluginManager?.setBackend @backend
    @backend = service
    @pluginManager?.setBackend service
