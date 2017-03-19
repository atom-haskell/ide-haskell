import {
  Range, Emitter, TextEditor, Point, CompositeDisposable, Gutter, DisplayMarker, TextBuffer,
  DisplayMarkerLayer
} from 'atom'

import {ResultItem, TSeverity} from '../results-db'
import {TooltipMessage} from './tooltip-view'
import {TMessage, MessageObject} from '../utils'

export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
export interface IMarkerProperties {
  type: TEventRangeType
  subtype: 'check-result' | 'external'
  persistOnCursorMove?: boolean
}
export interface IMarkerTemplate {
  type?: TEventRangeType
  subtype?: 'check-result' | 'external'
  persistOnCursorMove?: boolean
}

export class TooltipManager {
  private tooltipHighlightRange?: Range
  private lastMouseBufferPt?: Point
  private markers: DisplayMarkerLayer
  constructor(private editor: TextEditor) {
    this.markers = this.editor.addMarkerLayer()
  }

  public dispose () {
    this.markers.destroy()
    this.lastMouseBufferPt = undefined
  }

  show (
    range: Range, text: MessageObject | MessageObject[],
    detail: IMarkerProperties
  ) {
    if (this.tooltipHighlightRange && range.isEqual(this.tooltipHighlightRange)) {
      return
    }
    this.hide()
      // exit if mouse moved away
    if (detail.type === 'mouse') {
      if (this.lastMouseBufferPt && !range.containsPoint(this.lastMouseBufferPt)) {
        return
      }
    }
    if (detail.type === 'selection') {
      const lastSel = this.editor.getLastSelection()
      if (!range.containsRange(lastSel.getBufferRange()) || !!lastSel.isEmpty()) {
        return
      }
    }
    this.tooltipHighlightRange = range
    const highlightMarker = this.markers.markBufferRange(range)
    highlightMarker.setProperties(detail)
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

  hide (template?: IMarkerTemplate) {
    if (!template) {
      this.markers.clear()
      return
    }
    this.tooltipHighlightRange = undefined
    this.markers.findMarkers(template).forEach((m) => m.destroy())
  }

  has (template?: IMarkerTemplate) {
    if (!template) {
      return this.markers.getMarkerCount() > 0
    }
    return this.markers.findMarkers(template).length > 0
  }
}
