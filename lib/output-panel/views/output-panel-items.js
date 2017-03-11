'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import {OutputPanelItem} from './output-panel-item'
etch.setScheduler(atom.views)

export class OutputPanelItems {
  constructor ({model} = {}) {
    this.model = model
    this.items = []
    etch.initialize(this)
  }

  render () {
    return (
      <ide-haskell-panel-items class='native-key-bindings' tabIndex='-1'>
        {this.renderItems()}
      </ide-haskell-panel-items>
    )
  }

  renderItems () {
    return this.items.map(
      (item) => <OutputPanelItem model={item} />
    )
  }

  update ({model} = {}) {
    if (model) this.model = model
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
  }

  async filter (activeFilter) {
    this.activeFilter = activeFilter
    if (this.model) {
      this.items = this.model.filter(this.activeFilter)
    } else {
      this.items = []
    }
    await this.update()
  }

  async showItem (item) {
    await this.update()
    let view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)]
    if (view) {
      view.querySelector('ide-haskell-item-position').click()
      view.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }

  async scrollToEnd () {
    await this.update()
    this.element.scrollTop = this.element.scrollHeight
  }

  atEnd () {
    return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight))
  }
}
