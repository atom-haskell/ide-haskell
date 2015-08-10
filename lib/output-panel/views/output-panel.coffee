OutputPanelButtonsElement = require './output-panel-buttons'
OutputPanelItemsElement = require './output-panel-items'

module.exports=
class OutputPanelView extends HTMLElement
  setModel: (@model) ->
    @style.height = @model.state.height if @model.state?.height?
    @model.onStatusChanged (o) => @statusChanged o
    @items.setModel @model.results
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

  attachedCallback: ->
    # @parentElement.classList.add 'ide-haskell'

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


OutputPanelElement =
  document.registerElement 'ide-haskell-panel',
    prototype: OutputPanelView.prototype

module.exports = OutputPanelElement
