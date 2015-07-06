SubAtom = require 'sub-atom'
ImportListView = require './import-list-view'

{bufferPositionFromMouseEvent} = require './utils'
{TooltipMessage} = require './tooltip-view'
{Range, CompositeDisposable, Disposable} = require 'atom'

class EditorControl
  constructor: (@editor, @manager) ->
    @disposables = new SubAtom
    @tooltipMarkers = new CompositeDisposable
    @editorElement = atom.views.getView(@editor).rootElement

    unless atom.config.get 'ide-haskell.useLinter'
      @gutter = @editor.gutterWithName "ide-haskell-check-results"
      @gutter ?= @editor.addGutter
        name: "ide-haskell-check-results"
        priority: 10

      gutterElement = atom.views.getView(@gutter)
      @disposables.add gutterElement, 'mouseenter', ".decoration", (e) =>
        @showCheckResult e, true
      @disposables.add gutterElement, 'mouseleave', ".decoration", (e) =>
        @hideCheckResult()

    # event for editor updates
    @disposables.add @editor.onDidDestroy =>
      @deactivate()

    @disposables.add @manager.onResultsUpdated @updateResults

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

      action = atom.config.get('ide-haskell.onMouseHoverShow')
      return if action == 'Nothing'

      @clearExprTypeTimeout()
      @exprTypeTimeout = setTimeout (=>
        (@showCheckResult e) or
          (@showExpressionType bufferPt, 'mouse', 'get' + action)
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
    @tooltipMarkers = null

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
    range = new Range position, {row: position.row, column: position.column + 1}
    marker = @editor.markBufferRange range,
      type: 'check-result'
      severity: severity
      desc: message

  renderResults: (types) ->
    for t in types
      for m in @editor.findMarkers {type: 'check-result', severity: t}
        @decorateMarker(m)

  decorateMarker: (m) ->
    return unless @gutter?
    cls = 'ide-haskell-' + m.getProperties().severity
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

    if bufferPt.row < 0 or
       bufferPt.row >= @editor.getLineCount() or
       bufferPt.isEqual @editor.bufferRangeForBufferRow(bufferPt.row).end
      @hideExpressionType()
      return

    runPendingEvent = ({fun, crange}) =>
      unless @manager.backend?[fun]?
        atom.notifications.addWarning "Backend #{@manager.backend.name()} doesn't support
                                      #{fun} command" if @manager.backend?
        return
      @showExpressionTypePendingEvent = null
      @showExpressionTypeRunning = true
      @manager.backend?[fun] @editor.getBuffer(), crange, ({range, type, info}) =>
        return unless @editor?
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
        @markerBufferRange = range
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
    @tooltipHighlightRange = null
    @tooltipMarkers.dispose()
    @tooltipMarkers = new CompositeDisposable

  findCheckResultMarkers: (pos, gutter) ->
    if gutter
      @editor.findMarkers {type: 'check-result', startBufferRow: pos.row}
    else
      @editor.findMarkers {type: 'check-result', containsPoint: pos}

  # show check result when mouse over gutter icon
  showCheckResult: (e, gutter) ->
    @hideCheckResult()
    pos = bufferPositionFromMouseEvent(@editor, e)

    markers = @findCheckResultMarkers pos, gutter
    [marker] = markers

    return false unless marker?

    @checkResultTooltip = @editor.decorateMarker marker,
      type: 'overlay'
      position: 'tail'
      item: new TooltipMessage (markers.map (marker) ->
        marker.getProperties().desc).join('\n\n')

    return true

  hideCheckResult: ->
    if @checkResultTooltip?
      @checkResultTooltip.destroy()
      @checkResultTooltip = null

  insertType: (eventType) ->
    unless @manager.backend?.getType?
      atom.notifications.addWarning "Backend #{@manager.backend.name()} doesn't support
                                    getType command" if @manager.backend?
      return
    switch eventType
      when 'context'
        crange = @lastMouseBufferPt
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
      else
        throw new Error "unknown event type #{eventType}"
    @manager.backend.getType @editor.getBuffer(), crange, ({range, type}) =>
      return unless @editor?
      n = @editor.indentationForBufferRow(range.start.row)
      indent = ' '.repeat n * @editor.getTabLength()
      @editor.scanInBufferRange /[\w'.]+/, range, ({matchText, stop}) =>
        symbol = matchText
        pos = [range.start.row, 0]
        @editor.setTextInBufferRange [pos, pos],
          indent + symbol + " :: " + type + "\n"
        stop()

  insertImport: (eventType) ->
    unless @manager.backend?.getModulesExportingSymbolAt?
      atom.notifications.addWarning "Backend #{@manager.backend.name()} doesn't support
                                    getModulesExportingSymbolAt command" if @manager.backend?
      return
    switch eventType
      when 'context'
        crange = @lastMouseBufferPt
      when 'keyboard'
        crange = @editor.getLastSelection().getBufferRange()
      else
        throw new Error "unknown event type #{eventType}"
    @manager.backend.getModulesExportingSymbolAt @editor.getBuffer(),
      crange, (lines) =>
        return unless @editor?
        new ImportListView
          items: lines
          onConfirmed: (mod) =>
            match = false
            # rx=RegExp("^\\s*import(\\s+qualified)?\\s+#{mod}"+
            #           "(\\s+as\\s+[\\w.']+)?(\\s+hiding)?"+
            #           "(\\s+\\((.*)\\))")
            buffer = @editor.getBuffer()
            buffer.backwardsScan /^(\s*)import/, ({match, range}) =>
              r = buffer.rangeForRow range.start.row
              @editor.setTextInBufferRange [r.end, r.end],
                "\n#{match[1]}import #{mod}"

  hasTooltips: ->
    @checkResultTooltip? or !!@tooltipMarkers.disposables.size

  closeTooltips: ->
    @hideExpressionType()
    @hideCheckResult()

module.exports = {
  EditorControl
}
