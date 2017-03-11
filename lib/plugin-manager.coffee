mkError = (name, message) ->
  e = new Error(message)
  e.name = name
  return e

module.exports =
class PluginManager
  constructor: (state) ->
    ResultsDB = require './results-db'
    @checkResults = new ResultsDB

    {CompositeDisposable, Emitter} = require 'atom'
    @disposables = new CompositeDisposable
    @controllers = new WeakMap
    @disposables.add @emitter = new Emitter

    if atom.config.get('ide-haskell.messageDisplayFrontend') is 'builtin'
      @disposables.add @onResultsUpdated ({types}) => @updateEditorsWithResults(types)

    @createOutputViewPanel(state)
    @subscribeEditorController()

    @configParamsState = state.configParams ? {}
    @configParams = {}

    @disposables.add atom.config.observe 'ide-haskell.hideParameterValues', (value) =>
      @outputView.setHideParameterValues(value)

  deactivate: ->
    @checkResults.destroy()
    @disposables.dispose()
    @backend?.shutdownBackend?()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    cp = {}
    for pluginName, vars of @configParams
      cp[pluginName] = {}
      for name, obj of vars
        cp[pluginName][name] = obj.value
    outputView: @outputView?.serialize()
    configParams: cp


  onShouldShowTooltip: (callback) ->
    @emitter.on 'should-show-tooltip', callback

  onWillSaveBuffer: (callback) ->
    @emitter.on 'will-save-buffer', callback

  onDidSaveBuffer: (callback) ->
    @emitter.on 'did-save-buffer', callback

  onDidStopChanging: (callback) ->
    @emitter.on 'did-stop-changing', callback

  togglePanel: ->
    @outputView?.toggle()

  updateEditorsWithResults: (types) ->
    for ed in atom.workspace.getTextEditors()
      @controller(ed)?.updateResults?(@checkResults.filter uri: ed.getPath(), types)

  onResultsUpdated: (callback) =>
    @checkResults.onDidUpdate callback

  controller: (editor) ->
    @controllers?.get? editor

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    {OutputPanel} = require './output-panel/output-panel'
    @outputView = new OutputPanel(state.outputView, @checkResults)

  deleteOutputViewPanel: ->
    @outputView.destroy()
    @outputView = null

  addController: (editor) ->
    unless @controllers.get(editor)?
      EditorControl = require './editor-control'
      @controllers.set editor, controller = new EditorControl(editor)
      controller.disposables.add editor.onDidDestroy =>
        @removeController editor
      controller.disposables.add controller.onShouldShowTooltip ({editor, pos, eventType}) =>
        @emitter.emit 'should-show-tooltip', {editor, pos, eventType}
      controller.disposables.add controller.onWillSaveBuffer (buffer) =>
        @emitter.emit 'will-save-buffer', buffer
      controller.disposables.add controller.onDidSaveBuffer (buffer) =>
        @emitter.emit 'did-save-buffer', buffer
      controller.disposables.add controller.onDidStopChanging (editor) =>
        @emitter.emit 'did-stop-changing', editor.getBuffer()
      controller.updateResults @checkResults.filter uri: editor.getPath()

  setLinter: (linter) ->
    return unless atom.config.get('ide-haskell.messageDisplayFrontend') is 'linter'
    @disposables.add @onResultsUpdated ({types}) =>
      linter.deleteMessages()
      MessageObject = require './message-object'
      {Range} = require 'atom'
      linter.setMessages(
        for result in @checkResults.resultsWithURI()
          type: if result.severity is 'lint' then 'info' else result.severity
          html: MessageObject.fromObject(result.message).toHtml()
          filePath: result.uri
          range: new Range(result.position, result.position.translate([0, 1]))
      )

  removeController: (editor) ->
    @controllers.get(editor)?.deactivate()
    @controllers.delete(editor)

  controllerOnGrammar: (editor, grammar) ->
    if grammar.scopeName.match /haskell$/
      @addController editor
    else
      @removeController editor

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      @disposables.add editor.onDidChangeGrammar (grammar) =>
        @controllerOnGrammar editor, grammar
      @controllerOnGrammar editor, editor.getGrammar()

  deleteEditorControllers: ->
    for editor in atom.workspace.getTextEditors()
      @removeController editor

  nextError: ->
    return unless atom.config.get('ide-haskell.messageDisplayFrontend') is 'builtin'
    @outputView?.showNextError()

  prevError: ->
    return unless atom.config.get('ide-haskell.messageDisplayFrontend') is 'builtin'
    @outputView?.showPrevError()

  addConfigParam: (pluginName, specs) ->
    {CompositeDisposable} = require 'atom'
    disp = new CompositeDisposable
    @configParams[pluginName] ?= {}
    {ParamControl} = require './views/paramControl'
    for name, spec of specs
      do (name, spec) =>
        @outputView.addPanelControl ParamControl, {
          pluginName, name, spec,
          value: @configParamsState[pluginName]?[name]
        }
        .then (res) =>
          @configParams[pluginName][name] = res
          disp.add res.disposables
    ###
    TODO: Fix this horribleness.
    There is a chance that disp will be disposed before promises above
    resolve. That will be an error.
    Also, leaking scope like crazy. Maybe there's a way to keep incapsulation.
    ###
    return disp

  getConfigParam: (pluginName, name) ->
    unless atom.packages.isPackageActive(pluginName)
      return Promise.reject(
        mkError('PackageInactiveError',
          "Ide-haskell cannot get parameter #{pluginName}:#{name}
           of inactive package #{pluginName}"))
    if @configParams[pluginName]?[name]?.value?
      return Promise.resolve(@configParams[pluginName][name].value)
    else if @configParams[pluginName]?[name]?.setValue?
      new Promise (resolve, reject) =>
        @configParams[pluginName][name].setValue(null, resolve, reject)
    else
      return Promise.reject(
        mkError('ParamUndefinedError',
          "Ide-haskell cannot get parameter #{pluginName}:#{name}
           before it is defined"))

  setConfigParam: (pluginName, name, value) ->
    unless atom.packages.isPackageActive(pluginName)
      return Promise.reject(
        mkError('PackageInactiveError',
          "Ide-haskell cannot set parameter #{pluginName}:#{name}
           of inactive package #{pluginName}"))
    if value? and @configParams[pluginName]?[name]?
      @configParams[pluginName][name].value = value
      Promise.resolve(value)
    else if @configParams[pluginName]?[name]?
      new Promise (resolve, reject) =>
        @configParams[pluginName][name].setValue(null, resolve, reject)
    else
      return Promise.reject(
        mkError('ParamUndefinedError',
          "Ide-haskell cannot set parameter #{pluginName}:#{name}
           before it is defined"))
