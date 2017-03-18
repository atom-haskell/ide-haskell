import {
  Range, Emitter
} from 'atom'

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'

export class EditorControl {
  constructor (editor) {
    let bufferPt
    this.updateResults = this.updateResults.bind(this)
    this.editor = editor
    let SubAtom = require('sub-atom')
    this.disposables = new SubAtom()
    this.disposables.add(this.emitter = new Emitter())

    let editorElement = atom.views.getView(this.editor)

    let {
      bufferPositionFromMouseEvent
    } = require('./utils')

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.gutter = this.editor.gutterWithName('ide-haskell-check-results')
      if (this.gutter == null) {
        this.gutter = this.editor.addGutter({
          name: 'ide-haskell-check-results',
          priority: 10
        })
      }

      let gutterElement = atom.views.getView(this.gutter)
      this.disposables.add(gutterElement, 'mouseenter', '.decoration', e => {
        bufferPt = bufferPositionFromMouseEvent(this.editor, e)
        if (bufferPt != null) {
          this.lastMouseBufferPt = bufferPt
          return this.showCheckResult(bufferPt, true)
        }
      })
      this.disposables.add(gutterElement, 'mouseleave', '.decoration', e => {
        return this.hideTooltip()
      })
    }

    // buffer events for automatic check
    let buffer = this.editor.getBuffer()
    this.disposables.add(buffer.onWillSave(() => {
      this.emitter.emit('will-save-buffer', buffer)
      if (atom.config.get('ide-haskell.onSavePrettify')) {
        return atom.commands.dispatch(editorElement,
          'ide-haskell:prettify-file')
      }
    }))

    this.disposables.add(buffer.onDidSave(() => {
      return this.emitter.emit('did-save-buffer', buffer)
    }))

    this.disposables.add(this.editor.onDidStopChanging(() => {
      return this.emitter.emit('did-stop-changing', this.editor)
    }))

    this.disposables.add(editorElement.onDidChangeScrollLeft(() => {
      return this.hideTooltip({
        eventType: 'mouse'
      })
    }))
    this.disposables.add(editorElement.onDidChangeScrollTop(() => {
      return this.hideTooltip({
        eventType: 'mouse'
      })
    }))

    // show expression type if mouse stopped somewhere
    this.disposables.add(editorElement.rootElement, 'mousemove',
      '.scroll-view', e => {
        bufferPt = bufferPositionFromMouseEvent(this.editor, e)

        if (bufferPt == null) {
          return
        }

        if (this.lastMouseBufferPt != null ? this.lastMouseBufferPt.isEqual(
            bufferPt) : undefined) {
          return
        }
        this.lastMouseBufferPt = bufferPt

        if (this.exprTypeTimeout != null) {
          clearTimeout(this.exprTypeTimeout)
        }
        this.exprTypeTimeout = setTimeout(() => this.shouldShowTooltip(
            bufferPt),
          atom.config.get('ide-haskell.expressionTypeInterval'))
      }
    )
    this.disposables.add(editorElement.rootElement, 'mouseout',
      '.scroll-view', e => {
        if (this.exprTypeTimeout != null) {
          return clearTimeout(this.exprTypeTimeout)
        }
      }
    )

    this.disposables.add(this.editor.onDidChangeSelectionRange(({
      newBufferRange
    }) => {
      let slcl = editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(
        newBufferRange))
      let eecl = editorElement.querySelector('.scroll-view').getBoundingClientRect()
      let ttcl = __guardMethod__(document.querySelector(
        'ide-haskell-tooltip'), 'getBoundingClientRect', o => o.getBoundingClientRect())
      if (ttcl != null) {
        let ttcld = document.querySelector('ide-haskell-tooltip div').getBoundingClientRect()
        let ttbox = {
          left: ttcl.left - eecl.left,
          top: ttcld.top - eecl.top,
          width: ttcl.width,
          height: ttcld.height
        }
        let xmax = Math.round(Math.max(ttbox.left, slcl.left))
        let xmin = Math.round(Math.min(ttbox.left + ttbox.width, slcl.left +
          slcl.width))
        let ymax = Math.round(Math.max(ttbox.top, slcl.top))
        let ymin = Math.round(Math.min(ttbox.top + ttbox.height, slcl.top +
          slcl.height))
        if ((ymax <= ymin) && (xmax <= xmin)) {
          document.querySelector('ide-haskell-tooltip').style.setProperty(
            'opacity', '0.3')
        } else {
          document.querySelector('ide-haskell-tooltip').style.removeProperty(
            'opacity')
        }
      }

      if (this.selTimeout != null) {
        clearTimeout(this.selTimeout)
      }
      if (newBufferRange.isEmpty()) {
        this.hideTooltip({
          eventType: 'selection'
        })
        switch (atom.config.get('ide-haskell.onCursorMove')) {
          case 'Show Tooltip':
            if (this.exprTypeTimeout != null) {
              clearTimeout(this.exprTypeTimeout)
            }
            if (!this.showCheckResult(newBufferRange.start, false,
                'keyboard')) {
              return this.hideTooltip({
                persistOnCursorMove: false
              })
            }
            break
          case 'Hide Tooltip':
            if (this.exprTypeTimeout != null) {
              clearTimeout(this.exprTypeTimeout)
            }
            return this.hideTooltip({
              persistOnCursorMove: false
            })
        }
      } else {
        this.selTimeout = setTimeout(() => this.shouldShowTooltip(
            newBufferRange.start, 'selection'),
          atom.config.get('ide-haskell.expressionTypeInterval'))
      }
    }))
  }

  deactivate () {
    if (this.exprTypeTimeout != null) {
      clearTimeout(this.exprTypeTimeout)
    }
    if (this.selTimeout != null) {
      clearTimeout(this.selTimeout)
    }
    this.hideTooltip()
    this.disposables.dispose()
    this.disposables = null
    this.editor = null
    this.lastMouseBufferPt = null
  }

  updateResults (res, types) {
    let m
    if (types != null) {
      for (let t of Array.from(types)) {
        for (m of Array.from(this.editor.findMarkers({
          type: 'check-result',
          severity: t,
          editor: this.editor.id
        }))) {
          m.destroy()
        }
      }
    } else {
      for (m of Array.from(this.editor.findMarkers({
        type: 'check-result',
        editor: this.editor.id
      }))) {
        m.destroy()
      }
    }
    return Array.from(res).map((r) => this.markerFromCheckResult(r))
  }

  markerFromCheckResult (resItem) {
    let {
      uri, severity, message, position
    } = resItem
    if ((uri == null) || (uri !== this.editor.getURI())) {
      return
    }

    // create a new marker
    let range = new Range(position, {
      row: position.row,
      column: position.column + 1
    })
    let marker = this.editor.markBufferRange(range, {
      invalidate: 'touch'
    })
    marker.setProperties({
      type: 'check-result',
      severity,
      desc: message,
      editor: this.editor.id
    })
    let {
      CompositeDisposable
    } = require('atom')
    let disp = new CompositeDisposable()
    disp.add(marker.onDidChange(function ({
      isValid
    }) {
      if (!isValid) {
        resItem.destroy()
        return marker.destroy()
      }
    }))
    disp.add(marker.onDidDestroy(() => disp.dispose()))

    return this.decorateMarker(marker)
  }

  decorateMarker (m) {
    if (this.gutter == null) {
      return
    }
    let cls = `ide-haskell-${m.getProperties().severity}`
    this.gutter.decorateMarker(m, {
      type: 'line-number',
      class: cls
    })
    this.editor.decorateMarker(m, {
      type: 'highlight',
      class: cls
    })
    return this.editor.decorateMarker(m, {
      type: 'line',
      class: cls
    })
  }

  onShouldShowTooltip (callback) {
    return this.emitter.on('should-show-tooltip', callback)
  }

  onWillSaveBuffer (callback) {
    return this.emitter.on('will-save-buffer', callback)
  }

  onDidSaveBuffer (callback) {
    return this.emitter.on('did-save-buffer', callback)
  }

  onDidStopChanging (callback) {
    return this.emitter.on('did-stop-changing', callback)
  }

  shouldShowTooltip (pos, eventType) {
    if (eventType == null) {
      eventType = 'mouse'
    }
    if (this.showCheckResult(pos, false, eventType)) {
      return
    }

    if ((pos.row < 0) ||
      (pos.row >= this.editor.getLineCount()) ||
      pos.isEqual(this.editor.bufferRangeForBufferRow(pos.row).end)) {
      return this.hideTooltip({
        eventType
      })
    } else if (this.rangeHasChanged(pos, eventType)) {
      return this.emitter.emit('should-show-tooltip', {
        editor: this.editor,
        pos,
        eventType
      })
    }
  }

  rangeHasChanged (pos, eventType) {
    let newrange = this.getEventRange(pos, eventType).crange
    let isFirstIteration = !((this.lastMouseBufferPtTest != null) && (this.lastMouseBufferRangeTest !=
      null))
    let rangesAreEmpty = () => this.lastMouseBufferRangeTest.isEmpty() &&
      newrange.isEmpty()
    let isSameRow = () => this.lastMouseBufferPtTest.row === pos.row
    let isSameToken = () => {
      if (!rangesAreEmpty() || !isSameRow()) {
        return false
      }
      let tl = this.editor.tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest
        .row)
      let oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
        .column)
      let newtokid = tl.tokenIndexAtBufferColumn(pos.column)
      return oldtokid === newtokid
    }
    let result =
      isFirstIteration || !(this.lastMouseBufferRangeTest.isEqual(newrange) ||
        isSameToken())
    this.lastMouseBufferPtTest = pos
    this.lastMouseBufferRangeTest = newrange
    return result
  }

  showTooltip (pos, range, text, detail) {
    if (this.editor == null) {
      return
    }

    if (!detail.eventType) {
      throw new Error('eventType not set')
    }
    if (detail.persistOnCursorMove == null) {
      detail.persistOnCursorMove = false
    }

    if (range.isEqual(this.tooltipHighlightRange)) {
      return
    }
    this.hideTooltip()
      // exit if mouse moved away
    if (detail.eventType === 'mouse') {
      if (!range.containsPoint(this.lastMouseBufferPt)) {
        return
      }
    }
    if (detail.eventType === 'selection') {
      let lastSel = this.editor.getLastSelection()
      if (!range.containsRange(lastSel.getBufferRange()) || !!lastSel.isEmpty()) {
        return
      }
    }
    this.tooltipHighlightRange = range
    detail.type = 'tooltip'
    let highlightMarker = this.editor.markBufferRange(range)
    highlightMarker.setProperties(detail)
    let {
      TooltipMessage
    } = require('./views/tooltip-view')
    this.editor.decorateMarker(highlightMarker, {
      type: 'overlay',
      position: 'tail',
      item: new TooltipMessage(text)
    })
    return this.editor.decorateMarker(highlightMarker, {
      type: 'highlight',
      class: 'ide-haskell-type'
    })
  }

  hideTooltip (template) {
    if (template == null) {
      template = {}
    }
    this.tooltipHighlightRange = null
    template.type = 'tooltip'
    return Array.from(this.editor.findMarkers(template)).map((m) => m.destroy())
  }

  getEventRange (pos, eventType) {
    let crange
    switch (eventType) {
      case 'mouse':
      case 'context':
        if (pos == null) {
          pos = this.lastMouseBufferPt
        }
        let [selRange] = Array.from(this.editor.getSelections()
          .map(sel => sel.getBufferRange()).filter(sel => sel.containsPoint(
            pos)))
        crange = selRange != null ? selRange : Range.fromPointWithDelta(pos,
          0, 0)
        break
      case 'keyboard':
      case 'selection':
        crange = this.editor.getLastSelection().getBufferRange()
        pos = crange.start
        break
      default:
        throw new Error(`unknown event type ${eventType}`)
    }

    return {
      crange, pos, eventType
    }
  }

  findCheckResultMarkers (pos, gutter, eventType) {
    if (gutter) {
      return this.editor.findMarkers({
        type: 'check-result',
        startBufferRow: pos.row,
        editor: this.editor.id
      })
    } else {
      switch (eventType) {
        case 'keyboard':
          return this.editor.findMarkers({
            type: 'check-result',
            editor: this.editor.id,
            containsRange: Range.fromPointWithDelta(pos, 0, 1)
          })
        case 'mouse':
          return this.editor.findMarkers({
            type: 'check-result',
            editor: this.editor.id,
            containsPoint: pos
          })
        default:
          return []
      }
    }
  }

  // show check result when mouse over gutter icon
  showCheckResult (pos, gutter, eventType) {
    if (eventType == null) {
      eventType = 'mouse'
    }
    let markers = this.findCheckResultMarkers(pos, gutter, eventType)
    let [marker] = Array.from(markers)

    if (marker == null) {
      this.hideTooltip({
        subtype: 'check-result'
      })
      return false
    }

    let text =
      markers.map(marker => marker.getProperties().desc)

    if (gutter) {
      this.showTooltip(pos, new Range(pos, pos), text, {
        eventType, subtype: 'check-result'
      })
    } else {
      this.showTooltip(pos, marker.getBufferRange(), text, {
        eventType, subtype: 'check-result'
      })
    }

    return true
  }

  hasTooltips (template) {
    if (template == null) {
      template = {}
    }
    template.type = 'tooltip'
    return !!this.editor.findMarkers(template).length
  }
}

function __guardMethod__ (obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] ===
    'function') {
    return transform(obj, methodName)
  } else {
    return undefined
  }
}
