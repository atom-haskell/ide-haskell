{$, View} = require 'atom-space-pen-views'

class TooltipMessage
  constructor: (@text) ->

class TooltipView extends HTMLElement
  setMessage: (message) ->
    @inner.textContent = message.text
    $(this).fadeTo(0, 1)
    this

  createdCallback: ->
    @rootElement = this
    @inner = document.createElement 'div'
    @appendChild @inner

  attachedCallback: ->
    @parentElement.classList.add 'ide-haskell'

  destroy: ->
    @rootElement.destroy()

TooltipElement =
  document.registerElement 'ide-haskell-tooltip',
    prototype: TooltipView.prototype

module.exports = {
  TooltipMessage,
  TooltipElement
}
