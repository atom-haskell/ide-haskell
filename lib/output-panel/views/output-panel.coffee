OutputPanelButtonsElement = require './output-panel-buttons'
OutputPanelItemsElement = require './output-panel-items'

module.exports=
class OutputPanelView extends HTMLElement
  setModel: (@model) ->
    @model.onStatusChanged (o) => @statusChanged o
    @model.results.onDidUpdate =>
      if atom.config.get('ide-haskell.switchTabOnCheck')
        @activateFirstNonEmptyTab()
    @items.setModel @model.results

    @style.height = @model.state.height if @model.state?.height?
    @activateTab(@model.state.activeTab ? @buttons.buttonNames()[0])

    @

  createdCallback: ->
    @rootElement = this
    @classList.add 'native-key-bindings'
    @appendChild @resizeHandle = document.createElement 'resize-handle'
    @initResizeHandle()
    @appendChild @heading = document.createElement 'ide-haskell-panel-heading'
    @heading.appendChild @status = document.createElement 'ide-haskell-status-icon'
    @status.setAttribute 'data-status', 'ready'
    @heading.appendChild @buttons = new OutputPanelButtonsElement
    @appendChild @items = new OutputPanelItemsElement
    @buttons.onButtonClicked (btn) =>
      @items.filter severity: btn

  initResizeHandle: ->
    initDrag = (e) =>
      startY = e.clientY
      startHeight = parseInt document.defaultView.getComputedStyle(@).height, 10

      doDrag = (e) =>
        @style.height = (startHeight - e.clientY + startY) + 'px'

      stopDrag = (e) ->
        document.documentElement.removeEventListener 'mousemove', doDrag
        document.documentElement.removeEventListener 'mouseup', stopDrag

      document.documentElement.addEventListener 'mousemove', doDrag
      document.documentElement.addEventListener 'mouseup', stopDrag

    @resizeHandle.addEventListener 'mousedown', initDrag

  activateTab: (tab) ->
    @buttons.clickButton tab

  activateFirstNonEmptyTab: ->
    for name in @buttons.buttonNames()
      if (@model.results.filter severity: name).length > 0
        @activateTab name
        break

  destroy: ->
    @rootElement.destroy()

  statusChanged: ({status, oldStatus}) ->
    prio =
      progress: 0
      error: 20
      warning: 10
      ready: 0
    if prio[status] >= prio[oldStatus] or status is 'progress'
      @status.setAttribute 'data-status', status

  showItem: (item) ->
    @activateTab item.severity
    @items.showItem item

OutputPanelElement =
  document.registerElement 'ide-haskell-panel',
    prototype: OutputPanelView.prototype

module.exports = OutputPanelElement
