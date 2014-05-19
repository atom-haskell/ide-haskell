module.exports =
  class GutterControl

    checkResults: []
    lintsResults: []

    className: ['haskell-error', 'haskell-warning', 'haskell-lint']
    attrName: ['check-title', 'check-title', 'lint-title']

    # update check results and update active view
    updateCheck: (results) ->
      @checkResults = results
      @renderCheck atom.workspaceView.getActiveView()

    # update lint results and update active view
    updateLints: (results) ->
      @lintsResults = results
      @renderLints atom.workspaceView.getActiveView()

    # render check results for gutter
    renderCheck: (editorView) ->
      {editor, gutter} = editorView
      gutter.removeClassFromAllLines 'haskell-error'
      gutter.removeClassFromAllLines 'haskell-warning'
      @render editorView, @checkResults

    # render lints for gutter
    renderLints: (editorView) ->
      {editor, gutter} = editorView
      gutter.removeClassFromAllLines 'haskell-lint'
      @render editorView, @lintsResults

    # render gutter with results
    render: (editorView, results) ->
      {editor, gutter} = editorView

      for result in results
        continue unless result.fname is editor.getUri()

        rowNumber = result.line - 1
        continue if rowNumber < gutter.firstScreenRow
        break if rowNumber > gutter.lastScreenRow

        row = gutter.find gutter.getLineNumberElement(result.line - 1)
        row.addClass @className[result.type]
