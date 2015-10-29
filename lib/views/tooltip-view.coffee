class TooltipMessage
  constructor: (text) ->
    @element = (new TooltipElement).setMessage text

class TooltipView extends HTMLElement
  setMessage: (message) ->
    @inner.textContent = message
    @

  createdCallback: ->
    @appendChild @inner = document.createElement 'div'

  attachedCallback: ->
    @parentElement.classList.add 'ide-haskell'

TooltipElement =
  document.registerElement 'ide-haskell-tooltip',
    prototype: TooltipView.prototype

module.exports = {
  TooltipMessage
}
