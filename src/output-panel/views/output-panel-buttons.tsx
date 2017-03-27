import {Emitter, CompositeDisposable} from 'atom'
import {Button, IProps as IBtnProps} from './output-panel-button'
import * as etch from 'etch'
const $ = etch.dom

export interface ISeverityTabDefinition {
  /** should uri filter apply to tab? */
  uriFilter?: boolean
  /** should tab auto-scroll? */
  autoScroll?: boolean
}

export interface IBtnDesc extends IBtnProps {
  uriFilter: boolean
  autoScroll: boolean
}

export class OutputPanelButtons {
  private disposables: CompositeDisposable
  private emitter: Emitter
  private buttons: Set<IBtnDesc>
  // tslint:disable-next-line:no-uninitialized-class-properties
  private refs: { [btnName: string]: Button }
  constructor () {
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.buttons = new Set();
    ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn))
    this.createButton('build', {uriFilter: false, autoScroll: true})
    this.onButtonClicked(this.disableAll.bind(this))
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
      ref: btn,
      active: false,
      count: 0,
      uriFilter,
      autoScroll,
      emitter: this.emitter
    }
    this.buttons.add(button)
    this.update()
  }

  public options (btn: string): IBtnDesc | undefined {
    if (this.refs[btn]) {
      return (this.refs[btn].props as IBtnDesc)
    }
  }

  public onButtonClicked (callback: (btnName: string) => void) {
    return this.emitter.on('button-clicked', callback)
  }

  public buttonNames () {
    return Object.keys(this.refs)
  }

  public disableAll (name?: string) {
    for (const v in this.refs) {
      if (v !== name) {
        this.refs[v].deactivate()
      }
    }
  }

  public setCount (btn: string, count: number) {
    if (this.refs[btn]) {
      this.refs[btn].setCount(count)
    }
  }

  public getCount (btn: string) {
    if (this.refs[btn]) {
      return this.refs[btn].getCount()
    }
  }

  public clickButton (btn: string) {
    if (btn === this.getActive()) { return }
    if (this.refs[btn]) {
      this.refs[btn].activate()
      this.emitter.emit('button-clicked', btn)
    }
  }

  public async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
    this.buttons.clear()
  }

  public getActive () {
    for (const v in this.refs) {
      if (this.refs[v].props.active) { return v }
    }
  }

  private * renderButtons () {
    for (const btn of this.buttons.values()) {
      yield $(Button, btn)
    }
  }
}
