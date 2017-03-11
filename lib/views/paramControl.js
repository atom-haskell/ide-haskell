"use babel";
/** @jsx etch.dom */

import {CompositeDisposable} from 'atom'
import etch from 'etch'
import ParamSelectView from '../output-panel/views/param-select-view'

export class ParamControl {
  constructor ({pluginName, name, spec, value}, children) {
    this.pluginName = pluginName
    this.spec = spec
    this.name = name
    if(value === undefined)
      this.value = spec.default
    else
      this.value = value
    this.disposables = new CompositeDisposable
    this.disposables.add(atom.config.observe('ide-haskell.hideParameterValues', (val) => {
      this.hiddenValue = val
      if(this.element) this.update()
    }))

    if(! this.spec.displayName)
      this.spec.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
    etch.initialize(this);
    this.disposables.add(atom.tooltips.add(this.element,
      {title: () => {
        if(this.hiddenValue)
          return `${this.spec.displayName}: ${this.spec.displayTemplate(this.value)}`
        else
          return this.spec.displayName
      }}))
  }

  render () {
    let classList = [`ide-haskell--${this.pluginName}`, `ide-haskell-param--${this.name}`]
    if(this.hiddenValue)
      classList.push('hidden-value')
    return (
      <ide-haskell-param class={classList.join(' ')} on={{click: this.setValue}}>
        <ide-haskell-param-value>
          {this.spec.displayTemplate(this.value)}
        </ide-haskell-param-value>
      </ide-haskell-param>
    );
  }

  update() {
    return etch.update(this)
    this.disposables.dispose()
  }

  setValue(e, resolve, reject) {
    new ParamSelectView ({
      items: (typeof this.spec.items == 'function') ? this.spec.items() : this.spec.items,
      heading: this.spec.description,
      itemTemplate: this.spec.itemTemplate,
      itemFilterKey: this.spec.itemFilterKey,
      onConfirmed: (value) => {
          this.value = value
          if(resolve) resolve(value)
          this.update()
        },
      onCancelled: () => { if(reject) reject() },
    })
  }

  async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }
}
