import {Point} from 'atom'

export type TPosition = Point | [number, number] | {row: number, column: number}
export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
