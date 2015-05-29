SubAtom = require 'sub-atom'

{screenPositionFromMouseEvent,
pixelPositionFromMouseEvent} = require './utils'
{TooltipMessage} = require './tooltip-view'
{Range,CompositeDisposable,Disposable} = require 'atom'

class EditorControl
  constructor: (@editor, @manager) ->
    @disposables = new SubAtom
    @tooltipMarkers = new CompositeDisposable
    @editorElement = atom.views.getView(@editor).rootElement

    @gutter = @editor.gutterWithName "ide-haskell-check-results"
    @gutter ?= @editor.addGutter
      name: "ide-haskell-check-results"
      priority: 10

    gutterElement = atom.views.getView(@gutter)
    @disposables.add gutterElement, 'mouseenter', ".decoration", (e) =>
      @showCheckResult e
    @disposables.add gutterElement, 'mouseleave', ".decoration", (e) =>
      @hideCheckResult()

    # event for editor updates
    @disposables.add @editor.onDidDestroy =>
      @deactivate()

    @disposables.add @manager.onResultsUpdated @updateResults

    # buffer events for automatic check
    buffer = @editor.getBuffer()
    @disposables.add buffer.onWillSave () =>
      # TODO if uri was changed, then we have to remove all current markers
      editorElement = atom.views.getView(@editor)
      if atom.config.get('ide-haskell.onSaveCheck')
        atom.commands.dispatch editorElement, 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.onSaveLint')
        atom.commands.dispatch editorElement, 'ide-haskell:lint-file'
      if atom.config.get('ide-haskell.onSavePrettify')
        atom.commands.dispatch editorElement, 'ide-haskell:prettify-file'

    # show expression type if mouse stopped somewhere
    @disposables.add @editorElement, 'mousemove', '.scroll-view', (e) =>
      pixelPt = pixelPositionFromMouseEvent @editor, e
      screenPt = @editor.screenPositionForPixelPosition pixelPt
      bufferPt = @editor.bufferPositionForScreenPosition screenPt

      return if @lastMouseBufferPt?.isEqual(bufferPt)
      @lastMouseBufferPt = bufferPt

      action = atom.config.get('ide-haskell.onMouseHoverShow')
      return if action == 'Nothing'

      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        @showExpressionType bufferPt, 'mouse', 'get'+action
      ), atom.config.get('ide-haskell.expressionTypeInterval')
    @disposables.add @editorElement, 'mouseout', '.scroll-view', (e) =>
      action = atom.config.get('ide-haskell.onMouseHoverShow')
      return if action == 'Nothing'
      @clearExprTypeTimeout()

    @disposables.add @editor.onDidChangeCursorPosition =>
      if atom.config.get('ide-haskell.closeTooltipsOnCursorMove')
        @clearExprTypeTimeout()
        @hideExpressionType()

    # update all results from manager
    @updateResults {}

  deactivate: ->
    @clearExprTypeTimeout()
    @hideExpressionType()
    @hideCheckResult()
    @disposables.dispose()
    @tooltipMarkers.dispose()
    @manager = null
    @disposables = null
    @editorElement = null
    @editor = null
    @lastMouseBufferPt = null
    @tooltipMarkers=null

  # helper function to hide tooltip and stop timeout
  clearExprTypeTimeout: ->
    if @exprTypeTimeout?
      clearTimeout @exprTypeTimeout
      @exprTypeTimeout = null

  updateResults: ({res, types}) =>
    res ?= @manager.checkResults
    types ?= Object.keys(res)
    @destroyMarkersForTypes types
    for t in types
      @markerFromCheckResult(r) for r in res[t]
    @renderResults types

  destroyMarkersForTypes: (types) ->
    for t in types
      for m in @editor.findMarkers {type: 'check-result', severity: t}
        m.destroy()

  markerFromCheckResult: ({uri, severity, message, position}) ->
    return unless uri is @editor.getURI()

    # create a new marker
    range = new Range position, {row: position.row, column: position.column+1}
    marker = @editor.markBufferRange range,
      type: 'check-result'
      severity: severity
      desc: message

  renderResults: (types) ->
    for t in types
      for m in @editor.findMarkers {type: 'check-result', severity: t}
        @decorateMarker(m)

  decorateMarker: (m) ->
    cls = 'ide-haskell-'+m.getProperties().severity
    @gutter.decorateMarker m, type: 'line-number', class: cls
    @editor.decorateMarker m, type: 'highlight', class: cls
    @editor.decorateMarker m, type: 'line', class: cls

  # get expression type under mouse cursor and show it
  showExpressionType: (bufferPt, eventType, fun = 'getType') ->
    mouseEvent = contextEvent = keyboardEvent = false
    switch eventType
      when 'mouse'
        [selRange] = @editor.getSelections()
          .map (sel) ->
            sel.getBufferRange()
          .filter (sel) ->
            sel.containsPoint bufferPt
        crange = selRange ? bufferPt
        mouseEvent = true
      when 'context'
        bufferPt = @lastMouseBufferPt
        crange = bufferPt
        contextEvent = true
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
        bufferPt = crange.start
        keyboardEvent = true
      else
        throw new Error "unknown event type #{eventType}"

    if bufferPt.isEqual @editor.bufferRangeForBufferRow(bufferPt.row).end
      @hideExpressionType()
      return

    runPendingEvent = ({fun,crange}) =>
      @showExpressionTypePendingEvent = null
      @showExpressionTypeRunning = true
      @manager.backend?[fun] @editor.getBuffer(), crange, ({range,type,info}) =>
        if @showExpressionTypePendingEvent?
          runPendingEvent @showExpressionTypePendingEvent
          return
        @showExpressionTypeRunning = false
        type ?= info
        if range.isEqual(@tooltipHighlightRange)
          # if @tooltipMarkerId?
          #   tooltipMarker = @editor.getMarker(@tooltipMarkerId)
          #   tooltipMarker.setBufferRange new Range(bufferPt,bufferPt)
          return
        #exit if mouse moved away
        if mouseEvent
          unless range.containsPoint(@lastMouseBufferPt)
            return
        @tooltipHighlightRange = range
        @hideExpressionType()
        unless type?
          @manager.backendWarning()
          return
        @markerBufferRange=range
        if mouseEvent or contextEvent
          tooltipMarker = @editor.markBufferPosition range.start
        else
          tooltipMarker = @editor.markBufferPosition bufferPt
        # @tooltipMarkerId = tooltipMarker.id
        highlightMarker = @editor.markBufferRange range
        @tooltipMarkers.add new Disposable ->
          tooltipMarker.destroy()
        @tooltipMarkers.add new Disposable ->
          highlightMarker.destroy()
        @editor.decorateMarker tooltipMarker,
          type: 'overlay'
          item: new TooltipMessage type
        @editor.decorateMarker highlightMarker,
          type: 'highlight'
          class: 'ide-haskell-type'

    @showExpressionTypePendingEvent = {fun, crange}
    unless @showExpressionTypeRunning
      runPendingEvent @showExpressionTypePendingEvent

  hideExpressionType: ->
    @tooltipHighlightRange=null
    @tooltipMarkers.dispose()
    @tooltipMarkers = new CompositeDisposable

  # show check result when mouse over gutter icon
  showCheckResult: (e) ->
    @hideCheckResult()
    row = @editor.bufferPositionForScreenPosition(
      screenPositionFromMouseEvent(@editor, e)).row

    [marker] = @editor.findMarkers {type: 'check-result', startBufferRow: row}

    return unless marker?

    @checkResultTooltip = @editor.decorateMarker marker,
      type: 'overlay'
      position: 'tail'
      item: new TooltipMessage marker.getProperties().desc

  hideCheckResult: ->
    if @checkResultTooltip?
      @checkResultTooltip.destroy()
      @checkResultTooltip = null

  insertType: (eventType) ->
    switch eventType
      when 'context'
        crange = @lastMouseBufferPt
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
      else
        throw new Error "unknown event type #{eventType}"
    @manager.backend.getType @editor.getBuffer(), crange, ({range,type}) =>
      n = @editor.indentationForBufferRow(range.start.row)
      indent = ' '.repeat n*@editor.getTabLength()
      @editor.scanInBufferRange /[\w'.]+/, range, ({matchText,stop}) =>
        symbol = matchText
        pos=[range.start.row,0]
        @editor.setTextInBufferRange [pos,pos],
          indent+symbol+" :: "+type+"\n"
        stop()

  insertImport: (eventType) ->
    switch eventType
      when 'context'
        crange = @lastMouseBufferPt
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
      else
        throw new Error "unknown event type #{eventType}"
    @manager.backend.getModulesExportingSymbolAt @editor.getBuffer(),
      crange, (lines) ->
        console.log line for line in lines

  closeTooltips: () ->
    @hideExpressionType()
    @hideCheckResult()

module.exports = {
  EditorControl
}
