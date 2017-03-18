'use babel'

import runFilter from './util-run-filter'

export default function (text: string, workingDirectory: string) {
  return runFilter({
    command: atom.config.get('ide-haskell.stylishHaskellPath'),
    args: atom.config.get('ide-haskell.stylishHaskellArguments'),
    cwd: workingDirectory,
    stdin: text
  })
}