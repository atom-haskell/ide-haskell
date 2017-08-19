import { CompositeDisposable, TextEditor } from 'atom'
import { MAIN_MENU_LABEL, getEventType } from '../utils'
import { PluginManager } from '../plugin-manager'
import { isTEventRangeType } from '../utils'
import { consume } from './'

export function instance(
  pluginManager: PluginManager, options: UPI.IRegistrationOptions,
): UPI.IUPIInstance {
  const pluginName = options.name
  const disposables = new CompositeDisposable()
  const messageProvider = pluginManager.resultsDB.registerProvider()
  disposables.add(messageProvider)
  disposables.add(consume(pluginManager, options))

  return {
    setMenu (name: string, menu: AtomTypes.AtomMenuItem[]) {
      const menuDisp = atom.menu.add([{
        label: MAIN_MENU_LABEL,
        submenu: [ {label: name, submenu: menu} ],
      },
      ])
      disposables.add(menuDisp)
      return menuDisp
    },
    setStatus (status: UPI.IStatus) {
      return pluginManager.backendStatus(pluginName, status)
    },
    setMessages (messages: UPI.IResultItem[]) {
      messageProvider.setMessages(messages)
    },
    addMessageTab (name: string, opts: UPI.ISeverityTabDefinition) {
      pluginManager.outputPanel.createTab(name, opts)
    },
    showTooltip ({editor, eventType, detail, tooltip}: UPI.IShowTooltipParams) {
      if (!eventType) {
        eventType = getEventType(detail)
      }
      pluginManager.tooltipRegistry.showTooltip(
        editor, eventType, {pluginName, tooltip},
      )
    },
    addPanelControl<T> (def: UPI.TControlDefinition<T>) {
      return pluginManager.outputPanel.addPanelControl(def)
    },
    addConfigParam<T> (paramName: string, spec: UPI.IParamSpec<T>) {
      return pluginManager.configParamManager.add(pluginName, paramName, spec)
    },
    async getConfigParam<T> (name: string): Promise<T | undefined> {
      return pluginManager.configParamManager.get<T>(pluginName, name)
    },
    async getOthersConfigParam<T> (plugin: string, name: string): Promise<T | undefined> {
      return pluginManager.configParamManager.get<T>(plugin, name)
    },
    async setConfigParam<T> (name: string, value?: T): Promise<T | undefined> {
      return pluginManager.configParamManager.set<T>(pluginName, name, value)
    },
    getEventRange (editor: TextEditor, typeOrDetail: UPI.TEventRangeType | Object) {
      let type: UPI.TEventRangeType
      if (isTEventRangeType(typeOrDetail)) {
        type = typeOrDetail
      } else {
        type = getEventType(typeOrDetail)
      }
      const controller = pluginManager.controller(editor)
      if (!controller) { return undefined }
      return controller.getEventRange(type)
    },
    dispose () {
      disposables.dispose()
    },
  }
}
