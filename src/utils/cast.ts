import Dock = AtomTypes.Dock
import WorkspaceCenter = AtomTypes.WorkspaceCenter

export function isDock (object: Dock | WorkspaceCenter): object is Dock {
  return object.constructor.name === 'Dock'
}

export function isSimpleControlDef<T> (def: UPI.TControlDefinition<T>): def is UPI.IControlSimpleDefinition {
  return typeof def.element === 'string'
}
