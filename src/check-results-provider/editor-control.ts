import {
  Range, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker,
  DisplayMarkerLayer
} from 'atom'

import {ResultItem} from '../results-db'
import {MessageObject} from '../utils'
import {ResultsDB} from '../results-db'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {PluginManager, IEditorController} from '../plugin-manager'
import {listen, bufferPositionFromMouseEvent} from '../utils'
import {TooltipRegistry} from '../tooltip-registry'

export class CREditorControl implements IEditorController {
  private gutter: Gutter
  private gutterElement: HTMLElement
  private markers: DisplayMarkerLayer
  private disposables: CompositeDisposable
  private markerProps: WeakMap<DisplayMarker, ResultItem>
  private tooltipRegistry: TooltipRegistry
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    this.gutter = this.editor.gutterWithName('ide-haskell-check-results')
    if (!this.gutter) {
      this.gutter = this.editor.addGutter({
        name: 'ide-haskell-check-results',
        priority: 10
      })
    }
    this.gutterElement = atom.views.getView(this.gutter)

    const results = pluginManager.resultsDB
    this.tooltipRegistry = pluginManager.tooltipRegistry

    this.disposables = new CompositeDisposable()
    this.markers = editor.addMarkerLayer({
      maintainHistory: true,
      persistent: false
    })
    this.markerProps = new WeakMap()
    this.disposables.add(results.onDidUpdate(this.updateResults.bind(this)))
    this.updateResults(results)
    this.registerGutterEvents()
  }

  public destroy () {
    this.markers.destroy()
    this.disposables.dispose()
    try {
      this.gutter.destroy()
    } catch (e) {
      console.warn(e)
    }
  }

  public getMessageAt (pos: Point, type: TEventRangeType | 'gutter') {
    const markers = this.find(pos, type)
    const result: MessageObject[] = []
    for (const marker of markers) {
      const res = this.markerProps.get(marker)
      if (!res) { continue }
      result.push(res.message)
    }
    return result
  }

  private registerGutterEvents () {
    this.disposables.add(listen(
      this.gutterElement, 'mouseover', '.decoration',
      (e) => {
        const bufferPt = bufferPositionFromMouseEvent(this.editor, e as MouseEvent)
        if (bufferPt) {
          const msg = this.getMessageAt(bufferPt, 'gutter')
          if (msg.length > 0) {
            this.tooltipRegistry.showTooltip(
              this.editor, 'mouse',
              {
                pluginName: 'builtin:check-results',
                tooltip: {
                  text: msg,
                  range: new Range(bufferPt, bufferPt)
                }
              }
            )
          }
        }
      }
    ))
    this.disposables.add(listen(
      this.gutterElement, 'mouseout', '.decoration', (e) =>
        this.tooltipRegistry.hideTooltip(this.editor, 'mouse', 'builtin:check-results')
    ))
  }

  private updateResults (res: ResultsDB) {
    this.markers.clear()
    const path = this.editor.getPath()
    for (const r of res.filter(({uri}) => uri === path)) {
      this.markerFromCheckResult(r)
    }
  }

  private markerFromCheckResult (resItem: ResultItem) {
    const {position} = resItem
    if (!position) { return }

    const range = new Range(position, Point.fromObject([position.row, position.column + 1]))
    const marker = this.markers.markBufferRange(range, { invalidate: 'touch' })
    this.markerProps.set(marker, resItem)
    const disp = new CompositeDisposable()
    disp.add(
      marker.onDidDestroy(() => {
        this.markerProps.delete(marker)
        disp.dispose()
      }),
      marker.onDidChange(({isValid}: {isValid: boolean}) => {
        resItem.setValid(isValid)
      })
    )
    this.decorateMarker(marker, resItem)
  }

  private decorateMarker (m: DisplayMarker, r: ResultItem) {
    if (!this.gutter) {
      return
    }
    const cls = {class: `ide-haskell-${r.severity}`}
    this.gutter.decorateMarker(m, { type: 'line-number', ...cls })
    this.editor.decorateMarker(m, { type: 'highlight', ...cls })
    this.editor.decorateMarker(m, { type: 'line', ...cls })
  }

  private find (pos: Point, type: TEventRangeType | 'gutter') {
    switch (type) {
      case 'gutter':
      case 'selection': // TODO: this is not good
        return this.markers.findMarkers({ startBufferRow: pos.row })
      case 'keyboard':
        return this.markers.findMarkers({ startBufferPosition: pos })
      case 'mouse':
      case 'context':
        return this.markers.findMarkers({ containsBufferPosition: pos })
      default: throw new TypeError('Switch assertion failed')
    }
  }
}
