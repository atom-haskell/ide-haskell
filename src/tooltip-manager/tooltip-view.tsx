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
        {this.renderTooltip()}
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

  private renderTooltip() {
    if (this.message.length) {
      return (
        <ide-haskell-tooltip
          on={{ click: this.tooltipClick }}
          dataset={{ source: this.source }}
        >
          {this.message}
        </ide-haskell-tooltip>
      )
    } else {
      return null
    }
  }

  private tooltipClick = (e: MouseEvent) => {
    if (!e.target) return
    const htmlTarget = e.target as HTMLElement
    if (htmlTarget.matches('a')) {
      const href = (htmlTarget as HTMLLinkElement).href
      if (href) {
        handlePromise(
          atom.workspace.open(`ide-haskell://hoogle/web/${href}`, {
            searchAllPanes: true,
            split: 'right',
            activateItem: true,
          }),
        )
      }
    }
  }
}
