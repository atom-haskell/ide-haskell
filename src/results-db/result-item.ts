'use babel'

import {Point} from 'atom'
import {ResultsDB} from './'
import {TMessage, MessageObject} from '../utils'

export type TSeverity = 'error' | 'warning' | 'lint' | string
export type TPosition = Point | [number, number] | {row: number, column: number}

export interface IResultItem {
  uri?: string
  position?: TPosition
  message: TMessage
  severity: TSeverity
}

export class ResultItem {
  public uri?: string
  public position?: Point
  public message: MessageObject
  public severity: TSeverity
  constructor (public parent: ResultsDB | null, {uri, message, severity, position}: IResultItem) {
    this.uri = uri
    this.message = MessageObject.fromObject(message)
    this.severity = severity
    this.position = position && Point.fromObject(position)
  }

  public destroy () {
    this.parent && this.parent.removeResult(this)
  }
}
