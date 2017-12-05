import * as AtomTypes from 'atom'
import * as UPI from 'atom-haskell-upi'
import Dock = AtomTypes.Dock
import WorkspaceCenter = AtomTypes.WorkspaceCenter
import TEventRangeType = UPI.TEventRangeType

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
  TEventRangeType.context,
  TEventRangeType.keyboard,
  TEventRangeType.mouse,
  TEventRangeType.selection,
]

export function isTEventRangeType(x: TEventRangeType | Object): x is TEventRangeType {
  return typeof x === 'string' && eventRangeTypeVals.includes(x as TEventRangeType)
}

export function isTextMessage(msg: UPI.TMessage): msg is UPI.IMessageText {
  return !!(msg && (msg as UPI.IMessageText).text)
}

export function isHTMLMessage(msg: UPI.TMessage): msg is UPI.IMessageHTML {
  return !!(msg && (msg as UPI.IMessageHTML).html)
}
