import { TextEditor, DisplayMarkerLayer } from 'atom'
import { eventRangeTypeVals } from '../utils'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

export type IMarkerGroup = Array<{ type: TEventRangeType; source?: string }>

export type TTableCell = Map<string | undefined, DisplayMarkerLayer>

export type TTable = { [K in TEventRangeType]: TTableCell }

export class EventTable {
  private table: TTable
  private layers: Set<DisplayMarkerLayer>
  constructor(private editor: TextEditor, groups: IMarkerGroup[]) {
    // tslint:disable-next-line:no-null-keyword
    this.table = Object.create(null)
    for (const i of eventRangeTypeVals) {
      this.table[i] = new Map()
    }
    this.layers = new Set()
    for (const i of groups) {
      const layer = this.editor.addMarkerLayer()
      this.layers.add(layer)
      for (const { type, source } of i) {
        ;(this.table[type] as TTableCell).set(source, layer)
      }
    }
  }

  public destroy() {
    for (const i of this.layers.values()) {
      i.destroy()
    }
    for (const i of this.values()) {
      i.clear()
    }
  }

  public get(type: TEventRangeType, source?: string) {
    const tbl = this.table[type] as Map<string | undefined, DisplayMarkerLayer>
    let res = tbl.get(source)
    if (!res) {
      res = tbl.get(undefined)
    }
    if (!res) {
      throw new Error(`Failed to classify ${type}:${source}`)
    }
    return res
  }

  public clear() {
    for (const i of this.layers.values()) {
      i.clear()
    }
  }

  public getMarkerCount() {
    let count = 0
    for (const i of this.layers.values()) {
      count += i.getMarkerCount()
    }
    return count
  }

  public *values() {
    for (const i of eventRangeTypeVals) {
      yield this.table[i] as TTableCell
    }
  }

  public *entries() {
    for (const i of eventRangeTypeVals) {
      yield [i, this.table[i]]
    }
  }
}
