import {CompositeDisposable, Point, Disposable, TextBuffer, TextEditor} from 'atom'

export interface IUPIMessageText {
  text: string
  highlighter?: string
}

export interface IUPIMessageHTML {
  html: string
}

export type TPosition = Point | [number, number] | {row: number, column: number}
export type TUPIText = String | IUPIMessageText | IUPIMessageHTML
export type TEventRangeType = 'keyboard' | 'context' | 'mouse' | 'selection'
