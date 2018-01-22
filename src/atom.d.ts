export {}
declare module 'atom' {
  interface CommandRegistryTargetMap {
    'atom-text-editor.ide-haskell': TextEditorElement
    'atom-text-editor.ide-haskell--has-tooltips': TextEditorElement
  }
  interface TextEditor {
    getLastCursor(): Cursor | undefined // TODO: Upstream to DT
  }
}
