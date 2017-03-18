import {CompositeDisposable} from 'atom'
import {PluginManager} from '../../plugin-manager'
import {UPIError} from '../error'
import {UPI} from '../'
export {UPIError}

import * as Menu from './menu'
import * as Messages from './messages'
import * as Events from './events'
import * as Tooltips from './tooltips'
import * as Controls from './controls'
import * as Params from './params'
import * as Utils from './utils'

export type TTooltipHandlerSpec = {priority: number, handler: Tooltips.TTooltipHandler}

export class UPIInstance {
  public menu: Menu.IMainInterface
  public messages: Messages.IMainInterface
  public events: Events.IMainInterface
  public tooltips: Tooltips.IMainInterface
  public controls: Controls.IMainInterface
  public params: Params.IMainInterface
  public utils: Utils.IMainInterface
  public tooltipEvents: Set<TTooltipHandlerSpec>
  private disposables: CompositeDisposable
  private destroyed: boolean
  constructor (pluginManager: PluginManager, pluginName: string, main: UPI) {
    this.disposables = new CompositeDisposable()
    this.tooltipEvents = new Set()
    this.destroyed = false

    this.utils = {withEventRange: main.withEventRange.bind(main)}

    this.menu = Menu.create(this.disposables)
    this.messages = Messages.create(pluginName, pluginManager)

    this.tooltips = Tooltips.create(pluginManager, main, this)
    this.events = Events.create(pluginManager, this.disposables)
    this.controls = Controls.create(pluginManager)
    this.params = Params.create(pluginName, pluginManager)
  }

  public destroy () {
    this.disposables.dispose()
    this.tooltipEvents.clear()
    Object.getOwnPropertyNames(this).forEach((p) => {
      this[p] = null
    })
    this.destroyed = true
  }

  public check () {
    if (this.destroyed) {
      throw new UPIError('This UPI interface was destroyed')
    }
    return this
  }
}
