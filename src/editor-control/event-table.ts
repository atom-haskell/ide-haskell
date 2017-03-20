import {
  TextEditor, DisplayMarkerLayer
} from 'atom'

/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string> (o: T[]): {[K in T]: K} {
  return o.reduce(
    (res, key) => {
      res[key] = key
      return res
    },
    // tslint:disable-next-line:no-null-keyword
    Object.create(null)
  )
}

// tslint:disable-next-line:variable-name
export const TEventRangeType = strEnum([
  'keyboard', 'context', 'mouse', 'selection', 'gutter'
])

export function isTEventRangeType (x: Object): x is TEventRangeType {
  return typeof x === 'string' && Object.keys(TEventRangeType).includes(x)
}

export type TEventRangeType = keyof typeof TEventRangeType
export type IMarkerGroup = Array<{type: TEventRangeType, source?: string}>

export class EventTable {
  private table: {
    [K in TEventRangeType]: Map<string | undefined, DisplayMarkerLayer>
  }
  private layers: Set<DisplayMarkerLayer>
  constructor (private editor: TextEditor, groups: IMarkerGroup[]) {
    // tslint:disable-next-line:no-null-keyword
    this.table = Object.create(null)
    for (const i of this.keys()) {
      this.table[i] = new Map()
    }
    this.layers = new Set()
    for (const i of groups) {
      const layer = this.editor.addMarkerLayer()
      this.layers.add(layer)
      for (const {type, source} of i) {
        this.table[type].set(source, layer)
      }
    }
  }

  public destroy () {
    for (const i of this.layers.values()) {
      i.destroy()
    }
    for (const i of this.values()) {
      i.clear()
    }
  }

  public get (type: TEventRangeType, source?: string) {
    let res = this.table[type].get(source)
    if (!res) {
      res = this.table[type].get(undefined)
    }
    if (!res) {
      throw new Error(`Failed to classify ${type}:${source}`)
    }
    return res
  }

  public clear () {
    for (const i of this.layers.values()) {
      i.clear()
    }
  }

  public getMarkerCount () {
    let count = 0
    for (const i of this.layers.values()) {
      count += i.getMarkerCount()
    }
    return count
  }

  public keys () {
    return Object.keys(TEventRangeType)
  }

  public * values () {
    for (const i of this.keys()){
      yield this.table[i]
    }
  }

  public * entries () {
    for (const i of this.keys()){
      yield [i, this.table[i]]
    }
  }
}
