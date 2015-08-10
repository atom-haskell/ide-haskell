{BufferedProcess} = require 'atom'
{SelectListView} = require 'atom-space-pen-views'

module.exports=
class ImportListView extends SelectListView
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
    "text"

  show: (list) ->
    @setItems list
    @panel.show()
    @storeFocusedElement()
    @focusFilterEditor()

  viewForItem: (mod) ->
    "<li>#{mod}</li>"

  confirmed: (mod) ->
    @onConfirmed? mod
    @cancel()
