import * as etch from 'etch'

export class TooltipMessage {
  private message: JSX.Element[]
  // tslint:disable-next-line:no-uninitialized
  private element: HTMLElement
  constructor(message: UPI.IMessageObject | UPI.IMessageObject[]) {
    if (Array.isArray(message)) {
      this.message = message.map((m) => <div key={m} innerHTML={m.toHtml()} />)
    } else {
      this.message = [<div key={message} innerHTML={message.toHtml()} />]
    }
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-tooltip>
        {this.message}
      </ide-haskell-tooltip>
    )
  }

  public async update() {
    return etch.update(this)
  }

  public writeAfterUpdate() {
    this.element.parentElement && this.element.parentElement.classList.add('ide-haskell')
  }
}
