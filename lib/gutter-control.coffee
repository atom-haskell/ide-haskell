module.exports =
  class GutterControl
    # results for highlight in gutter
    checkResults: []
    lintsResults: []

    # update check results
    updateCheck: (results) ->
      @checkResults = results

    # update lints
    updateLints: (results) ->
      @lintsResults = results

    # render check results for gutter
    renderCheck: (gutter) ->

    # render lints for gutter
    renderLints: (gutter) ->
