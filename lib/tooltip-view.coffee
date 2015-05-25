{$, View} = require 'atom-space-pen-views'

class TooltipMessage
  constructor: (@text) ->

class TooltipView extends HTMLElement
  setMessage: (message) ->
    @inner.textContent=message.text
    $(this).fadeTo(100,1)
    this

  createdCallback: ->
    @rootElement=this
    @inner=document.createElement('div')
    @appendChild @inner

  destroy: ->
    @rootElement.destroy()

TooltipElement =
  document.registerElement 'ide-haskell-tooltip',
    prototype: TooltipView.prototype

module.exports = {
  TooltipMessage,
  TooltipElement
}
