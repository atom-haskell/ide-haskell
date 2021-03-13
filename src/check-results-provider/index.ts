import { Range, TextEditor, CompositeDisposable, Panel } from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

import { PluginManager } from '../plugin-manager'
import { CREditorControl } from './editor-control'
import { ITooltipDataExt } from '../tooltip-registry'
import SelectListView from 'atom-select-list'

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
      atom.commands.add('atom-text-editor.ide-haskell', {
        'ide-haskell:show-actions': async ({ currentTarget }) => {
          const editor = currentTarget.getModel()
          const controller = this.pluginManager.controllerType<
            CREditorControl,
            typeof CREditorControl
          >(CREditorControl, editor)
          if (!controller) return
          const actions: UPI.Action[] = []
          for await (const a of controller.getActionAt(
            editor.getCursorBufferPosition(),
            TEventRangeType.keyboard,
          )) {
            actions.push(a)
          }
          let panel: Panel | undefined
          try {
            const choice = await new Promise<UPI.Action | undefined>(
              (resolve) => {
                const select = new SelectListView({
                  items: actions,
                  infoMessage: 'Actions',
                  itemsClassList: ['ide-haskell', 'mark-active'],
                  elementForItem: (x) => {
                    const el = document.createElement('li')
                    el.innerText = x.title
                    return el
                  },
                  filterKeyForItem: (x) => x.title,
                  didCancelSelection: () => {
                    resolve(undefined)
                  },
                  didConfirmSelection: (item) => {
                    resolve(item)
                  },
                })
                select.element.classList.add('ide-haskell')
                panel = atom.workspace.addModalPanel({
                  item: select,
                  visible: true,
                })
                select.focus()
              },
            )
            if (choice) await choice.apply()
          } finally {
            if (panel) panel.destroy()
          }
        },
      }),
    )
  }

  public destroy() {
    this.disposables.dispose()
  }

  private tooltipProvider = (
    editor: TextEditor,
    crange: Range,
    type: TEventRangeType,
  ): ITooltipDataExt | undefined => {
    const controller = this.pluginManager.controllerType<
      CREditorControl,
      typeof CREditorControl
    >(CREditorControl, editor)
    if (!controller) {
      return undefined
    }
    if (
      type === TEventRangeType.keyboard &&
      atom.config.get('ide-haskell.onCursorMove', {
        scope: editor.getRootScopeDescriptor(),
      }) !== 'Show Tooltip'
    ) {
      return undefined
    }
    const msg = Array.from(controller.getMessageAt(crange.start, type))
    if (msg.length > 0) {
      return { range: crange, text: msg }
    }
    return undefined
  }
}
