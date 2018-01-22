import * as etch from 'etch'
import { CompositeDisposable } from 'atom'
import * as UPI from 'atom-haskell-upi'

export interface IProps extends JSX.Props {
  statusMap: Map<string, UPI.IStatus>
}

type ElementClass = JSX.ElementClass

export class StatusIcon implements ElementClass {
  private disposables: CompositeDisposable
  // tslint:disable-next-line:no-uninitialized
  private element: HTMLElement
  constructor(public props: IProps) {
    this.disposables = new CompositeDisposable()

    etch.initialize(this)

    this.disposables.add(
      atom.tooltips.add(this.element, {
        class: 'ide-haskell-status-tooltip',
        title: () => {
          const res = []
          for (const [
            plugin,
            { status, detail },
          ] of this.props.statusMap.entries()) {
            res.push(`
          <ide-haskell-status-item>
            <ide-haskell-status-icon data-status="${status}">${plugin}</ide-haskell-status-icon>
            <ide-haskell-status-detail>${
              detail ? detail : ''
            }</ide-haskell-status-detail>
          </ide-haskell-status-item>
          `)
          }
          return res.join('')
        },
      }),
    )
  }

  public render() {
    return (
      // tslint:disable-next-line:no-unsafe-any
      <ide-haskell-status-icon dataset={{ status: this.calcCurrentStatus() }} />
    )
  }

  public async update(props: IProps) {
    // TODO: Diff algo
    this.props.statusMap = props.statusMap
    return etch.update(this)
  }

  public async destroy() {
    await etch.destroy(this)
    this.props.statusMap.clear()
  }

  private calcCurrentStatus(): 'ready' | 'warning' | 'error' | 'progress' {
    const prio = {
      progress: 5,
      error: 20,
      warning: 10,
      ready: 0,
    }
    const stArr = Array.from(this.props.statusMap.values())
    if (stArr.length === 0) return 'ready'
    const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status])
    return consensus.status
  }
}
