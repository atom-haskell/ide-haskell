SubAtom = require 'sub-atom'
MessageObject = require '../../message-object.coffee'

class OutputPanelItemView extends HTMLElement
  setModel: (@model) ->
    @innerHTML = ''
    if @model.uri? and @model.position?
      @appendChild @position = document.createElement 'ide-haskell-item-position'
      @position.innerText = "#{@model.uri}: #{@model.position.row + 1}, #{@model.position.column + 1}"
    @appendChild @description = document.createElement 'ide-haskell-item-description'
    MessageObject.fromObject(@model.message).paste(@description)
    @

  attachedCallback: ->
    @disposables = new SubAtom
    if @position?
      @disposables.add @position, 'click', =>
        atom.workspace.open(@model.uri).then (editor) =>
          editor.setCursorBufferPosition @model.position

  destroy: ->
    @remove()
    @disposables.dispose()
    @disposables = null


OutputPanelItemElement =
  document.registerElement 'ide-haskell-panel-item',
    prototype: OutputPanelItemView.prototype

module.exports = OutputPanelItemElement
