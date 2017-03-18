'use babel'

import {TPosition, TSeverity, IResultItem, ResultItem, IResultItemTemplate} from './result-item'
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

  destroy () {
    this.disposables.dispose()
  }

  onDidUpdate (callback: TUpdateCallback) {
    return this.emitter.on('did-update', callback)
  }

  setResults (res: IResultItem[], severityArr: TSeverity[]) {
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

  appendResults (res: IResultItem[], severityArr: TSeverity[]) {
    this._results = this._results.concat(res.map((r) => new ResultItem(this, r)))

    if (!severityArr) {
      severityArr = this.calcSeverityArr(res)
    }

    this.emitter.emit('did-update', {res: this, types: severityArr})
  }

  calcSeverityArr (res: IResultItem[]) {
    let severityArr: TSeverity[] = []
    for (let {severity} of res) {
      if (!severityArr.includes(severity)) { severityArr.push(severity) }
    }
    return severityArr
  }

  removeResult (resItem: ResultItem) {
    this._results = this._results.filter((res) => res !== resItem)
    resItem.parent = null
  }

  results () {
    return this._results
  }

  resultsWithURI ()  {
    return this._results.filter(({uri}) => uri)
  }

  filter (template: IResultItemTemplate) {
    return this._results.filter((item) => {
      let b = true
      for (let k of Object.keys(template)) { b = b && (item[k] === template[k]) }
      return b
    })
  }

  isEmpty () {
    return this._results.length === 0
  }
}
