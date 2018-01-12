import { CompositeDisposable } from 'atom'
import { ParamControl } from './param-control'
import { ConfigParamStore, IState as IStoreState } from './param-store'

import { OutputPanel } from '../output-panel'
import * as UPI from 'atom-haskell-upi'

type IState = IStoreState
export { IState }

export class ConfigParamManager {
  private store: ConfigParamStore
  constructor(private outputPanel: OutputPanel, state: IState) {
    this.store = new ConfigParamStore(state)
  }

  public destroy() {
    this.store.destroy()
  }

  public serialize() {
    return this.store.serialize()
  }

  public add(
    pluginName: string,
    paramName: string,
    spec: UPI.IParamSpec<Object>,
  ) {
    const disp = new CompositeDisposable()
    disp.add(
      this.store.addParamSpec(pluginName, paramName, spec),
      this.outputPanel.addPanelControl({
        element: ParamControl,
        opts: {
          pluginName,
          name: paramName,
          spec,
          store: this.store,
        },
      }),
    )
    return disp
  }

  public async get<T>(pluginName: string, name: string) {
    return this.store.getValue<T>(pluginName, name)
  }

  public async set<T>(pluginName: string, name: string, value?: T) {
    return this.store.setValue(pluginName, name, value)
  }
}
