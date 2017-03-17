'use babel'

import {CompositeDisposable} from 'atom'
import {ParamControl} from './param-control'
import {ConfigParamStore} from './param-store'

export class ConfigParamManager {
  constructor (outputPanel, state) {
    this.outputPanel = outputPanel
    this.store = new ConfigParamStore(state)
  }

  destroy () {
    this.store.destroy()
    this.store = null
    this.outputPanel = null
  }

  serialize () {
    return this.store.serialize()
  }

  add (pluginName, specs) {
    let disp = new CompositeDisposable()
    for (let name of Object.keys(specs)) {
      let spec = specs[name]
      disp.add(this.store.addParamSpec(pluginName, name, spec))
      disp.add(
        this.outputPanel.addPanelControl(ParamControl, {
          pluginName,
          name,
          spec,
          store: this.store
        })
      )
    }
    return disp
  }

  async get (pluginName, name) {
    return this.store.getValue(pluginName, name)
  }

  async set (pluginName, name, value) {
    return this.store.setValue(pluginName, name, value)
  }
}
