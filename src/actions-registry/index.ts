import { TextEditor, Range, CompositeDisposable } from 'atom'
import { PluginManager } from '../plugin-manager'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType
import { PriorityRegistry } from '../priority-registry'
import { selectAction } from './select-action'

export class ActionRegistry extends PriorityRegistry<UPI.Action[]> {
  protected disposables = new CompositeDisposable()
  constructor(private readonly pluginManager: PluginManager) {
    super()
    this.disposables.add(
      atom.commands.add('atom-text-editor.ide-haskell', {
        'ide-haskell:show-actions': async ({ currentTarget }) => {
          const editor = currentTarget.getModel()
          const act = await this.pluginManager.actionRegistry.getActions(
            editor,
            TEventRangeType.context, // context is used to force value even on empty range
            editor.getSelectedBufferRange(),
          )
          if (act && act.length) {
            const choice = await selectAction(act)
            if (choice) await choice.apply()
          }
        },
      }),
    )
  }

  public dispose() {
    super.dispose()
    this.disposables.dispose()
  }

  public async getActions(
    editor: TextEditor,
    type: TEventRangeType,
    crange: Range,
  ) {
    for (const { pluginName, handler, eventTypes } of this.providers) {
      if (!eventTypes.includes(type)) {
        continue
      }
      const awaiter = this.pluginManager.getAwaiter(pluginName)
      const actions = await awaiter(() => handler(editor, crange, type))
      if (actions === undefined) continue
      if (!actions.length) continue
      return actions
    }
    return undefined
  }
}
