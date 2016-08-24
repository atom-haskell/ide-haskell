{CompositeDisposable, Point} = require 'atom'
{MainMenuLabel, getEventType} = require './utils'

module.exports =
class UPI
  constructor: (@pluginManager) ->

  ###
  Call this function in consumer to get actual interface

  disposables: CompositeDisposable, one you will return in consumer
  name: Plugin package name
  ###
  registerPlugin: (disposables, name) ->
    new UPIInstance(@pluginManager, disposables, name)

class UPIInstance
  constructor: (@pluginManager, disposables, @pluginName) ->
    disposables.add @disposables = new CompositeDisposable

  ###
  Adds new sumbenu to 'Haskell IDE' menu item
  name -- submenu label, should be descriptive of a package
  menu -- Atom menu object

  Returns Disposable.
  ###
  setMenu: (name, menu) ->
    @disposables.add menuDisp = atom.menu.add [
      label: MainMenuLabel
      submenu: [ label: name, submenu: menu ]
    ]
    menuDisp

  ###
  Sets backend status
  status -- object
    status: one of 'progress', 'ready', 'error', 'warning'
    progress: float between 0 and 1, only relevant when status is 'progress'
              if 0 or undefined, progress bar is not shown
  ###
  setStatus: (status) ->
    @pluginManager.outputView.backendStatus status

  ###
  Add messages to ide-haskell output
  messages: Array of Object
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String or {<text | html>, highlighter?}, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  ###
  addMessages: (messages, types) ->
    messages = messages.map (m) ->
      m.position = Point.fromObject m.position if m.position?
      m
    @pluginManager.checkResults.appendResults messages, types

  ###
  Set messages in ide-haskell output. Clears all existing messages with
  `severity` in `types`
  messages: Array of Object
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  ###
  setMessages: (messages, types) ->
    messages = messages.map (m) ->
      m.position = Point.fromObject m.position if m.position?
      m
    @pluginManager.checkResults.setResults messages, types

  ###
  Clear all existing messages with `severity` in `types`
  This is shorthand from `setMessages([],types)`
  ###
  clearMessages: (types) ->
    @pluginManager.checkResults.setResults [], types

  ###
  Set possible message `severity` that your package will use.
  types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
    uriFilter: Bool, should uri filter apply to tab?
    autoScroll: Bool, should tab auto-scroll?

  This allows to define custom output panel tabs.
  ###
  setMessageTypes: (types) ->
    for type, opts of types
      @pluginManager.outputView.createTab type, opts

  ###
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

  callback: callback(editor, crange, type)
    editor: TextEditor, editor that generated event
    crange: Range, cursor range that generated event.
    type: One of 'mouse', 'selection' -- type of event that triggered this

    Returns {range, text} or Promise.
      range: Range, tooltip highlighting range
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip

  returns Disposable
  ###
  onShouldShowTooltip: (callback) ->
    @disposables.add disp = @pluginManager.onShouldShowTooltip ({editor, pos, eventType}) =>
      @showTooltip
        editor: editor
        pos: pos
        eventType: eventType
        tooltip: (crange) ->
          res = callback editor, crange, eventType
          if res?
            Promise.resolve res
          else
            Promise.reject ignore: true
    disp

  ###
  Show tooltip in editor.

  editor: editor that will show tooltip
  pos: tooltip position
  eventType: one of 'context', 'keyboard' and 'mouse'
  detail: for automatic selection between 'context' and 'keyboard'.
          Ignored if 'eventType' is set.
  tooltip: function(crange)
    crange: Range, currently selected range in editor (possibly empty)

    Returns {range, text} or Promise
      range: Range, tooltip highlighting range
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip
  ###
  showTooltip: ({editor, pos, eventType, detail, tooltip}) ->
    controller = @pluginManager.controller(editor)
    @withEventRange {controller, pos, detail, eventType}, ({crange, pos, eventType}) =>
      tooltip(crange).then ({range, text}) ->
        controller.showTooltip pos, range, text, {eventType, subtype: 'external'}
      .catch (status = {status: 'warning'}) =>
        if status instanceof Error
          console.warn status
          status = status: 'warning'
        unless status.ignore
          controller.hideTooltip {eventType}
          @setStatus status

  ###
  Convenience function. Will fire before Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  ###
  onWillSaveBuffer: (callback) ->
    @disposables.add disp = @pluginManager.onWillSaveBuffer callback
    disp

  ###
  Convenience function. Will fire after Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  ###
  onDidSaveBuffer: (callback) ->
    @disposables.add disp = @pluginManager.onDidSaveBuffer callback
    disp

  onDidStopChanging: (callback) ->
    @disposables.add disp = @pluginManager.onDidStopChanging callback
    disp

  ###
  Add a new control to ouptut panel heading.

  element: HTMLElement of control, or String with tag name
  opts: various options
    id: String, id
    events: Object, event callbacks, key is event name, e.g. "click",
            value is callback
    classes: Array of String, classes
    style: Object, css style, keys are style attributes, values are values
    attrs: Object, other attributes, keys are attribute names, values are values
    before: String, CSS selector of element, that this one should be inserted
            before, e.g. '#progressBar'

  Returns Disposable.
  ###
  addPanelControl: (element, opts) ->
    @pluginManager.outputView.addPanelControl element, opts

  ###
  addConfigParam
    param_name:
      onChanged: callback void(value)
      items: Array or callback Array(void)
      itemTemplate: callback, String(item), html template
      itemFilterKey: String, item filter key
      description: String [optional]
      displayName: String [optional, capitalized param_name default]
      displayTemplate: callback, String(item), string template
      default: item, default value

  Returns
    disp: Disposable
    change: object of change functions, keys being param_name
  ###
  addConfigParam: (spec) ->
    @pluginManager.addConfigParam @pluginName, spec

  ###
  getConfigParam(paramName) or getConfigParam(pluginName, paramName)

  returns a Promise that resolves to parameter
  value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  ###
  getConfigParam: (pluginName, name) ->
    unless name?
      name = pluginName
      pluginName = @pluginName
    @pluginManager.getConfigParam(pluginName, name)

  ###
  setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

  value is optional. If omitted, a selection dialog will be presented to user.

  returns a Promise that resolves to parameter value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  ###
  setConfigParam: (pluginName, name, value) ->
    unless value?
      value = name
      name = pluginName
      pluginName = @pluginName
    @pluginManager.setConfigParam(pluginName, name, value)

  ###
  Utility function to extract event range/type for a given event

  editor: TextEditor, editor that generated event
  detail: event detail, ignored if eventType is set
  eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  pos: Point, or Point-like Object, event position, can be undefined
  controller: leave undefined, this is internal field

  callback: callback({pos, crange}, eventType)
    pos: Point, event position
    crange: Range, event range
    eventType: String, event type, one of 'keyboard', 'context', 'mouse'
  ###
  withEventRange: ({editor, detail, eventType, pos, controller}, callback) ->
    pos = Point.fromObject pos if pos?
    eventType ?= getEventType detail
    controller ?= @pluginManager.controller(editor)
    return unless controller?

    callback (controller.getEventRange pos, eventType)
