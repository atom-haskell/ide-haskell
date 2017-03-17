'use babel'

import ResultItem from './result-item'
import {CompositeDisposable, Emitter} from 'atom'

export default class ResultsDB {
  constructor () {
    this.results = []
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())
  }

  destroy () {
    this.disposables.dispose()
    this.disposables = null
    this.emitter = null
  }

  onDidUpdate (callback) {
    return this.emitter.on('did-update', callback)
  }

  setResults (res, severityArr) {
    if (severityArr) {
      this.results =
        this.results.filter(({severity}) => !(severityArr.includes(severity)))
        .concat(res.map((i) => new ResultItem(this, i)))
    } else {
      this.results = res.map((i) => new ResultItem(this, i))
    }

    if (!severityArr) {
      severityArr = this.calcSeverityArr(res)
    }

    this.emitter.emit('did-update', {res: this, types: severityArr})
  }

  appendResults (res, severityArr) {
    this.results = this.results.concat(res.map((r) => new ResultItem(this, r)))

    if (!severityArr) {
      severityArr = this.calcSeverityArr(res)
    }

    this.emitter.emit('did-update', {res: this, types: severityArr})
  }

  calcSeverityArr (res) {
    let severityArr = []
    for (let {severity} of res) {
      if (!severityArr.includes(severity)) { severityArr.push(severity) }
    }
    return severityArr
  }

  removeResult (resItem) {
    this.results = this.results.filter((res) => res !== resItem)
    resItem.parent = null
  }

  resultsWithURI () {
    return this.results.filter(({uri}) => uri)
  }

  filter (template) {
    return this.results.filter((item) => {
      let b = true
      for (let k of Object.keys(template)) { b = b && (item[k] === template[k]) }
      return b
    })
  }

  isEmpty () {
    return this.results.length === 0
  }
}
