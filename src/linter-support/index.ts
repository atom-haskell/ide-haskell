'use babel'

import {CompositeDisposable, Range} from 'atom'
import {MessageObject} from '../utils'
import {ResultsDB} from '../results-db'

interface Linter {
  deleteMessages(): void
  setMessages(messages: any[]): void
  dispose(): void
}

export class LinterSupport {
  private disposables: CompositeDisposable
  constructor (private linter: Linter, private resultDb: ResultsDB) {
    this.disposables = new CompositeDisposable()

    this.disposables.add(resultDb.onDidUpdate(this.update.bind(this)))
  }

  destroy () {
    this.disposables.dispose()
    this.linter.dispose()
  }

  update () {
    this.linter.deleteMessages()
    this.linter.setMessages(Array.from(this.messages()))
  }

  * messages () {
    for (let result of this.resultDb.results()) {
      if (result.uri && result.position) {
        yield {
          type: result.severity === 'lint' ? 'info' : result.severity,
          html: result.message.toHtml(),
          filePath: result.uri,
          range: new Range(result.position, result.position.translate([0, 1]))
        }
      }
    }
  }
}
