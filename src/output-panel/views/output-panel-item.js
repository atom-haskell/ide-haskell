'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import {MessageObject} from '../../utils'

export class OutputPanelItem {
  constructor ({model} = {}) {
    this.model = model
    etch.initialize(this)
  }

  render () {
    return (
      <ide-haskell-panel-item>
        {this.renderPosition()}
        <ide-haskell-item-description innerHTML={MessageObject.fromObject(this.model.message).toHtml()}/>
      </ide-haskell-panel-item>
    )
  }

  renderPosition () {
    if (this.model.uri && this.model.position) {
      return (
        <ide-haskell-item-position on={{click: this.didClickPosition}}>
          {this.model.uri}: {this.model.position.row + 1}, {this.model.position.column + 1}
        </ide-haskell-item-position>
      )
    } else return null
  }

  update ({model} = {}) {
    if (model) this.model = model
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
  }

  didClickPosition () {
    atom.workspace.open(this.model.uri).then((editor) =>
      editor.setCursorBufferPosition(this.model.position))
  }
}
