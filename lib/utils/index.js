'use babel';
export const MessageObject = require('./message-object');
export const MainMenuLabel = 'Haskell IDE';
export function getEventType(detail) {
    if (detail && (detail.contextCommand || (detail[0] && detail[0].contextCommand))) {
        return 'context';
    }
    else
        return 'keyboard';
}
export function bufferPositionFromMouseEvent(editor, event) {
    let sp = atom.views.getView(editor).component.screenPositionForMouseEvent(event);
    if (isNaN(sp.row) || isNaN(sp.column))
        return null;
    return editor.bufferPositionForScreenPosition(sp);
}
