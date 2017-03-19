import {Emitter, CompositeDisposable} from 'atom'
import * as etch from 'etch'

export class OutputPanelCheckbox {
  private id?: string
  private state: boolean
  private disposables: CompositeDisposable
  private emitter: Emitter
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor ({id, enabled = false}: {id?: string, enabled?: boolean} = {}) {
    this.id = id
    this.state = enabled
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
      <ide-haskell-checkbox id={this.id}
        class={this.state ? 'enabled' : ''}
        on={{click: this.toggleFileFilter.bind(this)}}/>
    )
  }

  public update (props?: {enabled?: boolean}) {
    if (props && props.enabled !== undefined) { this.state = props.enabled }
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
