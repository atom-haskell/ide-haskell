import {
  TextEditor, CompositeDisposable,
} from 'atom'
import { PluginManager } from '../plugin-manager'
import { prettifyFile } from './index'

export class PrettifyEditorController {
  private disposables = new CompositeDisposable()
  private isPretty: boolean = false
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    const buffer = this.editor.getBuffer()
    this.disposables.add(
      buffer.onWillSave(this.prettify.bind(this)),
    )
  }

  public static supportsGrammar (grammar: string): boolean {
    return grammar.includes('haskell') || grammar.includes('cabal')
  }

  public destroy () {
    this.disposables.dispose()
  }

  private async prettify () {
    if (atom.config.get('ide-haskell.onSavePrettify')) {
      if (this.isPretty) { return }
      this.isPretty = true
      try {
        const scope = this.editor.getGrammar().scopeName
        if (scope.includes('haskell')) {
          await prettifyFile(this.editor, 'haskell')
        } else if (scope.includes('cabal')) {
          await prettifyFile(this.editor, 'cabal')
        }
        await this.editor.getBuffer().save()
      } finally {
        this.isPretty = false
      }
    }
  }
}
