'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export class Button {
  constructor (props) {
    this.props = props
    etch.initialize(this)
  }

  render () {
    return (
      <ide-haskell-button
        class={this.props.active ? 'active' : ''}
        dataset={{caption: this.props.ref, count: this.props.count}}
        on={{click: this.didClick}}/>
    )
  }

  update (props) {
    if (props) this.props = props
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
  }

  didClick () {
    this.toggleActive()
    this.props.emitter.emit('button-clicked', this.props.ref)
  }

  toggleActive () {
    this.props.active = !this.props.active
    this.update()
  }

  deactivate () {
    this.props.active = false
    this.update()
  }

  activate () {
    this.props.active = true
    this.update()
  }

  setCount (count) {
    this.props.count = count
    this.update()
  }
}
