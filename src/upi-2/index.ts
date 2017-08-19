import { CompositeDisposable } from 'atom'
import { PluginManager } from '../plugin-manager'
import { DummyElement } from './dummy-element'

import * as UPI2 from './def'
export * from './def'
import * as UPI3 from '../upi-3'

export class UPIInstance implements UPI2.IUPIInstance {
  private messages: UPI2.IResultItem[] = []
  private upi3: UPI.IUPIInstance
  private disposables = new CompositeDisposable()
  constructor(
    private pluginManager: PluginManager, outerDisposables: CompositeDisposable, private pluginName: string,
  ) {
    this.upi3 = UPI3.instance(pluginManager, { name: pluginName })
    this.disposables.add(this.upi3)
    outerDisposables.add(this.disposables)
  }

  public setMenu(name: string, menu: UPI2.TAtomMenu[]) {
    return this.upi3.setMenu(name, menu)
  }

  public setStatus(status: UPI2.IStatus) {
    return this.upi3.setStatus(status)
  }

  public addMessages(newMessages: UPI2.IResultItem[], types?: UPI2.TSeverity[]) {
    this.messages.push(...newMessages)
    this.upi3.setMessages(this.messages)
  }

  public setMessages(newMessages: UPI2.IResultItem[], types: UPI2.TSeverity[]) {
    this.messages = [...newMessages]
    this.upi3.setMessages(this.messages)
  }

  public clearMessages(types: UPI2.TSeverity[]) {
    this.messages = this.messages.filter(({ severity }) => !types.includes(severity))
    this.upi3.setMessages(this.messages)
  }

  public setMessageTypes(types: { [severity: string]: UPI2.ISeverityTabDefinition }) {
    for (const type of Object.keys(types)) {
      const opts = types[type]
      this.upi3.addMessageTab(type, opts)
    }
  }

  public onShouldShowTooltip(callback: UPI2.TTooltipHandler) {
    const disp = this.pluginManager.tooltipRegistry.register(
      this.pluginName, { priority: 100, handler: callback },
    )
    this.disposables.add(disp)
    return disp
  }

  public showTooltip(opts: UPI2.IShowTooltipParams) {
    this.upi3.showTooltip(opts)
  }

  public onWillSaveBuffer(callback: UPI2.TTextBufferCallback) {
    const disp = this.pluginManager.onWillSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  public onDidSaveBuffer(callback: UPI2.TTextBufferCallback) {
    const disp = this.pluginManager.onDidSaveBuffer(callback)
    this.disposables.add(disp)
    return disp
  }

  public onDidStopChanging(callback: UPI2.TTextBufferCallback) {
    const disp = this.pluginManager.onDidStopChanging(callback)
    this.disposables.add(disp)
    return disp
  }

  public addPanelControl(element: string | HTMLElement, opts: UPI2.IControlOpts) {
    if (typeof element === 'string') {
      return this.upi3.addPanelControl({ element, opts })
    } else {
      const newOpts: UPI2.IControlOpts & { element: HTMLElement } = { ...opts, element }
      return this.upi3.addPanelControl({ element: DummyElement, opts: newOpts })
    }
  }

  public addConfigParam(specs: { [paramName: string]: UPI2.IParamSpec<Object> }) {
    const disp = new CompositeDisposable()
    for (const [n, s] of Object.entries(specs)) {
      disp.add(this.upi3.addConfigParam(n, s))
    }
    return disp
  }

  public async getConfigParam(otherPluginName: string, name?: string) {
    if (!name) {
      return this.upi3.getConfigParam(otherPluginName)
    } else {
      return this.upi3.getOthersConfigParam(otherPluginName, name)
    }
  }

  public async setConfigParam(name: string, value?: Object) {
    return this.pluginManager.configParamManager.set(this.pluginName, name, value)
  }

  public withEventRange<T>(
    { editor, detail, eventType }: UPI2.IEventRangeParams, callback: UPI2.TEventRangeCallback<T>,
  ) {
    const res = this.upi3.getEventRange(editor, eventType || detail || {})
    if (!res) { return undefined }
    return callback(res)
  }
}

export function instance(pluginManager: PluginManager, outerDisposables: CompositeDisposable, pluginName: string) {
  return new UPIInstance(pluginManager, outerDisposables, pluginName)
}
