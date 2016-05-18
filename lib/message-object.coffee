module.exports =
class MessageObject
  constructor: ({@text, @highlighter, @html}) ->

  @fromObject: (message) ->
    if typeof(message) is 'string'
      return new MessageObject
        text: message
    else if typeof(message) is 'object'
      @validate(message)
      return new MessageObject(message)

  @validate: (message) ->
    if message.text? and message.html?
      throw new Error('Can\'t have both text and html set')
    if message.highlighter? and not message.text?
      throw new Error('Must pass text when highlighter is set')
    if not message.text? and not message.html?
      throw new Error('Neither text nor html is set')

  toHtml: ->
    if @highlighter? and @text?
      g = atom.grammars.grammarForScopeName @highlighter
      if not g?
        @highlighter = null
        return @toHtml()
      ls = g.tokenizeLines @text
      tls = for l in ls
        tl = for t in l
          span = start = document.createElement 'span'
          for s in t.scopes
            span.appendChild span = document.createElement 'span'
            cls = s.split('.')
            span.classList.add cls...
          span.innerText = t.value
          start.innerHTML
        tl.join('')
      return tls.join('\n')
    else if @html?
      return @html
    else
      div = document.createElement('div')
      div.innerText = @text
      return div.innerHTML

  paste: (element) ->
    element.innerHTML = @toHtml()
