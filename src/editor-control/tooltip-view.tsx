// tslint:disable: no-null-keyword
import * as etch from 'etch'
import { MessageObject, handlePromise } from '../utils'

export class TooltipMessage {
  private message: JSX.Element[]
  private actions?: JSX.Element
  private element!: HTMLElement
  constructor(
    private source: string,
    message: MessageObject | MessageObject[],
    actions?: Promise<JSX.Element | undefined>,
  ) {
    if (Array.isArray(message)) {
      this.message = message.map((m) => <div key={m} innerHTML={m.toHtml()} />)
    } else {
      this.message = [<div key={message} innerHTML={message.toHtml()} />]
    }
    if (actions) {
      handlePromise(
        actions.then(async (acts) => {
          this.actions = acts
          return this.update()
        }),
      )
    }
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-tooltip-with-actions>
        <ide-haskell-tooltip dataset={{ source: this.source }}>
          {this.message}
        </ide-haskell-tooltip>
        {this.actions ?? null}
      </ide-haskell-tooltip-with-actions>
    )
  }

  public async update() {
    return etch.update(this)
  }

  public writeAfterUpdate() {
    if (this.element.parentElement) {
      this.element.parentElement.classList.add('ide-haskell')
    }
  }
}
