{CompositeDisposable, Emitter} = require 'atom'

module.exports=
class OutputPanel
  constructor: (@state = {}, @results) ->
    @disposables = new CompositeDisposable
    @disposables.add @emitter = new Emitter

    atom.workspace.addBottomPanel
      item: @
      visible: @state?.visibility ? true

    @disposables.add @results.onDidUpdate => @currentResult = null

    @backendStatus 'ready'

  toggle: ->
    p = atom.workspace.panelForItem(@)
    if p.isVisible()
      p.hide()
      @state.visibility = false
    else
      p.show()
      @state.visibility = true

  destroy: ->
    @disposables.dispose()
    atom.workspace.panelForItem(@).destroy()

  serialize: ->
    @state

  onStatusChanged: (callback) ->
    @emitter.on 'status-changed', callback

  emitStatus: (status) ->
    oldStatus = @status ? 'ready'
    @status = status
    @emitter.emit 'status-changed', {@status, oldStatus}

  backendStatus: ({status}) ->
    @emitStatus status

  showNextError: ->
    rs = @results.resultsWithURI()
    return if rs.length is 0

    if @currentResult?
      @currentResult++
    else
      @currentResult = 0
    @currentResult = 0 if @currentResult >= rs.length

    atom.views.getView(@).showItem rs[@currentResult]

  showPrevError: ->
    rs = @results.resultsWithURI()
    return if rs.length is 0

    if @currentResult?
      @currentResult--
    else
      @currentResult = rs.length - 1
    @currentResult = rs.length - 1 if @currentResult < 0

    atom.views.getView(@).showItem rs[@currentResult]
