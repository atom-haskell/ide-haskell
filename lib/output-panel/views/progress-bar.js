"use babel";
/** @jsx etch.dom */

const etch = require('etch');

export class ProgressBar {
  constructor (props, children) {
    etch.initialize(this);
  }

  render () {
    return (
      <ide-haskell-progress-bar className={this.progress>0?'visible':''}>
        <span style={`${this.direction == 'horizontal'?'width':'height'}: ${this.progress*100}%`}>
        </span>
      </ide-haskell-progress-bar>
    );
  }

  update() {
    return etch.update(this)
  }

  setProgress(progress, direction = 'horizontal') {
    this.direction = direction;
    this.progress = progress;
    this.update();
  }

  async destroy () {
    await etch.destroy(this)
  }
}
