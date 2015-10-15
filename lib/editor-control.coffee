SubAtom = require 'sub-atom'

{bufferPositionFromMouseEvent} = require './utils'
{TooltipMessage} = require './views/tooltip-view'
{Range, Disposable, Emitter} = require 'atom'

class EditorControl
  constructor: (@editor) ->
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter

    @editorElement = atom.views.getView(@editor).rootElement

    unless atom.config.get 'ide-haskell.useLinter'
      @gutter = @editor.gutterWithName "ide-haskell-check-results"
      @gutter ?= @editor.addGutter
        name: "ide-haskell-check-results"
        priority: 10

      gutterElement = atom.views.getView(@gutter)
      @disposables.add gutterElement, 'mouseenter', ".decoration", (e) =>
        bufferPt = bufferPositionFromMouseEvent @editor, e
        @lastMouseBufferPt = bufferPt
        @showCheckResult bufferPt, true
      @disposables.add gutterElement, 'mouseleave', ".decoration", (e) =>
        @hideTooltip()

    # buffer events for automatic check
    buffer = @editor.getBuffer()
    editorElement = atom.views.getView(@editor)
    @disposables.add buffer.onWillSave ->
      # TODO if uri was changed, then we have to remove all current markers
      if atom.config.get('ide-haskell.onSavePrettify')
        atom.commands.dispatch editorElement, 'ide-haskell:prettify-file'

    @disposables.add buffer.onDidSave ->
      # TODO if uri was changed, then we have to remove all current markers
      if atom.config.get('ide-haskell.onSaveCheck')
        atom.commands.dispatch editorElement, 'ide-haskell:check-file'
      if atom.config.get('ide-haskell.onSaveLint')
        atom.commands.dispatch editorElement, 'ide-haskell:lint-file'

    # show expression type if mouse stopped somewhere
    @disposables.add @editorElement, 'mousemove', '.scroll-view', (e) =>
      bufferPt = bufferPositionFromMouseEvent @editor, e

      return if @lastMouseBufferPt?.isEqual(bufferPt)
      @lastMouseBufferPt = bufferPt

      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=> @shouldShowTooltip bufferPt),
        atom.config.get('ide-haskell.expressionTypeInterval')
    @disposables.add @editorElement, 'mouseout', '.scroll-view', (e) =>
      @clearExprTypeTimeout()

    @disposables.add @editor.onDidChangeCursorPosition =>
      if atom.config.get('ide-haskell.closeTooltipsOnCursorMove')
        @clearExprTypeTimeout()
        @hideTooltip()

  deactivate: ->
    @clearExprTypeTimeout()
    @hideTooltip()
    @disposables.dispose()
    @disposables = null
    @editorElement = null
    @editor = null
    @lastMouseBufferPt = null

  # helper function to hide tooltip and stop timeout
  clearExprTypeTimeout: ->
    if @exprTypeTimeout?
      clearTimeout @exprTypeTimeout
      @exprTypeTimeout = null

  updateResults: (res, types) =>
    if types?
      for t in types
        m.destroy() for m in @editor.findMarkers {type: 'check-result', severity: t}
    else
      m.destroy() for m in @editor.findMarkers {type: 'check-result'}
    @markerFromCheckResult(r) for r in res

  markerFromCheckResult: ({uri, severity, message, position}) ->
    return unless uri is @editor.getURI()

    # create a new marker
    range = new Range position, {row: position.row, column: position.column + 1}
    marker = @editor.markBufferRange range,
      type: 'check-result'
      severity: severity
      desc: message

    @decorateMarker(marker)

  decorateMarker: (m) ->
    return unless @gutter?
    cls = 'ide-haskell-' + m.getProperties().severity
    @gutter.decorateMarker m, type: 'line-number', class: cls
    @editor.decorateMarker m, type: 'highlight', class: cls
    @editor.decorateMarker m, type: 'line', class: cls

  onShouldShowTooltip: (callback) ->
    @emitter.on 'should-show-tooltip', callback

  shouldShowTooltip: (pos) ->
    return if @showCheckResult pos

    if pos.row < 0 or
       pos.row >= @editor.getLineCount() or
       pos.isEqual @editor.bufferRangeForBufferRow(pos.row).end
      @hideTooltip 'mouse'
    else
      @emitter.emit 'should-show-tooltip', {@editor, pos}

  showTooltip: (pos, range, text, eventType) ->
    return unless @editor?

    if range.isEqual(@tooltipHighlightRange)
      return
    @hideTooltip()
    #exit if mouse moved away
    if eventType is 'mouse'
      unless range.containsPoint(@lastMouseBufferPt)
        return
    @tooltipHighlightRange = range
    @markerBufferRange = range
    markerPos =
      switch eventType
        when 'keyboard' then pos
        else range.start
    tooltipMarker = @editor.markBufferPosition markerPos,
      type: 'tooltip'
      eventType: eventType
    highlightMarker = @editor.markBufferRange range,
      type: 'tooltip'
      eventType: eventType
    @editor.decorateMarker tooltipMarker,
      type: 'overlay'
      item: new TooltipMessage text
    @editor.decorateMarker highlightMarker,
      type: 'highlight'
      class: 'ide-haskell-type'

  hideTooltip: (eventType) ->
    @tooltipHighlightRange = null
    template = type: 'tooltip'
    if eventType?
      template.eventType = eventType
    m.destroy() for m in @editor.findMarkers template

  getEventRange: (pos, eventType) ->
    switch eventType
      when 'mouse'
        [selRange] = @editor.getSelections()
          .map (sel) ->
            sel.getBufferRange()
          .filter (sel) ->
            sel.containsPoint pos
        crange = selRange ? pos
      when 'context'
        pos = @lastMouseBufferPt
        crange = pos
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
        pos = crange.start
      else
        throw new Error "unknown event type #{eventType}"

    return {crange, pos}

  findCheckResultMarkers: (pos, gutter) ->
    if gutter
      @editor.findMarkers {type: 'check-result', startBufferRow: pos.row}
    else
      @editor.findMarkers {type: 'check-result', containsPoint: pos}

  # show check result when mouse over gutter icon
  showCheckResult: (pos, gutter) ->
    markers = @findCheckResultMarkers pos, gutter
    [marker] = markers

    unless marker?
      @hideTooltip() if @checkResultShowing
      @checkResultShowing = false
      return false

    text = (markers.map (marker) ->
      marker.getProperties().desc).join('\n\n')

    if gutter
      @showTooltip pos, new Range(pos, pos), text, 'mouse'
    else
      @showTooltip pos, marker.getBufferRange(), text, 'mouse'

    @checkResultShowing = true
    return true

  hasTooltips: ->
    !!@editor.findMarkers(type: 'tooltip').length

module.exports = {
  EditorControl
}
