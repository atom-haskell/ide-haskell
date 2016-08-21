module.exports =
class ResultItem
  constructor: (@parent, {@uri, @message, @severity, @position}) ->

  destroy: ->
    if @parent?
      @parent.removeResult @
