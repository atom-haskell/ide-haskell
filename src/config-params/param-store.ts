import {selectListView} from './param-select-view'
import {Emitter, CompositeDisposable, Disposable} from 'atom'

export interface IParamSpec<T> {
  /**
  name of item key that the filter in select dialog will match
  */
  itemFilterKey: string
  /**
  this will be displayed in the heading of select dialog
  */
  description?: string
  /**
  display name of the parameter in output panel
  */
  displayName?: string
  /**
  default value
  */
  default?: T
  /**
  possible values of the parameter. can be a callback.
  */
  items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>)
  /**
  will be called whenever the value of parameter changes

  @param value new value of the parameter
  */
  onChanged (value: T): void
  /**
  how an item should be displayed to user

  @param item item to be displayed

  @returns HTML string representing the item
  */
  itemTemplate (item: T): string
  /**
  template for displaying value of parameter in output panel

  @param item item to be displayed

  @returns plaintext string representing the item
  */
  displayTemplate (item: T): string
}

interface IParamData<T> {
  spec: IParamSpec<T>
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

  public addParamSpec<T> (pluginName: string, paramName: string, spec: IParamSpec<T>) {
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

  private async showSelect<T> (spec: IParamSpec<T>): Promise<T | undefined> {
    return selectListView<T>({
      items: (typeof spec.items === 'function') ? spec.items() : spec.items,
      heading: spec.description,
      itemTemplate: spec.itemTemplate.bind(spec),
      itemFilterKey: spec.itemFilterKey
    })
  }
}
