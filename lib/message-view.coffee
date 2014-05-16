{View} = require 'atom'

module.exports =
  class MessageView extends View
    @content: ->
      @li class: 'message-block', =>
        @div class: 'text-subtle inline-block', outlet: '$position', click: 'onClick', style: 'cursor: pointer'
        @div outlet: '$details'

    initialize: ({ @line
                 , @column
                 , @fname
                 , @type
                 , @preview # optional - not using now
                 , @details # array of strings
                 }) ->
      @$position.text("line #{@line}, column #{@column} of #{@fname}")
      for d in @details
        detail = d.replace /^\s+/g, (match) ->
          match.replace /\s/g, "&nbsp;"
        @$details.append("<div>#{detail}</div>")

    onClick: () ->
      # TODO open file at specific position
      # below does not work
      atom.workspace.open @fname, {initialLine: @line - 1, initialColumn: @column - 1}
