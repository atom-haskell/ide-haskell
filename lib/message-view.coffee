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
      pos = [@line - 1, @column - 1]
      atom.workspace.open(@fname).then (editor) ->
        editor.setCursorBufferPosition(pos)
