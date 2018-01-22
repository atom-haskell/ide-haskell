import { ResultItem } from './result-item'
import { CompositeDisposable, Emitter } from 'atom'
import { Provider, TMessageProviderFunction } from './provider'
import { notUndefined } from '../utils'
import * as UPI from 'atom-haskell-upi'

export { TMessageProviderFunction, ResultItem }

export type TUpdateCallback = (severities: UPI.TSeverity[]) => void

export class ResultsDB {
  private currentId: number
  private messages: Map<string, ResultItem>
  private disposables: CompositeDisposable
  private emitter: Emitter<
    {},
    {
      'did-update': UPI.TSeverity[]
    }
  >
  constructor() {
    this.currentId = 0
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.messages = new Map()
  }

  public destroy() {
    this.disposables.dispose()
  }

  public onDidUpdate(callback: TUpdateCallback) {
    return this.emitter.on('did-update', callback)
  }

  public didUpdate(providerId: number, msgs: ResultItem[]) {
    const uris: string[] = msgs.map((v) => v.uri).filter(notUndefined)
    for (const [k, v] of Array.from(this.messages)) {
      if (
        v.providerId === providerId ||
        (v.uri !== undefined && uris.includes(v.uri))
      ) {
        this.messages.delete(k)
      }
    }
    for (const msg of msgs) {
      this.messages.set(msg.hash(), msg)
    }
    const severities: Set<UPI.TSeverity> = new Set(msgs.map((v) => v.severity))
    this.emitter.emit('did-update', Array.from(severities))
  }

  public registerProvider() {
    const p = new Provider(this, ++this.currentId)
    this.disposables.add(p)
    return p
  }

  public results() {
    return this.messages.values()
  }

  public *filter(f: (item: ResultItem) => boolean) {
    for (const v of this.results()) {
      if (f(v)) {
        yield v
      }
    }
  }

  public isEmpty(severities: UPI.TSeverity[]) {
    return !Array.from(this.messages.values()).some(({ severity }) =>
      severities.includes(severity),
    )
  }
}
