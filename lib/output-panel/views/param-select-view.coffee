{SelectListView} = require 'atom-space-pen-views'

module.exports=
class ParamSelectView extends SelectListView
  initialize: ({@onConfirmed, @onCancelled, items, heading, @itemTemplate, @itemFilterName}) ->
    super
    @panel = atom.workspace.addModalPanel
      item: this
      visible: false
    @addClass 'ide-haskell'
    if typeof items.then is 'function'
      items.then (its) => @show its
    else
      @show items
    if heading?
      div = document.createElement('div')
      div.classList.add 'select-list-heading'
      div.innerText = heading
      @prepend div

  cancelled: ->
    @panel.destroy()
    @onCancelled?()

  getFilterKey: ->
    @itemFilterKey

  show: (list) ->
    @setItems list
    @panel.show()
    @storeFocusedElement()
    @focusFilterEditor()

  viewForItem: (item) ->
    @itemTemplate(item)

  confirmed: (item) ->
    @onConfirmed? item
    @onCancelled = null
    @cancel()
