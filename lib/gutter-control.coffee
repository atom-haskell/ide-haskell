module.exports =
  class GutterControl
    # results for highlight in gutter
    checkResults: []
    lintsResults: []

    # update check results
    updateCheck: ->
      console.log 'updateCheck'

    # update lints
    updateLints: ->
      console.log 'updateLints'

    # render check results for gutter
    renderCheck: (gutter) ->
      console.log 'renderCheck'

    # render lints for gutter
    renderLints: (gutter) ->
      console.log 'renderLints'
