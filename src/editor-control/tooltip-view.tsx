import * as etch from 'etch'
import { MessageObject, handlePromise } from '../utils'
import * as UPI from 'atom-haskell-upi'

export class TooltipMessage {
  private message: JSX.Element[]
  private actions?: UPI.Action[]
  private element!: HTMLElement
  constructor(
    private source: string,
    message: MessageObject | MessageObject[],
    private showActions: () => void,
    actions?: () => Promise<UPI.Action[]>,
  ) {
    if (Array.isArray(message)) {
      this.message = message.map((m) => <div key={m} innerHTML={m.toHtml()} />)
    } else {
      this.message = [<div key={message} innerHTML={message.toHtml()} />]
    }
    if (actions) {
      actions()
        .then(async (acts) => {
          this.actions = acts
          return this.update()
        })
        .catch((e: Error) => {
          console.error(e)
          atom.notifications.addError(e.name, {
            stack: e.stack,
            detail: e.message,
          })
        })
    }
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-tooltip-with-actions>
        <ide-haskell-tooltip dataset={{ source: this.source }}>
          {this.message}
        </ide-haskell-tooltip>
        {this.renderActions()}
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

  private renderActions() {
    // tslint:disable-next-line: no-null-keyword
    if (!this.actions) return null
    // tslint:disable-next-line: no-null-keyword
    if (!this.actions.length) return null
    const maxActions = 8
    return (
      <ide-haskell-tooltip-actions>
        {this.actions.slice(0, maxActions).map((act) => (
          <button
            className="btn btn-xs"
            on={{ click: () => handlePromise(act.apply()) }}
          >
            {act.title}
          </button>
        ))}
        {this.actions.length > maxActions ? (
          <button className="btn btn-xs" on={{ click: this.showActions }}>
            …
          </button>
        ) : // tslint:disable-next-line: no-null-keyword
        null}
      </ide-haskell-tooltip-actions>
    )
  }
}
