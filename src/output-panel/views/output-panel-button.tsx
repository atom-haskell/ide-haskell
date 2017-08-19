import * as etch from 'etch'

export interface IProps extends JSX.Props {
  active: boolean
  name: string
  count: number
  onClick: () => void
}

export class Button implements JSX.ElementClass {
  constructor(public props: IProps) {
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-button
        class={this.props.active ? 'active' : ''}
        dataset={{ caption: this.props.name, count: this.props.count }}
        on={{ click: this.props.onClick }}
      />
    )
  }

  public async update(props: IProps) {
    this.props = props
    return etch.update(this)
  }

  public async destroy() {
    await etch.destroy(this)
  }
}
