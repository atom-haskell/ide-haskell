'use babel'

import selectListView from './param-select-view'
import {Emitter, CompositeDisposable, Disposable} from 'atom'

export class ConfigParamStore {
  constructor (state = {}) {
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
    this.disposables = null
    this.emitter = null
    this.saved = null
    this.plugins = null
  }

  onDidUpdate (callback) {
    return this.emitter.on('did-update', callback)
  }

  addParamSpec (pluginName, paramName, spec) {
    if (!this.plugins.has(pluginName)) this.plugins.set(pluginName, new Map())
    let pluginConfig = this.plugins.get(pluginName)
    if (pluginConfig.has(paramName)) throw new Error(`Parameter ${pluginName}.${paramName} already defined!`)
    let value = this.saved[`${pluginName}.${paramName}`]
    if (value === undefined) value = spec.default
    pluginConfig.set(paramName, {spec, value})
    this.emitter.emit('did-update', {pluginName, paramName, value})
    return new Disposable(() => {
      let pluginConfig = this.plugins.get(pluginName)
      pluginConfig.delete(paramName)
      if (pluginConfig.size === 0) this.plugins.delete(pluginName)
    })
  }

  async setValue (pluginName, paramName, value) {
    // TODO: check if param defined
    let paramConfig = this.plugins.get(pluginName).get(paramName)
    if (value === undefined) value = await this.showSelect(paramConfig.spec)
    if (value !== undefined) {
      paramConfig.value = value
      this.saved[`${pluginName}.${paramName}`] = value
      this.emitter.emit('did-update', {pluginName, paramName, value})
    }
    return value
  }

  async getValue (pluginName, paramName) {
    // TODO: check if param defined
    let paramConfig = this.plugins.get(pluginName).get(paramName)
    if (paramConfig.value === undefined) await this.setValue(pluginName, paramName)
    return paramConfig.value
  }

  getValueRaw (pluginName, paramName) {
    // TODO: check if param defined
    let paramConfig = this.plugins.get(pluginName).get(paramName)
    return paramConfig.value
  }

  async showSelect (spec) {
    return selectListView({
      items: (typeof spec.items === 'function') ? spec.items() : spec.items,
      heading: spec.description,
      itemTemplate: spec.itemTemplate,
      itemFilterKey: spec.itemFilterKey
    })
  }
}
