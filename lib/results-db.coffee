ResultItem = null

module.exports =
class ResultsDB
  constructor: ->
    @results = []
    {CompositeDisposable, Emitter} = require 'atom'
    @disposables = new CompositeDisposable
    @disposables.add @emitter = new Emitter
    ResultItem = require './result-item'

  destroy: ->
    @disposables?.dispose?()
    @disposables = null
    @emitter = null

  onDidUpdate: (callback) ->
    @emitter.on 'did-update', callback

  setResults: (res, severityArr) ->
    if severityArr?
      @results =
        @results.filter(({severity}) -> not (severity in severityArr))
        .concat(res.map (i) => new ResultItem(@, i))
    else
      @results = res

    unless severityArr?
      severityArr = []
      severityArr.push severity for {severity} in res when not (severity in severityArr)

    @emitter.emit 'did-update', {res: @, types: severityArr}

  appendResults: (res, severityArr) ->
    @results = @results.concat res.map (r) => new ResultItem(@, r)

    unless severityArr?
      severityArr = []
      severityArr.push severity for {severity} in res when not (severity in severityArr)

    @emitter.emit 'did-update', {res: @, types: severityArr}

  removeResult: (resItem) ->
    @results = @results.filter (res) -> res isnt resItem
    resItem.parent = null

  resultsWithURI: ->
    @results.filter ({uri}) -> uri?

  filter: (template) ->
    @results.filter (item) ->
      b = (item[k] is v for k, v of template)
      b.every (v) -> v

  isEmpty: ->
    @results.length is 0
