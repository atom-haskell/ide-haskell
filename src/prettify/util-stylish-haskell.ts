import { runFilter } from './util-run-filter'
import * as AtomTypes from 'atom'

export async function format(
  text: string,
  workingDirectory: string,
  scope: AtomTypes.ScopeDescriptor,
) {
  const command = atom.config.get('ide-haskell.stylishHaskellPath', { scope })
  const args = atom.config.get('ide-haskell.stylishHaskellArguments', { scope })
  return runFilter({
    command,
    args,
    cwd: workingDirectory,
    stdin: text,
  })
}
