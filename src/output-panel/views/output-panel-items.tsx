import * as etch from 'etch'
import {OutputPanelItem} from './output-panel-item'
import {ResultsDB, ResultItem} from '../../results-db'

export interface IProps extends JSX.Props {
  model: ResultsDB
  filter: (item: ResultItem) => boolean
}

export class OutputPanelItems implements JSX.ElementClass {
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  constructor (public props: IProps) {
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-panel-items class="native-key-bindings" tabIndex="-1">
        {this.renderItems()}
      </ide-haskell-panel-items>
    )
  }

  public async update (props: IProps) {
    this.props = props
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
  }

  public async showItem (item: ResultItem) {
    await etch.update(this)
    const view = this.element.querySelector(`ide-haskell-panel-item[data-hash="${item.hash()}"]`) as HTMLElement
    if (view) {
      const pos = view.querySelector('ide-haskell-item-position') as HTMLElement
      if (pos) { pos.click() }
      view.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }

  public async scrollToEnd () {
    await etch.update(this)
    this.element.scrollTop = this.element.scrollHeight
  }

  public atEnd () {
    return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight))
  }

  private renderItems () {
    return Array.from(this.props.model.filter(this.props.filter)).map(
      (item) => <OutputPanelItem model={item} />
    )
  }
}
