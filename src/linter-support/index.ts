import { CompositeDisposable, Range } from 'atom'
import { ResultsDB } from '../results-db'
import * as Linter from 'atom/linter'

export class LinterSupport {
  private disposables: CompositeDisposable
  constructor(
    private linter: Linter.IndieDelegate,
    private resultDb: ResultsDB,
  ) {
    this.disposables = new CompositeDisposable()

    this.disposables.add(resultDb.onDidUpdate(this.update))
  }

  public destroy() {
    this.disposables.dispose()
    this.linter.dispose()
  }

  public update = () => {
    this.linter.clearMessages()
    this.linter.setAllMessages(Array.from(this.messages()))
  };

  private *messages(): IterableIterator<Linter.Message> {
    for (const result of this.resultDb.results()) {
      if (result.uri !== undefined && result.position) {
        let severity: 'error' | 'warning' | 'info'
        switch (result.severity) {
          case 'error':
          case 'warning':
            severity = result.severity
            break
          default:
            severity = 'info'
            break
        }
        yield {
          severity,
          excerpt: result.message.toPlain(),
          location: {
            file: result.uri,
            position: new Range(
              result.position,
              result.position.translate([0, 1]),
            ),
          },
        }
      }
    }
  }
}
