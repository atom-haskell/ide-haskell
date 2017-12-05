import * as FS from 'fs'
import * as Temp from 'temp'
import { runFilter } from './util-run-filter'
import * as AtomTypes from 'atom'

async function makeTempFile(contents: string) {
  return new Promise<Temp.OpenFile>((resolve, reject) => {
    Temp.open(
      { prefix: 'ide-haskell', suffix: '.cabal' },
      (err, info) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.error(err)
          return reject(err)
        }
        FS.writeSync(info.fd, contents)
        resolve(info)
      })
  })
}

async function read(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    FS.readFile(path, { encoding: 'utf-8' }, (error, text) => {
      if (error) {
        // tslint:disable-next-line:no-console
        console.error(error)
        reject(error)
      } else { resolve(text) }
    })
  })
}

export async function format(text: string, workingDirectory: string, scope: AtomTypes.ScopeDescriptor) {
  const { path, fd } = await makeTempFile(text)
  try {
    const command = atom.config.get('ide-haskell.cabalPath', { scope })
    if (command === undefined) throw new Error("Couldn't get 'ide-haskell.cabalPath'")
    const { stderr } = await runFilter({
      command,
      args: ['format', path],
      cwd: workingDirectory,
    })
    return { stdout: await read(path), stderr }
  } finally {
    FS.close(fd, handleErr)
    FS.unlink(path, handleErr)
  }
}

function handleErr(err: NodeJS.ErrnoException): void {
  if (err) {
    atom.notifications.addError(err.name, { detail: err.message, dismissable: true })
  }
}
