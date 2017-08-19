import { TextEditor } from 'atom'

export {MessageObject} from './message-object'
export * from './cast'
export * from './element-listener'

export const MAIN_MENU_LABEL = 'Haskell IDE'

export function getEventType(detail: any) {
  if (detail && (detail.contextCommand || (detail[0] && detail[0].contextCommand))) {
    return UPI.TEventRangeType.context
  } else { return UPI.TEventRangeType.keyboard }
}

  // screen position from mouse event
export function bufferPositionFromMouseEvent(editor: TextEditor, event: MouseEvent) {
  const sp = (atom.views.getView(editor) as any).component.screenPositionForMouseEvent(event)
  if (isNaN(sp.row) || isNaN(sp.column)) { return undefined }
  return editor.bufferPositionForScreenPosition(sp)
}
