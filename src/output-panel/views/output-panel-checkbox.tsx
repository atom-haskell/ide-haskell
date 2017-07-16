import {Emitter, CompositeDisposable} from 'atom'
import * as etch from 'etch'

export class OutputPanelCheckbox {
  private state: boolean
  private class: string
  private disposables: CompositeDisposable
  private emitter: Emitter
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor (props: {enabled?: boolean, class?: string} = {}) {
    this.state = props.enabled !== undefined ? props.enabled : false
    this.class = props.class || ''
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    etch.initialize(this)
    this.disposables.add(
      atom.tooltips.add(this.element, {title: this.tooltipTitle.bind(this)})
    )
  }

  public render () {
    return (
      <ide-haskell-checkbox
        class={`${this.class}${this.state ? ' enabled' : ''}`}
        on={{click: this.toggleFileFilter.bind(this)}}/>
    )
  }

  public update () {
    return etch.update(this)
  }

  public onCheckboxSwitched (callback: (state: boolean) => void) {
    return this.emitter.on('checkbox-switched', callback)
  }

  public setFileFilter (state: boolean) {
    this.state = state
    this.emitter.emit('checkbox-switched', this.state)
    this.update()
  }

  public getFileFilter () {
    return this.state
  }

  public toggleFileFilter () {
    this.setFileFilter(!this.getFileFilter())
  }

  public async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  private tooltipTitle () {
    if (this.getFileFilter()) {
      return 'Show current file messages'
    } else {
      return 'Show all project messages'
    }
  }
}
