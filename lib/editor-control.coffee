{$, $$, $$$, View} = require 'atom'
{Subscriber} = require 'emissary'

{isHaskellSource} = require './utils'
{TooltipView} = require './tooltip-view'
utilGhcMod = require './util-ghc-mod'


class EditorControl

  checkResults: [] # all results here for current file
  className: ['error', 'warning', 'lint']

  subscriber: null

  checkResultTooltip: null
  exprTypeTooltip: null

  constructor: (@editorView, @manager) ->
    @editor = @editorView.getEditor()
    @gutter = @editorView.gutter
    @scroll = @editorView.find('.scroll-view')

    @subscriber = new Subscriber()

    # event for editor updates
    @subscriber.subscribe @editorView, 'editor:display-updated', =>
      @renderResults()
    @subscriber.subscribe @editorView, 'editor:will-be-removed', =>
      @deactivate()

    # buffer events for automatic check
    @subscriber.subscribe @editor.getBuffer(), 'saved', (buffer) =>
      return unless isHaskellSource buffer.getUri()

      # TODO filter current results with buffer.getUri() and update editor
      # we need this in case getUri was changed
      @renderResults()

      if atom.config.get('ide-haskell.checkOnFileSave')
        atom.workspaceView.trigger 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.lintOnFileSave')
        atom.workspaceView.trigger 'ide-haskell:lint-file'

    # show expression type if mouse stopped somewhere
    @subscriber.subscribe @scroll, 'mousemove', (e) =>
      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        @showExpressionType e
      ), atom.config.get('ide-haskell.expressionTypeInterval')
    @subscriber.subscribe @scroll, 'mouseout', (e) =>
      @clearExprTypeTimeout()

    # mouse movement over gutter to show check results
    @subscriber.subscribe @gutter, 'mouseenter', '.ide-haskell-result', (e) =>
      @showCheckResult e
    @subscriber.subscribe @gutter, 'mouseleave', '.ide-haskell-result', (e) =>
      @hideCheckResult()
    @subscriber.subscribe @gutter, 'mouseleave', (e) =>
      @hideCheckResult()

    # update all results from manager
    @resultsUpdated()

  deactivate: ->
    @clearExprTypeTimeout()
    @hideCheckResult()
    @subscriber.unsubscribe()
    @editorView.control = undefined

  # helper function to hide tooltip and stop timeout
  clearExprTypeTimeout: ->
    if @exprTypeTimeout?
      clearTimeout @exprTypeTimeout
      @exprTypeTimeout = null
    @hideExpressionType()

  resultsUpdated: (types = undefined) ->
    if types?
      for t in types
        @checkResults[t] = []
        @pushResult(r) for r in @manager.checkResults[t]
    else
      @checkResults = []
      for typeResults in @manager.checkResults
        @pushResult(r) for r in typeResults
    @renderResults()

  pushResult: (result) ->
    if result.uri is @editor.getUri()
      @checkResults[result.type] = [] unless @checkResults[result.type]?
      @checkResults[result.type].push(result)

  renderResults: ->
    # remove all classes from gutter and current view
    @editorView.find('.ide-haskell-result').removeClass('ide-haskell-result')
    @gutter.removeClassFromAllLines('ide-haskell-result')

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
          .addClass 'ide-haskell-result'
          .addClass @className[r.type]

        # update gutter view
        gutterRow = @gutter.find @gutter.getLineNumberElement(row)
        gutterRow
          .addClass 'ide-haskell-result'
          .addClass @className[r.type]

  # get expression type under mouse cursor and show it
  showExpressionType: (e) ->
    return unless isHaskellSource(@editor.getUri()) and not @exprTypeTooltip?

    screenPt = @editorView.screenPositionFromMouseEvent(e)
    bufferPt = @editor.bufferPositionForScreenPosition(screenPt)
    if screenPt.isEqual bufferPt

      # find out show position
      offset = @editorView.lineHeight * 0.7
      tooltipRect =
        left: e.clientX
        right: e.clientX
        top: e.clientY - offset
        bottom: e.clientY + offset

      # create tooltip with pending
      @exprTypeTooltip = new TooltipView(tooltipRect)

      # process start
      params =
        pt: screenPt
        fileName: @editor.getUri()
        onResult: (result) => @exprTypeTooltip?.updateText(result.type)

      @manager.pendingProcessController.start utilGhcMod.type, params

  hideExpressionType: ->
    if @exprTypeTooltip?
      @exprTypeTooltip.remove()
      @exprTypeTooltip = null

  # show check result when mouse over gutter icon
  showCheckResult: (e) ->
    @hideCheckResult()
    row = @editorView.screenPositionFromMouseEvent(e).row + 1

    # find best result for row
    foundResult = null
    for typeResults in @checkResults
      continue unless typeResults?
      for r in typeResults
        if r.pos[0] is row
          foundResult = r
          break
      break if foundResult?

    # append tooltip if result found
    return unless foundResult?

    # create show position
    targetRect = e.currentTarget.getBoundingClientRect()
    offset = @editorView.lineHeight * 0.3
    rect =
      left: targetRect.left - offset
      right: targetRect.right + offset
      top: targetRect.top - offset
      bottom: targetRect.bottom + offset

    @checkResultTooltip = new TooltipView(rect, foundResult.desc)

  hideCheckResult: ->
    if @checkResultTooltip?
      @checkResultTooltip.remove()
      @checkResultTooltip = null

module.exports = {
  EditorControl
}
