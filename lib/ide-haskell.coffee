OutputPaneView = require './output-pane-view'

module.exports =
  activate: (state) ->
    new OutputPaneView

  deactivate: ->

  serialize: ->
