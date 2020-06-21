import * as etch from 'etch'
import { OutputPanel } from '../output-panel'
import { handlePromise } from '../utils'
import { BackendStatusController } from '../backend-status'
import { DisposableLike } from 'atom'

export class StatusBarView {
  public readonly element!: HTMLElement
  private readonly disp: DisposableLike
  constructor(
    private panel: OutputPanel,
    private bsc: BackendStatusController,
  ) {
    etch.initialize(this)
    this.disp = bsc.onDidUpdate(() => {
      handlePromise(this.update())
    })
  }

  public render() {
    return (
      <div class="ide-haskell inline-block" on={{ click: this.didClick }}>
        <span>
          <ide-haskell-lambda />
          {this.bsc.renderStatusIcon()}
        </span>
      </div>
    )
  }

  public async update() {
    return etch.update(this)
  }

  public destroy() {
    this.disp.dispose()
    handlePromise(etch.destroy(this))
  }

  private didClick = () => {
    handlePromise(this.panel.toggle())
  }
}
