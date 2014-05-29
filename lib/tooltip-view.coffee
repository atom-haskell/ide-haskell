{$, View} = require 'atom'

class TooltipView extends View
  @content: ->
    @div class: 'ide-haskell-tooltip'

  initialize: (text = null) ->
    @text(text) if text?

  # attach tooltip to object
  attachToObject: (object) ->
    console.log object
    $('body').append this

  # set tooltip near coordinates
  attachAtPoint: ->
    $('body').append this

  # update tooltip text
  updateText: (text) ->
    @text(text)

module.exports = {
  TooltipView
}
