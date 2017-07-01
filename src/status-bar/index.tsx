import * as etch from 'etch'
import {IStatus, OutputPanel} from '../output-panel'

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
  private currentStatus: IStatus
  constructor (private panel: OutputPanel) {
    this.currentStatus = { status: 'ready', detail: '' }
    etch.initialize(this)
  }

  public render () {
    return (
      <div class="ide-haskell inline-block" on={{click: this.didClick.bind(this)}}>
        <span>
          <ide-haskell-lambda/>
          <ide-haskell-status-icon ref="status" id="status" dataset={{status: this.currentStatus.status}}/>
        </span>
      </div>
    )
  }

  public update () {
    return etch.update(this)
  }

  public setStatus (status: IStatus) {
    this.currentStatus = status
    this.update()
  }

  public async destroy () {
    await etch.destroy(this)
  }

  private didClick () {
    atom.workspace.toggle(this.panel)
  }
}
