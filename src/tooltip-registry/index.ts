import {TextEditor, Disposable, Range} from 'atom'
import {TMessage, MessageObject} from '../utils'
import {PluginManager} from '../plugin-manager'
import {TEventRangeType} from '../editor-control/tooltip-manager'
import {TPosition} from '../results-db'

export type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>
export type TRange = Range | [TPosition, TPosition]
export interface ITooltipData {
  range: TRange
  text: TMessage | TMessage[]
  persistOnCursorMove?: boolean
}
export type TTooltipHandler =
  (editor: TextEditor, crange: Range, type: TEventRangeType)
  => ITooltipData | undefined | Promise<ITooltipData | undefined>

export interface TTooltipHandlerSpec {
  priority: number
  handler: TTooltipHandler
  eventTypes?: TEventRangeType[]
}
export type TTooltipSpec = {pluginName: string, tooltip: TTooltipFunction | ITooltipData}

export class TooltipRegistry {
  private providers: Array<TTooltipHandlerSpec & {pluginName: string, eventTypes: TEventRangeType[]}>
  constructor (private pluginManager: PluginManager) {
    this.providers = []
  }

  public dispose () {
    this.providers = []
  }

  public register (pluginName: string, provider: TTooltipHandlerSpec): Disposable {
    const idx = this.providers.findIndex(({priority}) => priority < provider.priority)
    const defaultEvT: TEventRangeType[] = ['selection', 'mouse']
    const record = {
      pluginName,
      eventTypes: provider.eventTypes || defaultEvT,
      priority: provider.priority,
      handler: provider.handler
    }
    if (idx === -1) {
      this.providers.push(record)
    } else {
      this.providers.splice(idx, 0, record)
    }
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
    if (spec && typeof spec.tooltip !== 'function') {
      tooltipData = spec.tooltip
      pluginName = spec.pluginName
    } else {
      const eventRange = controller.getEventRange(type)
      if (!eventRange) { return }
      if (spec && typeof spec.tooltip === 'function') {
        pluginName = spec.pluginName
        tooltipData = await Promise.resolve(spec.tooltip(eventRange.crange))
      } else {
        const tooltip = await this.defaultTooltipFunction(editor, type, eventRange.crange)
        if (!tooltip) {
          // if nobody wants to show anything, might as well hide...
          // TODO: this doesn't seem like a particularly bright idea?
          controller.tooltips.hide(type)
          return
        }
        ({pluginName, tooltipData} = tooltip)
      }
      const newEventRange = controller.getEventRange(type)
      if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) { return }
    }
    const {persistOnCursorMove = false} = tooltipData
    let msg
    if (Array.isArray(tooltipData.text)) {
      msg = tooltipData.text.map(MessageObject.fromObject.bind(MessageObject))
    } else {
      msg = MessageObject.fromObject(tooltipData.text)
    }
    controller.tooltips.show(
      Range.fromObject(tooltipData.range), msg, type, pluginName, {persistOnCursorMove}
    )
  }

  public hideTooltip (editor: TextEditor, type?: TEventRangeType, source?: string) {
    const controller = this.pluginManager.controller(editor)
    if (!controller) { return }
    controller.tooltips.hide(type, source)
  }

  private async defaultTooltipFunction (editor: TextEditor, type: TEventRangeType, crange: Range) {
    for (const {pluginName, handler, eventTypes} of this.providers) {
      if (!eventTypes.includes(type)) { continue }
      try {
        const tooltipData = await Promise.resolve(handler(editor, crange, type))
        if (!tooltipData) {
          continue
        }
        return {pluginName, tooltipData}
      } catch (e) {
        this.pluginManager.outputPanel.backendStatus(pluginName, e)
        continue
      }
    }
  }
}
