import {TextEditor} from 'atom'

export {MessageObject, TMessage} from './message-object'
export * from './cast'
export * from './element-listener'

export const MAIN_MENU_LABEL = 'Haskell IDE'

export function getEventType (detail: any) {
  if (detail && (detail.contextCommand || (detail[0] && detail[0].contextCommand))) {
    return 'context'
  } else { return 'keyboard' }
}

  // screen position from mouse event
export function bufferPositionFromMouseEvent (editor: TextEditor, event: MouseEvent) {
  const sp = atom.views.getView(editor).component.screenPositionForMouseEvent(event)
  if (isNaN(sp.row) || isNaN(sp.column)) { return }
  return editor.bufferPositionForScreenPosition(sp)
}
