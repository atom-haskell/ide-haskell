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

    @disposables.add @onResultsUpdated ({types}) => @updateEditorsWithResults(types)

    @createOutputViewPanel(state)
    @subscribeEditorController()

    @changeParamFs = {}
    @configParams = state.configParams ? {}

    @disposables.add atom.config.observe 'ide-haskell.hideParameterValues', (value) =>
      @outputView.setHideParameterValues(value)

  deactivate: ->
    @checkResults.destroy()
    @disposables.dispose()
    @backend?.shutdownBackend?()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()
    configParams: @configParams

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
    OutputPanel = require './output-panel/output-panel'
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
    @outputView?.showNextError()

  prevError: ->
    @outputView?.showPrevError()

  addConfigParam: (pluginName, specs) ->
    {CompositeDisposable} = require 'atom'
    disp = new CompositeDisposable
    @changeParamFs[pluginName] ?= {}
    @configParams[pluginName] ?= {}
    for name, spec of specs
      do (name, spec) =>
        @configParams[pluginName][name] ?= spec.default
        elem = document.createElement "ide-haskell-param"
        elem.classList.add "ide-haskell--#{pluginName}", "ide-haskell-param--#{name}"
        if atom.config.get('ide-haskell.hideParameterValues')
          elem.classList.add 'hidden-value'
        elem.appendChild elemVal = document.createElement "ide-haskell-param-value"
        spec.displayName ?= name.charAt(0).toUpperCase() + name.slice(1)
        show = =>
          elem.setAttribute('data-display-name', spec.displayName)
          elemVal.setAttribute('data-display-name', spec.displayName)
          elemVal.innerText = spec.displayTemplate(@configParams[pluginName][name])
          spec.onChanged?(@configParams[pluginName][name])
        show()
        @changeParamFs[pluginName][name] = change = (resolve, reject) =>
          ParamSelectView = require './output-panel/views/param-select-view'
          new ParamSelectView
            items: if typeof spec.items is 'function' then spec.items() else spec.items
            heading: spec.description
            itemTemplate: spec.itemTemplate
            itemFilterName: spec.itemFilterName
            onConfirmed: (value) =>
              @configParams[pluginName][name] = value
              show()
              resolve?(value)
            onCancelled: ->
              reject?()
        disp.add @outputView.addPanelControl elem,
          events:
            click: -> change()
          before: '#progressBar'
    return disp

  getConfigParam: (pluginName, name) ->
    unless atom.packages.isPackageActive(pluginName)
      return Promise.reject(
        mkError('PackageInactiveError',
          "Ide-haskell cannot get parameter #{pluginName}:#{name}
           of inactive package #{pluginName}"))
    if @configParams[pluginName]?[name]?
      return Promise.resolve(@configParams[pluginName][name])
    else if @changeParamFs[pluginName]?[name]?
      new Promise (resolve, reject) =>
        @changeParamFs[pluginName][name](resolve, reject)
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
    if value?
      @configParams[pluginName] ?= {}
      @configParams[pluginName][name] = value
      Promise.resolve(value)
    else if @changeParamFs[pluginName]?[name]?
      new Promise (resolve, reject) =>
        @changeParamFs[pluginName][name](resolve, reject)
    else
      return Promise.reject(
        mkError('ParamUndefinedError',
          "Ide-haskell cannot set parameter #{pluginName}:#{name}
           before it is defined"))
