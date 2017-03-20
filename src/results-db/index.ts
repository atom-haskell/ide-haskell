import {TPosition, TSeverity, IResultItem, ResultItem} from './result-item'
import {CompositeDisposable, Emitter} from 'atom'
import {Provider, TMessageProviderFunction} from './provider'

export {TPosition, TSeverity, IResultItem, TMessageProviderFunction, ResultItem}

export type TUpdateCallback = (arg: ResultsDB) => void

export class ResultsDB {
  private currentId: number
  private messages: ResultItem[]
  private disposables: CompositeDisposable
  private emitter: Emitter
  constructor () {
    this.currentId = 0
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.messages = []
  }

  public destroy () {
    this.disposables.dispose()
  }

  public onDidUpdate (callback: TUpdateCallback) {
    return this.emitter.on('did-update', callback)
  }

  public didUpdate (providerId: number, msgs: ResultItem[]) {
    this.messages = this.messages.filter((m) => m.providerId !== providerId)
    this.messages.push(...msgs)
    this.emitter.emit('did-update', this)
  }

  public registerProvider (providerName: string) {
    const p = new Provider(this, ++this.currentId, name)
    this.disposables.add(p)
    return p
  }

  public results () {
    return this.messages.filter((i) => i.isValid())
  }

  public filter (f: (item: ResultItem) => boolean) {
    return this.messages.filter(f)
  }

  public isEmpty () {
    return this.messages.length === 0
  }
}
