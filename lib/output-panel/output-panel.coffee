{Emitter} = require 'atom'

module.exports=
class OutputPanel
  constructor: (@state = {}, @results) ->
    @emitter = new Emitter
    atom.workspace.addBottomPanel
      item: @
      visible: @state?.visibility ? true

    @backendIdle()

  toggle: ->
    p = atom.workspace.panelForItem(@)
    if p.isVisible()
      p.hide()
      @state.visibility = false
    else
      p.show()
      @state.visibility = true

  destroy: ->
    @emitter.dispose()
    atom.workspace.panelForItem(@).destroy()

  serialize: ->
    @state

  onStatusChanged: (callback) ->
    @emitter.on 'status-changed', callback

  emitStatus: (status) ->
    oldStatus = @status ? 'ready'
    @status = status
    @emitter.emit 'status-changed', {@status, oldStatus}

  backendActive: ->
    @emitStatus 'progress'

  backendIdle: ->
    @emitStatus 'ready'

  backendWarning: ->
    @emitStatus 'warning'

  backendError: ->
    @emitStatus 'error'
