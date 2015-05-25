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
      action = atom.config.get('ide-haskell.onMouseHoverShow')
      return if action == 'Nothing'
      pixelPt = pixelPositionFromMouseEvent @editor, e
      screenPt = @editor.screenPositionForPixelPosition pixelPt
      bufferPt = @editor.bufferPositionForScreenPosition screenPt
      return if @lastExprTypeBufferPt?.isEqual(bufferPt)

      @lastExprTypeBufferPt = bufferPt
      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        @showExpressionType e, 'get'+action
      ), atom.config.get('ide-haskell.expressionTypeInterval')
    @disposables.add @editorElement, 'mouseout', '.scroll-view', (e) =>
      action = atom.config.get('ide-haskell.onMouseHoverShow')
      return if action == 'Nothing'
      @clearExprTypeTimeout()

    @disposables.add @editor.onDidChangeCursorPosition =>
      @clearExprTypeTimeout()

    # update all results from manager
    @updateResults {}

  deactivate: ->
    if @manager? #if has not been deactivated before
      @manager = null
      @clearExprTypeTimeout()
      @hideCheckResult()
      @disposables.dispose()
      @tooltipMarkers.dispose()
      @disposables = null
      @editorElement = null
      @editor = null
      @lastExprTypeBufferPt = null
      @tooltipMarkers=null

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
  showExpressionType: (e,fun = "getType") ->
    @hideExpressionType()

    if e?
      pixelPt = pixelPositionFromMouseEvent(@editor, e)
      screenPt = @editor.screenPositionForPixelPosition(pixelPt)
      bufferPt = @editor.bufferPositionForScreenPosition(screenPt)
      [selRange] = @editor.getSelections()
        .map (sel) ->
          sel.getBufferRange()
        .filter (sel) ->
          sel.containsPoint bufferPt
      crange = selRange ? bufferPt
      if bufferPt.isEqual @editor.bufferRangeForBufferRow(bufferPt.row).end
        return
    else
      crange = @editor.getLastSelection().getBufferRange()
      bufferPt = crange.start

    # process start
    @manager.backend?[fun] @editor.getBuffer(), crange, ({range,type,info}) =>
      type ?= info
      @hideExpressionType()
      tooltipMarker = @editor.markBufferPosition bufferPt
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

  hideExpressionType: ->
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

  insertType: ->
    crange = @editor.getLastSelection().getBufferRange()
    @manager.backend.getType @editor.getBuffer(), crange, ({range,type}) =>
      n = @editor.indentationForBufferRow(range.start.row)
      indent = ' '.repeat n*@editor.getTabLength()
      @editor.scanInBufferRange /[\w'.]+/, range, ({matchText,stop}) =>
        symbol = matchText
        pos=[range.start.row,0]
        @editor.setTextInBufferRange [pos,pos],
          indent+symbol+" :: "+type+"\n"
        stop()

  closeTooltips: () ->
    @hideExpressionType()
    @hideCheckResult()

module.exports = {
  EditorControl
}
