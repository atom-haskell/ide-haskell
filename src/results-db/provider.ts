import {IResultItem, ResultItem} from './result-item'
import {ResultsDB} from  './'

export type TMessageProviderFunction = (pushMessages: (messages: IResultItem[]) => void) => void

export class Provider {
  private disposed: boolean
  constructor (
    private parent: ResultsDB, public readonly id: number, private name: string
  ) {
    this.disposed = false
  }

  public dispose () {
    if (this.disposed) { return }
    this.disposed = true
    this.parent.didUpdate(this.id, [])
  }

  public setMessages (messages: IResultItem[]): void {
    if (this.disposed) { return }
    const msgs = messages.map((m) => new ResultItem(this.id, m))
    this.parent.didUpdate(this.id, msgs)
  }
}
