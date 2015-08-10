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

  filter: (template) ->
    @results.filter (item) ->
      b = (item[k] is v for k, v of template)
      b.every (v) -> v
