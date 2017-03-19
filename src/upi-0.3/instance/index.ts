import {CompositeDisposable} from 'atom'
import {PluginManager} from '../../plugin-manager'
import {UPIError} from '../error'
export {UPIError}

import * as Menu from './menu'
import * as Messages from './messages'
import * as Events from './events'
import * as Tooltips from './tooltips'
import * as Controls from './controls'
import * as Params from './params'

export type TTooltipHandlerSpec = {priority: number, handler: Tooltips.TTooltipHandler}

export class UPIInstance {
  public menu: Menu.IMainInterface
  public messages: Messages.IMainInterface
  public events: Events.IMainInterface
  public tooltips: Tooltips.IMainInterface
  public controls: Controls.IMainInterface
  public params: Params.IMainInterface
  private disposables: CompositeDisposable
  private destroyed: boolean
  constructor (pluginManager: PluginManager, pluginName: string) {
    this.disposables = new CompositeDisposable()
    this.destroyed = false

    this.menu = Menu.create(this.disposables)
    this.messages = Messages.create(pluginName, pluginManager)

    this.tooltips = Tooltips.create(pluginName, pluginManager, this.disposables)
    this.events = Events.create(pluginManager, this.disposables)
    this.controls = Controls.create(pluginManager)
    this.params = Params.create(pluginName, pluginManager)
  }

  public destroy () {
    this.disposables.dispose()
    this.destroyed = true
  }

  public check () {
    if (this.destroyed) {
      throw new UPIError('This UPI interface was destroyed')
    }
    return this
  }
}
