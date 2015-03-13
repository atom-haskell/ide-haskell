{View} = require 'atom-space-pen-views'
$ = require 'jquery'
class TooltipView extends View
  @content: ->
    @div class: 'ide-haskell-tooltip tooltip', =>
      @div class: 'tooltip-inner', outlet: 'inner'

  initialize: (@rect, text = null) ->
    @inner.text(text) if text?
    $(document.body).append this
    @updatePosition()
    @fadeTo(0,1) if text?

  # update tooltip text
  updateText: (text) ->
    @inner.text(text)
    @updatePosition()
    @fadeTo(0,1)

  # smart position update
  updatePosition: ->
    coords = [@rect.right, @rect.bottom, undefined]
    offset = 10

    # x axis adjust
    if coords[0] + this[0].offsetWidth >= $(document.body).width()
      coords[0] = $(document.body).width() - this[0].offsetWidth - offset
    if coords[0] < 0
      this.css({ 'white-space': 'pre-wrap' })
      coords[0] = offset
      coords[2] = offset

    # y axis adjust
    if coords[1] + this[0].offsetHeight >= $(document.body).height()
      coords[1] = @rect.top - this[0].offsetHeight

    @css({ left: coords[0], top: coords[1], right: coords[2] })

module.exports = {
  TooltipView
}
