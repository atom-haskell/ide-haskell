import * as etch from 'etch'
import {IStatus, OutputPanel} from '../output-panel'
import {StatusIcon} from '../output-panel/views/status-icon'

export interface ITile {
  getPriority (): number
  getItem (): Object
  destroy (): void
}

export interface IStatusBar {
  addLeftTile (params: {item: Object, priority: number}): ITile
  addRightTile (params: {item: Object, priority: number}): ITile
}

export class StatusBarView {
  // tslint:disable-next-line:no-uninitialized-class-properties
  public element: HTMLElement
  private statusMap: Map<string, IStatus>
  constructor (private panel: OutputPanel) {
    this.statusMap = new Map()
    etch.initialize(this)
  }

  public render () {
    return (
      <div class="ide-haskell inline-block" on={{click: this.didClick.bind(this)}}>
        <span>
          <ide-haskell-lambda/>
          <StatusIcon statusMap={this.statusMap}/>
        </span>
      </div>
    )
  }

  public async update () {
    return etch.update(this)
  }

  public backendStatus (pluginName: string, st: IStatus) {
    this.statusMap.set(pluginName, st)
    this.update()
  }

  public async destroy () {
    await etch.destroy(this)
  }

  private didClick () {
    this.panel.toggle()
  }
}
