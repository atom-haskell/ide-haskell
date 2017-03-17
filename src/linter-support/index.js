'use babel'

import {CompositeDisposable, Range} from 'atom'
import {MessageObject} from '../utils'

export class LinterSupport {
  constructor (linter, resultDb) {
    this.linter = linter
    this.resultDb = resultDb
    this.disposables = new CompositeDisposable()

    this.disposables.add(resultDb.onDidUpdate(this.update.bind(this)))
  }

  destroy () {
    this.disposables.dispose()
    this.linter.dispose()
    this.linter = null
    this.resultDb = null
    this.disposables = null
  }

  update ({types}) {
    this.linter.deleteMessages()
    this.linter.setMessages(Array.from(this.messages()))
  }

  * messages () {
    for (let result of this.resultDb.resultsWithURI()) {
      yield {
        type: result.severity === 'lint' ? 'info' : result.severity,
        html: MessageObject.fromObject(result.message).toHtml(),
        filePath: result.uri,
        range: new Range(result.position, result.position.translate([0, 1]))
      }
    }
  }
}
