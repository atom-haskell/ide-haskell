class OutputPanelItemsView extends HTMLElement
  setModel: (@model) ->

  createdCallback: ->
    @classList.add 'native-key-bindings'
    @setAttribute('tabindex', -1)
    @itemViews = []

  filter: (@activeFilter) ->
    scrollTop = @scrollTop
    @clear()
    @items = @model.filter @activeFilter
    @itemViews = for i in @items
      @appendChild atom.views.getView i
    @scrollTop = scrollTop

  showItem: (item) ->
    view = atom.views.getView item
    view.position.click()
    view.scrollIntoView
      block: "start"
      behavior: "smooth"

  scrollToEnd: ->
    @scrollTop = @scrollHeight

  atEnd: ->
    @scrollTop >= (@scrollHeight - @clientHeight)

  clear: ->
    i.destroy() for i in @itemViews

  destroy: ->
    @remove()
    @clear()

OutputPanelItemsElement =
  document.registerElement 'ide-haskell-panel-items',
    prototype: OutputPanelItemsView.prototype

module.exports = OutputPanelItemsElement
