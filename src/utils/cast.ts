import Dock = AtomTypes.Dock
import WorkspaceCenter = AtomTypes.WorkspaceCenter

export function isDock(object: Dock | WorkspaceCenter): object is Dock {
  return object.constructor.name === 'Dock'
}

export function isSimpleControlDef<T>(def: UPI.TControlDefinition<T>): def is UPI.IControlSimpleDefinition {
  return typeof def.element === 'string'
}

export function notUndefined<T>(val: T | undefined): val is T {
  return val !== undefined
}

export const eventRangeTypeVals = [
  UPI.TEventRangeType.context,
  UPI.TEventRangeType.keyboard,
  UPI.TEventRangeType.mouse,
  UPI.TEventRangeType.selection,
]

export function isTEventRangeType(x: UPI.TEventRangeType | Object): x is UPI.TEventRangeType {
  return typeof x === 'string' && eventRangeTypeVals.includes(x as UPI.TEventRangeType)
}

export function isTextMessage(msg: UPI.TMessage): msg is UPI.IMessageText {
  return !!(msg && (msg as UPI.IMessageText).text)
}

export function isHTMLMessage(msg: UPI.TMessage): msg is UPI.IMessageHTML {
  return !!(msg && (msg as UPI.IMessageHTML).html)
}

export function isIMessageObject(msg: UPI.TMessage | UPI.IMessageObject): msg is UPI.IMessageObject {
  return !!(msg && (msg as UPI.IMessageObject).toHtml && (msg as UPI.IMessageObject).raw)
}
