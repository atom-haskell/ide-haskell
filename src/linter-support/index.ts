'use babel'

import {CompositeDisposable, Range} from 'atom'
import {ResultsDB} from '../results-db'

interface ILinter {
  deleteMessages (): void
  setMessages (messages: any[]): void
  dispose (): void
}

export class LinterSupport {
  private disposables: CompositeDisposable
  constructor (private linter: ILinter, private resultDb: ResultsDB) {
    this.disposables = new CompositeDisposable()

    this.disposables.add(resultDb.onDidUpdate(this.update.bind(this)))
  }

  public destroy () {
    this.disposables.dispose()
    this.linter.dispose()
  }

  public update () {
    this.linter.deleteMessages()
    this.linter.setMessages(Array.from(this.messages()))
  }

  private * messages () {
    for (const result of this.resultDb.results()) {
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
