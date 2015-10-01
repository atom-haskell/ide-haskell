{SelectListView} = require 'atom-space-pen-views'

module.exports=
class TargetListView extends SelectListView
  initialize: ({@onConfirmed, items}) ->
    super
    @panel = atom.workspace.addModalPanel
      item: this
      visible: false
    @addClass 'ide-haskell'
    @show items

  cancelled: ->
    @panel.destroy()

  getFilterKey: ->
    "name"

  show: (list) ->
    @setItems [{name: 'All', type: ''}].concat list
    @panel.show()
    @storeFocusedElement()
    @focusFilterEditor()

  viewForItem: (tgt) ->
    "<li>
      <div class='type'>#{tgt.type}</div>
      <div class='name'>#{tgt.name}</div>
    </li>
    "

  confirmed: (tgt) ->
    @onConfirmed? tgt
    @cancel()
