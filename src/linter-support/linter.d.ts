import {Range} from 'atom'

interface Fix {
  range: Range,
  newText: string,
  oldText?: string
}

interface Trace {
  type: 'Trace',
  text?: string,
  html?: string,
  name?: string,
  // ^ Only specify this if you want the name to be something other than your linterProvider.name
  // WARNING: There is NO replacement for this in v2
  filePath?: string,
  // ^ MUST be an absolute path (relative paths are not supported)
  range?: Range,
  class?: string,
  severity?: 'error' | 'warning' | 'info'
}

interface ILinterMessage {
  // Automatically added for internal Linter use, do not specify in a provider
  // key: string,
  // version: 1,
  // linterName: string,

  // From providers
  type: string,
  text?: string,
  html?: string,
  name?: string,
  // ^ Only specify this if you want the name to be something other than your linterProvider.name
  // WARNING: There is NO replacement for this in v2
  filePath?: string,
  // ^ MUST be an absolute path (relative paths are not supported)
  range?: Range,
  trace?: Array<Trace>,
  fix?: Fix,
  severity?: 'error' | 'warning' | 'info',
  selected?: Function
  // ^ WARNING: There is NO replacement for this in v2
}

export interface ILinter {
  deleteMessages (): void
  setMessages (messages: ILinterMessage[]): void
  dispose (): void
}
