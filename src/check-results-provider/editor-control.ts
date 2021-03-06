import {
  Range,
  TextEditor,
  Point,
  CompositeDisposable,
  Gutter,
  DisplayMarker,
  DisplayMarkerLayer,
} from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

import { ResultsDB, ResultItem } from '../results-db'
import { PluginManager, IEditorController } from '../plugin-manager'
import {
  listen,
  bufferPositionFromMouseEvent,
  handlePromise,
  MessageObject,
} from '../utils'
import { TooltipManager } from '../tooltip-manager'

export class CREditorControl implements IEditorController {
  private gutter: Gutter
  private gutterElement: HTMLElement
  private markers: DisplayMarkerLayer
  private disposables: CompositeDisposable
  private markerProps: WeakMap<DisplayMarker, ResultItem>
  private tooltipManager: TooltipManager
  private resultsDB: ResultsDB
  constructor(private editor: TextEditor, pluginManager: PluginManager) {
    const gutter = this.editor.gutterWithName('ide-haskell-check-results')
    if (gutter) {
      this.gutter = gutter
    } else {
      this.gutter = this.editor.addGutter({
        name: 'ide-haskell-check-results',
        priority: 10,
      })
    }
    this.gutterElement = atom.views.getView(this.gutter)

    this.resultsDB = pluginManager.resultsDB
    this.tooltipManager = pluginManager.tooltipManager

    this.disposables = new CompositeDisposable()
    this.markers = editor.addMarkerLayer({
      maintainHistory: true,
      persistent: false,
    })
    this.markerProps = new WeakMap()
    this.disposables.add(this.resultsDB.onDidUpdate(this.updateResults))
    this.updateResults()
    this.registerGutterEvents()
  }

  public static supportsGrammar(grammar: string): boolean {
    return [
      'source.c2hs',
      // 'source.cabal',
      'source.hsc2hs',
      'source.haskell',
      'text.tex.latex.haskell',
      'source.hsig',
    ].includes(grammar)
  }

  public destroy() {
    this.markers.destroy()
    this.disposables.dispose()
    try {
      this.gutter.destroy()
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.warn(e)
    }
  }

  public getMessageAt(
    pos: Point,
    type: TEventRangeType | 'gutter',
  ): MessageObject[] {
    return Array.from(this.getResultAt(pos, type)).map((res) => res.message)
  }

  private *getResultAt(pos: Point, type: TEventRangeType | 'gutter') {
    const markers = this.find(pos, type)
    for (const marker of markers) {
      if (!marker.isValid()) continue
      const res = this.markerProps.get(marker)
      if (!res) continue
      yield res
    }
  }

  private registerGutterEvents() {
    this.disposables.add(
      listen(this.gutterElement, 'mouseover', '.decoration', (e) => {
        const bufferPt = bufferPositionFromMouseEvent(
          this.editor,
          e as MouseEvent,
        )
        if (bufferPt) {
          const msg = this.getMessageAt(bufferPt, 'gutter')
          if (msg.length > 0) {
            handlePromise(
              this.tooltipManager.showTooltip(
                this.editor,
                TEventRangeType.mouse,
                {
                  pluginName: 'builtin:check-results',
                  tooltip: {
                    text: msg,
                    range: new Range(bufferPt, bufferPt),
                  },
                },
              ),
            )
          }
        }
      }),
    )
    this.disposables.add(
      listen(this.gutterElement, 'mouseout', '.decoration', () =>
        this.tooltipManager.hideTooltip(
          this.editor,
          TEventRangeType.mouse,
          'builtin:check-results',
        ),
      ),
    )
  }

  private updateResults = () => {
    const path = this.editor.getPath()
    const resultsToMark = this.resultsDB.filter(
      (m) => m.uri === path && m.isValid(),
    )
    const currentMarkers = this.markers.getMarkers()
    const newResults = resultsToMark.filter((r) =>
      currentMarkers.every((m) => this.markerProps.get(m) !== r),
    )
    const markersToDelete = currentMarkers.filter((m) => {
      const p = this.markerProps.get(m)
      return !p || !resultsToMark.includes(p)
    })
    markersToDelete.forEach((m) => m.destroy())
    for (const r of newResults) {
      this.markerFromCheckResult(r)
    }
  }

  private markerFromCheckResult(resItem: ResultItem) {
    const { position } = resItem
    if (!position) {
      return
    }

    const range = new Range(
      position,
      Point.fromObject([position.row, position.column + 1]),
    )
    const marker = this.markers.markBufferRange(range, { invalidate: 'inside' })
    this.markerProps.set(marker, resItem)
    const disp = new CompositeDisposable()
    disp.add(
      marker.onDidDestroy(() => {
        this.markerProps.delete(marker)
        disp.dispose()
      }),
      marker.onDidChange(({ isValid }: { isValid: boolean }) => {
        resItem.setValid(isValid)
      }),
    )
    this.decorateMarker(marker, resItem)
  }

  private decorateMarker(m: DisplayMarker, r: ResultItem) {
    const cls = { class: `ide-haskell-${r.severity}` }
    this.gutter.decorateMarker(m, { type: 'line-number', ...cls })
    this.editor.decorateMarker(m, { type: 'highlight', ...cls })
  }

  private find(pos: Point, type: TEventRangeType | 'gutter') {
    switch (type) {
      case 'gutter':
        return this.markers.findMarkers({ startBufferRow: pos.row })
      case 'keyboard':
        return this.markers.findMarkers({ startBufferPosition: pos })
      case 'mouse':
        return this.markers.findMarkers({ containsBufferPosition: pos })
      default:
        throw new TypeError('Switch assertion failed')
    }
  }
}
