import * as etch from 'etch'
import * as UPI from 'atom-haskell-upi'
import { Emitter, Disposable } from 'atom'
import { StatusIcon } from './views/status-icon'
import { ProgressBar } from './views/progress-bar'

export class BackendStatusController {
  private readonly statusMap: Map<string, UPI.IStatus> = new Map()
  private readonly awaiters: Map<string, Set<Promise<any>>> = new Map()
  private readonly emitter = new Emitter<
    {},
    {
      'did-update': { pluginName: string; status: UPI.IStatus }
    }
  >()

  public getAwaiter(pluginName: string) {
    let activeActionsVar = this.awaiters.get(pluginName)
    if (activeActionsVar === undefined) {
      activeActionsVar = new Set()
      this.awaiters.set(pluginName, activeActionsVar)
    }
    const activeActions = activeActionsVar
    return async <T,>(action: () => Promise<T> | T): Promise<T | void> => {
      let promise
      try {
        promise = Promise.resolve().then(action)
        activeActions.add(promise)
        this.updateStatus(pluginName, { status: 'progress', detail: '' })
        const res = await promise
        activeActions.delete(promise)
        if (activeActions.size === 0) {
          this.updateStatus(pluginName, { status: 'ready', detail: '' })
        }
        return res
      } catch (e) {
        if (promise) activeActions.delete(promise)
        this.updateStatus(pluginName, { status: 'warning', detail: `${e}` })
        console.warn(e)
        return undefined
      }
    }
  }

  public forceBackendStatus(pluginName: string, status: UPI.IStatus) {
    this.updateStatus(pluginName, status)
  }

  public onDidUpdate(
    callback: (value: { pluginName: string; status: UPI.IStatus }) => void,
  ): Disposable {
    return this.emitter.on('did-update', callback)
  }

  public renderStatusIcon() {
    return <StatusIcon statusMap={this.statusMap} />
  }

  public renderProgressBar() {
    const progress = Array.from(this.statusMap.values()).reduce((cv, i) => {
      if (i.status === 'progress' && i.progress !== undefined) {
        cv.push(i.progress)
      }
      return cv
    }, [] as number[])
    return <ProgressBar progress={progress} />
  }

  private updateStatus(pluginName: string, status: UPI.IStatus) {
    this.statusMap.set(pluginName, status)
    this.emitter.emit('did-update', { pluginName, status })
  }
}
