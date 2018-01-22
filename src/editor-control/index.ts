import { Range, TextEditor, Point, CompositeDisposable, Disposable } from 'atom'
import { bufferPositionFromMouseEvent, listen } from '../utils'
import { TooltipManager } from './tooltip-manager'
import { TooltipRegistry } from '../tooltip-registry'
import { PluginManager, IEditorController } from '../plugin-manager'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

export type TEventRangeResult =
  | { crange: Range; pos: Point; eventType: TEventRangeType }
  | undefined

export class EditorControl implements IEditorController {
  public tooltips: TooltipManager
  private disposables: CompositeDisposable
  private lastMouseBufferPt?: Point
  private exprTypeTimeout?: number
  private selTimeout?: number
  private editorElement: HTMLElement & {
    onDidChangeScrollTop(a: () => void): Disposable
    onDidChangeScrollLeft(a: () => void): Disposable
    pixelRectForScreenRange(
      r: Range,
    ): {
      left: number
      top: number
      width: number
      height: number
    }
  }
  private tooltipRegistry: TooltipRegistry
  constructor(private editor: TextEditor, pluginManager: PluginManager) {
    this.disposables = new CompositeDisposable()
    this.tooltips = new TooltipManager(this.editor)
    this.disposables.add(this.tooltips)
    this.tooltipRegistry = pluginManager.tooltipRegistry

    this.editorElement = atom.views.getView(this.editor) as any

    const buffer = this.editor.getBuffer()

    this.disposables.add(
      // buffer events for automatic check
      buffer.onWillSave(() => pluginManager.willSaveBuffer(buffer)),
      buffer.onDidSave(() => pluginManager.didSaveBuffer(buffer)),
      this.editor.onDidStopChanging(() =>
        pluginManager.didStopChanging(buffer),
      ),
      // tooltip tracking (mouse and selection)
      this.editorElement.onDidChangeScrollLeft(() =>
        this.tooltips.hide(TEventRangeType.mouse),
      ),
      this.editorElement.onDidChangeScrollTop(() =>
        this.tooltips.hide(TEventRangeType.mouse),
      ),
      listen(
        this.editorElement,
        'mousemove',
        '.scroll-view',
        this.trackMouseBufferPosition,
      ),
      listen(
        this.editorElement,
        'mouseout',
        '.scroll-view',
        this.stopTrackingMouseBufferPosition,
      ),
      this.editor.onDidChangeSelectionRange(this.trackSelection),
    )
  }

  public static supportsGrammar(grammar: string): boolean {
    return [
      // 'source.c2hs',
      // 'source.cabal',
      // 'source.hsc2hs',
      'source.haskell',
      'text.tex.latex.haskell',
      // 'source.hsig',
    ].includes(grammar)
  }

  public destroy() {
    if (this.exprTypeTimeout !== undefined) {
      clearTimeout(this.exprTypeTimeout)
    }
    if (this.selTimeout !== undefined) {
      clearTimeout(this.selTimeout)
    }
    this.disposables.dispose()
    this.lastMouseBufferPt = undefined
  }

  public getEventRange(eventType: TEventRangeType): TEventRangeResult {
    let crange: Range
    let pos: Point
    switch (eventType) {
      case 'mouse':
      case 'context':
        if (!this.lastMouseBufferPt) return undefined
        pos = this.lastMouseBufferPt
        const selRanges = this.editor
          .getSelections()
          .map((sel) => sel.getBufferRange())
          .filter((sel) => sel.containsPoint(pos))
        crange = selRanges.length > 0 ? selRanges[0] : new Range(pos, pos)
        break
      case 'keyboard':
      case 'selection':
        crange = this.editor.getLastSelection().getBufferRange()
        pos = crange.start
        break
      default:
        throw new TypeError('Switch assertion failed')
    }

    return { crange, pos, eventType }
  }

  private shouldShowTooltip(pos: Point, type: TEventRangeType) {
    if (
      pos.row < 0 ||
      pos.row >= this.editor.getLineCount() ||
      pos.isEqual(this.editor.getBuffer().rangeForRow(pos.row, false).end)
    ) {
      this.tooltips.hide(type)
    } else {
      // tslint:disable-next-line:no-floating-promises
      this.tooltipRegistry.showTooltip(this.editor, type)
    }
  }

  private trackMouseBufferPosition = (e: MouseEvent) => {
    const bufferPt = bufferPositionFromMouseEvent(this.editor, e)
    if (!bufferPt) {
      return
    }

    if (this.lastMouseBufferPt && this.lastMouseBufferPt.isEqual(bufferPt)) {
      return
    }
    this.lastMouseBufferPt = bufferPt

    if (this.exprTypeTimeout !== undefined) {
      clearTimeout(this.exprTypeTimeout)
    }
    this.exprTypeTimeout = window.setTimeout(
      () => {
        this.shouldShowTooltip(bufferPt, TEventRangeType.mouse)
      },
      atom.config.get('ide-haskell.expressionTypeInterval', {
        scope: this.editor.getRootScopeDescriptor(),
      }),
    )
  }

  private stopTrackingMouseBufferPosition = () => {
    if (this.exprTypeTimeout !== undefined) {
      return clearTimeout(this.exprTypeTimeout)
    }
  }

  private trackSelection = ({ newBufferRange }: { newBufferRange: Range }) => {
    this.handleCursorUnderTooltip(newBufferRange)

    if (this.selTimeout !== undefined) {
      clearTimeout(this.selTimeout)
    }
    if (newBufferRange.isEmpty()) {
      this.tooltips.hide(TEventRangeType.selection)
      if (this.exprTypeTimeout !== undefined) {
        clearTimeout(this.exprTypeTimeout)
      }
      // tslint:disable-next-line:no-floating-promises
      this.tooltipRegistry.showTooltip(this.editor, TEventRangeType.keyboard)
      if (
        atom.config.get('ide-haskell.onCursorMove', {
          scope: this.editor.getRootScopeDescriptor(),
        }) === 'Hide Tooltip'
      ) {
        this.tooltips.hide(TEventRangeType.mouse, undefined, {
          persistent: false,
        })
        this.tooltips.hide(TEventRangeType.context, undefined, {
          persistent: false,
        })
      }
    } else {
      this.selTimeout = window.setTimeout(
        () =>
          this.shouldShowTooltip(
            newBufferRange.start,
            TEventRangeType.selection,
          ),
        atom.config.get('ide-haskell.expressionTypeInterval', {
          scope: this.editor.getRootScopeDescriptor(),
        }),
      )
    }
  }

  private handleCursorUnderTooltip(currentRange: Range) {
    const tooltipElement = document.querySelector('ide-haskell-tooltip')
    if (!tooltipElement) {
      return
    }
    const slcl = this.editorElement.pixelRectForScreenRange(
      this.editor.screenRangeForBufferRange(currentRange),
    )
    const sv = this.editorElement.querySelector('.scroll-view')
    if (!sv) {
      return
    }
    const eecl = sv.getBoundingClientRect()
    const ttcl = tooltipElement.getBoundingClientRect()
    const div = tooltipElement.querySelector('div')
    if (!div) {
      return
    }
    const ttcld = div.getBoundingClientRect()
    const ttbox = {
      left: ttcl.left - eecl.left,
      top: ttcld.top - eecl.top,
      width: ttcl.width,
      height: ttcld.height,
    }
    const xmax = Math.round(Math.max(ttbox.left, slcl.left))
    const xmin = Math.round(
      Math.min(ttbox.left + ttbox.width, slcl.left + slcl.width),
    )
    const ymax = Math.round(Math.max(ttbox.top, slcl.top))
    const ymin = Math.round(
      Math.min(ttbox.top + ttbox.height, slcl.top + slcl.height),
    )
    const tt = document.querySelector(
      'ide-haskell-tooltip',
    ) as HTMLElement | null
    if (tt) {
      if (ymax <= ymin && xmax <= xmin) {
        tt.classList.add('ide-haskell-tooltip-subdued')
      } else {
        tt.classList.remove('ide-haskell-tooltip-subdued')
      }
    }
  }
}
