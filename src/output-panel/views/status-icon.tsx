import * as etch from 'etch'
import {CompositeDisposable} from 'atom'

export interface INormalStatus {
  status: 'ready' | 'error' | 'warning'
}

export interface IProgressStatus {
  status: 'progress'
  /**
  float between 0 and 1, only relevant when status is 'progress'
  if 0 or undefined, progress bar is not shown
  */
  progress?: number
}

export type IStatus = (INormalStatus | IProgressStatus) & {detail: string}

export interface IProps extends JSX.Props {statusMap: Map<string, IStatus>}

export class StatusIcon implements JSX.ElementClass {
  private disposables: CompositeDisposable
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor (public props: IProps) {
    this.disposables = new CompositeDisposable()

    etch.initialize(this)

    this.disposables.add(atom.tooltips.add(this.element, {
      class: 'ide-haskell-status-tooltip',
      title: () => {
        const res = []
        for (const [plugin, {status, detail}] of this.props.statusMap.entries()) {
          res.push(`
          <ide-haskell-status-item>
            <ide-haskell-status-icon data-status="${status}">${plugin}</ide-haskell-status-icon>
            <ide-haskell-status-detail>${detail || ''}</ide-haskell-status-detail>
          </ide-haskell-status-item>
          `)
        }
        return res.join('')
      }
    }))
  }

  public render () {
    return (
      <ide-haskell-status-icon dataset={{status: this.calcCurrentStatus()}}/>
    )
  }

  public async update (props: IProps) {
    // TODO: Diff algo
    this.props.statusMap = props.statusMap
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
    this.props.statusMap.clear()
  }

  private calcCurrentStatus (): 'ready' | 'warning' | 'error' | 'progress' {
    const prio = {
      progress: 5,
      error: 20,
      warning: 10,
      ready: 0
    }
    const stArr = Array.from(this.props.statusMap.values())
    const [consensus] = stArr.sort((a, b) => prio[b.status] - prio[a.status])
    return consensus ? consensus.status : 'ready'
  }
}
