import { Button } from './output-panel-button'
import * as etch from 'etch'

export interface IBtnDesc {
  name: string
  count: number
  onClick: () => void
  uriFilter: boolean
  autoScroll: boolean
}

export interface IProps extends JSX.Props { buttons: IBtnDesc[], activeBtn?: string }

export class OutputPanelButtons implements JSX.ElementClass {
  constructor(public props: IProps) {
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-panel-buttons>
        {Array.from(this.renderButtons())}
      </ide-haskell-panel-buttons>
    )
  }

  public async update(props: IProps) {
    this.props = props
    return etch.update(this)
  }

  private * renderButtons() {
    for (const props of this.props.buttons) {
      yield (
        <Button
          active={props.name === this.props.activeBtn}
          name={props.name}
          count={props.count}
          onClick={props.onClick}
        />
      )
    }
  }
}
