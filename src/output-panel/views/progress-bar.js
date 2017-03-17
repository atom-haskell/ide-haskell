'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export class ProgressBar {
  constructor ({orientation = 'horizontal'} = {}, children) {
    this.direction = orientation
    etch.initialize(this)
  }

  render () {
    return (
      <ide-haskell-progress-bar className={isNaN(this.progress) ? '' : 'visible'}>
        <span style={`${this.direction === 'horizontal' ? 'width' : 'height'}: ${this.progress * 100}%`}>
        </span>
      </ide-haskell-progress-bar>
    )
  }

  update ({orientation = 'horizontal'} = {}) {
    this.direction = orientation
    return etch.update(this)
  }

  setProgress (progress) {
    this.progress = progress
    this.update()
  }

  async destroy () {
    await etch.destroy(this)
  }
}
