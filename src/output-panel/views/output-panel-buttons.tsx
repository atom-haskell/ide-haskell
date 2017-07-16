import {Button, IProps as IBtnProps} from './output-panel-button'
import * as etch from 'etch'
const $ = etch.dom

export interface ISeverityTabDefinition {
  /** should uri filter apply to tab? */
  uriFilter?: boolean
  /** should tab auto-scroll? */
  autoScroll?: boolean
}

export interface IBtnDesc {
  name: string
  count: number
  onClick: () => void
  uriFilter: boolean
  autoScroll: boolean
}

export class OutputPanelButtons {
  private buttons: Map<string, IBtnDesc>
  private activeBtn: string
  private onChange?: (btn: string) => void
  constructor (props: {onChange?: (btn: string) => void}) {
    this.buttons = new Map()
    this.activeBtn = 'error'
    this.onChange = props.onChange;
    ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn))
    this.createButton('build', {uriFilter: false, autoScroll: true})
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-panel-buttons>
        {Array.from(this.renderButtons())}
      </ide-haskell-panel-buttons>
    )
  }

  public update () {
    return etch.update(this)
  }

  public createButton (btn: string, {uriFilter = true, autoScroll = false}: ISeverityTabDefinition = {}) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin' &&
          uriFilter === true) { return }
    const button: IBtnDesc = {
      name: btn,
      count: 0,
      onClick: () => this.setActive(btn),
      uriFilter,
      autoScroll,
    }
    this.buttons.set(btn, button)
    this.update()
  }

  public options (btn: string): IBtnDesc | undefined {
    return this.buttons.get(btn)
  }

  public buttonNames () {
    return Array.from(this.buttons.keys())
  }

  public setCount (btn: string, count: number) {
    const p = this.buttons.get(btn)
    if (p) {
      p.count = count
    }
  }

  public getCount (btn: string) {
    const p = this.buttons.get(btn)
    if (p) {
      return p.count
    }
  }

  public setActive (btn: string) {
    if (btn === this.activeBtn) { return }
    if (! this.buttons.has(btn)) { throw new Error(`Unknown button ${btn}`)}
    this.activeBtn = btn
    this.update()
    if (this.onChange) { this.onChange(btn) }
  }

  public async destroy () {
    await etch.destroy(this)
    this.buttons.clear()
  }

  public getActive () {
    return this.activeBtn
  }

  private * renderButtons () {
    for (const [btn, props] of this.buttons.entries()) {
      yield $(Button, {...props, active: btn === this.activeBtn})
    }
  }
}
