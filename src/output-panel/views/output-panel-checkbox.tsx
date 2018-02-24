import { CompositeDisposable } from 'atom'
import * as etch from 'etch'

export interface IProps extends JSX.Props {
  state: boolean
  class: string
  onSwitched: () => void
  enabledHint: string
  disabledHint: string
}

export class OutputPanelCheckbox implements JSX.ElementClass {
  private disposables: CompositeDisposable
  private element!: HTMLElement
  constructor(public props: IProps) {
    this.disposables = new CompositeDisposable()
    etch.initialize(this)
    this.disposables.add(
      atom.tooltips.add(this.element, { title: this.tooltipTitle }),
    )
  }

  public render() {
    return (
      <ide-haskell-checkbox
        class={`${this.props.class}${this.props.state ? ' enabled' : ''}`}
        on={{ click: this.props.onSwitched }}
      />
    )
  }

  public async update(props: Partial<IProps> = {}) {
    this.props = { ...this.props, ...props }
    return etch.update(this)
  }

  public async destroy() {
    await etch.destroy(this)
    this.disposables.dispose()
  }

  private tooltipTitle = () => {
    if (this.props.state) {
      return this.props.enabledHint
    } else {
      return this.props.disabledHint
    }
  }
}
