{CompositeDisposable} = require 'atom'
{MainMenuLabel} = require './utils'

module.exports =
class UPI
  constructor: (@pluginManager) ->
    @disposables = new CompositeDisposable

  setMenu: (name, menu) ->
    @disposables.add menuDisp = atom.menu.add [
      label: MainMenuLabel
      submenu: [ label: name, submenu: menu ]
    ]
    menuDisp

  setStatus: (status) ->
    @pluginManager.outputView.backendStatus status

  addMessages: (messages) ->
    @pluginManager.checkResults.appendResults messages

  setMessages: (messages, types) ->
    @pluginManager.checkResults.setResults messages, types

  clearMessages: (types) ->
    @pluginManager.checkResults.setResults [], types

  setMessageTypes: (types) ->
    for type, opts of types
      @pluginManager.outputView.createTab type, opts

  onShouldShowTooltip: (callback) ->
    @disposables.add disp = @pluginManager.onShouldShowTooltip ({editor, pos, eventType}) =>
      @showTooltip
        editor: editor
        pos: pos
        eventType: eventType
        tooltip: (crange) -> callback editor, crange
    disp

  showTooltip: ({editor, pos, eventType, detail, tooltip}) ->
    eventType ?= getEventType detail
    controller = @pluginManager.controller(editor)
    return unless controller?
    {crange, pos} = controller.getEventRange pos, eventType

    tooltip(crange).then ({range, text}) ->
      controller.showTooltip pos, range, text, eventType
    .catch (status = {status: 'warning'}) =>
      controller.hideTooltip eventType
      @setStatus status

  onWillSaveBuffer: ->

  onDidSaveBuffer: ->

  addPanelControl: (element, opts) ->
    @pluginManager.outputView.addPanelControl element, opts
