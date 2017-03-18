import {runFilter} from './util-run-filter'

export async function format (text: string, workingDirectory: string) {
  return runFilter({
    command: atom.config.get('ide-haskell.stylishHaskellPath'),
    args: atom.config.get('ide-haskell.stylishHaskellArguments'),
    cwd: workingDirectory,
    stdin: text
  })
}
