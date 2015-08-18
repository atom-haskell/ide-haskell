{Emitter} = require 'atom'
SubAtom = require 'sub-atom'

module.exports=
class OutputPanelButtons extends HTMLElement
  createdCallback: ->
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter
    @buttons = {}
    @appendChild @buttonsContainer = document.createElement 'ide-haskell-buttons-container'
    ['error', 'warning', 'lint', 'build'].forEach (btn) =>
      @createButton btn
    @appendChild @cbCurrentFile = document.createElement 'ide-haskell-checkbox'
    @disposables.add @cbCurrentFile, 'click', => @toggleFileFilter()

  createButton: (btn) ->
    @buttonsContainer.appendChild @buttons[btn] = document.createElement 'ide-haskell-button'
    @buttons[btn].setAttribute 'data-caption', btn
    @buttons[btn].setAttribute 'data-count', 0
    @disposables.add @buttons[btn], 'click', => @clickButton btn

  onButtonClicked: (callback) ->
    @emitter.on 'button-clicked', callback

  onCheckboxSwitched: (callback) ->
    @emitter.on 'checkbox-switched', callback

  buttonNames: ->
    Object.keys @buttons

  clickButton: (btn) ->
    for v in @getElementsByClassName 'active'
      v.classList.remove 'active'
    @buttons[btn].classList.add 'active'
    @emitter.emit 'button-clicked', btn

  setFileFilter: (state) ->
    if state
      @cbCurrentFile.classList.add 'enabled'
      @emitter.emit 'checkbox-switched', true
    else
      @cbCurrentFile.classList.remove 'enabled'
      @emitter.emit 'checkbox-switched', false

  getFileFilter: ->
    @cbCurrentFile.classList.contains 'enabled'

  toggleFileFilter: ->
    @setFileFilter not @getFileFilter()

  setCount: (btn, count) ->
    @buttons[btn].setAttribute 'data-count', count

  detachedCallback: ->
    @disposables.dispose()

  getActive: ->
    @getElementsByClassName('active')[0]?.getAttribute?('data-caption')

OutputPanelButtonsElement =
  document.registerElement 'ide-haskell-panel-buttons',
    prototype: OutputPanelButtons.prototype

module.exports = OutputPanelButtonsElement
