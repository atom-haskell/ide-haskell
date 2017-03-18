import {Disposable} from 'atom'
import {PluginManager} from '../../plugin-manager'

export interface IControlOpts {
  id: string
  events: {[key: string]: Function}
  classes: string[]
  style: {[key: string]: string}
  attrs: {[key: string]: string}
}
export interface IUPIControlDefinition {
  element: string | HTMLElement
  opts: IControlOpts
}
export interface IMainInterface {
  /**
  Add a new control to ouptut panel heading.

  element: HTMLElement of control, or String with tag name
  opts: various options
    id: String, id
    events: Object, event callbacks, key is event name, e.g. "click",
            value is callback
    classes: Array of String, classes
    style: Object, css style, keys are style attributes, values are values
    attrs: Object, other attributes, keys are attribute names, values are values
    before: String, CSS selector of element, that this one should be inserted
            before, e.g. '#progressBar'

  Returns Disposable.
  */
  add (def: IUPIControlDefinition): Disposable
}

export function create (pluginManager: PluginManager): IMainInterface {
  return {
    add ({element, opts}) {
      return pluginManager.outputView.addPanelControl(element, opts)
    }
  }
}
