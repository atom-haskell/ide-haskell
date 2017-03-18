'use babel'

import * as FS from 'fs'
import * as Temp from 'temp'
import {runFilter} from './util-run-filter'

async function makeTempFile (contents: string) {
  return new Promise<Temp.OpenFile>((resolve, reject) => {
    Temp.open(
      {prefix: 'ide-haskell', suffix: '.cabal'},
      (err, info) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        FS.writeSync(info.fd, contents)
        resolve(info)
      })
  })
}

async function read (path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    FS.readFile(path, {encoding: 'utf-8'}, (error, text) => {
      if (error) {
        console.error(error)
        reject(error)
      } else { resolve(text) }
    })
  })
}

export async function format (text: string, workingDirectory: string): Promise<string> {
  const {path, fd} = await makeTempFile(text)
  try {
    await runFilter({
      command: atom.config.get('ide-haskell.cabalPath'),
      args: ['format', path],
      cwd: workingDirectory
    })
    return read(path)
  } finally {
    FS.close(fd)
    FS.unlink(path)
  }
}
