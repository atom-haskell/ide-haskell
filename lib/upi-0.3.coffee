{CompositeDisposable, Point, Disposable} = require 'atom'
{MainMenuLabel, getEventType} = require './utils'

class UPIError extends Error
  constructor: (message) ->
    super(arguments...)
    Object.defineProperty this, "name",
      value: this.constructor.name
    Object.defineProperty this, "message",
      value: message
    Error.captureStackTrace(this, this.constructor)

module.exports =
class UPI
  constructor: (@pluginManager) ->
    @instances = new Map
    @disposables = new CompositeDisposable
    @disposables.add @pluginManager.onShouldShowTooltip ({editor, pos, eventType}) =>
      subs =
        [].concat(
          (
            Array.from(@instances.entries())
            .map (v) ->
              [pluginName, inst] = v
              Array.from(inst.tooltipEvents.values()).map (vs) ->
                vs.pluginName = pluginName
                return vs
          )...
        )
        .sort (a, b) -> b.priority - a.priority
      tooltipPromise = Promise.reject(status: ignore: true)
      controller = @pluginManager.controller(editor)
      for {pluginName, handler} in subs
        tooltipPromise =
          tooltipPromise.catch (rst) =>
            @withEventRange {controller, pos, eventType}, ({crange, pos, eventType}) ->
              Promise.resolve(handler editor, crange, eventType)
              .catch (status) ->
                throw {pluginName, status}
              .then (tt) ->
                if tt? and tt
                  {range, text} = tt
                  controller.showTooltip pos, range, text, {eventType, subtype: 'external'}
                else
                  throw rst
      tooltipPromise.catch (status) =>
        unless status?
          throw new UPIError('No status')
        unless status.status?
          atom.notifications.addFatalError(status.toString(), detail: status, stack: status.stack, dismissable: true)
          return
        if status.status.message?
          console.warn status
          status.status =
            status: 'warning'
            detail: status.status.message
        unless status.status.ignore
          controller.hideTooltip {eventType}
          @pluginManager.outputView.backendStatus status.pluginName, status.status

  ###
  Call this function in consumer to get actual interface

  name: Plugin package name
  consumer: callback :: UPIInstance -> ()
  returns Disposable
  ###
  consume: (options = {}) ->
    {name, menu, messageTypes, events, controls, params, consumer, tooltipEvent} = options
    unless name?
      throw new UPIError("name has to be specified for UPI")
    if @instances.has(name)
      throw new UPIError("Plugin #{name} already registered with UPI")
    instance = new UPIInstance(@pluginManager, name, @)
    @instances.set(name, instance)

    if menu?
      instance.menu.set(menu)
    if messageTypes?
      instance.messages.setTypes(messageTypes)
    if events?
      for k, v of events
        v = [v] unless Array.isArray(v)
        for i in v
          instance.events[k](i)
    if tooltipEvent?
      if tooltipEvent.handler?
        {priority, handler} = tooltipEvent
      else
        handler = tooltipEvent
      priority ?= 100
      instance.tooltips.onShouldShowTooltip(priority, handler)
    if controls?
      for i in controls
        instance.controls.add(i)
    if params?
      for i in params
        instance.params.add(i)

    consumer(instance)

    disp = new Disposable =>
      @instances.delete(name)
      instance.destroy()
    @disposables.add disp
    return disp

  dispose: ->
    @disposables.dispose()

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
  withEventRange: ({editor, detail, eventType, pos, controller}, callback) =>
    # Note: fat arrow is required since we're re-exporting this later
    pos = Point.fromObject pos if pos?
    eventType ?= getEventType detail
    controller ?= @pluginManager.controller(editor)
    return unless controller?

    callback (controller.getEventRange pos, eventType)


class UPIInstance
  constructor: (pluginManager, pluginName, {withEventRange}) ->
    @disposables = new CompositeDisposable
    @tooltipEvents = new Set
    @destroyed = false

    @menu =
      ###
      Adds new sumbenu to 'Haskell IDE' menu item
      name -- submenu label, should be descriptive of a package
      menu -- Atom menu object

      Returns Disposable.
      ###
      set: ({label, menu}) =>
        @disposables.add menuDisp = atom.menu.add [
          label: MainMenuLabel
          submenu: [ label: label, submenu: menu ]
        ]
        menuDisp

    @messages =
      ###
      Sets backend status
      status -- object
        status: one of 'progress', 'ready', 'error', 'warning'
        progress: float between 0 and 1, only relevant when status is 'progress'
                  if 0 or undefined, progress bar is not shown
      ###
      status: (status) ->
        pluginManager.outputView.backendStatus pluginName, status

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
      add: (messages, types) ->
        messages = messages.map (m) ->
          m.position = Point.fromObject m.position if m.position?
          m
        pluginManager.checkResults.appendResults messages, types

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
      set: (messages, types) ->
        messages = messages.map (m) ->
          m.position = Point.fromObject m.position if m.position?
          m
        pluginManager.checkResults.setResults messages, types

      ###
      Clear all existing messages with `severity` in `types`
      This is shorthand from `setMessages([],types)`
      ###
      clear: (types) ->
        pluginManager.checkResults.setResults [], types

      ###
      Set possible message `severity` that your package will use.
      types: Object with keys representing possible message `severity` (i.e. tab name)
             and values being Objects with keys
        uriFilter: Bool, should uri filter apply to tab?
        autoScroll: Bool, should tab auto-scroll?

      This allows to define custom output panel tabs.
      ###
      setTypes: (types) ->
        for type, opts of types
          pluginManager.outputView.createTab type, opts

    @tooltips =
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
          persistOnCursorMove: Boolean, optional, default false, persist on cursor move regardless of settings
          text: tooltip text. String or {text, highlighter} or {html}
            text: tooltip text
            highlighter: grammar scope that will be used to highlight tooltip text
            html: html to be displayed in tooltip
      ###
      show: ({editor, pos, eventType, detail, tooltip}) =>
        controller = pluginManager.controller(editor)
        withEventRange {controller, pos, detail, eventType}, ({crange, pos, eventType}) =>
          Promise.resolve(tooltip(crange)).then ({range, text, persistOnCursorMove}) ->
            controller.showTooltip pos, range, text, {eventType, subtype: 'external', persistOnCursorMove}
          .catch (status = {status: 'warning'}) =>
            if status.message?
              console.warn status
              status = status: 'warning'
            unless status.ignore
              controller.hideTooltip {eventType}
              @messages.status status

      ###
      Editor event subscription. Fires when mouse cursor stopped over a symbol in
      editor.

      priority: event priority, higher value means higher priority,
                subscription with hightest priority will be called first.
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
      onShouldShowTooltip: (priority, handler) =>
        unless handler?
          handler = priority
          priority = 100
        obj = {priority, handler}
        @tooltipEvents.add obj
        new Disposable =>
          @tooltipEvents.delete obj

    @events =
      ###
      Convenience function. Will fire before Haskell buffer is saved.

      callback: callback(buffer)
        buffer: TextBuffer, buffer that generated event

      Returns Disposable
      ###
      onWillSaveBuffer: (callback) =>
        @disposables.add disp = pluginManager.onWillSaveBuffer callback
        disp

      ###
      Convenience function. Will fire after Haskell buffer is saved.

      callback: callback(buffer)
        buffer: TextBuffer, buffer that generated event

      Returns Disposable
      ###
      onDidSaveBuffer: (callback) =>
        @disposables.add disp = pluginManager.onDidSaveBuffer callback
        disp

      onDidStopChanging: (callback) =>
        @disposables.add disp = pluginManager.onDidStopChanging callback
        disp

    @controls =
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
      add: ({element, opts}) ->
        pluginManager.outputView.addPanelControl element, opts

    @params =
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
      add: (spec) ->
        pluginManager.addConfigParam pluginName, spec

      ###
      getConfigParam(paramName) or getConfigParam(pluginName, paramName)

      returns a Promise that resolves to parameter
      value.

      Promise can be rejected with either error, or 'undefined'. Latter
      in case user cancels param selection dialog.
      ###
      get: (plugin, name) ->
        unless name?
          name = plugin
          plugin = pluginName
        pluginManager.getConfigParam(plugin, name)

      ###
      setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

      value is optional. If omitted, a selection dialog will be presented to user.

      returns a Promise that resolves to parameter value.

      Promise can be rejected with either error, or 'undefined'. Latter
      in case user cancels param selection dialog.
      ###
      set: (plugin, name, value) ->
        unless value?
          value = name
          name = plugin
          plugin = pluginName
        pluginManager.setConfigParam(plugin, name, value)

    @utils = {withEventRange}

  destroy: ->
    @disposables.dispose()
    @tooltipEvents.clear()
    Object.getOwnPropertyNames(this).forEach (p) =>
      @[p] = null
    @destroyed = true

  check: ->
    if(@destroyed)
      throw new UPIError('This UPI interface was destroyed')
    return this
