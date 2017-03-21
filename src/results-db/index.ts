import {TPosition, TSeverity, IResultItem, ResultItem} from './result-item'
import {CompositeDisposable, Emitter} from 'atom'
import {Provider, TMessageProviderFunction} from './provider'

export {TPosition, TSeverity, IResultItem, TMessageProviderFunction, ResultItem}

export type TUpdateCallback = (arg: ResultsDB) => void

export class ResultsDB {
  private currentId: number
  private messages: Map<string, ResultItem>
  private disposables: CompositeDisposable
  private emitter: Emitter
  constructor () {
    this.currentId = 0
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.messages = new Map()
  }

  public destroy () {
    this.disposables.dispose()
  }

  public onDidUpdate (callback: TUpdateCallback) {
    return this.emitter.on('did-update', callback)
  }

  public didUpdate (providerId: number, msgs: ResultItem[]) {
    for (const [k, v] of this.messages) {
      if (v.providerId === providerId) {
        this.messages.delete(k)
      }
    }
    for (const msg of msgs) {
      this.messages.set(msg.hash(), msg)
    }
    this.emitter.emit('did-update', this)
  }

  public registerProvider (providerName: string) {
    const p = new Provider(this, ++this.currentId, providerName)
    this.disposables.add(p)
    return p
  }

  public results () {
    return this.messages.values()
  }

  public * filter (f: (item: ResultItem) => boolean) {
    for (const v of this.results()) {
      if (f(v)) { yield v }
    }
  }

  public isEmpty () {
    return this.messages.size === 0
  }
}
