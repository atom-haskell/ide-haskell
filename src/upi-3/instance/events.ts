import {CompositeDisposable, Disposable, TextBuffer} from 'atom'
import {PluginManager} from '../../plugin-manager'
export type TextBufferCallback = (buffer: TextBuffer) => void

export interface IMainInterface {
  /**
  Convenience function. Will fire before Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onWillSaveBuffer (callback: TextBufferCallback): Disposable

  /**
  Convenience function. Will fire after Haskell buffer is saved.

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onDidSaveBuffer (callback: TextBufferCallback): Disposable

  /**
  Convenience function. Will fire after Haskell buffer has stopped changing for
  some fraction of a second (usually 300 ms).

  callback: callback(buffer)
    buffer: TextBuffer, buffer that generated event

  @returns {Disposable}
  */
  onDidStopChanging (callback: TextBufferCallback): Disposable
}

export function create (pluginManager: PluginManager, disposables: CompositeDisposable): IMainInterface {
  return {
    onWillSaveBuffer (callback) {
      const disp = pluginManager.onWillSaveBuffer(callback)
      disposables.add(disp)
      return disp
    },
    onDidSaveBuffer (callback) {
      const disp = pluginManager.onDidSaveBuffer(callback)
      disposables.add(disp)
      return disp
    },
    onDidStopChanging (callback) {
      const disp = pluginManager.onDidStopChanging(callback)
      disposables.add(disp)
      return disp
    }
  }
}
