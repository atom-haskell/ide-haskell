import { EventTable } from './event-table'
import * as AtomTypes from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

type Range = AtomTypes.Range
type TextEditor = AtomTypes.TextEditor
type DisplayMarker = AtomTypes.DisplayMarker

export interface IMarkerProperties extends AtomTypes.FindDisplayMarkerOptions {
  persistent: boolean
}

export class EditorOverlayManager {
  private markers: EventTable
  private editorElement: HTMLElement
  constructor(private editor: TextEditor) {
    this.markers = new EventTable(editor, [
      [{ type: TEventRangeType.keyboard }, { type: TEventRangeType.context }],
      [{ type: TEventRangeType.mouse }, { type: TEventRangeType.selection }],
    ])
    this.editorElement = atom.views.getView(this.editor)
  }

  public dispose() {
    this.markers.destroy()
    this.editorElement.classList.remove('ide-haskell--has-tooltips')
  }

  public show(
    range: Range,
    type: TEventRangeType,
    source: string,
    detail: IMarkerProperties,
    view: object,
  ) {
    this.hide(type, source)
    const highlightMarker = this.markers
      .get(type, source)
      .markBufferRange(range)
    highlightMarker.setProperties(detail)
    this.decorate(highlightMarker, view)
    this.editorElement.classList.add('ide-haskell--has-tooltips')
  }

  public hide(
    type?: TEventRangeType,
    source?: string,
    template?: IMarkerProperties,
  ) {
    if (type === undefined) {
      this.markers.clear()
      return
    }
    if (!template) {
      this.markers.get(type, source).clear()
    } else {
      this.markers
        .get(type, source)
        .findMarkers(template)
        .forEach((m: DisplayMarker) => m.destroy())
    }
    if (!this.has()) {
      this.editorElement.classList.remove('ide-haskell--has-tooltips')
    }
  }

  public has(
    type?: TEventRangeType,
    source?: string,
    template?: IMarkerProperties,
  ) {
    if (type === undefined) {
      return this.markers.getMarkerCount() > 0
    }
    if (!template) {
      return this.markers.get(type, source).getMarkerCount() > 0
    } else {
      return this.markers.get(type, source).findMarkers(template).length > 0
    }
  }

  private decorate(marker: DisplayMarker, tooltipView: object) {
    this.editor.decorateMarker(marker, {
      type: 'overlay',
      position: 'tail',
      item: tooltipView,
    })
    this.editor.decorateMarker(marker, {
      type: 'highlight',
      class: 'ide-haskell-type',
    })
  }
}
