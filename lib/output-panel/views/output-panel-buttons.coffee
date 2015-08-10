{Emitter} = require 'atom'

module.exports=
class OutputPanelButtons extends HTMLElement
  createdCallback: ->
    @rootElement = this
    @emitter = new Emitter
    @buttons = {}
    ['error', 'warning', 'lint', 'build'].forEach (btn) =>
      @appendChild @buttons[btn] = document.createElement 'ide-haskell-button'
      @buttons[btn].setAttribute 'data-caption', btn
      @buttons[btn].setAttribute 'data-count', 0
      @buttons[btn].addEventListener 'click', => @clickButton btn

  onButtonClicked: (callback) ->
    @emitter.on 'button-clicked', callback

  buttonNames: ->
    Object.keys @buttons

  clickButton: (btn) ->
    @emitter.emit 'button-clicked', btn
    for v in @getElementsByClassName 'active'
      v.classList.remove 'active'
    @buttons[btn].classList.add 'active'

  setCount: (btn, count) ->
    @buttons[btn].setAttribute 'data-count', count

  destroy: ->
    @emitter.dispose()
    @rootElement.destroy()

  getActive: ->
    @getElementsByClassName('active')[0]?.getAttribute?('data-caption')

OutputPanelButtonsElement =
  document.registerElement 'ide-haskell-panel-buttons',
    prototype: OutputPanelButtons.prototype

module.exports = OutputPanelButtonsElement
