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
      @$details.text(@details)
