import * as etch from 'etch'
import {ResultItem} from '../../results-db'
import {TextEditor} from 'atom'

export class OutputPanelItem {
  constructor (private props: {model: ResultItem}) {
    etch.initialize(this)
  }

  public render () {
    return (
      <ide-haskell-panel-item>
        {this.renderPosition()}
        {this.renderContext()}
        <ide-haskell-item-description innerHTML={this.props.model.message.toHtml()}/>
      </ide-haskell-panel-item>
    )
  }

  public update (props: {model: ResultItem}) {
    if (props && props.model) { this.props.model = props.model }
    return etch.update(this)
  }

  public async destroy () {
    await etch.destroy(this)
  }

  private renderPosition () {
    if (this.props.model.uri && this.props.model.position) {
      return (
        <ide-haskell-item-position on={{click: this.didClickPosition.bind(this)}}>
          {this.props.model.uri}: {this.props.model.position.row + 1}, {this.props.model.position.column + 1}
        </ide-haskell-item-position>
      )
    } else {
      return ''
    }
  }

  private renderContext () {
    if (this.props.model.context) {
      return (
        <ide-haskell-item-context>{this.props.model.context}</ide-haskell-item-context>
      )
    } else {
      return ''
    }
  }

  private didClickPosition () {
    atom.workspace.open(this.props.model.uri).then((editor: TextEditor) => {
      if (this.props.model.position) {
        editor.setCursorBufferPosition(this.props.model.position)
      }
    })
  }
}
