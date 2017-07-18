import {CompositeDisposable} from 'atom'
import * as etch from 'etch'

export interface IProps extends JSX.Props {
  initialState?: boolean
  class?: string
  onSwitched?: (state: boolean) => void
  enabledHint?: string
  disabledHint?: string
}

export class OutputPanelCheckbox implements JSX.ElementClass {
  private disposables: CompositeDisposable
  // tslint:disable-next-line:no-uninitialized-class-properties
  private element: HTMLElement
  private state: boolean
  constructor (public props: IProps = {}) {
    this.state = !! props.initialState
    this.disposables = new CompositeDisposable()
    etch.initialize(this)
    this.disposables.add(
      atom.tooltips.add(this.element, {title: this.tooltipTitle.bind(this)})
    )
  }

  public render () {
    return (
      <ide-haskell-checkbox
        class={`${this.props.class}${this.state ? ' enabled' : ''}`}
        on={{click: this.toggleState.bind(this)}}/>
    )
  }

  public async update (props?: IProps) {
    if (props) { this.props = props }
    return etch.update(this)
  }

  public getState () {
    return this.state
  }

  public async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  private setState (state: boolean) {
    this.state = state
    if (this.props.onSwitched) { this.props.onSwitched(this.state) }
    this.update()
  }

  private toggleState () {
    this.setState(!this.getState())
  }

  private tooltipTitle () {
    if (this.getState()) {
      return this.props.enabledHint
    } else {
      return this.props.disabledHint
    }
  }
}
