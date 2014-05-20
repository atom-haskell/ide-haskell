# TODO need optimisation!
# in updateCheck and updateLints we can store results in
# hash map using filename as key, so in render function we
# can find data to draw much faster!

module.exports =
  class GutterControl

    checkResults: []
    lintsResults: []

    className: ['haskell-error', 'haskell-warning', 'haskell-lint']

    # update check results and update active view
    updateCheck: (results) ->
      @checkResults = results
      for editorView in atom.workspaceView.getEditorViews()
        @renderCheck editorView

    # update lint results and update active view
    updateLints: (results) ->
      @lintsResults = results
      for editorView in atom.workspaceView.getEditorViews()
        @renderLints editorView

    # render view
    renderView: (editorView) ->
      @renderCheck editorView
      @renderLints editorView

    # render check results for gutter
    renderCheck: (editorView) ->
      {editor, gutter} = editorView
      return unless gutter.isVisible()

      for name in [@className[0], @className[1]]
        gutter.removeClassFromAllLines name
      @render editorView, @checkResults

    # render lints for gutter
    renderLints: (editorView) ->
      {editor, gutter} = editorView
      return unless gutter.isVisible()

      gutter.removeClassFromAllLines @className[2]
      @render editorView, @lintsResults

    # render gutter with results
    render: (editorView, results) ->
      {editor, gutter} = editorView
      return unless gutter.isVisible()

      for result in results
        continue unless result.fname is editor.getUri()

        rowNumber = result.line - 1
        continue if rowNumber < gutter.firstScreenRow
        break if rowNumber > gutter.lastScreenRow

        row = gutter.find gutter.getLineNumberElement(result.line - 1)
        row.addClass @className[result.type]
