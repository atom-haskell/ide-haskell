class OutputPanelItemView extends HTMLElement
  setModel: ({uri, severity, message, position}) ->
    @innerHTML = ''
    if uri? and position?
      @appendChild @position = document.createElement 'ide-haskell-item-position'
      @position.innerText = "#{uri}: #{position.row + 1}, #{position.column + 1}"
      @position.addEventListener 'click', ->
        atom.workspace.open(uri).then (editor) ->
          editor.setCursorBufferPosition position
    @appendChild @description = document.createElement 'ide-haskell-item-description'
    @description.innerText = message
    @

OutputPanelItemElement =
  document.registerElement 'ide-haskell-panel-item',
    prototype: OutputPanelItemView.prototype

module.exports = OutputPanelItemElement
