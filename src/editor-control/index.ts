import {
  Range, Emitter, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker, TextBuffer
} from 'atom'

import {
  bufferPositionFromMouseEvent
} from '../utils'

interface ITextEditor extends TextEditor {
  id?: number
}

import {ResultItem, TUpdateCallback, TSeverity} from '../results-db'
import {TooltipMessage} from './tooltip-view'
import {TMessage} from '../utils'
import {listen} from './element-listener'

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
export type TTextBufferCallback = (buffer: TextBuffer) => void

export class EditorControl {
  public disposables: CompositeDisposable // TODO should be private...
  private emitter: Emitter
  private gutter: Gutter
  private lastMouseBufferPt: Point | null
  private exprTypeTimeout: number | null
  private selTimeout: number | null
  private lastMouseBufferPtTest: Point | null
  private lastMouseBufferRangeTest: Range | null
  private tooltipHighlightRange: Range | null
  constructor (private editor: ITextEditor) {
    this.updateResults = this.updateResults.bind(this)
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())

    let editorElement = atom.views.getView(this.editor)

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.gutter = this.editor.gutterWithName('ide-haskell-check-results')
      if (this.gutter == null) {
        this.gutter = this.editor.addGutter({
          name: 'ide-haskell-check-results',
          priority: 10
        })
      }

      let gutterElement = atom.views.getView(this.gutter)
      this.disposables.add(listen(
        gutterElement.querySelector('.decoration'), 'mouseenter',
        (e) => {
          const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)
          if (bufferPt != null) {
            this.lastMouseBufferPt = bufferPt
            return this.showCheckResult(bufferPt, true)
          }
        }
      ))
      this.disposables.add(listen(
        gutterElement.querySelector('.decoration'), 'mouseleave',
        e => {
          return this.hideTooltip()
        }
      ))
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
    this.disposables.add(listen(
      editorElement.querySelector('.scroll-view'), 'mousemove',
      (e) => {
        const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)

        if (bufferPt == null) {
          return
        }

        if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
          return
        }
        this.lastMouseBufferPt = bufferPt

        if (this.exprTypeTimeout != null) {
          clearTimeout(this.exprTypeTimeout)
        }
        this.exprTypeTimeout = setTimeout(() => bufferPt && this.shouldShowTooltip(bufferPt),
          atom.config.get('ide-haskell.expressionTypeInterval'))
      }
    ))
    this.disposables.add(listen(
      editorElement.querySelector('.scroll-view'), 'mouseout',
      (e) => {
        if (this.exprTypeTimeout != null) {
          return clearTimeout(this.exprTypeTimeout)
        }
      }
    ))

    this.disposables.add(this.editor.onDidChangeSelectionRange(({newBufferRange}: {newBufferRange: Range}) => {
      const tooltipElement = document.querySelector('ide-haskell-tooltip')
      if (tooltipElement) {
        const slcl = editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(newBufferRange))
        const eecl = editorElement.querySelector('.scroll-view').getBoundingClientRect()
        const ttcl = tooltipElement.getBoundingClientRect()
        const ttcld = tooltipElement.querySelector('div')!.getBoundingClientRect()
        const ttbox = {
          left: ttcl.left - eecl.left,
          top: ttcld.top - eecl.top,
          width: ttcl.width,
          height: ttcld.height
        }
        const xmax = Math.round(Math.max(ttbox.left, slcl.left))
        const xmin = Math.round(Math.min(ttbox.left + ttbox.width, slcl.left +
          slcl.width))
        const ymax = Math.round(Math.max(ttbox.top, slcl.top))
        const ymin = Math.round(Math.min(ttbox.top + ttbox.height, slcl.top +
          slcl.height))
        const tt = document.querySelector('ide-haskell-tooltip') as HTMLElement
        if (tt) {
          if ((ymax <= ymin) && (xmax <= xmin)) {
            tt.style.setProperty(
              'opacity', '0.3')
          } else {
            tt.style.removeProperty(
              'opacity')
          }
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
    this.lastMouseBufferPt = null
  }

  updateResults (res: ResultItem[], types?: TSeverity[]) {
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

  markerFromCheckResult (resItem: ResultItem) {
    let {
      uri, severity, message, position
    } = resItem
    if ((uri == null) || (uri !== this.editor.getPath())) {
      return
    }
    if (!position) {
      return
    }

    // create a new marker
    let range = new Range(position, Point.fromObject({
      row: position.row,
      column: position.column + 1
    }))
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
    disp.add(marker.onDidChange(({isValid}: DisplayMarker) => {
      if (!isValid) {
        resItem.destroy()
        return marker.destroy()
      }
    }))
    disp.add(marker.onDidDestroy(() => disp.dispose()))

    return this.decorateMarker(marker)
  }

  decorateMarker (m: DisplayMarker) {
    if (this.gutter == null) {
      return
    }
    let cls = `ide-haskell-${(m.getProperties() as any).severity}`
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

  onShouldShowTooltip (callback: (args: {editor: TextEditor, pos: Point, eventType: TEventRangeType}) => void) {
    return this.emitter.on('should-show-tooltip', callback)
  }

  onWillSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('will-save-buffer', callback)
  }

  onDidSaveBuffer (callback: TTextBufferCallback) {
    return this.emitter.on('did-save-buffer', callback)
  }

  onDidStopChanging (callback: (editor: TextEditor) => void) {
    return this.emitter.on('did-stop-changing', callback)
  }

  shouldShowTooltip (pos: Point, eventType?: TEventRangeType) {
    if (eventType == null) {
      eventType = 'mouse'
    }
    if (this.showCheckResult(pos, false, eventType)) {
      return
    }

    if ((pos.row < 0) ||
      (pos.row >= this.editor.getLineCount()) ||
      pos.isEqual(this.editor.bufferRangeForBufferRow(pos.row).end)) {
      return this.hideTooltip({eventType})
    } else if (this.rangeHasChanged(pos, eventType)) {
      return this.emitter.emit('should-show-tooltip', {
        editor: this.editor,
        pos,
        eventType
      })
    }
  }

  rangeHasChanged (pos: Point, eventType: TEventRangeType) {
    let newrange = this.getEventRange(pos, eventType).crange
    let isFirstIteration = !(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)
    let isSameToken = () => {
      if (!(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)) { return false }
      let rangesAreEmpty = this.lastMouseBufferRangeTest.isEmpty() && newrange.isEmpty()
      let isSameRow = this.lastMouseBufferPtTest.row === pos.row
      if (!rangesAreEmpty || !isSameRow) {
        return false
      }
      let tl = (this.editor as any).tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest.row)
      let oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
        .column)
      let newtokid = tl.tokenIndexAtBufferColumn(pos.column)
      return oldtokid === newtokid
    }
    const result = isFirstIteration || !(this.lastMouseBufferRangeTest!.isEqual(newrange) || isSameToken())
    this.lastMouseBufferPtTest = pos
    this.lastMouseBufferRangeTest = newrange
    return result
  }

  showTooltip (pos: Point, range: Range, text: TMessage | TMessage[], detail: {eventType: TEventRangeType, persistOnCursorMove?: boolean, subtype: string}) {
    if (this.editor == null) {
      return
    }

    if (!detail.eventType) {
      throw new Error('eventType not set')
    }
    if (detail.persistOnCursorMove == null) {
      detail.persistOnCursorMove = false
    }

    if (this.tooltipHighlightRange && range.isEqual(this.tooltipHighlightRange)) {
      return
    }
    this.hideTooltip()
      // exit if mouse moved away
    if (detail.eventType === 'mouse') {
      if (this.lastMouseBufferPt && !range.containsPoint(this.lastMouseBufferPt)) {
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
    const props = {...detail, type: 'tooltip'}
    let highlightMarker = this.editor.markBufferRange(range)
    highlightMarker.setProperties(props)
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

  hideTooltip (template?: any) {
    if (!template) {
      template = {}
    }
    this.tooltipHighlightRange = null
    template.type = 'tooltip'
    this.editor.findMarkers(template).forEach((m) => m.destroy())
  }

  getEventRange (pos: Point | null, eventType: TEventRangeType) {
    let crange: Range
    switch (eventType) {
      case 'mouse':
      case 'context':
        if (pos == null) {
          pos = this.lastMouseBufferPt
        }
        let [selRange] = Array.from(this.editor.getSelections()
          .map(sel => sel.getBufferRange()).filter(sel => sel.containsPoint(
            pos)))
        crange = selRange != null ? selRange : new Range(pos!, pos!)
        break
      case 'keyboard':
      case 'selection':
        crange = this.editor.getLastSelection().getBufferRange()
        pos = crange.start
        break
      default:
        throw new Error(`unknown event type ${eventType}`)
    }

    const ppos = pos!

    return {
      crange, pos: ppos, eventType
    }
  }

  findCheckResultMarkers (pos: Point, gutter: boolean, eventType: TEventRangeType) {
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
            containsRange: new Range(pos, pos.translate([0, 1]))
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
  showCheckResult (pos: Point, gutter: boolean, eventType?: TEventRangeType) {
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

  hasTooltips (template?: Object) {
    if (template == null) {
      template = {}
    }
    template['type'] = 'tooltip'
    return !!this.editor.findMarkers(template).length
  }
}
