"use babel"
/** @jsx etch.dom */

const {Emitter, CompositeDisposable} = require('atom');
const etch = require('etch');
const $ = etch.dom;

class Button {
  constructor (props) {
    this.props = props;
    etch.initialize(this);
  }

  render () {
    return (
      <ide-haskell-button
        class={this.props.active?'active':''}
        dataset={{caption: this.props.ref, count: this.props.count}}
        on={{click: this.didClick}}/>
    );
  }

  update() {
    return etch.update(this)
  }

  async destroy() {
    await etch.destroy(this)
  }

  didClick() {
    this.toggleActive();
    this.props.emitter.emit('button-clicked', this.props.ref)
  }

  toggleActive() {
    this.props.active = ! this.props.active;
    this.update();
  }

  deactivate() {
    this.props.active = false;
    this.update();
  }

  activate() {
    this.props.active = true;
    this.update();
  }

  setCount(count) {
    this.props.count = count;
    this.update();
  }
}

export class OutputPanelButtons {
  constructor() {
    this.disposables = new CompositeDisposable;
    this.disposables.add(this.emitter = new Emitter)
    this.buttons = new Set;
    ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn))
    this.createButton('build', {uriFilter: false, autoScroll: true})
    this.onButtonClicked(this.disableAll.bind(this));
    etch.initialize(this);
  }

  render () {
    return (
      <ide-haskell-panel-buttons>
        {Array.from(this.buttons.values()).map((btn) => $(Button, btn))}
      </ide-haskell-panel-buttons>
    )
  }

  update() {
    return etch.update(this)
  }

  createButton(btn, {uriFilter=true, autoScroll=false} = {}) {
    if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin' &&
          uriFilter === true)
      return
    let button = {
      ref: btn,
      active: false,
      count: 0,
      uriFilter: uriFilter,
      autoScroll: autoScroll,
      emitter: this.emitter,
    };
    this.buttons.add(button);
    this.update();
  }

  options(btn) {
    if(this.refs[btn])
      return this.refs[btn].props;
    else
      return {};
  }

  onButtonClicked(callback) {
    this.emitter.on('button-clicked', callback)
  }

  buttonNames() {
    return Object.keys(this.refs);
  }

  disableAll(name) {
    for(let v in this.refs) {
      if(v != name) this.refs[v].deactivate();
    }
  }

  setCount(btn, count) {
    if(this.refs[btn]) {
      this.refs[btn].setCount(count);
    }
  }

  clickButton(btn) {
    if(btn == this.getActive()) return
    if(this.refs[btn]) {
      this.refs[btn].activate();
      this.emitter.emit('button-clicked', btn);
    }
  }

  async destroy() {
    await etch.destroy(this)
    this.disposables.dispose()
    this.buttons = null
  }

  getActive() {
    for(let v in this.refs) {
      if(this.refs[v].props.active) return v;
    }
    return null;
  }
}
