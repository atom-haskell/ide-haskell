OutputPanel = require './output-panel/output-panel'
OutputPanelElement = require './output-panel/views/output-panel'
{EditorControl} = require './editor-control'
{TooltipMessage, TooltipElement} = require './views/tooltip-view'
ResultsDB = require './results-db'
ResultItem = require './result-item'
OutputPanelItemElement = require './output-panel/views/output-panel-item'
{CompositeDisposable, Emitter} = require 'atom'
{dirname} = require 'path'
{statSync} = require 'fs'

class PluginManager
  constructor: (state) ->
    @buildTarget = state.buildTarget
    @checkResults = new ResultsDB

    @disposables = new CompositeDisposable
    @controllers = new WeakMap
    @disposables.add @emitter = new Emitter

    @disposables.add atom.views.addViewProvider TooltipMessage, (message) ->
      (new TooltipElement).setMessage message
    @disposables.add atom.views.addViewProvider OutputPanel, (panel) ->
      (new OutputPanelElement).setModel panel
    @disposables.add atom.views.addViewProvider ResultItem, (resultitem) ->
      (new OutputPanelItemElement).setModel resultitem
    @disposables.add @onResultsUpdated ({types}) => @updateEditorsWithResults(types)

    @createOutputViewPanel(state)
    @subscribeEditorController()

  deactivate: ->
    @checkResults.destroy()
    @disposables.dispose()
    @backend?.shutdownBackend?()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()
    buildTarget: @buildTarget

  onShouldShowTooltip: (callback) ->
    @emitter.on 'should-show-tooltip', callback

  onWillSaveBuffer: (callback) ->
    @emitter.on 'will-save-buffer', callback

  onDidSaveBuffer: (callback) ->
    @emitter.on 'did-save-buffer', callback

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
    @outputView = new OutputPanel(state.outputView, @checkResults)

  deleteOutputViewPanel: ->
    @outputView.destroy()
    @outputView = null

  addController: (editor) ->
    unless @controllers.get(editor)?
      @controllers.set editor, controller = new EditorControl(editor)
      @disposables.add editor.onDidDestroy =>
        @removeController editor
      @disposables.add controller.onShouldShowTooltip ({editor, pos}) =>
        @emitter.emit 'should-show-tooltip', {editor, pos, eventType: 'mouse'}
      @disposables.add controller.onWillSaveBuffer (buffer) =>
        @emitter.emit 'will-save-buffer', buffer
      @disposables.add controller.onDidSaveBuffer (buffer) =>
        @emitter.emit 'did-save-buffer', buffer
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


module.exports = {
  PluginManager
}
