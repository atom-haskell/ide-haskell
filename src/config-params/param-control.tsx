'use babel'

import {CompositeDisposable, Disposable} from 'atom'
import * as etch from 'etch'

import {IParamSpec, ConfigParamStore} from './param-store'

interface IProps<T> {
  pluginName: string
  name: string
  spec: IParamSpec<T>
  store: ConfigParamStore
}

export class ParamControl<T> {
  private pluginName: string
  private name: string
  private spec: IParamSpec<any>
  private store: ConfigParamStore
  private disposables: CompositeDisposable
  private hiddenValue: boolean
  private element: HTMLElement | undefined
  private value: T
  private storeDisposable: Disposable
  constructor ({pluginName, name, spec, store}: IProps<T>) {
    this.pluginName = pluginName
    this.spec = spec
    this.name = name
    this.store = store

    this.disposables = new CompositeDisposable()

    this.disposables.add(
        atom.config.observe('ide-haskell.hideParameterValues',
          (val: boolean) => {
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

  update (props?: IProps<T>) {
    if (props) {
      const {pluginName, name, spec, store} = props
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
    }
    return etch.update(this)
  }

  async setValue (e: T) {
    await this.store.setValue(this.pluginName, this.name)
    this.update()
  }

  async destroy () {
    await etch.destroy(this)
    this.disposables.dispose()
  }
}
