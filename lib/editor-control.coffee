ResultType = require './constants'

module.exports =
  class EditorControl

    checkResults: {}
    lintsResults: {}

    className: ['haskell-error', 'haskell-warning', 'haskell-lint']

    # update check results and update active view
    updateCheck: (results) ->
      @checkResults = {}
      for result in results
        @checkResults[result.fname] = [] unless @checkResults[result.fname]?
        @checkResults[result.fname].push(result)
      for editorView in atom.workspaceView.getEditorViews()
        @renderCheck editorView

    # update lint results and update active view
    updateLints: (results) ->
      @lintsResults = {}
      for result in results
        @lintsResults[result.fname] = [] unless @lintsResults[result.fname]?
        @lintsResults[result.fname].push(result)
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
        editorView.find('.' + name).removeClass(name)
        gutter.removeClassFromAllLines name
      @render editorView, @checkResults

    # render lints for gutter
    renderLints: (editorView) ->
      {editor, gutter} = editorView
      return unless gutter.isVisible()

      for name in [@className[2]]
        editorView.find('.' + name).removeClass(name)
        gutter.removeClassFromAllLines name
      @render editorView, @lintsResults

    # render gutter with results
    render: (editorView, results) ->
      {editor, gutter} = editorView
      return unless gutter.isVisible() and results[editor.getUri()]?

      for result in results[editor.getUri()]

        rowNumber = result.line - 1
        continue if rowNumber < gutter.firstScreenRow
        break if rowNumber > gutter.lastScreenRow

        # update editor view
        editorRow = editorView.lineElementForScreenRow(result.line - 1)
        editorRow.addClass @className[result.type]

        # update gutter view
        gutterRow = gutter.find gutter.getLineNumberElement(result.line - 1)
        gutterRow.addClass @className[result.type]
