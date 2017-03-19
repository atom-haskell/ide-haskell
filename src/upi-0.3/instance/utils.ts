import {TextEditor} from 'atom'
import {TEventRangeType, TEventRangeResult} from '../../editor-control'
import {PluginManager} from '../../plugin-manager'
import {getEventType} from '../../utils'

interface IEventRangeParams {
  editor: TextEditor
  detail?: any
  eventType?: TEventRangeType
}

export interface IMainInterface {
  /**
  Utility function to extract event range/type for a given event

  @param editor {TextEditor} -- editor that generated event
  @param detail {any} -- event detail, ignored if eventType is set
  @param eventType {TEventRangeType} -- type of event
  @returns {TEventRangeResult}
  */
  getEventRange (params: IEventRangeParams): TEventRangeResult | undefined
}

export function create (pluginManager: PluginManager): IMainInterface {
  return {
    getEventRange (params) {
      const controller = pluginManager.controller(params.editor)
      if (!controller) { return }
      let type: TEventRangeType | undefined = params.eventType
      if (!type) {
        type = getEventType(params.detail)
      }
      return controller.getEventRange(type)
    }
  }
}
