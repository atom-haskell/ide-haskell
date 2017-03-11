'use babel'
/** @jsx etch.dom */

import {Emitter, CompositeDisposable} from 'atom'
import etch from 'etch'

export class OutputPanelCheckbox {
  constructor ({id, enabled = false} = {}) {
    this.id = id
    this.state = enabled
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.emitter = new Emitter())
    etch.initialize(this)
    this.disposables.add(atom.tooltips.add(this.element, {
      title: () => {
        if (this.getFileFilter()) return 'Show current file messages'
        else return 'Show all project messages'
      }
    }))
  }

  render ({enabled} = {}) {
    if (enabled !== undefined) this.state = enabled
    return (
      <ide-haskell-checkbox id={this.id}
        class={this.state ? 'enabled' : ''}
        on={{click: this.toggleFileFilter}}/>
    )
  }

  update () {
    return etch.update(this)
  }

  onCheckboxSwitched (callback) {
    return this.emitter.on('checkbox-switched', callback)
  }

  setFileFilter (state) {
    this.state = state
    this.emitter.emit('checkbox-switched', this.state)
    this.update()
  }

  getFileFilter () {
    return this.state
  }

  toggleFileFilter () {
    this.setFileFilter(!this.getFileFilter())
  }

  async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }
}
