import * as etch from 'etch'
import { OutputPanelItem } from './output-panel-item'
import { ResultsDB, ResultItem } from '../../results-db'

export interface IProps extends JSX.Props {
  model: ResultsDB
  filter: (item: ResultItem) => boolean
}

export class OutputPanelItems implements JSX.ElementClass {
  // tslint:disable-next-line:no-uninitialized
  private element: HTMLElement
  private itemMap: WeakMap<ResultItem, { component: OutputPanelItem, domNode: HTMLElement }>
  constructor(public props: IProps) {
    this.itemMap = new WeakMap()
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-panel-items class="native-key-bindings" tabIndex="-1">
        {this.renderItems()}
      </ide-haskell-panel-items>
    )
  }

  public async update(props: IProps) {
    this.props = props
    return etch.update(this)
  }

  public async destroy() {
    await etch.destroy(this)
  }

  public async showItem(item: ResultItem) {
    await etch.update(this)
    const view = this.itemMap.get(item)
    if (view) {
      view.component.clickPosition()
      view.domNode.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }

  public async scrollToEnd() {
    await etch.update(this)
    this.element.scrollTop = this.element.scrollHeight
  }

  public atEnd() {
    return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight))
  }

  private renderItems() {
    return Array.from(this.props.model.filter(this.props.filter)).map(
      (item) => {
        const view = <OutputPanelItem model={item} />
        this.itemMap.set(item, view as any)
        return view
      },
    )
  }
}
