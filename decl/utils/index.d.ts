import { TextEditor } from 'atom';
export { MessageObject, TMessage } from './message-object';
export * from './element-listener';
export declare const MAIN_MENU_LABEL = "Haskell IDE";
export declare function getEventType(detail: any): "keyboard" | "context";
export declare function bufferPositionFromMouseEvent(editor: TextEditor, event: MouseEvent): AtomTypes.Point | undefined;
