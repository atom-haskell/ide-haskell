import {
  Range, TextEditor, Point, CompositeDisposable, TextBuffer,
  Disposable
} from 'atom'

import {
  bufferPositionFromMouseEvent
} from '../utils'

import {listen} from '../utils'
import {TooltipManager, TEventRangeType} from './tooltip-manager'
import {TooltipRegistry} from '../tooltip-registry'
import {PluginManager, IEditorController} from '../plugin-manager'

export type TTextBufferCallback = (buffer: TextBuffer) => void
export type TEventRangeResult = { crange: Range, pos: Point, eventType: TEventRangeType } | undefined
export {TEventRangeType}

export class EditorControl implements IEditorController {
  public tooltips: TooltipManager
  private disposables: CompositeDisposable
  private lastMouseBufferPt?: Point
  private exprTypeTimeout?: number
  private selTimeout?: number
  private editorElement: HTMLElement & {
    onDidChangeScrollTop (a: () => void): Disposable
    onDidChangeScrollLeft (a: () => void): Disposable
    pixelRectForScreenRange (r: Range): {
      left: number, top: number, width: number, height: number
    }
  }
  private tooltipRegistry: TooltipRegistry
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    this.disposables = new CompositeDisposable()
    this.tooltips = new TooltipManager(this.editor)
    this.disposables.add(this.tooltips)
    this.tooltipRegistry = pluginManager.tooltipRegistry

    this.editorElement = atom.views.getView(this.editor)

    const buffer = this.editor.getBuffer()

    this.disposables.add(
      // buffer events for automatic check
      buffer.onWillSave(() => pluginManager.willSaveBuffer(buffer)),
      buffer.onDidSave(() => pluginManager.didSaveBuffer(buffer)),
      this.editor.onDidStopChanging(() => pluginManager.didStopChanging(buffer)),
      // tooltip tracking (mouse and selection)
      this.editorElement.onDidChangeScrollLeft(() => this.tooltips.hide('mouse')),
      this.editorElement.onDidChangeScrollTop(() => this.tooltips.hide('mouse')),
      listen(this.editorElement, 'mousemove', '.scroll-view', this.trackMouseBufferPosition.bind(this)),
      listen(this.editorElement, 'mouseout', '.scroll-view', this.stopTrackingMouseBufferPosition.bind(this)),
      this.editor.onDidChangeSelectionRange(this.trackSelection.bind(this)),
    )
  }

  public destroy () {
    if (this.exprTypeTimeout) {
      clearTimeout(this.exprTypeTimeout)
    }
    if (this.selTimeout) {
      clearTimeout(this.selTimeout)
    }
    this.disposables.dispose()
    this.lastMouseBufferPt = undefined
  }

  public getEventRange (
    eventType: TEventRangeType
  ): TEventRangeResult {
    let crange: Range, pos: Point
    switch (eventType) {
      case 'mouse':
      case 'context':
        if (!this.lastMouseBufferPt) { return }
        pos = this.lastMouseBufferPt
        const [selRange] = this.editor.getSelections()
                           .map((sel) => sel.getBufferRange())
                           .filter((sel) => sel.containsPoint(pos))
        crange = selRange || new Range(pos, pos)
        break
      case 'keyboard':
      case 'selection':
        crange = this.editor.getLastSelection().getBufferRange()
        pos = crange.start
        break
      default: throw new TypeError('Switch assertion failed')
    }

    return { crange, pos, eventType }
  }

  private shouldShowTooltip (pos: Point, type: TEventRangeType) {
    if ((pos.row < 0) ||
      (pos.row >= this.editor.getLineCount()) ||
      pos.isEqual(this.editor.bufferRangeForBufferRow(pos.row).end)) {
      this.tooltips.hide(type)
    } else {
      this.tooltipRegistry.showTooltip(this.editor, type)
    }
  }

  private trackMouseBufferPosition (e: MouseEvent) {
    const bufferPt = bufferPositionFromMouseEvent(this.editor, e)
    if (!bufferPt) { return }

    if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
      return
    }
    this.lastMouseBufferPt = bufferPt

    if (this.exprTypeTimeout) {
      clearTimeout(this.exprTypeTimeout)
    }
    this.exprTypeTimeout = setTimeout(
      () => bufferPt && this.shouldShowTooltip(bufferPt, 'mouse'),
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
      this.tooltips.hide('selection')
      if (this.exprTypeTimeout) {
        clearTimeout(this.exprTypeTimeout)
      }
      this.tooltipRegistry.showTooltip(this.editor, 'keyboard')
      // TODO:
      // switch (atom.config.get('ide-haskell.onCursorMove')) {
      //   case 'Show Tooltip':
      //     if (this.exprTypeTimeout) {
      //       clearTimeout(this.exprTypeTimeout)
      //     }
      //     if (!this.showCheckResult(newBufferRange.start, 'keyboard')) {
      //       return
      //     }
      //     break
      //   case 'Hide Tooltip':
      //     if (this.exprTypeTimeout) {
      //       clearTimeout(this.exprTypeTimeout)
      //     }
      //     return this.tooltips.hide({persistOnCursorMove: false})
      //   default: // impossible, but tslint complains
      // }
    } else {
      this.selTimeout = setTimeout(
        () => this.shouldShowTooltip(newBufferRange.start, 'selection'),
        atom.config.get('ide-haskell.expressionTypeInterval')
      )
    }
  }

  private handleCursorUnderTooltip (currentRange: Range) {
    const tooltipElement = document.querySelector('ide-haskell-tooltip')
    if (!tooltipElement) { return }
    const slcl = this.editorElement.pixelRectForScreenRange(this.editor.screenRangeForBufferRange(currentRange))
    const sv = this.editorElement.querySelector('.scroll-view')
    if (!sv) { return }
    const eecl = sv.getBoundingClientRect()
    const ttcl = tooltipElement.getBoundingClientRect()
    const div = tooltipElement.querySelector('div')
    if (!div) { return }
    const ttcld = div.getBoundingClientRect()
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
