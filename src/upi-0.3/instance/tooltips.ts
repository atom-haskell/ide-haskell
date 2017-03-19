import {Disposable, TextEditor, Point, CompositeDisposable} from 'atom'
import {PluginManager} from '../../plugin-manager'
import {TEventRangeType} from '../../editor-control/tooltip-manager'
import {TPosition} from '../../results-db'
import {getEventType} from '../../utils'
import {TTooltipFunction, TTooltipHandler} from '../../tooltip-registry'

export {TTooltipHandler}

interface IShowTooltipParams {
  editor: TextEditor
  pos: TPosition
  eventType?: TEventRangeType
  detail?: any
  tooltip: TTooltipFunction
}

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

export function create (
  pluginName: string, pluginManager: PluginManager, disposables: CompositeDisposable
): IMainInterface {
  return {
    show ({editor, pos, eventType, detail, tooltip}) {
      if (!eventType) {
        eventType = getEventType(detail)
      }
      pluginManager.tooltipRegistry.showTooltip(
        editor, eventType, Point.fromObject(pos), {pluginName, tooltip}
      )
    },
    onShouldShowTooltip (...args: any[]) {
      if (args.length < 2) {
        args.unshift(100)
      }
      const [priority, handler] = args
      const disp = pluginManager.tooltipRegistry.register(pluginName, {priority, handler})
      return disp
    }
  }
}
