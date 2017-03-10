"use babel"
/** @jsx etch.dom */

const {Emitter, CompositeDisposable} = require('atom');
const etch = require('etch');
const $ = etch.dom;
import {OutputPanelItem} from './output-panel-item'
etch.setScheduler(atom.views)

export class OutputPanelItems {
  constructor({model} = {}) {
    this.model = model;
    this.items = [];
    etch.initialize(this);
  }

  setModel(model) {
    this.model = model;
    this.update();
  }

  render () {
    return (
      <ide-haskell-panel-items class='native-key-bindings' tabIndex='-1'>
        {
          this.items.map(
            (item) => <OutputPanelItem model={item} />
          )
        }
      </ide-haskell-panel-items>
    );
  }

  update() {
    return etch.update(this)
  }

  async destroy() {
    await etch.destroy(this)
  }

  async filter(activeFilter) {
    this.activeFilter = activeFilter;
    this.items = [];
    await this.update();
    if(this.model) {
      this.items = this.model.filter(this.activeFilter)
    } else {
      this.items = []
    }
    await this.update();
  }

  async showItem(item) {
    await this.update();
    view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)]
    if(view) {
      view.querySelector('ide-haskell-item-position').click()
      view.scrollIntoView({
        block: "start",
        behavior: "smooth",
      })
    }
  }

  async scrollToEnd() {
    await this.update();
    this.element.scrollTop = this.element.scrollHeight;
  }

  atEnd() {
    return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight));
  }

  // scrollToEnd: ->
  //   @scrollTop = @scrollHeight
  //
  // atEnd: ->
  //   @scrollTop >= (@scrollHeight - @clientHeight)
  //
  // clear: ->
  //   i.destroy() for i in @itemViews
  //   @itemViews = []
  //
  // destroy: ->
  //   @remove()
  //   @clear()
}

// OutputPanelItemsElement =
//   document.registerElement 'ide-haskell-panel-items',
//     prototype: OutputPanelItemsView.prototype
//
// module.exports = OutputPanelItemsElement
