MessageObject = require '../message-object.coffee'

module.exports =
class TooltipMessage
  constructor: (text) ->
    @element = (new TooltipElement).setMessage text

class TooltipView extends HTMLElement
  setMessage: (message) ->
    @innerHtml = ''
    if message instanceof Array
      for m in message
        @appendChild inner = document.createElement 'div'
        MessageObject.fromObject(m).paste(inner)
    else
      @appendChild inner = document.createElement 'div'
      MessageObject.fromObject(message).paste(inner)
    @

  attachedCallback: ->
    @parentElement.classList.add 'ide-haskell'

TooltipElement =
  document.registerElement 'ide-haskell-tooltip',
    prototype: TooltipView.prototype
