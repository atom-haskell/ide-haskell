import {CompositeDisposable, Disposable} from 'atom'
import {PluginManager} from '../plugin-manager'
import {UPIInstance} from './instance'
import {UPIError} from './error'
export {UPIError, UPIInstance}

import {IMenuDefinition} from './instance/menu'
import {ISetTypesParams} from '../output-panel'
import {TextBufferCallback} from './instance/events'
import {TUPIControlDefinition} from './instance/controls'
import {IParamSpec} from '../config-params'
import {TTooltipHandler} from './instance/tooltips'

export interface IRegistrationOptions {
  name: string
  consumer?: (instance: UPIInstance) => Disposable | void
  menu?: IMenuDefinition
  messageTypes?: ISetTypesParams
  events?: {
    onWillSaveBuffer?: TextBufferCallback | TextBufferCallback[]
    onDidSaveBuffer?: TextBufferCallback | TextBufferCallback[]
    onDidStopChanging?: TextBufferCallback | TextBufferCallback[]
  }
  controls?: TUPIControlDefinition[]
  params?: {[paramName: string]: IParamSpec<any>}
  tooltipEvent?: TTooltipHandler | {priority?: number, handler: TTooltipHandler}
}

export class UPI {
  private instances: Map<string, UPIInstance>
  private disposables: CompositeDisposable
  constructor (private pluginManager: PluginManager) {
    this.instances = new Map()
    this.disposables = new CompositeDisposable()
  }

  /**
  Call this function in consumer to get actual interface

  @param name: Plugin package name
  @param consumer: callback :: UPIInstance -> ()
  @returns {Disposable}
  */
  public consume (options: IRegistrationOptions): Disposable {
    const {name, menu, messageTypes, events, controls, params, consumer, tooltipEvent} = options
    if (!name) {
      throw new UPIError('name has to be specified for UPI')
    }
    if (this.instances.has(name)) {
      throw new UPIError(`Plugin ${name} already registered with UPI`)
    }
    const instance = new UPIInstance(this.pluginManager, name)
    this.instances.set(name, instance)
    const disp = new CompositeDisposable()

    if (menu) {
      disp.add(instance.menu.set(menu))
    }
    if (messageTypes) {
      instance.messages.setTypes(messageTypes) // TODO: Make disposable
    }
    if (events) {
      for (const k in events) {
        if (instance.events[k]) {
          let v: TextBufferCallback | TextBufferCallback[] = events[k]
          if (!Array.isArray(v)) { v = [v] }
          for (const i of v) {
            disp.add(instance.events[k](i))
          }
        }
      }
    }
    if (tooltipEvent) {
      let handler: TTooltipHandler, priority: number | undefined
      if (typeof tooltipEvent === 'function') {
        handler = tooltipEvent
        priority = 100
      } else {
        ({handler, priority} = tooltipEvent)
      }
      if (!priority) { priority = 100 }
      disp.add(instance.tooltips.onShouldShowTooltip(priority, handler))
    }
    if (controls) {
      for (const i of controls) {
        disp.add(instance.controls.add(i))
      }
    }
    if (params) {
      disp.add(instance.params.add(params))
    }

    if (consumer) {
      const d = consumer(instance)
      if (typeof d === 'object') {
        disp.add(d)
      }
    }

    disp.add(new Disposable(() => {
      this.instances.delete(name)
      instance.destroy()
    }))
    this.disposables.add(disp)
    return disp
  }

  public dispose () {
    this.disposables.dispose()
  }
}
