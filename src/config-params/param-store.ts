import { selectListView } from './param-select-view'
import { TEmitter, Emitter, CompositeDisposable, Disposable } from 'atom'

interface IParamData<T> {
  spec: UPI.IParamSpec<T>
  value?: T
}

export interface IState {
  [pluginNameParamName: string]: Object
}

interface TUpdatedCallbackArg<T> { pluginName: string, paramName: string, value: T | undefined }
export type TUpdatedCallback<T> = (arg: TUpdatedCallbackArg<T>) => void

export class ConfigParamStore {
  private disposables: CompositeDisposable
  private emitter: TEmitter<{
    'did-update': { pluginName: string, paramName: string, value: any }
  }>
  private saved: IState
  private plugins: Map<string, Map<string, IParamData<any>>>
  constructor(state: IState = {}) {
    this.disposables = new CompositeDisposable()
    this.emitter = new Emitter()
    this.disposables.add(this.emitter)
    this.saved = state
    this.plugins = new Map()
  }

  public serialize() {
    return this.saved
  }

  public destroy() {
    this.disposables.dispose()
  }

  public onDidUpdate<T>(pluginName: string, paramName: string, callback: TUpdatedCallback<T>) {
    return this.emitter.on('did-update', (val) => {
      if (val.pluginName === pluginName && val.paramName === paramName) {
        callback(val)
      }
    })
  }

  public addParamSpec<T>(pluginName: string, paramName: string, spec: UPI.IParamSpec<T>) {
    let pluginConfig = this.plugins.get(pluginName)
    if (!pluginConfig) {
      pluginConfig = new Map()
      this.plugins.set(pluginName, pluginConfig)
    }
    if (pluginConfig.has(paramName)) {
      throw new Error(`Parameter ${pluginName}.${paramName} already defined!`)
    }
    let value: T | undefined = this.saved[`${pluginName}.${paramName}`] as T
    if (value === undefined) { value = spec.default }
    pluginConfig.set(paramName, { spec, value })
    this.emitter.emit('did-update', { pluginName, paramName, value })
    return new Disposable(() => {
      if (pluginConfig) {
        pluginConfig.delete(paramName)
        if (pluginConfig.size === 0) {
          this.plugins.delete(pluginName)
        }
      }
    })
  }

  public async setValue<T>(pluginName: string, paramName: string, value?: T): Promise<T | undefined> {
    const paramConfig = await this.getParamConfig<T>(pluginName, paramName, 'set')
    if (paramConfig === undefined) return undefined
    if (value === undefined) { value = await this.showSelect<T>(paramConfig.spec) }
    if (value !== undefined) {
      paramConfig.value = value
      this.saved[`${pluginName}.${paramName}`] = value
      this.emitter.emit('did-update', { pluginName, paramName, value })
    }
    return value
  }

  public async getValue<T>(pluginName: string, paramName: string): Promise<T | undefined> {
    const paramConfig = await this.getParamConfig<T>(pluginName, paramName, 'get')
    if (paramConfig === undefined) return undefined
    if (paramConfig.value === undefined) { await this.setValue(pluginName, paramName) }
    return paramConfig.value
  }

  public async getValueRaw<T>(pluginName: string, paramName: string): Promise<T | undefined> {
    const paramConfig = await this.getParamConfig<T>(pluginName, paramName, 'get raw')
    if (paramConfig === undefined) return undefined
    return paramConfig.value
  }

  private async getParamConfig<T>(pluginName: string, paramName: string, reason: string): Promise<IParamData<T> | undefined> {
    if (!atom.packages.isPackageLoaded(pluginName)) {
      console.error(new Error(`No ${pluginName} package while trying to ${reason} ${pluginName}.${paramName}`))
      return undefined
    }
    if (!atom.packages.isPackageActive(pluginName)) {
      await atom.packages.activatePackage(pluginName)
    }
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

  private async showSelect<T>(spec: UPI.IParamSpec<T>): Promise<T | undefined> {
    return selectListView<T>({
      items: (typeof spec.items === 'function') ? spec.items() : spec.items,
      heading: spec.description,
      itemTemplate: spec.itemTemplate.bind(spec),
      itemFilterKey: spec.itemFilterKey,
    })
  }
}
