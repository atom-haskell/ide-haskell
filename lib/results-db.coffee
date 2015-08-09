{CompositeDisposable, Emitter} = require 'atom'

module.exports =
class ResultsDB
  constructor: ->
    @results = []
    @disposables = new CompositeDisposable
    @disposables.add @emitter = new Emitter

  destroy: ->
    @disposables?.dispose?()
    @disposables = null
    @emitter = null

  onDidUpdate: (callback) ->
    @emitter.on 'did-update', callback

  setResults: (res, severityArr) ->
    if severityArr?
      @results = @results.filter(({severity}) -> not (severity in severityArr)).concat res
    else
      @results = res

    unless severityArr?
      severityArr = []
      severityArr.push severity for {severity} in res when not (severity in severityArr)

    @emitter.emit 'did-update', {res: @, types: severityArr}

  resultsForURI: (forURI) ->
    @results.filter ({uri}) -> forURI is uri

  resultsWithSeverity: (forSeverity) ->
    @results.filter ({severity}) -> forSeverity is severity
