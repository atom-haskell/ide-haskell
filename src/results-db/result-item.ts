import {createHash} from 'crypto'
import {Point} from 'atom'
import {TMessage, MessageObject} from '../utils'

export type TSeverity = 'error' | 'warning' | 'lint' | string
export type TPosition = Point | [number, number]

export interface IResultItem {

    /** File URI message relates to */
  uri?: string
  /** position to which message relates */
  position?: TPosition
  /** message itself */
  message: TMessage
  /** message severity, will be shown in corresponding tab */
  severity: TSeverity
  /** any context related to message, will be displayed alongside
      uri and position */
  context?: string
}

export class ResultItem {
  public readonly uri?: string
  public readonly position?: Point
  public readonly message: MessageObject
  public readonly severity: TSeverity
  public readonly context?: string
  private _isValid: boolean
  constructor (public readonly providerId: number, {uri, message, severity, position, context}: IResultItem) {
    this.uri = uri
    this.message = MessageObject.fromObject(message)
    this.severity = severity
    this.position = position && Point.fromObject(position)
    this.context = context
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
      message: this.message.raw(), severity: this.severity,
      context: this.context
    }))
    return h.digest('base64')
  }
}
