module.exports=
class OutputPanelView extends HTMLElement
  setModel: (@model) ->
    @disposables.add @model.results.onDidUpdate ({types}) =>
      if atom.config.get('ide-haskell.autoHideOutput') and \
          types.map((type) => @model.results.filter(severity: type).length).every((l) -> l is 0)
        @buttons.disableAll()
      else
        if atom.config.get('ide-haskell.switchTabOnCheck')
          @activateFirstNonEmptyTab types
      @updateItems()
    @items.setModel @model.results

    @style.height = @model.state.height if @model.state?.height?
    @style.width = @model.state.width if @model.state?.width?
    @checkboxUriFilter.setFileFilter @model.state.fileFilter

    @

  createdCallback: ->
    SubAtom = require 'sub-atom'
    @disposables = new SubAtom
    @appendChild @resizeHandle = document.createElement 'resize-handle'
    @initResizeHandle()
    @appendChild @heading = document.createElement 'ide-haskell-panel-heading'
    @disposables.add @addPanelControl 'ide-haskell-status-icon',
      id: 'status'
      attrs:
        'data-status': 'ready'
    OutputPanelButtonsElement = require './output-panel-buttons'
    @disposables.add @addPanelControl new OutputPanelButtonsElement,
      id: 'buttons'
    OutputPanelCheckboxElement = require './output-panel-checkbox'
    @disposables.add @addPanelControl new OutputPanelCheckboxElement,
      id: 'checkboxUriFilter'
    ProgressBar = require './progress-bar'
    @disposables.add @addPanelControl new ProgressBar,
      id: 'progressBar'
    @progressBar.setProgress 0

    OutputPanelItemsElement = require './output-panel-items'
    @appendChild @items = new OutputPanelItemsElement
    @disposables.add @buttons.onButtonClicked =>
      @updateItems()
    @disposables.add @checkboxUriFilter.onCheckboxSwitched =>
      @updateItems()
    @disposables.add atom.workspace.onDidChangeActivePaneItem =>
      @updateItems() if @checkboxUriFilter.getFileFilter()

  addPanelControl: (element, {events, classes, style, attrs, before, id}) ->
    {Disposable} = require 'atom'
    if id? and @[id]
      return new Disposable ->
    element = document.createElement element if typeof element is 'string'
    if id?
      element.id = id
      @[id] = element
    SubAtom = require 'sub-atom'
    disp = new SubAtom
    disp.add new Disposable ->
      if id?
        delete @[id]
      element.remove()
      element.destroy?()
    if classes?
      for cls in classes
        element.classList.add cls
    if style?
      for s, v of style
        element.style.setProperty s, v
    if attrs?
      for a, v of attrs
        element.setAttribute a, v
    if events?
      for event, action of events
        disp.add element, event, action

    before = @heading.querySelector(before) if before?
    if before?
      before.parentElement.insertBefore element, before
    else
      @heading.appendChild element

    @disposables.add disp

    disp

  setHideParameterValues: (value) ->
    Array.prototype.slice.call(@heading.querySelectorAll('ide-haskell-param')).forEach (el) ->
      if value
        el.classList.add('hidden-value')
      else
        el.classList.remove('hidden-value')

  ###
  Note: can't use detachedCallback here, since when panel
  is reattached, it is called, and panel items are
  detached
  ###
  destroy: ->
    @remove()
    @items.destroy()
    @disposables.dispose()

  setPanelPosition: (@pos) ->
    @setAttribute 'data-pos', @pos

  initResizeHandle: ->
    @disposables.add @resizeHandle, 'mousedown', (e) =>
      doDrag =
        switch @pos
          when 'top', 'bottom'
            startY = e.clientY
            startHeight = parseInt document.defaultView.getComputedStyle(@).height, 10
            dir = switch @pos
              when 'top' then 1
              when 'bottom' then -1
            (e) =>
              @style.height = (startHeight + dir * (e.clientY - startY)) + 'px'
          when 'left', 'right'
            startX = e.clientX
            startWidth = parseInt document.defaultView.getComputedStyle(@).width, 10
            dir = switch @pos
              when 'left' then 1
              when 'right' then -1
            (e) =>
              @style.width = (startWidth + dir * (e.clientX - startX)) + 'px'

      stopDrag = (e) ->
        document.documentElement.removeEventListener 'mousemove', doDrag
        document.documentElement.removeEventListener 'mouseup', stopDrag

      document.documentElement.addEventListener 'mousemove', doDrag
      document.documentElement.addEventListener 'mouseup', stopDrag
  updateItems: ->
    activeTab = @getActiveTab()
    if activeTab?
      @classList.remove 'hidden-output'
      filter = severity: activeTab
      if @checkboxUriFilter.getFileFilter()
        uri = atom.workspace.getActiveTextEditor()?.getPath?()
        filter.uri = uri if uri? and @buttons.options(activeTab).uriFilter
      scroll = @buttons.options(activeTab).autoScroll and @items.atEnd()
      @items.filter filter
      @items.scrollToEnd() if scroll
    else
      @classList.add 'hidden-output'

    for btn in @buttons.buttonNames()
      f = severity: btn
      f.uri = uri if uri? and @buttons.options(btn).uriFilter
      @buttons.setCount btn, @model.results.filter(f).length

  activateTab: (tab) ->
    @buttons.clickButton tab, true

  activateFirstNonEmptyTab: (types) ->
    for name in @buttons.buttonNames() when (if types? then name in types else true)
      if (@model.results.filter severity: name).length > 0
        @activateTab name
        break

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

  getActiveTab: ->
    @buttons.getActive()

  createTab: (name, opts) ->
    unless name in @buttons.buttonNames()
      @buttons.createButton name, opts
      @activateTab(@model.state.activeTab) if @model.state?.activeTab?
      if @model.state?.activeTab is undefined
        @activateTab(@buttons.buttonNames()[0])

  setProgress: (progress) ->
    switch atom.config.get('ide-haskell.panelPosition')
      when 'top', 'bottom'
        @progressBar.setProgress progress, 'horizontal'
      else
        @progressBar.setProgress progress, 'vertical'

OutputPanelElement =
  document.registerElement 'ide-haskell-panel',
    prototype: OutputPanelView.prototype

module.exports = OutputPanelElement
