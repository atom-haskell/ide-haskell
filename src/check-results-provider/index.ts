import {
  Range, TextEditor, CompositeDisposable,
} from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

import { PluginManager } from '../plugin-manager'
import { CREditorControl } from './editor-control'
import { ITooltipDataExt } from '../tooltip-registry'

export class CheckResultsProvider {
  private disposables: CompositeDisposable
  constructor(private pluginManager: PluginManager) {
    const tooltipRegistry = pluginManager.tooltipRegistry

    this.disposables = new CompositeDisposable()
    this.disposables.add(
      tooltipRegistry.register('builtin:check-results', {
        priority: 1000,
        handler: this.tooltipProvider,
        eventTypes: [TEventRangeType.mouse, TEventRangeType.keyboard],
      }),
      pluginManager.addEditorController(CREditorControl),
    )
  }

  public destroy() {
    this.disposables.dispose()
  }

  private tooltipProvider = (editor: TextEditor, crange: Range, type: TEventRangeType): ITooltipDataExt | undefined => {
    const controller
      = this.pluginManager.controllerType<CREditorControl, typeof CREditorControl>(
        CREditorControl, editor,
      )
    if (!controller) { return undefined }
    if (type === TEventRangeType.keyboard
      && atom.config.get('ide-haskell.onCursorMove', { scope: editor.getRootScopeDescriptor() }) !== 'Show Tooltip') {
      return undefined
    }
    const msg = controller.getMessageAt(crange.start, type)
    if (msg.length > 0) {
      return { range: crange, text: msg }
    }
    return undefined
  }
}
