'use babel'

import {CompositeDisposable, Point, Disposable, TextEditor} from 'atom'
import {getEventType} from '../utils'
import {PluginManager} from '../plugin-manager'
import {UPIInstance} from './instance'
import {UPIError} from './error'
export {UPIError}

import {TPosition, TEventRangeType} from './instance/general'
import {IMenuDefinition} from './instance/menu'
import {ISetTypesParams} from './instance/messages'
import {TextBufferCallback} from './instance/events'
import {IUPIControlDefinition} from './instance/controls'
import {IParamSpec} from './instance/params'
import {TTooltipHandler} from './instance/tooltips'
import {TEventRangeCallback} from './instance/utils'
import {TTooltipHandlerSpec} from './instance'

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
  controls?: IUPIControlDefinition[]
  params?: {[paramName: string]: IParamSpec<any>}
  tooltipEvent?: TTooltipHandler | {priority?: number, handler: TTooltipHandler}
}

interface IEventRangeParamsInternal {
  editor?: TextEditor
  controller: any
  detail?: any
  eventType: TEventRangeType
  pos: TPosition
}

export class UPI {
  private instances: Map<string, UPIInstance>
  private disposables: CompositeDisposable
  constructor (private pluginManager: PluginManager) {
    this.instances = new Map()
    this.disposables = new CompositeDisposable()
    this.disposables.add(this.pluginManager.onShouldShowTooltip(this.shouldShowTooltip.bind(this)))
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
    const instance = new UPIInstance(this.pluginManager, name, this)
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

  public withEventRange<T> (
    {editor, detail, eventType, pos, controller}: IEventRangeParamsInternal,
    callback: TEventRangeCallback<T>
  ) {
    if (pos) { pos = Point.fromObject(pos) }
    if (!eventType) { eventType = getEventType(detail) }
    if (!controller && editor) { controller = this.pluginManager.controller(editor) }
    if (!controller) { return }

    return callback(controller.getEventRange(pos, eventType), eventType)
  }

  public getEventRange (
    {editor, detail, eventType, pos, controller}: IEventRangeParamsInternal
  ): {pos: Point, crange: Range} | undefined {
    if (pos) { pos = Point.fromObject(pos) }
    if (!eventType) { eventType = getEventType(detail) }
    if (!controller && editor) { controller = this.pluginManager.controller(editor) }
    if (!controller) { return }

    return controller.getEventRange(pos, eventType)
  }

  private async shouldShowTooltip (
    {editor, pos, eventType}: {editor: TextEditor, pos: Point, eventType: TEventRangeType}
  ) {
    const subs: Array<TTooltipHandlerSpec & {pluginName: string}> = []
    for (const [pluginName, inst] of this.instances.entries()) {
      for (const vs of inst.tooltipEvents.values()) {
        subs.push({pluginName, ...vs})
      }
    }
    subs.sort((a, b) => b.priority - a.priority)
    const controller = this.pluginManager.controller(editor)
    if(!controller) return
    for (const {pluginName, handler} of subs) {
      try {
        const eventRange = this.getEventRange({controller, pos, eventType})
        if (!eventRange) { continue }
        const {crange, pos: newPos} = eventRange
        const tt = await Promise.resolve(handler(editor, crange, eventType))
        if (tt) {
          const {range, text} = tt
          controller.showTooltip(newPos, range, text, {eventType, subtype: 'external'})
          break
        } else {
          continue
        }
      } catch (e) {
        if (e.message) {
          console.warn(e)
          e = {
            status: 'warning',
            detail: e.message
          }
        }
        if (!e.ignore) {
          controller.hideTooltip({eventType})
          this.pluginManager.outputView.backendStatus(pluginName, e)
        }
      }
    }
  }
}
