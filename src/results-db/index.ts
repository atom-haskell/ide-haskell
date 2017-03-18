'use babel'

import {TPosition, TSeverity, IResultItem, ResultItem} from './result-item'
import {CompositeDisposable, Emitter} from 'atom'

export {TPosition, TSeverity, IResultItem}

export type TUpdateCallbackArg = {res: ResultsDB, types: TSeverity[]}
export type TUpdateCallback = (arg: TUpdateCallbackArg) => void

export class ResultsDB {
  private _results: ResultItem[]
  private disposables: CompositeDisposable
  private emitter: Emitter
  constructor () {
    this._results = []
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())
  }

  public destroy () {
    this.disposables.dispose()
  }

  public onDidUpdate (callback: TUpdateCallback) {
    return this.emitter.on('did-update', callback)
  }

  public setResults (res: IResultItem[], severityArr: TSeverity[]) {
    if (severityArr) {
      this._results =
        this._results.filter(({severity}) => !(severityArr.includes(severity)))
        .concat(res.map((i) => new ResultItem(this, i)))
    } else {
      this._results = res.map((i) => new ResultItem(this, i))
    }

    if (!severityArr) {
      severityArr = this.calcSeverityArr(res)
    }

    this.emitter.emit('did-update', {res: this, types: severityArr})
  }

  public appendResults (res: IResultItem[], severityArr: TSeverity[]) {
    this._results = this._results.concat(res.map((r) => new ResultItem(this, r)))

    if (!severityArr) {
      severityArr = this.calcSeverityArr(res)
    }

    this.emitter.emit('did-update', {res: this, types: severityArr})
  }

  public removeResult (resItem: ResultItem) {
    this._results = this._results.filter((res) => res !== resItem)
    resItem.parent = null
  }

  public results () {
    return this._results
  }

  public filter (f: (item: ResultItem) => boolean) {
    return this._results.filter(f)
  }

  public isEmpty () {
    return this._results.length === 0
  }

  private calcSeverityArr (res: IResultItem[]) {
    const severityArr: TSeverity[] = []
    for (const {severity} of res) {
      if (!severityArr.includes(severity)) { severityArr.push(severity) }
    }
    return severityArr
  }
}
