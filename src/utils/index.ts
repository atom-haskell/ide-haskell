import { Point, TextEditor } from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

export { MessageObject } from './message-object'
export * from './cast'
export * from './element-listener'

export const MAIN_MENU_LABEL = 'Haskell IDE'

export function getEventType(detail: any) {
  if (
    detail &&
    (detail.contextCommand || (detail[0] && detail[0].contextCommand))
  ) {
    return TEventRangeType.context
  } else {
    return TEventRangeType.keyboard
  }
}

// screen position from mouse event
export function bufferPositionFromMouseEvent(
  editor: TextEditor,
  event: MouseEvent,
) {
  const sp: Point = (atom.views.getView(
    editor,
  ) as any).component.screenPositionForMouseEvent(event)
  if (isNaN(sp.row) || isNaN(sp.column)) {
    return undefined
  }
  return editor.bufferPositionForScreenPosition(sp)
}

export function handlePromise(promise: Promise<any>): void {
  // tslint:disable-next-line:strict-type-predicates no-unbound-method
  if (typeof promise.catch !== 'function') {
    atom.notifications.addFatalError(
      'IDE-Haskell: non-promise passed to handlePromise. Please report this.',
      {
        stack: new Error().stack,
        dismissable: true,
      },
    )
    return
  }
  promise.catch((err: Error) => {
    atom.notifications.addFatalError(`IDE-Haskell error: ${err.message}`, {
      detail: err.toString(),
      stack: err.stack,
      dismissable: true,
    })
  })
}
