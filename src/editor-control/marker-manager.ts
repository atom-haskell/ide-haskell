import {
  Range, Emitter, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker, TextBuffer,
  DisplayMarkerLayer
} from 'atom'

import {ResultItem, TSeverity} from '../results-db'
import {MessageObject} from '../utils'
import {ResultsDB, TUpdateCallbackArg} from '../results-db'

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
export type TFindType = 'mouse' | 'keyboard' | 'gutter'

export class MarkerManager {
  public gutter: Gutter
  private markers: DisplayMarkerLayer
  private disposables: CompositeDisposable
  private markerProps: WeakMap<DisplayMarker, ResultItem>
  constructor (private editor: TextEditor, private results: ResultsDB) {
    this.gutter = this.editor.gutterWithName('ide-haskell-check-results')
    if (!this.gutter) {
      this.gutter = this.editor.addGutter({
        name: 'ide-haskell-check-results',
        priority: 10
      })
    }

    this.disposables = new CompositeDisposable()
    this.markers = editor.addMarkerLayer({
      maintainHistory: true,
      persistent: false
    })
    this.markerProps = new WeakMap()
    this.updateResults = this.updateResults.bind(this)
    this.disposables.add(results.onDidUpdate(this.updateResults))
  }

  public dispose () {
    this.markers.destroy()
    this.disposables.dispose()
  }

  public getMessageAt (pos: Point, type: TFindType) {
    const markers = this.find(pos, type)
    const result: MessageObject[] = []
    for (const marker of markers) {
      const res = this.markerProps.get(marker)
      if (!res) { continue }
      result.push(res.message)
    }
    return result
  }

  private updateResults ({types}: TUpdateCallbackArg) {
    this.markers.clear()
    const path = this.editor.getPath()
    for (const res of this.results.filter(({uri}) => uri === path)) {
      this.markerFromCheckResult(res)
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

  private find (pos: Point, type: TFindType) {
    switch (type) {
      case 'gutter':
        return this.markers.findMarkers({ startBufferRow: pos.row })
      case 'keyboard':
        return this.markers.findMarkers({ startBufferPosition: pos })
      case 'mouse':
        return this.markers.findMarkers({ containsBufferPosition: pos })
    }
  }
}
