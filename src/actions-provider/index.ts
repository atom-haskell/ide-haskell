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
          const actions = await controller.getActionAt(
            editor.getCursorBufferPosition(),
            TEventRangeType.keyboard,
          )
          const choice = await selectAction(actions)
          if (choice) await choice.apply()
        },
      }),
    )
  }

  public async renderActions(
    editor: TextEditor,
    actions: (() => Promise<UPI.Action[]>) | undefined,
  ) {
    return renderActions(editor, actions)
  }

  public dispose() {
    this.disposables.dispose()
  }
}
