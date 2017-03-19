import {
  Range, Emitter, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker, TextBuffer
} from 'atom'

import {
  bufferPositionFromMouseEvent
} from '../utils'

import {ResultItem, TSeverity} from '../results-db'
import {TooltipMessage} from './tooltip-view'
import {TMessage, MessageObject} from '../utils'
import {listen} from './element-listener'
import {TooltipManager} from './tooltip-manager'
import {MarkerManager, TFindType} from './marker-manager'
import {ResultsDB} from '../results-db'

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
export type TTextBufferCallback = (buffer: TextBuffer) => void

export class EditorControl {
  public disposables: CompositeDisposable // TODO should be private...
  private emitter: Emitter
  private lastMouseBufferPt?: Point
  private exprTypeTimeout?: number
  private selTimeout?: number
  private lastMouseBufferPtTest?: Point
  private lastMouseBufferRangeTest?: Range
  private editorElement: any
  public tooltips: TooltipManager
  public markers: MarkerManager
  constructor (private editor: TextEditor, results: ResultsDB) {
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())
    this.tooltips = new TooltipManager(this.editor)
    this.disposables.add(this.tooltips)
    this.markers = new MarkerManager(this.editor, results)
    this.disposables.add(this.markers)

    this.editorElement = atom.views.getView(this.editor)

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.registerGutterEvents()
    }

    // buffer events for automatic check
    const buffer = this.editor.getBuffer()

    this.disposables.add(buffer.onWillSave(() => this.emitter.emit('will-save-buffer', buffer)))
    this.disposables.add(buffer.onDidSave(() => this.emitter.emit('did-save-buffer', buffer)))
    this.disposables.add(this.editor.onDidStopChanging(() => this.emitter.emit('did-stop-changing', this.editor)))
    this.disposables.add(this.editorElement.onDidChangeScrollLeft(() => this.tooltips.hide({type: 'mouse'})))
    this.disposables.add(this.editorElement.onDidChangeScrollTop(() => this.tooltips.hide({type: 'mouse'})))

    // tooltip tracking (mouse and selection)
    this.disposables.add(listen(this.editorElement, 'mousemove', '.scroll-view', this.trackMouseBufferPosition.bind(this)))
    this.disposables.add(listen(this.editorElement, 'mouseout', '.scroll-view', this.stopTrackingMouseBufferPosition.bind(this)))

    this.disposables.add(this.editor.onDidChangeSelectionRange(this.trackSelection.bind(this)))
  }

  public deactivate () {
    if (this.exprTypeTimeout) {
      clearTimeout(this.exprTypeTimeout)
    }
    if (this.selTimeout) {
      clearTimeout(this.selTimeout)
    }
    this.disposables.dispose()
    this.lastMouseBufferPt = undefined
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

  shouldShowTooltip (pos: Point, type?: TEventRangeType) {
    if (!type) {
      type = 'mouse'
    }
    if ((type === 'mouse' || type === 'keyboard') && this.showCheckResult(pos, type)) {
      return
    }

    if ((pos.row < 0) ||
      (pos.row >= this.editor.getLineCount()) ||
      pos.isEqual(this.editor.bufferRangeForBufferRow(pos.row).end)) {
      this.tooltips.hide({type, subtype: 'external'})
    } else if (this.rangeHasChanged(pos, type)) {
      this.emitter.emit('should-show-tooltip', {
        editor: this.editor,
        pos,
        type
      })
    }
  }

  rangeHasChanged (pos: Point, eventType: TEventRangeType) {
    const newrange = this.getEventRange(pos, eventType).crange
    const isFirstIteration = !(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)
    const isSameToken = () => {
      if (!(this.lastMouseBufferRangeTest && this.lastMouseBufferPtTest)) { return false }
      const rangesAreEmpty = this.lastMouseBufferRangeTest.isEmpty() && newrange.isEmpty()
      const isSameRow = this.lastMouseBufferPtTest.row === pos.row
      if (!rangesAreEmpty || !isSameRow) {
        return false
      }
      const tl = (this.editor as any).tokenizedBuffer.tokenizedLineForRow(this.lastMouseBufferPtTest.row)
      const oldtokid = tl.tokenIndexAtBufferColumn(this.lastMouseBufferPtTest
        .column)
      const newtokid = tl.tokenIndexAtBufferColumn(pos.column)
      return oldtokid === newtokid
    }
    const result = isFirstIteration || !(this.lastMouseBufferRangeTest!.isEqual(newrange) || isSameToken())
    this.lastMouseBufferPtTest = pos
    this.lastMouseBufferRangeTest = newrange
    return result
  }

  getEventRange (pos: Point | undefined, eventType: TEventRangeType) {
    let crange: Range
    switch (eventType) {
      case 'mouse':
      case 'context':
        if (!pos) {
          pos = this.lastMouseBufferPt
        }
        const [selRange] = Array.from(this.editor.getSelections()
          .map((sel) => sel.getBufferRange()).filter((sel) => sel.containsPoint(
            pos)))
        crange = selRange || new Range(pos!, pos!)
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

  private showCheckResult(pos: Point, type: TFindType) {
    const checkMessage = this.markers.getMessageAt(pos, type)
    let evt: TEventRangeType
    if (type === 'gutter') {
      evt = 'mouse'
    } else {
      evt = type
    }
    if (checkMessage.length > 0) {
      this.tooltips.show(
        new Range(pos, pos),
        checkMessage,
        {type: evt, subtype: 'check-result'}
      )
      return true
    } else {
      this.tooltips.hide({type: evt, subtype: 'check-result'})
      return false
    }
  }

  private registerGutterEvents () {
    const gutterElement = atom.views.getView(this.markers.gutter)
    this.disposables.add(listen(
      gutterElement, 'mouseover', '.decoration',
      (e) => {
        const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)
        if (bufferPt) {
          this.lastMouseBufferPt = bufferPt
          this.showCheckResult(bufferPt, 'gutter')
        }
      }
    ))
    this.disposables.add(listen(
      gutterElement, 'mouseout', '.decoration', (e) => this.tooltips.hide(
        {type: 'mouse', subtype: 'check-result'})
    ))
  }

  private trackMouseBufferPosition (e: MouseEvent) {
    const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)

    if (!bufferPt) {
      return
    }

    if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
      return
    }
    this.lastMouseBufferPt = bufferPt

    if (this.exprTypeTimeout) {
      clearTimeout(this.exprTypeTimeout)
    }
    this.exprTypeTimeout = setTimeout(
      () => bufferPt && this.shouldShowTooltip(bufferPt),
      atom.config.get('ide-haskell.expressionTypeInterval')
    )
  }

  private stopTrackingMouseBufferPosition (e: MouseEvent) {
    if (this.exprTypeTimeout) {
      return clearTimeout(this.exprTypeTimeout)
    }
  }

  private trackSelection ({newBufferRange}: {newBufferRange: Range}) {
    this.handleCursorUnderTooltip(newBufferRange)

    if (this.selTimeout) {
      clearTimeout(this.selTimeout)
    }
    if (newBufferRange.isEmpty()) {
      this.tooltips.hide({type: 'selection'})
      switch (atom.config.get('ide-haskell.onCursorMove')) {
        case 'Show Tooltip':
          if (this.exprTypeTimeout) {
            clearTimeout(this.exprTypeTimeout)
          }
          if (!this.showCheckResult(newBufferRange.start, 'keyboard')) {
            return this.tooltips.hide({persistOnCursorMove: false})
          }
          break
        case 'Hide Tooltip':
          if (this.exprTypeTimeout) {
            clearTimeout(this.exprTypeTimeout)
          }
          return this.tooltips.hide({persistOnCursorMove: false})
        default: // impossible, but tslint complains
      }
    } else {
      this.selTimeout = setTimeout(
        () => this.shouldShowTooltip(newBufferRange.start, 'selection'),
        atom.config.get('ide-haskell.expressionTypeInterval')
      )
    }
  }

  private handleCursorUnderTooltip (currentRange: Range) {
    const tooltipElement = document.querySelector('ide-haskell-tooltip')
    if (tooltipElement) {
      const slcl = this.editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(currentRange))
      const eecl = this.editorElement.querySelector('.scroll-view').getBoundingClientRect()
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
  }
}
