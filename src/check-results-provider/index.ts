import {
  Range, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker,
  DisplayMarkerLayer
} from 'atom'

import {ResultItem} from '../results-db'
import {MessageObject} from '../utils'
import {ResultsDB} from '../results-db'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {PluginManager, IEditorController} from '../plugin-manager'

export class CheckResultsProvider implements IEditorController {
  public gutter: Gutter
  private markers: DisplayMarkerLayer
  private disposables: CompositeDisposable
  private markerProps: WeakMap<DisplayMarker, ResultItem>
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    const results = pluginManager.resultsDB
    const tooltipRegistry = pluginManager.tooltipRegistry
    this.gutter = this.editor.gutterWithName('ide-haskell-check-results')

    this.disposables = new CompositeDisposable()
    this.markers = editor.addMarkerLayer({
      maintainHistory: true,
      persistent: false
    })
    this.markerProps = new WeakMap()
    this.disposables.add(results.onDidUpdate(this.updateResults.bind(this)))
    this.disposables.add(tooltipRegistry.register('builtin:check-results', {
      priority: 200,
      handler: this.tooltipProvider.bind(this)
    }))
  }

  public destroy () {
    this.markers.destroy()
    this.disposables.dispose()
  }

  private tooltipProvider (editor: TextEditor, crange: Range, type: TEventRangeType) {
    const msg = this.getMessageAt(crange.start, type)
    if (msg.length > 0) {
      return { range: crange, text: msg }
    }
  }

  private getMessageAt (pos: Point, type: TEventRangeType) {
    const markers = this.find(pos, type)
    const result: MessageObject[] = []
    for (const marker of markers) {
      const res = this.markerProps.get(marker)
      if (!res) { continue }
      result.push(res.message)
    }
    return result
  }

  private updateResults ({res}: {res: ResultsDB}) {
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
    const disp = marker.onDidChange(({isValid}: DisplayMarker) => {
      if (!isValid) {
        this.markerProps.delete(marker)
        resItem.destroy()
        marker.destroy()
        disp.dispose()
      }
    })
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

  private find (pos: Point, type: TEventRangeType) {
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
