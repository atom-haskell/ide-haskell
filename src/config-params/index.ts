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

  public destroy () {
    this.store.destroy()
  }

  public serialize () {
    return this.store.serialize()
  }

  public add (pluginName: string, specs: { [paramName: string]: IParamSpec<any> }) {
    const disp = new CompositeDisposable()
    for (const name of Object.keys(specs)) {
      const spec = specs[name]
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

  public async get (pluginName: string, name: string) {
    return this.store.getValue(pluginName, name)
  }

  public async set (pluginName: string, name: string, value: any) {
    return this.store.setValue(pluginName, name, value)
  }
}
