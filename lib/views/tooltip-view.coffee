class TooltipMessage
  constructor: (text) ->
    @element = (new TooltipElement).setMessage text

class TooltipView extends HTMLElement
  setMessage: (message) ->
    @inner.innerHTML = ""
    if typeof(message) is 'string'
      @inner.textContent = message
    else if message instanceof Object
      {text, highlighter, html} = message
      if highlighter?
        g = atom.grammars.grammarForScopeName highlighter
        ls = g.tokenizeLines text
        tls = for l in ls
          tl = for t in l
            "<span class='#{t.scopes.join(' ').replace(/\./g, ' ')}'>#{t.value}</span>"
          tl.join('')
        @inner.innerHTML = tls.join('\n')
      else if html?
        @inner.innerHTML = html
      else
        @inner.textContent = text
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
