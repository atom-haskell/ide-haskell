import { TextEditor, Range, RangeCompatible } from 'atom'
import { MessageObject } from '../utils'
import { PluginManager } from '../plugin-manager'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType
import { TooltipMessage } from './tooltip-view'
import { renderActions } from './render-actions'

export interface ITooltipSpec {
  pluginName: string
  tooltip: TTooltipFunctionExt | ITooltipDataExt
}
export type TTooltipFunctionExt = (
  crange: Range,
) => ITooltipDataExt | Promise<ITooltipDataExt>
export interface ITooltipDataExt {
  range: RangeCompatible
  text: UPI.TSingleOrArray<UPI.TMessage | MessageObject>
  persistent?: boolean
}

export class TooltipManager {
  constructor(private readonly pluginManager: PluginManager) {}

  public async showTooltip(
    editor: TextEditor,
    type: TEventRangeType,
    spec?: ITooltipSpec,
  ) {
    const controller = this.pluginManager.controller(editor)
    if (!controller) {
      return
    }
    let pluginName: string
    let tooltipData: TTooltipFunctionExt | ITooltipDataExt
    if (spec && typeof spec.tooltip !== 'function') {
      tooltipData = spec.tooltip
      pluginName = spec.pluginName
    } else {
      const eventRange = controller.getEventRange(type)
      if (!eventRange) {
        return
      }
      if (spec && typeof spec.tooltip === 'function') {
        pluginName = spec.pluginName
        const awaiter = this.pluginManager.getAwaiter(pluginName)
        const tt = spec.tooltip
        const tooltipDataTemp = await awaiter(() => tt(eventRange.crange))
        if (tooltipDataTemp === undefined) return
        tooltipData = tooltipDataTemp
      } else {
        const tooltip = await this.pluginManager.tooltipRegistry.defaultTooltipFunction(
          editor,
          type,
          eventRange.crange,
        )
        if (!tooltip) {
          // if nobody wants to show anything, might as well hide...
          // TODO: this doesn't seem like a particularly bright idea?
          controller.tooltips.hide(type, undefined, { persistent: false })
          return
        }
        ;({ pluginName, tooltipData } = tooltip)
      }
      const newEventRange = controller.getEventRange(type)
      if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) {
        return
      }
    }
    const { persistent = false } = tooltipData
    let msg
    if (Array.isArray(tooltipData.text)) {
      msg = tooltipData.text.map(MessageObject.fromObject)
    } else {
      msg = MessageObject.fromObject(tooltipData.text)
    }
    controller.tooltips.show(
      Range.fromObject(tooltipData.range),
      type,
      pluginName,
      { persistent },
      new TooltipMessage(
        pluginName,
        msg,
        renderActions(
          editor,
          await this.pluginManager.actionRegistry.getActions(
            editor,
            type,
            Range.fromObject(tooltipData.range),
          ),
        ),
      ),
    )
  }

  public hideTooltip(
    editor: TextEditor,
    type?: TEventRangeType,
    source?: string,
  ) {
    const controller = this.pluginManager.controller(editor)
    if (!controller) {
      return
    }
    controller.tooltips.hide(type, source)
  }
}
