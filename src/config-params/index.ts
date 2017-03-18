'use babel'

import {CompositeDisposable} from 'atom'
import {ParamControl} from './param-control'
import {ConfigParamStore, IParamSpec, IState as IStoreState} from './param-store'
export {IParamSpec}

import {OutputPanel} from '../output-panel'

type IState = IStoreState
export {IState}

export class ConfigParamManager {
  private store: ConfigParamStore
  constructor (private outputPanel: OutputPanel, state: IState) {
    this.store = new ConfigParamStore(state)
  }

  destroy () {
    this.store.destroy()
  }

  serialize () {
    return this.store.serialize()
  }

  add (pluginName: string, specs: { [paramName: string]: IParamSpec<any> }) {
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

  async get (pluginName: string, name: string) {
    return this.store.getValue(pluginName, name)
  }

  async set (pluginName:string, name: string, value: any) {
    return this.store.setValue(pluginName, name, value)
  }
}
