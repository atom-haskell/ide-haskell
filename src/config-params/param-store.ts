'use babel'

import {selectListView} from './param-select-view'
import {Emitter, CompositeDisposable, Disposable} from 'atom'

export interface IParamSpec<T> {
  onChanged: (value: T) => void
  items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>)
  itemTemplate: (item: T) => string
  itemFilterKey: string
  description?: string
  displayName?: string
  displayTemplate: (item: T) => string
  default: T
}

interface IParamData<T> {
  spec: IParamSpec<T>
  value: T
}

export interface IState {
  [pluginNameParamName: string]: any
}

export type TUpdatedCallback = (arg: {pluginName: string, paramName: string, value: any}) => void

export class ConfigParamStore {
  private disposables: CompositeDisposable
  private emitter: Emitter
  private saved: IState
  private plugins: Map<string, Map<string, IParamData<any>>>
  constructor (state: IState = {}) {
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.saved = state
    this.plugins = new Map()
  }

  serialize () {
    return this.saved
  }

  destroy () {
    this.disposables.dispose()
  }

  onDidUpdate (callback: TUpdatedCallback) {
    return this.emitter.on('did-update', callback)
  }

  addParamSpec<T> (pluginName: string, paramName: string, spec: IParamSpec<T>) {
    let pluginConfig = this.plugins.get(pluginName)
    if (!pluginConfig) {
      pluginConfig = new Map()
      this.plugins.set(pluginName, pluginConfig)
    }
    if (pluginConfig.has(paramName)) {
      throw new Error(`Parameter ${pluginName}.${paramName} already defined!`)
    }
    let value = this.saved[`${pluginName}.${paramName}`]
    if (value === undefined) value = spec.default
    pluginConfig.set(paramName, {spec, value})
    this.emitter.emit('did-update', {pluginName, paramName, value})
    return new Disposable(() => {
      let pluginConfig = this.plugins.get(pluginName)
      if (pluginConfig) {
        pluginConfig.delete(paramName)
        if (pluginConfig.size === 0) {
          this.plugins.delete(pluginName)
        }
      }
    })
  }

  async setValue<T> (pluginName: string, paramName: string, value?: T) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'set')
    if (value === undefined) value = await this.showSelect(paramConfig.spec)
    if (value !== undefined) {
      paramConfig.value = value
      this.saved[`${pluginName}.${paramName}`] = value
      this.emitter.emit('did-update', {pluginName, paramName, value})
    }
    return value
  }

  async getValue (pluginName: string, paramName: string) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'get')
    if (paramConfig.value === undefined) await this.setValue(pluginName, paramName)
    return paramConfig.value
  }

  getValueRaw (pluginName: string, paramName: string) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'get raw')
    return paramConfig.value
  }

  private getParamConfig(pluginName: string, paramName: string, reason: string) {
    let pluginConfig = this.plugins.get(pluginName)
    if (!pluginConfig) {
      throw new Error(`${pluginName} is not defined while trying to ${reason} ${pluginName}.${paramName}`)
    }
    let paramConfig = pluginConfig.get(paramName)
    if (!paramConfig) {
      throw new Error(`${paramName} is not defined while trying to ${reason} ${pluginName}.${paramName}`)
    }
    return paramConfig
  }

  private async showSelect<T> (spec: IParamSpec<T>): Promise<T | undefined> {
    return selectListView<T>({
      items: (typeof spec.items === 'function') ? spec.items() : spec.items,
      heading: spec.description,
      itemTemplate: spec.itemTemplate,
      itemFilterKey: spec.itemFilterKey
    })
  }
}
