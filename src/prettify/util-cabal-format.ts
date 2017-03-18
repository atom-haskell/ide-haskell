'use babel'

import * as FS from 'fs'
import * as Temp from 'temp'
import runFilter from './util-run-filter'

function makeTempFile (contents: string) {
  return new Promise<Temp.OpenFile>((resolve, reject) => {
    Temp.open({prefix: 'ide-haskell', suffix: '.cabal'},
      (err, info) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        FS.writeSync(info.fd, contents)
        resolve(info)
      })
  })
}

function read (path: string) {
  return new Promise((resolve, reject) => {
    FS.readFile(path, {encoding: 'utf-8'}, (error, text) => {
      if (error) {
        console.error(error)
        reject(error)
      } else { resolve(text) }
    })
  })
}

export default async function (text: string, workingDirectory: string) {
  let {path, fd} = await makeTempFile(text)
  try {
    await runFilter({
      command: atom.config.get('ide-haskell.cabalPath'),
      args: ['format', path],
      cwd: workingDirectory
    })
    let contents = await read(path)
    return contents
  } finally {
    FS.close(fd)
    FS.unlink(path)
  }
}
