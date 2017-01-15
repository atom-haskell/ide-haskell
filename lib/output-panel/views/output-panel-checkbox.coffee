class OutputPanelCheckbox extends HTMLElement
  createdCallback: ->
    {Emitter} = require 'atom'
    SubAtom = require 'sub-atom'
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter
    @disposables.add this, 'click', => @toggleFileFilter()

  onCheckboxSwitched: (callback) ->
    @emitter.on 'checkbox-switched', callback

  setFileFilter: (state) ->
    if state
      @classList.add 'enabled'
      @emitter.emit 'checkbox-switched', true
    else
      @classList.remove 'enabled'
      @emitter.emit 'checkbox-switched', false

  getFileFilter: ->
    @classList.contains 'enabled'

  toggleFileFilter: ->
    @setFileFilter not @getFileFilter()

  destroy: ->
    @remove()
    @disposables.dispose()

OutputPanelCheckboxElement =
  document.registerElement 'ide-haskell-checkbox',
    prototype: OutputPanelCheckbox.prototype

module.exports = OutputPanelCheckboxElement
