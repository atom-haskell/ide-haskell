import {selectListView} from './param-select-view'
import {Emitter, CompositeDisposable, Disposable} from 'atom'

interface IParamData<T> {
  spec: UPI.IParamSpec<T>
  value?: T
}

export interface IState {
  [pluginNameParamName: string]: Object
}

export type TUpdatedCallback = (arg: {pluginName: string, paramName: string, value: Object}) => void

export class ConfigParamStore {
  private disposables: CompositeDisposable
  private emitter: Emitter
  private saved: IState
  private plugins: Map<string, Map<string, IParamData<Object>>>
  constructor (state: IState = {}) {
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.saved = state
    this.plugins = new Map()
  }

  public serialize () {
    return this.saved
  }

  public destroy () {
    this.disposables.dispose()
  }

  public onDidUpdate (callback: TUpdatedCallback) {
    return this.emitter.on('did-update', callback)
  }

  public addParamSpec<T> (pluginName: string, paramName: string, spec: UPI.IParamSpec<T>) {
    let pluginConfig = this.plugins.get(pluginName)
    if (!pluginConfig) {
      pluginConfig = new Map()
      this.plugins.set(pluginName, pluginConfig)
    }
    if (pluginConfig.has(paramName)) {
      throw new Error(`Parameter ${pluginName}.${paramName} already defined!`)
    }
    let value: Object | undefined = this.saved[`${pluginName}.${paramName}`]
    if (value === undefined) { value = spec.default }
    pluginConfig.set(paramName, {spec, value})
    this.emitter.emit('did-update', {pluginName, paramName, value})
    return new Disposable(() => {
      if (pluginConfig) {
        pluginConfig.delete(paramName)
        if (pluginConfig.size === 0) {
          this.plugins.delete(pluginName)
        }
      }
    })
  }

  public async setValue (pluginName: string, paramName: string, value?: Object) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'set')
    if (value === undefined) { value = await this.showSelect(paramConfig.spec) }
    if (value !== undefined) {
      paramConfig.value = value
      this.saved[`${pluginName}.${paramName}`] = value
      this.emitter.emit('did-update', {pluginName, paramName, value})
    }
    return value
  }

  public async getValue (pluginName: string, paramName: string) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'get')
    if (paramConfig.value === undefined) { await this.setValue(pluginName, paramName) }
    return paramConfig.value
  }

  public getValueRaw (pluginName: string, paramName: string) {
    const paramConfig = this.getParamConfig(pluginName, paramName, 'get raw')
    return paramConfig.value
  }

  private getParamConfig (pluginName: string, paramName: string, reason: string) {
    const pluginConfig = this.plugins.get(pluginName)
    if (!pluginConfig) {
      throw new Error(`${pluginName} is not defined while trying to ${reason} ${pluginName}.${paramName}`)
    }
    const paramConfig = pluginConfig.get(paramName)
    if (!paramConfig) {
      throw new Error(`${paramName} is not defined while trying to ${reason} ${pluginName}.${paramName}`)
    }
    return paramConfig
  }

  private async showSelect<T> (spec: UPI.IParamSpec<T>): Promise<T | undefined> {
    return selectListView<T>({
      items: (typeof spec.items === 'function') ? spec.items() : spec.items,
      heading: spec.description,
      itemTemplate: spec.itemTemplate.bind(spec),
      itemFilterKey: spec.itemFilterKey
    })
  }
}
