import {
  TextEditor, CompositeDisposable,
} from 'atom'
import { PluginManager } from '../plugin-manager'
import { prettifyFile } from './index'
import { config } from '../config'

type SavePrettifyFormats = {[K in keyof typeof config.onSavePrettifyFormats.properties]: boolean}

export class PrettifyEditorController {
  private disposables = new CompositeDisposable()
  private isPretty: boolean = false
  constructor (private editor: TextEditor, pluginManager: PluginManager) {
    const buffer = this.editor.getBuffer()
    this.disposables.add(
      buffer.onWillSave(this.prettify),
    )
  }

  public static supportsGrammar (grammar: string): boolean {
    return [
      'source.c2hs',
      'source.cabal', // NOTE: special case
      'source.hsc2hs',
      'source.haskell',
      'text.tex.latex.haskell',
      'source.hsig',
    ].includes(grammar)
  }

  public destroy () {
    this.disposables.dispose()
  }

  private prettify = async () => {
    if (atom.config.get('ide-haskell.onSavePrettify', {scope: this.editor.getRootScopeDescriptor()})) {
      if (this.isPretty) { return }
      this.isPretty = true
      try {
        const format = this.editor.getGrammar().scopeName.replace(/\./g, '*')
        const enabled: SavePrettifyFormats = atom.config.get(
          'ide-haskell.onSavePrettifyFormats',
          {scope: this.editor.getRootScopeDescriptor()},
        )
        if (! enabled[format]) { return }
        await prettifyFile(this.editor)
        await this.editor.getBuffer().save()
      } finally {
        this.isPretty = false
      }
    }
  }
}
