import {
  TextEditor, CompositeDisposable, TextBuffer
} from 'atom'
import {PluginManager} from '../plugin-manager'
import {prettifyFile} from './index'

export class PrettifyEditorController {
  public static supportsGrammar (grammar: string): boolean {
    return grammar.includes('haskell') || grammar.includes('cabal')
  }
  private disposables = new CompositeDisposable()
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    const buffer = this.editor.getBuffer()
    this.disposables.add(
      buffer.onWillSave(this.prettify.bind(this)),
    )
  }

  public destroy () {
    this.disposables.dispose()
  }

  private prettify () {
    if (atom.config.get('ide-haskell.onSavePrettify')) {
      const scope = this.editor.getGrammar().scopeName
      if (scope.includes('haskell')) {
        prettifyFile(this.editor, 'haskell')
      } else if (scope.includes('cabal')) {
        prettifyFile(this.editor, 'cabal')
      }
    }
  }
}
