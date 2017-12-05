import { ResultItem } from './result-item'
import { ResultsDB } from './'
import * as UPI from 'atom-haskell-upi'

export type TMessageProviderFunction = (pushMessages: (messages: UPI.IResultItem[]) => void) => void

export class Provider {
  private disposed: boolean
  constructor(
    private parent: ResultsDB, public readonly id: number,
  ) {
    this.disposed = false
  }

  public dispose() {
    if (this.disposed) { return }
    this.disposed = true
    this.parent.didUpdate(this.id, [])
  }

  public setMessages(messages: UPI.IResultItem[]): void {
    if (this.disposed) { return }
    const msgs = messages.map((m) => new ResultItem(this.id, m))
    this.parent.didUpdate(this.id, msgs)
  }
}
