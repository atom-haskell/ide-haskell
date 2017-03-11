'use babel'
/** @jsx etch.dom */

import {CompositeDisposable} from 'atom'
import etch from 'etch'

export class ParamControl {
  constructor ({pluginName, name, spec, store}, children) {
    this.pluginName = pluginName
    this.spec = spec
    this.name = name
    this.store = store

    this.disposables = new CompositeDisposable()

    this.disposables.add(
        atom.config.observe('ide-haskell.hideParameterValues',
          (val) => {
            this.hiddenValue = val
            if (this.element) this.update()
          })
    )

    this.initStore()

    this.initSpec()

    etch.initialize(this)

    this.disposables.add(
      atom.tooltips.add(this.element,
        {
          title: () => {
            if (this.hiddenValue) {
              return `${this.spec.displayName}: ${this.spec.displayTemplate(this.value)}`
            } else {
              return this.spec.displayName
            }
          }
        }
      )
    )
  }

  initStore () {
    if (this.storeDisposable) this.disposables.remove(this.storeDisposable)
    this.storeDisposable =
      this.store.onDidUpdate(({pluginName, paramName, value}) => {
        if (this.pluginName === pluginName && this.name === paramName) {
          this.value = value
          this.update()
        }
      })
    this.disposables.add(this.storeDisposable)
    this.value = this.store.getValueRaw(this.pluginName, this.name)
  }

  initSpec () {
    if (!this.spec.displayName) {
      this.spec.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
    }
  }

  render () {
    let classList = [`ide-haskell--${this.pluginName}`, `ide-haskell-param--${this.name}`]
    if (this.hiddenValue) { classList.push('hidden-value') }
    return (
      <ide-haskell-param class={classList.join(' ')} on={{click: this.setValue}}>
        <ide-haskell-param-value>
          {this.spec.displayTemplate(this.value)}
        </ide-haskell-param-value>
      </ide-haskell-param>
    )
  }

  update ({pluginName, name, spec, store} = {}) {
    if (pluginName) this.pluginName = pluginName
    if (name) this.name = name
    if (spec && this.spec !== spec) {
      this.spec = spec
      this.initSpec()
    }
    if (store && this.store !== store) {
      this.store = store
      this.initStore()
    }
    return etch.update(this)
  }

  async setValue (e) {
    await this.store.setValue(this.pluginName, this.name)
    this.update()
  }

  async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
    this.pluginName = null
    this.spec = null
    this.name = null
    this.store = null
    this.value = null
    this.storeDisposable = null
  }
}
