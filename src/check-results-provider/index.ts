import {
  Range, TextEditor, CompositeDisposable
} from 'atom'

import {TEventRangeType} from '../editor-control/tooltip-manager'
import {PluginManager} from '../plugin-manager'
import {CREditorControl} from './editor-control'

export class CheckResultsProvider {
  private disposables: CompositeDisposable
  private editorMap: WeakMap<TextEditor, CREditorControl>
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    const tooltipRegistry = pluginManager.tooltipRegistry

    this.editorMap = new WeakMap()
    this.disposables = new CompositeDisposable()
    this.disposables.add(tooltipRegistry.register('builtin:check-results', {
      priority: 1000,
      handler: this.tooltipProvider.bind(this)
    }))
    pluginManager.addEditorController(CREditorControl, this.editorMap)
  }

  public destroy () {
    this.disposables.dispose()
  }

  private tooltipProvider (editor: TextEditor, crange: Range, type: TEventRangeType) {
    const controller = this.editorMap.get(editor)
    if (!controller) { return }
    const msg = controller.getMessageAt(crange.start, type)
    if (msg.length > 0) {
      return { range: crange, text: msg }
    }
  }
}
