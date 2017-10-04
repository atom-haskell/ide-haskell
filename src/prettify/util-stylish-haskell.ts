import { runFilter } from './util-run-filter'

export async function format(text: string, workingDirectory: string, scope: AtomTypes.ScopeDescriptor) {
  return runFilter({
    command: atom.config.get('ide-haskell.stylishHaskellPath', {scope}),
    args: atom.config.get('ide-haskell.stylishHaskellArguments', {scope}),
    cwd: workingDirectory,
    stdin: text,
  })
}
