{Emitter} = require 'atom'

module.exports=
class OutputPanelButtons extends HTMLElement
  createdCallback: ->
    @rootElement = this
    @emitter = new Emitter
    @buttons = {}
    ['error', 'warning', 'lint', 'build'].forEach (btn) =>
      @appendChild @buttons[btn] = document.createElement 'ide-haskell-button'
      @buttons[btn].innerText = btn
      @buttons[btn].addEventListener 'click', => @clickButton btn

  onButtonClicked: (callback) ->
    @emitter.on 'button-clicked', callback

  clickButton: (btn) ->
    @emitter.emit 'button-clicked', btn
    for v in @getElementsByClassName 'active'
      v.classList.remove 'active'
    @buttons[btn].classList.add 'active'

  attachedCallback: ->
    # @parentElement.classList.add 'ide-haskell'

  destroy: ->
    @emitter.dispose()
    @rootElement.destroy()

OutputPanelButtonsElement =
  document.registerElement 'ide-haskell-panel-buttons',
    prototype: OutputPanelButtons.prototype

module.exports = OutputPanelButtonsElement
