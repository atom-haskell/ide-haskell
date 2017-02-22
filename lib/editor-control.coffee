Range = null

module.exports =
class EditorControl
  constructor: (@editor) ->
    SubAtom = require 'sub-atom'
    @disposables = new SubAtom
    {Range, Emitter} = require 'atom'
    @disposables.add @emitter = new Emitter

    editorElement = atom.views.getView(@editor)

    @gutter = @editor.gutterWithName "ide-haskell-check-results"
    @gutter ?= @editor.addGutter
      name: "ide-haskell-check-results"
      priority: 10

    {bufferPositionFromMouseEvent} = require './utils'

    gutterElement = atom.views.getView(@gutter)
    @disposables.add gutterElement, 'mouseenter', ".decoration", (e) =>
      bufferPt = bufferPositionFromMouseEvent @editor, e
      if bufferPt?
        @lastMouseBufferPt = bufferPt
        @showCheckResult bufferPt, true
    @disposables.add gutterElement, 'mouseleave', ".decoration", (e) =>
      @hideTooltip()

    # buffer events for automatic check
    buffer = @editor.getBuffer()
    @disposables.add buffer.onWillSave =>
      @emitter.emit 'will-save-buffer', buffer
      if atom.config.get('ide-haskell.onSavePrettify')
        atom.commands.dispatch editorElement, 'ide-haskell:prettify-file'

    @disposables.add buffer.onDidSave =>
      @emitter.emit 'did-save-buffer', buffer

    @disposables.add @editor.onDidStopChanging =>
      @emitter.emit 'did-stop-changing', @editor

    @disposables.add editorElement.onDidChangeScrollLeft =>
      @hideTooltip eventType: 'mouse'
    @disposables.add editorElement.onDidChangeScrollTop =>
      @hideTooltip eventType: 'mouse'

    # show expression type if mouse stopped somewhere
    @disposables.add editorElement.rootElement, 'mousemove', '.scroll-view', (e) =>
      bufferPt = bufferPositionFromMouseEvent @editor, e

      return unless bufferPt?

      return if @lastMouseBufferPt?.isEqual(bufferPt)
      @lastMouseBufferPt = bufferPt

      clearTimeout @exprTypeTimeout if @exprTypeTimeout?
      @exprTypeTimeout = setTimeout (=> @shouldShowTooltip bufferPt),
        atom.config.get('ide-haskell.expressionTypeInterval')
    @disposables.add editorElement.rootElement, 'mouseout', '.scroll-view', (e) =>
      clearTimeout @exprTypeTimeout if @exprTypeTimeout?

    @disposables.add @editor.onDidChangeSelectionRange ({newBufferRange}) =>
      clearTimeout @selTimeout if @selTimeout?
      if newBufferRange.isEmpty()
        @hideTooltip eventType: 'selection'
        switch atom.config.get('ide-haskell.onCursorMove')
          when 'Show Tooltip'
            clearTimeout @exprTypeTimeout if @exprTypeTimeout?
            unless @showCheckResult newBufferRange.start, false, 'keyboard'
              @hideTooltip()
          when 'Hide Tooltip'
            clearTimeout @exprTypeTimeout if @exprTypeTimeout?
            @hideTooltip()
      else
        @selTimeout = setTimeout (=> @shouldShowTooltip newBufferRange.start, 'selection'),
          atom.config.get('ide-haskell.expressionTypeInterval')

  deactivate: ->
    clearTimeout @exprTypeTimeout if @exprTypeTimeout?
    clearTimeout @selTimeout if @selTimeout?
    @hideTooltip()
    @disposables.dispose()
    @disposables = null
    @editor = null
    @lastMouseBufferPt = null

  updateResults: (res, types) =>
    if types?
      for t in types
        for m in @editor.findMarkers {type: 'check-result', severity: t, editor: @editor.id}
          m.destroy()
    else
      for m in @editor.findMarkers {type: 'check-result', editor: @editor.id}
        m.destroy()
    @markerFromCheckResult(r) for r in res

  markerFromCheckResult: (resItem) ->
    {uri, severity, message, position} = resItem
    return unless uri? and uri is @editor.getURI()

    # create a new marker
    range = new Range position, {row: position.row, column: position.column + 1}
    marker = @editor.markBufferRange range, invalidate: 'touch'
    marker.setProperties
      type: 'check-result'
      severity: severity
      desc: message
      editor: @editor.id
    {CompositeDisposable} = require 'atom'
    disp = new CompositeDisposable
    disp.add marker.onDidChange ({isValid}) ->
      unless isValid
        resItem.destroy()
        marker.destroy()
    disp.add marker.onDidDestroy ->
      disp.dispose()

    @decorateMarker(marker)

  decorateMarker: (m) ->
    return unless @gutter?
    cls = 'ide-haskell-' + m.getProperties().severity
    @gutter.decorateMarker m, type: 'line-number', class: cls
    @editor.decorateMarker m, type: 'highlight', class: cls
    @editor.decorateMarker m, type: 'line', class: cls

  onShouldShowTooltip: (callback) ->
    @emitter.on 'should-show-tooltip', callback

  onWillSaveBuffer: (callback) ->
    @emitter.on 'will-save-buffer', callback

  onDidSaveBuffer: (callback) ->
    @emitter.on 'did-save-buffer', callback

  onDidStopChanging: (callback) ->
    @emitter.on 'did-stop-changing', callback

  shouldShowTooltip: (pos, eventType = 'mouse') ->
    return if @showCheckResult pos, false, eventType

    if pos.row < 0 or
       pos.row >= @editor.getLineCount() or
       pos.isEqual @editor.bufferRangeForBufferRow(pos.row).end
      @hideTooltip {eventType}
    else if @rangeHasChanged(pos, eventType)
      @emitter.emit 'should-show-tooltip', {@editor, pos, eventType}

  rangeHasChanged: (pos, eventType) ->
    newrange = @getEventRange(pos, eventType).crange
    isFirstIteration = not (@lastMouseBufferPtTest? and @lastMouseBufferRangeTest?)
    rangesAreEmpty = => @lastMouseBufferRangeTest.isEmpty() and newrange.isEmpty()
    isSameRow = => @lastMouseBufferPtTest.row is pos.row
    isSameToken = =>
      return false unless rangesAreEmpty() and isSameRow()
      tl = @editor.tokenizedBuffer.tokenizedLineForRow(@lastMouseBufferPtTest.row)
      oldtokid = tl.tokenIndexAtBufferColumn(@lastMouseBufferPtTest.column)
      newtokid = tl.tokenIndexAtBufferColumn(pos.column)
      oldtokid is newtokid
    result =
      isFirstIteration or not ( @lastMouseBufferRangeTest.isEqual(newrange) or isSameToken() )
    @lastMouseBufferPtTest = pos
    @lastMouseBufferRangeTest = newrange
    return result

  showTooltip: (pos, range, text, detail) ->
    return unless @editor?

    throw new Error('eventType not set') unless detail.eventType

    if range.isEqual(@tooltipHighlightRange)
      return
    @hideTooltip()
    #exit if mouse moved away
    if detail.eventType is 'mouse'
      unless range.containsPoint(@lastMouseBufferPt)
        return
    if detail.eventType is 'selection'
      lastSel = @editor.getLastSelection()
      unless range.containsRange(lastSel.getBufferRange()) and not lastSel.isEmpty()
        return
    @tooltipHighlightRange = range
    markerPos = range.start
    detail.type = 'tooltip'
    highlightMarker = @editor.markBufferRange range
    highlightMarker.setProperties detail
    TooltipMessage = require './views/tooltip-view'
    @editor.decorateMarker highlightMarker,
      type: 'overlay'
      position: 'tail'
      item: new TooltipMessage text
    @editor.decorateMarker highlightMarker,
      type: 'highlight'
      class: 'ide-haskell-type'

  hideTooltip: (template = {}) ->
    @tooltipHighlightRange = null
    template.type = 'tooltip'
    m.destroy() for m in @editor.findMarkers template

  getEventRange: (pos, eventType) ->
    switch eventType
      when 'mouse', 'context'
        pos ?= @lastMouseBufferPt
        [selRange] = @editor.getSelections()
          .map (sel) ->
            sel.getBufferRange()
          .filter (sel) ->
            sel.containsPoint pos
        crange = selRange ? Range.fromPointWithDelta(pos, 0, 0)
      when 'keyboard', 'selection'
        crange = @editor.getLastSelection().getBufferRange()
        pos = crange.start
      else
        throw new Error "unknown event type #{eventType}"

    return {crange, pos, eventType}

  findCheckResultMarkers: (pos, gutter, eventType) ->
    if gutter
      @editor.findMarkers {type: 'check-result', startBufferRow: pos.row, editor: @editor.id}
    else
      switch eventType
        when 'keyboard'
          @editor.findMarkers
            type: 'check-result'
            editor: @editor.id
            containsRange: Range.fromPointWithDelta pos, 0, 1
        when 'mouse'
          @editor.findMarkers {type: 'check-result', editor: @editor.id, containsPoint: pos}
        else
          []

  # show check result when mouse over gutter icon
  showCheckResult: (pos, gutter, eventType = 'mouse') ->
    markers = @findCheckResultMarkers pos, gutter, eventType
    [marker] = markers

    unless marker?
      @hideTooltip subtype: 'check-result'
      return false

    text =
      markers.map (marker) ->
        marker.getProperties().desc

    if gutter
      @showTooltip pos, new Range(pos, pos), text, {eventType, subtype: 'check-result'}
    else
      @showTooltip pos, marker.getBufferRange(), text, {eventType, subtype: 'check-result'}

    return true

  hasTooltips: (template = {}) ->
    template.type = 'tooltip'
    !!@editor.findMarkers(template).length
