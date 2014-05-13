{View, EditorView} = require 'atom'

module.exports =
  class OutputPaneView extends View
    @content: ->
      @div class: 'ide-haskell-output-panel tool-panel panel-bottom', =>
        @div class: 'ide-haskell-output-panel-heading panel-heading', =>
          @div class: 'btn-toolbar pull-right', =>
            @div class: 'btn-group', =>
              @button class: 'btn', 'Errors'
              @button class: 'btn', 'Warnings'
              @button class: 'btn', 'Lints'
            @button class: 'btn', 'X'
          @span 'Haskell IDE'
        @div class: 'ide-haskell-output-panel-body panel-body padded', =>
          @li class: 'bbb', 'HELLO!'
          @li class: 'bbb', 'HELLO!'
          @li class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'
          @div class: 'bbb', 'HELLO!'

    initialize: ->
      @on 'mousedown', '.ide-haskell-output-panel-heading', (e) => @resizeStarted(e)
      atom.workspaceView.appendToBottom(this)

    resizeStarted: =>
      console.log 'resizing'
