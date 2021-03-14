import { CompositeDisposable, TextEditor } from 'atom'
import * as UPI from 'atom-haskell-upi'
import TEventRangeType = UPI.TEventRangeType

import { PluginManager } from '../plugin-manager'
import { CREditorControl } from '../check-results-provider/editor-control'
import { selectAction } from './select-action'
import { renderActions } from './render-actions'

export class ActionsProvider {
  private disposables: CompositeDisposable
  constructor(private pluginManager: PluginManager) {
    this.disposables = new CompositeDisposable()
    this.disposables.add(
      atom.commands.add('atom-text-editor.ide-haskell', {
        'ide-haskell:show-actions': async ({ currentTarget }) => {
          const editor = currentTarget.getModel()
          const controller = this.pluginManager.controllerType(
            CREditorControl,
            editor,
          )
          if (!controller) return
          let actions = await controller.getActionAt(
            editor.getCursorBufferPosition(),
            TEventRangeType.keyboard,
          )
          if (!actions.length) {
            const act = await this.pluginManager.tooltipRegistry.getActions(
              editor,
              TEventRangeType.context,
              editor.getSelectedBufferRange(),
            )
            if (act) actions = act
          }
          if (actions.length) {
            const choice = await selectAction(actions)
            if (choice) await choice.apply()
          }
        },
      }),
    )
  }

  public async renderActions(
    editor: TextEditor,
    actions: (() => Promise<UPI.Action[] | undefined>) | undefined,
  ) {
    return renderActions(editor, actions)
  }

  public dispose() {
    this.disposables.dispose()
  }
}
