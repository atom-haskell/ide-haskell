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

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
export type TTextBufferCallback = (buffer: TextBuffer) => void
export interface ICheckResultMarkerProperties {
  type: 'check-result'
  severity?: TSeverity
  desc?: MessageObject
}
export interface IMarkerProperties extends IMarkerOptions {
  type: 'tooltip'
}
export interface IMarkerOptions {
  eventType?: TEventRangeType
  persistOnCursorMove?: boolean
  subtype?: string
}

export class EditorControl {
  public disposables: CompositeDisposable // TODO should be private...
  private emitter: Emitter
  private gutter: Gutter
  private lastMouseBufferPt?: Point
  private exprTypeTimeout?: number
  private selTimeout?: number
  private lastMouseBufferPtTest?: Point
  private lastMouseBufferRangeTest?: Range
  private tooltipHighlightRange?: Range
  constructor (private editor: TextEditor) {
    this.updateResults = this.updateResults.bind(this)
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())

    const editorElement = atom.views.getView(this.editor)

    if (atom.config.get('ide-haskell.messageDisplayFrontend') === 'builtin') {
      this.gutter = this.editor.gutterWithName('ide-haskell-check-results')
      if (!this.gutter) {
        this.gutter = this.editor.addGutter({
          name: 'ide-haskell-check-results',
          priority: 10
        })
      }

      const gutterElement = atom.views.getView(this.gutter)
      this.disposables.add(listen(
        gutterElement, 'mouseover', '.decoration',
        (e) => {
          const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)
          if (bufferPt) {
            this.lastMouseBufferPt = bufferPt
            return this.showCheckResult(bufferPt, true)
          }
        }
      ))
      this.disposables.add(listen(
        gutterElement, 'mouseout', '.decoration', (e) => this.hideTooltip()
      ))
    }

    // buffer events for automatic check
    const buffer = this.editor.getBuffer()
    this.disposables.add(buffer.onWillSave(() => {
      this.emitter.emit('will-save-buffer', buffer)
      if (atom.config.get('ide-haskell.onSavePrettify')) {
        return atom.commands.dispatch(editorElement, 'ide-haskell:prettify-file')
      }
    }))

    this.disposables.add(buffer.onDidSave(() => this.emitter.emit('did-save-buffer', buffer)))

    this.disposables.add(this.editor.onDidStopChanging(() => this.emitter.emit('did-stop-changing', this.editor)))

    this.disposables.add(editorElement.onDidChangeScrollLeft(() => this.hideTooltip({eventType: 'mouse'})))
    this.disposables.add(editorElement.onDidChangeScrollTop(() => this.hideTooltip({eventType: 'mouse'})))

    // show expression type if mouse stopped somewhere
    this.disposables.add(listen(
      editorElement, 'mousemove', '.scroll-view',
      (e) => {
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
    ))
    this.disposables.add(listen(
      editorElement, 'mouseout', '.scroll-view',
      (e) => {
        if (this.exprTypeTimeout) {
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

      if (this.selTimeout) {
        clearTimeout(this.selTimeout)
      }
      if (newBufferRange.isEmpty()) {
        this.hideTooltip({eventType: 'selection'})
        switch (atom.config.get('ide-haskell.onCursorMove')) {
          case 'Show Tooltip':
            if (this.exprTypeTimeout) {
              clearTimeout(this.exprTypeTimeout)
            }
            if (!this.showCheckResult(newBufferRange.start, false, 'keyboard')) {
              return this.hideTooltip({persistOnCursorMove: false})
            }
            break
          case 'Hide Tooltip':
            if (this.exprTypeTimeout) {
              clearTimeout(this.exprTypeTimeout)
            }
            return this.hideTooltip({persistOnCursorMove: false})
          default: // impossible, but tslint complains
        }
      } else {
        this.selTimeout = setTimeout(
          () => this.shouldShowTooltip(newBufferRange.start, 'selection'),
          atom.config.get('ide-haskell.expressionTypeInterval')
        )
      }
    }))
  }

  public deactivate () {
    if (this.exprTypeTimeout) {
      clearTimeout(this.exprTypeTimeout)
    }
    if (this.selTimeout) {
      clearTimeout(this.selTimeout)
    }
    this.hideTooltip()
    this.disposables.dispose()
    this.lastMouseBufferPt = undefined
  }

  public updateResults (res: ResultItem[], types?: TSeverity[]) {
    if (types) {
      for (const t of Array.from(types)) {
        const props: ICheckResultMarkerProperties = {
          type: 'check-result',
          severity: t
        }
        for (const m of Array.from(this.editor.findMarkers(props))) {
          m.destroy()
        }
      }
    } else {
      const props: ICheckResultMarkerProperties = {
        type: 'check-result'
      }
      for (const m of Array.from(this.editor.findMarkers(props))) {
        m.destroy()
      }
    }
    return Array.from(res).map((r) => this.markerFromCheckResult(r))
  }

  markerFromCheckResult (resItem: ResultItem) {
    const {uri, severity, message, position} = resItem
    if ((!uri) || (uri !== this.editor.getPath())) {
      return
    }
    if (!position) {
      return
    }

    // create a new marker
    const range = new Range(position, Point.fromObject({
      row: position.row,
      column: position.column + 1
    }))
    const marker = this.editor.markBufferRange(range, {
      invalidate: 'touch'
    })
    let props: ICheckResultMarkerProperties = {
      type: 'check-result',
      severity,
      desc: message
    }
    marker.setProperties(props)
    const disp = new CompositeDisposable()
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
    if (!this.gutter) {
      return
    }
    const cls = `ide-haskell-${(m.getProperties() as any).severity}`
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
    if (!eventType) {
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

  showTooltip (
    pos: Point, range: Range, text: TMessage | TMessage[],
    detail: IMarkerOptions
  ) {
    if (!this.editor) {
      return
    }

    if (!detail.eventType) {
      throw new Error('eventType not set')
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
      const lastSel = this.editor.getLastSelection()
      if (!range.containsRange(lastSel.getBufferRange()) || !!lastSel.isEmpty()) {
        return
      }
    }
    this.tooltipHighlightRange = range
    const props: IMarkerProperties = {...detail, type: 'tooltip'}
    const highlightMarker = this.editor.markBufferRange(range)
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

  hideTooltip (template?: IMarkerOptions) {
    if (!template) {
      template = {}
    }
    this.tooltipHighlightRange = undefined
    const props: IMarkerProperties = {type: 'tooltip', ...template}
    this.editor.findMarkers(props).forEach((m) => m.destroy())
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

  findCheckResultMarkers (pos: Point, gutter: boolean, eventType: TEventRangeType) {
    if (gutter) {
      return this.editor.findMarkers({
        type: 'check-result',
        startBufferRow: pos.row
      })
    } else {
      switch (eventType) {
        case 'keyboard':
          return this.editor.findMarkers({
            type: 'check-result',
            containsRange: new Range(pos, pos.translate([0, 1]))
          })
        case 'mouse':
          return this.editor.findMarkers({
            type: 'check-result',
            containsPoint: pos
          })
        default:
          return []
      }
    }
  }

  // show check result when mouse over gutter icon
  showCheckResult (pos: Point, gutter: boolean, eventType?: TEventRangeType) {
    if (!eventType) {
      eventType = 'mouse'
    }
    const markers = this.findCheckResultMarkers(pos, gutter, eventType)
    const [marker] = Array.from(markers)

    if (!marker) {
      this.hideTooltip({
        subtype: 'check-result'
      })
      return false
    }

    const text =
      markers.map((m) => m.getProperties().desc)

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

  hasTooltips (template?: IMarkerOptions) {
    if (!template) {
      template = {}
    }
    const props: IMarkerProperties = {type: 'tooltip', ...template}
    return !!this.editor.findMarkers(props).length
  }
}
