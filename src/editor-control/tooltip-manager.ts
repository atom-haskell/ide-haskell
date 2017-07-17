import {
  Range, TextEditor, DisplayMarker,
} from 'atom'

import {TooltipMessage} from './tooltip-view'
import {MessageObject} from '../utils'
import {EventTable, TEventRangeType} from './event-table'
export {TEventRangeType}
export interface IMarkerProperties {
  persistOnCursorMove: boolean
}

export class TooltipManager {
  private markers: EventTable
  private editorElement: HTMLElement
  constructor (private editor: TextEditor) {
    this.markers = new EventTable(editor, [
      [{type: 'keyboard'}, {type: 'context'}],
      [{type: 'mouse'}, {type: 'selection'}],
    ])
    this.editorElement = atom.views.getView(this.editor)
  }

  public dispose () {
    this.markers.destroy()
    this.editorElement.classList.remove('ide-haskell--has-tooltips')
  }

  public show (
    range: Range, text: MessageObject | MessageObject[],
    type: TEventRangeType, source: string, detail: IMarkerProperties
  ) {
    this.hide(type, source)
    const highlightMarker = this.markers.get(type, source).markBufferRange(range)
    highlightMarker.setProperties(detail)
    this.decorate(highlightMarker, new TooltipMessage(text))
    this.editorElement.classList.add('ide-haskell--has-tooltips')
  }

  public hide (type?: TEventRangeType, source?: string, template?: IMarkerProperties) {
    if (!type) {
      this.markers.clear()
      return
    }
    if (!template) {
      this.markers.get(type, source).clear()
    } else {
      this.markers.get(type, source).findMarkers(template).forEach((m) => m.destroy())
    }
    if (! this.has()) { this.editorElement.classList.remove('ide-haskell--has-tooltips') }
  }

  public has (type?: TEventRangeType, source?: string, template?: IMarkerProperties) {
    if (!type) {
      return this.markers.getMarkerCount() > 0
    }
    if (!template) {
      return this.markers.get(type, source).getMarkerCount()
    } else {
      return this.markers.get(type, source).findMarkers(template).length > 0
    }
  }

  private decorate (marker: DisplayMarker, tooltipView: TooltipMessage) {
    this.editor.decorateMarker(marker, {
      type: 'overlay',
      position: 'tail',
      item: tooltipView
    })
    this.editor.decorateMarker(marker, {
      type: 'highlight',
      class: 'ide-haskell-type'
    })
  }
}
