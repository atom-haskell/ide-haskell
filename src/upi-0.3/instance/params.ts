import {CompositeDisposable, Point, Disposable, TextBuffer, TextEditor} from 'atom'
import {PluginManager} from '../../plugin-manager'
import {TPosition, TUPIText, TEventRangeType} from './general'

export interface IParamSpec<T> {
  onChanged: (value: T) => void
  items: Array<T> | (() => Array<T>)
  itemTemplate: (item: T) => String
  itemFilterKey: string
  description?: string
  displayName?: string
  displayTemplate: (item: T) => String
  default: T
}
export interface IMainInterface {
  /**
  addConfigParam
    param_name:
      onChanged: callback void(value)
      items: Array or callback Array(void)
      itemTemplate: callback, String(item), html template
      itemFilterKey: String, item filter key
      description: String [optional]
      displayName: String [optional, capitalized param_name default]
      displayTemplate: callback, String(item), string template
      default: item, default value

  Returns
    disp: Disposable
    change: object of change functions, keys being param_name
  */
  add (spec: {[param_name: string]: IParamSpec<any>}): Disposable

  /**
  getConfigParam(paramName) or getConfigParam(pluginName, paramName)

  returns a Promise that resolves to parameter
  value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  get<T> (plugin: string, name: string): Promise<T>
  get<T> (name: string): Promise<T>

  /**
  setConfigParam(paramName, value) or setConfigParam(pluginName, paramName, value)

  value is optional. If omitted, a selection dialog will be presented to user.

  returns a Promise that resolves to parameter value.

  Promise can be rejected with either error, or 'undefined'. Latter
  in case user cancels param selection dialog.
  */
  set<T> (plugin: string, name: string, value?: T): Promise<T>
  set<T> (name: string, value?: T): Promise<T>
}

export function create(pluginName: string, pluginManager: PluginManager): IMainInterface {
  return {
    add (spec) {
      return pluginManager.addConfigParam(pluginName, spec)
    },
    get (...args: any[]) {
      if(args.length < 2) {
        args.unshift(pluginName)
      }
      const [plugin, name] = args
      return pluginManager.getConfigParam(plugin, name)
    },
    set (...args: any[]) {
      if(args.length < 3) {
        args.unshift(pluginName)
      }
      const [plugin, name, value] = args
      return pluginManager.setConfigParam(plugin, name, value)
    }
  }
}
