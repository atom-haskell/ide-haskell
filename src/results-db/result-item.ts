import {createHash} from 'crypto'
import {Point} from 'atom'
import {TMessage, MessageObject} from '../utils'

export type TSeverity = 'error' | 'warning' | 'lint' | string
export type TPosition = Point | [number, number]

export interface IResultItem {
  uri?: string
  position?: TPosition
  message: TMessage
  severity: TSeverity
}

export class ResultItem {
  public readonly uri?: string
  public readonly position?: Point
  public readonly message: MessageObject
  public readonly severity: TSeverity
  private _isValid: boolean
  constructor (public readonly providerId: number, {uri, message, severity, position}: IResultItem) {
    this.uri = uri
    this.message = MessageObject.fromObject(message)
    this.severity = severity
    this.position = position && Point.fromObject(position)
    this._isValid = true
  }

  public isValid () {
    return this._isValid
  }

  public setValid (isValid: boolean) {
    this._isValid = isValid
  }

  public hash () {
    const h = createHash('md5')
    h.update(JSON.stringify({
      uri: this.uri, position: this.position && this.position.serialize(),
      message: this.message.raw(), severity: this.severity
    }))
    return h.digest('latin1')
  }
}
