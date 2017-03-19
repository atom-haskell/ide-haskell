import * as etch from 'etch'
import {MessageObject} from '../utils'

export class TooltipMessage {
  // tslint:disable-next-line:no-uninitialized-class-properties // TODO: fix this?
  private message: JSX.Element[]
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor (message: MessageObject | MessageObject[]) {
    if (Array.isArray(message)) {
      this.message = message.map((m) => <div innerHTML={m.toHtml()}/>)
    } else {
      this.message = [<div innerHTML={message.toHtml()}/>]
    }
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-tooltip>
        {this.message}
      </ide-haskell-tooltip>
    )
  }

  public update () {
    return etch.update(this)
  }

  public writeAfterUpdate () {
    this.element.parentElement && this.element.parentElement.classList.add('ide-haskell')
  }
}
