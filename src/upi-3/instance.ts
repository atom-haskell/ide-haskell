/* tslint:disable: max-classes-per-file member-access */
import { CompositeDisposable, TextEditor } from 'atom'
import { MAIN_MENU_LABEL, getEventType } from '../utils'
import {PluginManager} from '../plugin-manager'
import {IStatus, ISeverityTabDefinition, IControlOpts, IElementObject} from '../output-panel'
import {IResultItem} from '../results-db'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {IParamSpec} from '../config-params'
import {TTooltipFunction, ITooltipData} from '../tooltip-registry'
import {isTEventRangeType} from '../editor-control/event-table'

interface IShowTooltipParams {
  editor: TextEditor
  eventType?: TEventRangeType
  detail?: any
  tooltip: TTooltipFunction | ITooltipData
}

export function instance (pluginManager: PluginManager, pluginName: string) {
  const disposables = new CompositeDisposable()
  const messageProvider = pluginManager.resultsDB.registerProvider(pluginName)
  disposables.add(messageProvider)

  return {
    setMenu (name: string, menu: any[]) {
      const menuDisp = atom.menu.add([{
        label: MAIN_MENU_LABEL,
        submenu: [ {label: name, submenu: menu} ]
      }
      ])
      disposables.add(menuDisp)
      return menuDisp
    },
    setStatus (status: IStatus) {
      return pluginManager.outputPanel.backendStatus(pluginName, status)
    },
    setMessages (messages: IResultItem[]) {
      messageProvider.setMessages(messages)
    },
    addMessageTab (name: string, opts: ISeverityTabDefinition) {
      pluginManager.outputPanel.createTab(name, opts)
    },
    showTooltip ({editor, eventType, detail, tooltip}: IShowTooltipParams) {
      if (!eventType) {
        eventType = getEventType(detail)
      }
      if (typeof tooltip !== 'function') {
        const tt = tooltip
        tooltip = () => tt
      }
      pluginManager.tooltipRegistry.showTooltip(
        editor, eventType, {pluginName, tooltip}
      )
    },
    addPanelControl<T> (element: string | { new (opts: T): IElementObject<T> }, opts: IControlOpts | T) {
      if (typeof element === 'string') {
        return pluginManager.outputPanel.addPanelControl(element, opts)
      } else {
        return pluginManager.outputPanel.addPanelControl(element, opts)
      }
    },
    addConfigParam (paramName: string, spec: IParamSpec<any>) {
      return pluginManager.configParamManager.add(pluginName, paramName, spec)
    },
    async getConfigParam (name: string) {
      return pluginManager.configParamManager.get(pluginName, name)
    },
    async getOthersConfigParam (plugin: string, name: string) {
      return pluginManager.configParamManager.get(plugin, name)
    },
    async setConfigParam (name: string, value: any) {
      return pluginManager.configParamManager.set(pluginName, name, value)
    },
    getEventRange (editor: TextEditor, typeOrDetail: TEventRangeType | Object) {
      let type: TEventRangeType
      if (isTEventRangeType(typeOrDetail)) {
        type = typeOrDetail
      } else {
        type = getEventType(typeOrDetail)
      }
      const controller = pluginManager.controller(editor)
      if (!controller) { return }
      return controller.getEventRange(type)
    }
  }
}
