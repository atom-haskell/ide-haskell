'use babel'

export let MainMenuLabel = 'Haskell IDE'

export function getEventType (detail) {
  if (detail && (detail.contextCommand || (detail[0] && detail[0].contextCommand))) {
    return 'context'
  } else return 'keyboard'
}

  // screen position from mouse event
export function bufferPositionFromMouseEvent (editor, event) {
  let sp = atom.views.getView(editor).component.screenPositionForMouseEvent(event)
  if (isNaN(sp.row) || isNaN(sp.column)) return null
  return editor.bufferPositionForScreenPosition(sp)
}
