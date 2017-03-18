import {Disposable, TextEditor, Range} from 'atom'
import {PluginManager} from '../../plugin-manager'
import {UPI} from '../'
import {UPIInstance} from './'
import {TEventRangeType} from '../../editor-control'
import {TPosition} from '../../results-db'
import {TMessage} from '../../utils'

interface IShowTooltipParams {
  editor: TextEditor
  pos: TPosition
  eventType?: TEventRangeType
  detail?: any
  tooltip: TTooltipFunction
}
type TTooltipFunction = (crange: Range) => ITooltipData | Promise<ITooltipData>
interface ITooltipData {
  range: Range
  text: TMessage
  persistOnCursorMove?: boolean
}
export type TTooltipHandler =
  (editor: TextEditor, crange: Range, type: TEventRangeType) => ITooltipData | Promise<ITooltipData>

export interface IMainInterface {
  /**
  Show tooltip in editor.

  editor: editor that will show tooltip
  pos: tooltip position
  eventType: one of 'context', 'keyboard' and 'mouse'
  detail: for automatic selection between 'context' and 'keyboard'.
          Ignored if 'eventType' is set.
  tooltip: function(crange)
    crange: Range, currently selected range in editor (possibly empty)

    Returns {range, text} or Promise
      range: Range, tooltip highlighting range
      persistOnCursorMove: Boolean, optional, default false, persist on cursor move regardless of settings
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip
  */
  show (params: IShowTooltipParams): void

  /**
  Editor event subscription. Fires when mouse cursor stopped over a symbol in
  editor.

  priority: event priority, higher value means higher priority,
            subscription with hightest priority will be called first.
  callback: callback(editor, crange, type)
    editor: TextEditor, editor that generated event
    crange: Range, cursor range that generated event.
    type: One of 'mouse', 'selection' -- type of event that triggered this

    Returns {range, text} or Promise.
      range: Range, tooltip highlighting range
      text: tooltip text. String or {text, highlighter} or {html}
        text: tooltip text
        highlighter: grammar scope that will be used to highlight tooltip text
        html: html to be displayed in tooltip

  returns Disposable
  */
  onShouldShowTooltip (priority: number, handler: TTooltipHandler): Disposable
  onShouldShowTooltip (handler: TTooltipHandler): Disposable
}

export function create (pluginManager: PluginManager, main: UPI, instance: UPIInstance): IMainInterface {
  return {
    // TODO: merge this to UPI
    show ({editor, pos, eventType, detail, tooltip}) {
      const controller = pluginManager.controller(editor)
      if (!controller) { return }
      main.withEventRange({controller, pos, detail, eventType}, ({crange, pos: evpos, eventType: newEventType}) => {
        Promise.resolve(tooltip(crange)).then(({range, text, persistOnCursorMove}) =>
          controller.showTooltip(
            evpos, range, text,
            {eventType: newEventType, subtype: 'external', persistOnCursorMove}
          )
        )
        .catch((status = {status: 'warning'}) => {
          if (status.message) {
            console.warn(status)
            status = {status: 'warning'}
          }
          if (!status.ignore) {
            controller.hideTooltip({newEventType})
            instance.messages.status(status)
          }
        })
      })
    },
    onShouldShowTooltip (...args: any[]) {
      if (args.length < 2) {
        args.unshift(100)
      }
      const [priority, handler] = args
      const obj = {priority, handler}
      instance.tooltipEvents.add(obj)
      return new Disposable(() => instance.tooltipEvents.delete(obj))
    }
  }
}
