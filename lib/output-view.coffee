{$, $$$, View} = require 'atom'

module.exports =
  class OutputView extends View
    @content: ->
      @div class: 'ide-haskell-output-view', =>
        @div outlet: 'resizeHandle', class: 'resize-handle'
        @div class: 'panel', =>
          @div class: 'panel-heading', =>
            @div class: 'btn-toolbar pull-left', =>
              @div class: 'btn-group', =>
                @button class: 'btn', 'Errors'
                @button class: 'btn', 'Warnings'
                @button class: 'btn', 'Lints'
            @div class: 'btn-toolbar pull-right', =>
              @button class: 'btn', 'Close'
          @div class: 'panel-body', =>
            @ul outlet: 'noResultsMessage', class: 'background-message', =>
              @li 'Haskell IDE'
            @ul outlet: 'errsList', class: 'list-group'
            @ul outlet: 'warnList', class: 'list-group'
            @ul outlet: 'lintList', class: 'list-group'

    initialize: (state) ->
      @height state?.height
      @resizeHandle.on 'mousedown', (e) => @resizeStarted e

    serialize: ->
      height: @height()

    attach: ->
      atom.workspaceView.prependToBottom(this)

    resizeStarted: ({pageY}) =>
      @resizeData =
        pageY: pageY
        height: @height()
      $(document.body).on 'mousemove', @resizeView
      $(document.body).on 'mouseup', @resizeStopped

    resizeStopped: ->
      $(document.body).off 'mousemove', @resizeView
      $(document.body).off 'mouseup', @resizeStopped

    resizeView: ({pageY}) =>
      @height @resizeData.height + @resizeData.pageY - pageY

    # Clear everything inside output view
    reset: ->

    # Add new data into output view
    add: ({line, column, fname, type, preview, details}) ->
      # @errsList.append $$$ ->
        # @div class: 'inset-panel padded', 'Some content'
