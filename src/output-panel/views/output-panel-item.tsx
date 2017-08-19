import * as etch from 'etch'
import { ResultItem } from '../../results-db'
import { TextEditor } from 'atom'

export interface IProps extends JSX.Props { model: ResultItem }

export class OutputPanelItem implements JSX.ElementClass {
  // tslint:disable-next-line: no-uninitialized
  public element: HTMLElement
  constructor(public props: IProps) {
    etch.initialize(this)
  }

  public render() {
    return (
      <ide-haskell-panel-item key={this.props.model.hash()}>
        {this.renderPosition()}
        {this.renderContext()}
        <ide-haskell-item-description innerHTML={this.props.model.message.toHtml()} />
      </ide-haskell-panel-item>
    )
  }

  public async update(props: IProps) {
    if (props && props.model) { this.props.model = props.model }
    return etch.update(this)
  }

  public async destroy() {
    await etch.destroy(this)
  }

  public async clickPosition() {
    if (this.props.model.uri) {
      const editor: TextEditor = await atom.workspace.open(this.props.model.uri)
      if (this.props.model.position) {
        editor.setCursorBufferPosition(this.props.model.position)
      }
    }
  }

  private renderPosition() {
    if (this.props.model.uri) {
      const positionText =
        this.props.model.position
          ? `${this.props.model.uri}: ${this.props.model.position.row + 1}, ${this.props.model.position.column + 1}`
          : this.props.model.uri
      return (
        <ide-haskell-item-position on={{ click: this.clickPosition.bind(this) }}>
          {positionText}
        </ide-haskell-item-position>
      )
    } else {
      return ''
    }
  }

  private renderContext() {
    if (this.props.model.context) {
      return (
        <ide-haskell-item-context>{this.props.model.context}</ide-haskell-item-context>
      )
    } else {
      return ''
    }
  }
}
