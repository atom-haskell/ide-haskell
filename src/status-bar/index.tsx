import * as etch from 'etch'
import { OutputPanel } from '../output-panel'
import { StatusIcon } from '../output-panel/views/status-icon'
import * as UPI from 'atom-haskell-upi'

export class StatusBarView {
  public element!: HTMLElement
  private statusMap: Map<string, UPI.IStatus>
  constructor(private panel: OutputPanel) {
    this.statusMap = new Map()
    etch.initialize(this)
  }

  public render() {
    return (
      <div class="ide-haskell inline-block" on={{ click: this.didClick }}>
        <span>
          <ide-haskell-lambda />
          <StatusIcon statusMap={this.statusMap} />
        </span>
      </div>
    )
  }

  public async update() {
    return etch.update(this)
  }

  public backendStatus(pluginName: string, st: UPI.IStatus) {
    this.statusMap.set(pluginName, st)
    // tslint:disable-next-line:no-floating-promises
    this.update()
  }

  public destroy() {
    // tslint:disable-next-line:no-floating-promises
    etch.destroy(this)
  }

  private didClick = () => {
    // tslint:disable-next-line:no-floating-promises
    this.panel.toggle()
  }
}
