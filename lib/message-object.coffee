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
      html = require('atom-highlight')
        fileContents: @text
        scopeName: @highlighter
        nbsp: false
      unless html?
        @highlighter = null
        @toHtml()
      else
        html
    else if @html?
      return @html
    else
      div = document.createElement('div')
      div.innerText = @text
      return div.innerHTML

  paste: (element) ->
    element.innerHTML = @toHtml()
