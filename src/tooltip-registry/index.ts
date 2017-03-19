import {TextEditor, Disposable, Range} from 'atom'
import {TMessage, MessageObject} from '../utils'
import {PluginManager} from '../plugin-manager'
import {TEventRangeType} from '../editor-control/tooltip-manager'

export type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>
export interface ITooltipData {
  range: Range
  text: TMessage | TMessage[]
  persistOnCursorMove?: boolean
}
export type TTooltipHandler =
  (editor: TextEditor, crange: Range, type: TEventRangeType)
  => ITooltipData | undefined | Promise<ITooltipData | undefined>

export type TTooltipHandlerSpec = {priority: number, handler: TTooltipHandler}
type TTooltipSpec = {pluginName: string, tooltip: TTooltipFunction}

export class TooltipRegistry {
  private providers: Array<TTooltipHandlerSpec & {pluginName: string}>
  constructor (private pluginManager: PluginManager) {
    this.providers = []
  }

  public dispose () {
    this.providers = []
  }

  public register (pluginName: string, provider: TTooltipHandlerSpec): Disposable {
    const idx = this.providers.findIndex(({priority}) => priority < provider.priority)
    const record = {pluginName, ...provider}
    this.providers.splice(idx, 0, record)
    return new Disposable(() => {
      const ix = this.providers.indexOf(record)
      this.providers.splice(ix, 1)
    })
  }

  public async showTooltip (
    editor: TextEditor, type: TEventRangeType, spec?: TTooltipSpec
  ) {
    const controller = this.pluginManager.controller(editor)
    if (!controller) { return }
    let pluginName, tooltipData
    const eventRange = controller.getEventRange(type)
    if (!eventRange) { return }
    if (spec) {
      let tooltip
      ({pluginName, tooltip} = spec)
      tooltipData = await Promise.resolve(tooltip(eventRange.crange))
    } else {
      const tooltip = await this.defaultTooltipFunction(editor, type, eventRange.crange)
      if (!tooltip) { return }
      ({pluginName, tooltipData} = tooltip)
    }
    const newEventRange = controller.getEventRange(type)
    if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) { return }
    const {persistOnCursorMove = false} = tooltipData
    let msg
    if (Array.isArray(tooltipData.text)) {
      msg = tooltipData.text.map(MessageObject.fromObject.bind(MessageObject))
    } else {
      msg = MessageObject.fromObject(tooltipData.text)
    }
    controller.tooltips.show(
      tooltipData.range, msg, type, pluginName, {persistOnCursorMove}
    )
  }

  private async defaultTooltipFunction (editor: TextEditor, type: TEventRangeType = 'mouse', crange: Range) {
    for (const {pluginName, handler} of this.providers) {
      try {
        const tooltipData = await Promise.resolve(handler(editor, crange, type))
        if (!tooltipData) {
          continue
        }
        return {pluginName, tooltipData}
      } catch (e) {
        this.pluginManager.outputView.backendStatus(pluginName, e)
        continue
      }
    }
  }
}
