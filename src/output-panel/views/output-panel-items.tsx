import * as etch from 'etch'
import {OutputPanelItem} from './output-panel-item'
import {ResultsDB, ResultItem} from '../../results-db'

export class OutputPanelItems {
  private model: ResultsDB
  private items: ResultItem[]
  private activeFilter: (item: ResultItem) => boolean
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor ({model}: {model: ResultsDB}) {
    this.model = model
    this.items = []
    this.activeFilter = () => true
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-panel-items class="native-key-bindings" tabIndex="-1">
        {this.renderItems()}
      </ide-haskell-panel-items>
    )
  }

  public update (props?: {model: ResultsDB}) {
    if (props && props.model) { this.model = props.model }
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
  }

  public async filter (activeFilter: (item: ResultItem) => boolean) {
    this.activeFilter = activeFilter
    if (this.model) {
      this.items = this.model.filter(this.activeFilter)
    } else {
      this.items = []
    }
    await this.update()
  }

  public async showItem (item: ResultItem) {
    await this.update()
    const view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)]
    if (view) {
      view.querySelector('ide-haskell-item-position').click()
      view.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }

  public async scrollToEnd () {
    await this.update()
    this.element.scrollTop = this.element.scrollHeight
  }

  public atEnd () {
    return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight))
  }

  private renderItems () {
    return this.items.map(
      (item) => <OutputPanelItem model={item} />
    )
  }
}
