module.exports=
class OutputPanelButtons extends HTMLElement
  createdCallback: ->
    {Emitter} = require 'atom'
    SubAtom = require 'sub-atom'
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter
    @buttons = {}
    ['error', 'warning', 'lint'].forEach (btn) =>
      @createButton btn
    @createButton 'build',
      uriFilter: false
      autoScroll: true

  createButton: (btn, opts) ->
    @buttons[btn] =
      element: null
      options: opts ? {}
    @appendChild @buttons[btn].element = document.createElement 'ide-haskell-button'
    @buttons[btn].element.setAttribute 'data-caption', btn
    @buttons[btn].element.setAttribute 'data-count', 0
    @disposables.add @buttons[btn].element, 'click', => @clickButton btn

  options: (btn) ->
    opts = if @buttons[btn]?
      @buttons[btn].options
    else
      {}
    opts['uriFilter'] ?= true
    opts['autoScroll'] ?= false
    opts

  onButtonClicked: (callback) ->
    @emitter.on 'button-clicked', callback

  onCheckboxSwitched: (callback) ->
    @emitter.on 'checkbox-switched', callback

  buttonNames: ->
    Object.keys @buttons

  clickButton: (btn, force = false) ->
    if @buttons[btn]?
      isActive = @buttons[btn].element.classList.contains 'active'
      for v in @getElementsByClassName 'active'
        v.classList.remove 'active'
      @buttons[btn].element.classList.add 'active' if not isActive or force
      @emitter.emit 'button-clicked', btn

  disableAll: ->
    for v in @getElementsByClassName 'active'
      v.classList.remove 'active'

  setCount: (btn, count) ->
    if @buttons[btn]?
      @buttons[btn].element.setAttribute 'data-count', count

  destroy: ->
    @remove()
    @disposables.dispose()

  getActive: ->
    @getElementsByClassName('active')[0]?.getAttribute?('data-caption') ? null

OutputPanelButtonsElement =
  document.registerElement 'ide-haskell-panel-buttons',
    prototype: OutputPanelButtons.prototype

module.exports = OutputPanelButtonsElement
