'use babel'

import { CompositeDisposable, Point } from 'atom'
import { MainMenuLabel, getEventType } from './utils'

export class UPI {
  constructor (pluginManager) {
    this.pluginManager = pluginManager
  }

  /*
  Call this function in consumer to get actual interface

  disposables: CompositeDisposable, one you will return in consumer
  name: Plugin package name
  */
  registerPlugin (disposables, name) {
    return new UPIInstance(this.pluginManager, disposables, name)
  }
}

class UPIInstance {
  constructor (pluginManager, disposables, pluginName) {
    this.pluginManager = pluginManager
    this.pluginName = pluginName
    disposables.add(this.disposables = new CompositeDisposable())
  }

  /*
  Adds new sumbenu to 'Haskell IDE' menu item
  name -- submenu label, should be descriptive of a package
  menu -- Atom menu object

  Returns Disposable.
  */
  setMenu (name, menu) {
    let menuDisp
    this.disposables.add(menuDisp = atom.menu.add([{
      label: MainMenuLabel,
      submenu: [ {label: name, submenu: menu} ]
    }
    ]))
    return menuDisp
  }

  /*
  Sets backend status
  status -- object
    status: one of 'progress', 'ready', 'error', 'warning'
    progress: float between 0 and 1, only relevant when status is 'progress'
              if 0 or undefined, progress bar is not shown
  */
  setStatus (status) {
    return this.pluginManager.outputView.backendStatus(this.pluginName, status)
  }

  /*
  Add messages to ide-haskell output
  messages: Array of Object
    uri: String, File URI message relates to
    position: Point, or Point-like Object, position to which message relates
    message: String or {<text | html>, highlighter?}, message
    severity: String, one of 'error', 'warning', 'lint', 'build',
              or user-defined, see `setMessageTypes`
  types: Array of String, containing possible message `severity`. If undefined,
         will be taken from `messages`
  */
  addMessages (messages, types) {
    messages = messages.map(function (m) {
      if (m.position != null) { m.position = Point.fromObject(m.position) }
      return m
    })
    return this.pluginManager.checkResults.appendResults(messages, types)
  }

  /*
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
  */
  setMessages (messages, types) {
    messages = messages.map(function (m) {
      if (m.position != null) { m.position = Point.fromObject(m.position) }
      return m
    })
    return this.pluginManager.checkResults.setResults(messages, types)
  }

  /*
  Clear all existing messages with `severity` in `types`
  This is shorthand from `setMessages([],types)`
  */
  clearMessages (types) {
    return this.pluginManager.checkResults.setResults([], types)
  }

  /*
  Set possible message `severity` that your package will use.
  types: Object with keys representing possible message `severity` (i.e. tab name)
         and values being Objects with keys
    uriFilter: Bool, should uri filter apply to tab?
    autoScroll: Bool, should tab auto-scroll?

  This allows to define custom output panel tabs.
  */
  setMessageTypes (types) {
    return (() => {
      let result = []
      for (let type in types) {
        let opts = types[type]
        result.push(this.pluginManager.outputView.createTab(type, opts))
      }
      return result
    })()
  }

  /*
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
  */
  onShouldShowTooltip (callback) {
    let disp
    this.disposables.add(disp = this.pluginManager.onShouldShowTooltip(({editor, pos, eventType}) => {
      return this.showTooltip({
        editor,
        pos,
        eventType,
        tooltip (crange) {
          let res = callback(editor, crange, eventType)
          if (res != null) {
            return Promise.resolve(res)
          } else {
            return Promise.reject({ignore: true})
          }
        }
      })
    }
    )
    )
    return disp
  }

  /*
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
  */
  showTooltip ({editor, pos, eventType, detail, tooltip}) {
    let controller = this.pluginManager.controller(editor)
    return this.withEventRange({controller, pos, detail, eventType}, ({crange, pos, eventType}) => {
      return Promise.resolve(tooltip(crange)).then(({range, text, persistOnCursorMove}) => controller.showTooltip(pos, range, text, {eventType, subtype: 'external', persistOnCursorMove}))
      .catch(status => {
        if (status == null) { status = {status: 'warning'} }
        if (status instanceof Error) {
          console.warn(status)
          status = {status: 'warning'}
        }
        if (!status.ignore) {
          controller.hideTooltip({eventType})
          return this.setStatus(status)
        }
      }
      )
    }
    )
  }

  /*
  Convenience function. Will fire before Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  */
  onWillSaveBuffer (callback) {
    let disp
    this.disposables.add(disp = this.pluginManager.onWillSaveBuffer(callback))
    return disp
  }

  /*
  Convenience function. Will fire after Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  Returns Disposable
  */
  onDidSaveBuffer (callback) {
    let disp
    this.disposables.add(disp = this.pluginManager.onDidSaveBuffer(callback))
    return disp
  }

  onDidStopChanging (callback) {
    let disp
    this.disposables.add(disp = this.pluginManager.onDidStopChanging(callback))
    return disp
  }

  /*
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
  */
  addPanelControl (element, opts) {
    return this.pluginManager.outputView.addPanelControl(element, opts)
  }

  /*
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
  */
  addConfigParam (spec) {
    return this.pluginManager.addConfigParam(this.pluginName, spec)
  }

  /*
  getConfigParam(paramName) or getConfigParam(pluginName, paramName)

  returns a Promise that resolves to parameter
  value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  getConfigParam (pluginName, name) {
    if (name == null) {
      name = pluginName;
      ({ pluginName } = this)
    }
    return this.pluginManager.getConfigParam(pluginName, name)
  }

  /*
  setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

  value is optional. If omitted, a selection dialog will be presented to user.

  returns a Promise that resolves to parameter value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  setConfigParam (pluginName, name, value) {
    if (value == null) {
      value = name
      name = pluginName;
      ({ pluginName } = this)
    }
    return this.pluginManager.setConfigParam(pluginName, name, value)
  }

  /*
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
  */
  withEventRange ({editor, detail, eventType, pos, controller}, callback) {
    if (pos != null) { pos = Point.fromObject(pos) }
    if (eventType == null) { eventType = getEventType(detail) }
    if (controller == null) { controller = this.pluginManager.controller(editor) }
    if (controller == null) { return }

    return callback((controller.getEventRange(pos, eventType)))
  }
}
