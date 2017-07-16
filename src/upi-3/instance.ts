import { CompositeDisposable, TextEditor } from 'atom'
import { MAIN_MENU_LABEL, getEventType } from '../utils'
import {PluginManager} from '../plugin-manager'
import {IStatus, ISeverityTabDefinition, TControlDefinition} from '../output-panel'
import {IResultItem} from '../results-db'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {IParamSpec} from '../config-params'
import {TTooltipFunction, ITooltipData} from '../tooltip-registry'
import {isTEventRangeType} from '../editor-control/event-table'
import {TAtomMenu, consume, IRegistrationOptions} from './'

export interface IShowTooltipParams {
  editor: TextEditor
  eventType?: TEventRangeType
  detail?: Object
  tooltip: TTooltipFunction | ITooltipData
}

export function instance (
  pluginManager: PluginManager, options: IRegistrationOptions
) {
  const pluginName = options.name
  const disposables = new CompositeDisposable()
  const messageProvider = pluginManager.resultsDB.registerProvider()
  disposables.add(messageProvider)
  disposables.add(consume(pluginManager, options))

  return {
    setMenu (name: string, menu: TAtomMenu[]) {
      const menuDisp = atom.menu.add([{
        label: MAIN_MENU_LABEL,
        submenu: [ {label: name, submenu: menu} ]
      }
      ])
      disposables.add(menuDisp)
      return menuDisp
    },
    setStatus (status: IStatus) {
      return pluginManager.backendStatus(pluginName, status)
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
    addPanelControl<T> (def: TControlDefinition<T>) {
      return pluginManager.outputPanel.addPanelControl(def)
    },
    addConfigParam (paramName: string, spec: IParamSpec<Object>) {
      return pluginManager.configParamManager.add(pluginName, paramName, spec)
    },
    async getConfigParam (name: string) {
      return pluginManager.configParamManager.get(pluginName, name)
    },
    async getOthersConfigParam (plugin: string, name: string) {
      return pluginManager.configParamManager.get(plugin, name)
    },
    async setConfigParam (name: string, value: Object) {
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
    },
    dispose () {
      disposables.dispose()
    }
  }
}
