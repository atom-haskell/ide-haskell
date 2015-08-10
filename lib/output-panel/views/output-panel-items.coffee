OutputPanelItemElement = require './output-panel-item.coffee'

class OutputPanelItemsView extends HTMLElement
  setModel: (@model) ->
    @model.onDidUpdate =>
      @filter @activeFilter

  filter: (@activeFilter) ->
    @innerHTML = ''
    @items = @model.filter @activeFilter
    for i in @items
      @appendChild (new OutputPanelItemElement).setModel i

OutputPanelItemsElement =
  document.registerElement 'ide-haskell-panel-items',
    prototype: OutputPanelItemsView.prototype

module.exports = OutputPanelItemsElement
