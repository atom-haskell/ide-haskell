SubAtom = require 'sub-atom'

{isHaskellSource, screenPositionFromMouseEvent,
pixelPositionFromMouseEvent} = require './utils'
{TooltipView} = require './tooltip-view'
{Range} = require 'atom'

class EditorControl
  constructor: (@editor, @manager) ->
    @checkMarkers = {}
    @disposables = new SubAtom
    @editorElement = atom.views.getView(@editor).rootElement

    # defer-init the gutter events (#37)
    @initGutterSched = setTimeout (=>
      @initGutter()
    ), 100 # 0 seems to be enough here, but wait a bit just to be safe.

    # event for editor updates
    @disposables.add @editor.onDidDestroy =>
      @deactivate()

    @disposables.add @manager.onResultsUpdated @updateResults

    # buffer events for automatic check
    buffer = @editor.getBuffer()
    @disposables.add buffer.onDidSave () ->
      return unless isHaskellSource buffer.getUri()

      # TODO if uri was changed, then we have to remove all current markers
      workspaceElement = atom.views.getView(atom.workspace)
      if atom.config.get('ide-haskell.checkOnFileSave')
        atom.commands.dispatch workspaceElement, 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.lintOnFileSave')
        atom.commands.dispatch workspaceElement, 'ide-haskell:lint-file'

    # show expression type if mouse stopped somewhere
    @disposables.add @editorElement, 'mousemove', '.scroll-view', (e) =>
      pixelPt = pixelPositionFromMouseEvent @editor, e
      screenPt = @editor.screenPositionForPixelPosition pixelPt
      bufferPt = @editor.bufferPositionForScreenPosition screenPt
      return if @lastExprTypeBufferPt?.isEqual(bufferPt)

      @lastExprTypeBufferPt = bufferPt
      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        @showExpressionType e
      ), atom.config.get('ide-haskell.expressionTypeInterval')
    @disposables.add @editorElement, 'mouseout', '.scroll-view', (e) =>
      @clearExprTypeTimeout()

    # update all results from manager
    @updateResults {}

  initGutter: ->
    clearTimeout(@initGutterSched)

    # mouse movement over gutter to show check results
    for c in ['ide-haskell-error', 'ide-haskell-warning', 'ide-haskell-lint']
      @disposables.add @editorElement, 'mouseenter', ".gutter .#{c}", (e) =>
        @showCheckResult e
      @disposables.add @editorElement, 'mouseleave', ".gutter .#{c}", (e) =>
        @hideCheckResult()
    @disposables.add @editorElement, 'mouseleave', '.gutter', (e) =>
      @hideCheckResult()

  deactivate: ->
    clearTimeout(@initGutterSched)
    @clearExprTypeTimeout()
    @hideCheckResult()
    @disposables.dispose()

  # helper function to hide tooltip and stop timeout
  clearExprTypeTimeout: ->
    if @exprTypeTimeout?
      clearTimeout @exprTypeTimeout
      @exprTypeTimeout = null
    @hideExpressionType()

  updateResults: ({res, types}) =>
    res ?= @manager.checkResults
    types ?= Object.keys(res)
    @destroyMarkersForTypes types
    for t in types
      @markerFromCheckResult(r) for r in res[t]
    @renderResults types

  destroyMarkersForTypes: (types) ->
    for t in types
      m.marker.destroy() for m in @checkMarkers[t] ? []
      @checkMarkers[t] = []

  markerFromCheckResult: ({uri, severity, message, position}) ->
    return unless uri is @editor.getURI()
    @checkMarkers[severity] = [] unless @checkMarkers[severity]?

    # create a new marker
    range = new Range position, {row: position.row, column: position.column+1}
    marker = @editor.markBufferRange range, invalidate: 'never'
    @checkMarkers[severity].push
      marker: marker
      klass: 'ide-haskell-'+severity
      desc: message

  renderResults: (types) ->
    for t in types
      for m in @checkMarkers[t]
        @decorateMarker(m)

  decorateMarker: (m) ->
    { marker, klass } = m
    @editor.decorateMarker marker, type: 'line-number', class: klass
    @editor.decorateMarker marker, type: 'highlight', class: klass
    @editor.decorateMarker marker, type: 'line', class: klass

  # get expression type under mouse cursor and show it
  showExpressionType: (e) ->
    return unless isHaskellSource(@editor.getURI()) and not @exprTypeTooltip?

    pixelPt = pixelPositionFromMouseEvent(@editor, e)
    screenPt = @editor.screenPositionForPixelPosition(pixelPt)
    bufferPt = @editor.bufferPositionForScreenPosition(screenPt)
    range = new Range bufferPt, bufferPt
    editorElement = atom.views.getView(@editor)
    nextCharPixelPt = editorElement.pixelPositionForBufferPosition(
      [bufferPt.row, bufferPt.column + 1])

    return if pixelPt.left > nextCharPixelPt.left

    # find out show position
    offset = @editor.getLineHeightInPixels() * 0.7
    tooltipRect =
      left: e.clientX
      right: e.clientX
      top: e.clientY - offset
      bottom: e.clientY + offset

    # create tooltip with pending
    @exprTypeTooltip = new TooltipView(tooltipRect)

    # process start
    @manager.backend?.getType @editor.getBuffer(), range, ({type}) =>
      @exprTypeTooltip?.updateText(type)

  hideExpressionType: ->
    if @exprTypeTooltip?
      @exprTypeTooltip.remove()
      @exprTypeTooltip = null

  # show check result when mouse over gutter icon
  showCheckResult: (e) ->
    @hideCheckResult()
    row = @editor.bufferPositionForScreenPosition(
      screenPositionFromMouseEvent(@editor, e)).row

    # find best result for row
    foundResult = null
    console.log @checkMarkers
    for t, markers of @checkMarkers
      console.log markers
      continue unless markers?
      for m in markers
        {marker, desc} = m
        if marker.getHeadBufferPosition().row is row
          foundResult = desc
          break
      break if foundResult?

    console.log foundResult
    # append tooltip if result found
    return unless foundResult?

    # create show position
    targetRect = e.currentTarget.getBoundingClientRect()
    offset = @editor.getLineHeightInPixels() * 0.3
    rect =
      left: targetRect.left - offset
      right: targetRect.right + offset
      top: targetRect.top - offset
      bottom: targetRect.bottom + offset

    @checkResultTooltip = new TooltipView(rect, foundResult)

  hideCheckResult: ->
    if @checkResultTooltip?
      @checkResultTooltip.remove()
      @checkResultTooltip = null

module.exports = {
  EditorControl
}
