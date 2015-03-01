{$$, $$$, View} = require 'atom-space-pen-views'
$ = require 'jquery'
{Subscriber} = require 'emissary'

{Channel} = require './pending-backend'
{isHaskellSource, screenPositionFromMouseEvent, pixelPositionFromMouseEvent, getElementsByClass} = require './utils'
{TooltipView} = require './tooltip-view'
utilGhcMod = require './util-ghc-mod'
{CompositeDisposable} = require 'atom'

class EditorControl
  className: ['ide-haskell-error', 'ide-haskell-warning', 'ide-haskell-lint']

  constructor: (@editor, @manager) ->
    @checkMarkers = []
    @disposables = new CompositeDisposable
    @editorElement = atom.views.getView(@editor)

    @scroll = $(getElementsByClass(@editorElement, '.scroll-view'))

    @subscriber = new Subscriber()

    # defer-init the gutter events (#37)
    @initGutterSched = setTimeout (=>
      @initGutter()
    ), 100 # 0 seems to be enough here, but wait a bit just to be safe.

    # event for editor updates
    @disposables.add @editor.onDidDestroy =>
      @deactivate()

    # buffer events for automatic check
    buffer = @editor.getBuffer()
    @disposables.add buffer.onDidSave () =>
      return unless isHaskellSource buffer.getUri()

      # TODO if uri was changed, then we have to remove all current markers
      workspaceElement = atom.views.getView(atom.workspace)
      if atom.config.get('ide-haskell.checkOnFileSave')
        atom.commands.dispatch workspaceElement, 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.lintOnFileSave')
        atom.commands.dispatch workspaceElement, 'ide-haskell:lint-file'

    # show expression type if mouse stopped somewhere
    @subscriber.subscribe @scroll, 'mousemove', (e) =>
      pixelPt = pixelPositionFromMouseEvent @editor, e
      screenPt = @editor.screenPositionForPixelPosition pixelPt
      bufferPt = @editor.bufferPositionForScreenPosition screenPt
      return if @lastExprTypeBufferPt?.isEqual(bufferPt)

      @lastExprTypeBufferPt = bufferPt
      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        @showExpressionType e
      ), atom.config.get('ide-haskell.expressionTypeInterval')
    @subscriber.subscribe @scroll, 'mouseout', (e) =>
      @clearExprTypeTimeout()

    # update all results from manager
    @resultsUpdated()

  initGutter: ->
    clearTimeout(@initGutterSched)

    @gutter = $(getElementsByClass(@editorElement, '.gutter'))

    # mouse movement over gutter to show check results
    for klass in @className
      @subscriber.subscribe @gutter, 'mouseenter', ".#{klass}", (e) =>
        @showCheckResult e
      @subscriber.subscribe @gutter, 'mouseleave', ".#{klass}", (e) =>
        @hideCheckResult()
    @subscriber.subscribe @gutter, 'mouseleave', (e) =>
      @hideCheckResult()

  deactivate: ->
    clearTimeout(@initGutterSched)
    @clearExprTypeTimeout()
    @hideCheckResult()
    @subscriber.unsubscribe()
    @disposables.dispose()

  # helper function to hide tooltip and stop timeout
  clearExprTypeTimeout: ->
    if @exprTypeTimeout?
      clearTimeout @exprTypeTimeout
      @exprTypeTimeout = null
    @hideExpressionType()

  resultsUpdated: (types = undefined) ->
    @destroyMarkersForTypes types
    if types?
      for t in types
        @markerFromCheckResult(r) for r in @manager.checkResults[t]
    else
      for typeResults in @manager.checkResults
        @markerFromCheckResult(r) for r in typeResults
    @renderResults types

  destroyMarkersForTypes: (types = undefined) ->
    if types?
      for t in types
        m.marker.destroy() for m in @checkMarkers[t] ? []
        @checkMarkers[t] = []
    else
      for markers in @checkMarkers
        m.marker.destroy() for m in markers
      @checkMarkers = []

  markerFromCheckResult: (result) ->
    return unless result.uri is @editor.getURI()
    @checkMarkers[result.type] = [] unless @checkMarkers[result.type]?

    # create a new marker
    marker = @editor.markBufferRange result.range, invalidate: 'never'
    @checkMarkers[result.type].push({ marker, klass: @className[result.type], desc: result.desc })

  renderResults: (types = undefined) ->
    if types?
      for t in types
        for m in @checkMarkers[t]
          @decorateMarker(m)
    else
      for markers in @checkMarkers
        for m in markers ? []
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
    editorElement = atom.views.getView(@editor);
    nextCharPixelPt = editorElement.pixelPositionForBufferPosition([bufferPt.row, bufferPt.column + 1])

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
    @manager.pendingProcessController.start Channel.expressionType, utilGhcMod.type, {
      pt: bufferPt
      fileName: @editor.getURI()
      onResult: (result) =>
        @exprTypeTooltip?.updateText(result.type)
    }

  hideExpressionType: ->
    if @exprTypeTooltip?
      @exprTypeTooltip.remove()
      @exprTypeTooltip = null

  # show check result when mouse over gutter icon
  showCheckResult: (e) ->
    @hideCheckResult()
    row = @editor.bufferPositionForScreenPosition(screenPositionFromMouseEvent(@editor, e)).row

    # find best result for row
    foundResult = null
    for markers in @checkMarkers
      continue unless markers?
      for m in markers
        {marker, desc} = m
        if marker.getHeadBufferPosition().row is row
          foundResult = desc
          break
      break if foundResult?

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
