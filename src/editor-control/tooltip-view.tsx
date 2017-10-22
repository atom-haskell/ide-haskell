import * as etch from 'etch'

export class TooltipMessage {
  private message: JSX.Element[]
  // tslint:disable-next-line:no-uninitialized
  private element: HTMLElement
  constructor(message: UPI.IMessageObject | UPI.IMessageObject[]) {
    if (Array.isArray(message)) {
      // tslint:disable-next-line:no-unsafe-any
      this.message = message.map((m) => <div key={m} innerHTML={m.toHtml()} />)
    } else {
      // tslint:disable-next-line:no-unsafe-any
      this.message = [<div key={message} innerHTML={message.toHtml()} />]
    }
    etch.initialize(this)
  }

  public render() {
    return (
      // tslint:disable:no-unsafe-any
      <ide-haskell-tooltip>
        {this.message}
      </ide-haskell-tooltip>
      // tslint:enable:no-unsafe-any
    )
  }

  public async update() {
    return etch.update(this)
  }

  public writeAfterUpdate() {
    this.element.parentElement && this.element.parentElement.classList.add('ide-haskell')
  }
}
