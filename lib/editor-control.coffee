{$, View} = require 'atom'
{isHaskellSource} = require './utils'
utilGhcMod = require './util-ghc-mod'


class EditorControl

  checkResults: [] # all results here for current file
  className: ['ide-haskell-error', 'ide-haskell-warning', 'ide-haskell-lint'] # classes for types

  constructor: (@editorView, @outputView) ->
    @editorView.control = this

    @editor = @editorView.getEditor()
    @gutter = @editorView.gutter
    @scroll = @editorView.find('.scroll-view')

    # say output view to update me
    @outputView.updateEditorView @editorView

    # event for editor updates
    @editorView.on 'editor:display-updated', =>
      @render()
    @editorView.on 'editor:will-be-removed', =>
      @disable()

    # buffer events for automatic check
    @editor.getBuffer().on 'saved', (buffer) =>
      return unless isHaskellSource buffer.getUri()

      # TODO filter current results with buffer.getUri() and update editor
      # we need this in case getUri was changed
      @render()

      if atom.config.get('ide-haskell.checkOnFileSave')
        atom.workspaceView.trigger 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.lintOnFileSave')
        atom.workspaceView.trigger 'ide-haskell:lint-file'

    # mouse movement events to start getting the type of expression
    @scroll.on "mousemove", (event) =>
      clearInterval @timer if @timer?
      @timer = setInterval (=>
        clearInterval @timer
        @showExpressionType(event)
        ), atom.config.get('ide-haskell.expressionTypeInterval')
    @scroll.on "mouseout", =>
      clearInterval @timer if @timer?

  disable: ->
    clearInterval @timer if @timer?

  update: (types, results) ->
    if types?
      @checkResults[t] = [] for t in types
      @pushResult(r) for r in results
    else
      @checkResults = []
      for typeResults in results
        @pushResult(r) for r in typeResults
    @render()

  pushResult: (result) ->
    if result.uri is @editor.getUri()
      @checkResults[result.type] = [] unless @checkResults[result.type]?
      @checkResults[result.type].push(result)

  render: ->
    # remove all classes from gutter and current view
    for name in @className
      @editorView.find(".#{name}").removeClass(name)
      @gutter.removeClassFromAllLines name

    # show everything
    for typeResults in @checkResults by -1
      continue unless typeResults?
      for r in typeResults

        row = r.pos[0] - 1
        continue if row < @editorView.getFirstVisibleScreenRow()
        break if row > @editorView.getLastVisibleScreenRow()

        # update editor view
        @editorView.lineElementForScreenRow(row)
          .addClass @className[r.type]

        # update gutter view
        gutterRow = @gutter.find @gutter.getLineNumberElement(row)
        gutterRow.addClass @className[r.type]

        # tooltip
        # gutterRow.destroyTooltip()
        # gutterRow.setTooltip('<pre class="ide-haskell-tooltip">' +
        #                      r.desc + '</pre>')

  # get expression type under mouse cursor and show it
  showExpressionType: (event) ->
    return unless isHaskellSource @editor.getUri()

    screenPt = @editorView.screenPositionFromMouseEvent(event)
    bufferPt = @editor.bufferPositionForScreenPosition(screenPt)
    if screenPt.isEqual bufferPt
      utilGhcMod.type
        fileName: @editor.getUri()
        pt: screenPt
        onResult: (result) =>
          # @editorView.append("<div>#{result.type}</div>")
          # # TODO show type near mouse pointer
          # console.log result.type

module.exports = {
  EditorControl
}
