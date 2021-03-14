import { TextEditor, Range, RangeCompatible } from 'atom'
import { MessageObject } from '../utils'
import { PluginManager } from '../plugin-manager'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType
import { PriorityRegistry } from '../priority-registry'

export interface ITooltipDataExt {
  range: RangeCompatible
  text: UPI.TSingleOrArray<UPI.TMessage | MessageObject>
  persistent?: boolean
}

export class TooltipRegistry extends PriorityRegistry<ITooltipDataExt> {
  constructor(private readonly pluginManager: PluginManager) {
    super()
  }

  public async defaultTooltipFunction(
    editor: TextEditor,
    type: TEventRangeType,
    crange: Range,
  ) {
    for (const { pluginName, handler, eventTypes } of this.providers) {
      if (!eventTypes.includes(type)) {
        continue
      }
      const awaiter = this.pluginManager.getAwaiter(pluginName)
      const tooltipData = await awaiter(() => handler(editor, crange, type))
      if (tooltipData === undefined) continue
      return { pluginName, tooltipData }
    }
    return undefined
  }
}
