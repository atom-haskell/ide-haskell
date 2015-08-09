module.exports =
class ResultsDB
  constructor: ->
    @results = []

  setResults: (res, severityArr) ->
    if severityArr?
      @results = @results.filter(({severity}) -> not (severity in severityArr)).concat res
    else
      @results = res

  resultsForURI: (forURI) ->
    @results.filter ({uri}) -> forURI is uri

  resultsWithSeverity: (forSeverity) ->
    @results.filter ({severity}) -> forSeverity is severity
