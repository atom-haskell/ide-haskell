{View} = require 'atom'

module.exports =
  class MessageViewCheck extends View
    initialize: ({ @line
                 , @column
                 , @fileName # optional
                 , @message
                 , @preview
                 , @className
                 }) ->
        t = "line #{@line}, column #{@column}"
        if @fileName?
            t += ' of ' + @fileName
        @$contents.text(@message)
        @$position.text(t)
        @$preview.text(@preview)

        # highlight type
        @$contents.addClass(
          if @message == 'Error' then 'highlight-error inline-block' else 'highlight-warning inline-block'
        )

        if @className?
            @addClass(@className)

    @content: ->
        @div class: 'line-message', =>
            @div outlet: '$contents', click: 'onClick', style: 'cursor:pointer'
            @div class: 'text-subtle inline-block', outlet: '$position', click: 'onClick', style: 'cursor:pointer'
            @pre class: 'preview', outlet: '$preview',  click: 'onClick', style: 'cursor:pointer'
