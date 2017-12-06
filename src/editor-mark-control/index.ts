import { TextEditor } from 'atom'

import { IEditorController } from '../plugin-manager'

export class EditorMarkControl implements IEditorController {
  private editorElement: HTMLElement
  constructor(private editor: TextEditor) {
    this.editorElement = atom.views.getView(this.editor) as any
    this.editorElement.classList.add('ide-haskell')
  }

  public static supportsGrammar(grammar: string): boolean {
    return [
      'source.c2hs',
      'source.cabal',
      'source.hsc2hs',
      'source.haskell',
      'text.tex.latex.haskell',
      'source.hsig',
    ].includes(grammar)
  }

  public destroy() {
    this.editorElement.classList.remove('ide-haskell')
  }
}
