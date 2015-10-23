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

    @backendStatus status: 'ready'

  toggle: ->
    p = atom.workspace.panelForItem(@)
    if p.isVisible()
      p.hide()
    else
      p.show()

  destroy: ->
    @disposables.dispose()
    atom.workspace.panelForItem(@).destroy()

  createTab: (name, opts) ->
    atom.views.getView(@).createTab name, opts

  serialize: ->
    visibility: atom.workspace.panelForItem(@).isVisible()
    height: atom.views.getView(@).style.height
    activeTab: atom.views.getView(@).getActiveTab()
    fileFilter: atom.views.getView(@).buttons.getFileFilter()

  onStatusChanged: (callback) ->
    @emitter.on 'status-changed', callback

  emitStatus: (status) ->
    oldStatus = @status ? 'ready'
    @status = status
    @emitter.emit 'status-changed', {@status, oldStatus}

  onProgressChanged: (callback) ->
    @emitter.on 'progress-changed', callback

  emitProgress: (progress) ->
    @emitter.emit 'progress-changed', progress

  addPanelControl: (element, opts) ->
    atom.views.getView(@).addPanelControl element, opts

  backendStatus: ({status, progress}) ->
    @emitStatus status
    unless status is 'progress'
      progress ?= 0
    @emitProgress progress if progress?

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
