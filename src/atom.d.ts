export {}
declare module 'atom' {
  interface ConfigValues {
    // unscoped
    'ide-haskell.messageDisplayFrontend': 'builtin' | 'linter'
    'ide-haskell.startupMessageIdeBackend': boolean
    'ide-haskell.panelPosition': 'bottom' | 'left' | 'right' | 'center'
    'ide-haskell.hideParameterValues': boolean
    'ide-haskell.autoHideOutput': boolean
    //scoped
    'ide-haskell.onSavePrettify': boolean
    'ide-haskell.onSavePrettifyFormats': {
      'source*c2hs': boolean
      'source*cabal': boolean
      'source*hsc2hs': boolean
      'source*haskell': boolean
      'text*tex*latex*haskell': boolean
      'source*hsig': boolean
    }
    'ide-haskell.switchTabOnCheck': boolean
    'ide-haskell.stylishHaskellPath': string
    'ide-haskell.stylishHaskellArguments': string[]
    'ide-haskell.cabalPath': string
    'ide-haskell.onCursorMove': 'Show Tooltip' | 'Hide Tooltip' | 'Nothing'
    'ide-haskell.expressionTypeInterval': number
  }
  interface CommandRegistryTargetMap {
    'atom-text-editor.ide-haskell': TextEditorElement
    'atom-text-editor.ide-haskell--has-tooltips': TextEditorElement
  }
}
