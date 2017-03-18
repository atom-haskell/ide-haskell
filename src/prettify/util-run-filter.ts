'use babel'

import {BufferedProcess} from 'atom'
import * as CP from 'child_process'

interface IRunFilterArgs {
    command: string
    args: string[]
    cwd: string
    stdin?: string
}

export default function ({command, args, cwd, stdin}: IRunFilterArgs) {
  return new Promise((resolve, reject) => {
    let lines: string[] = []
    let stderr: string[] = []
    try {
      const proc = CP.execFile(command, args, {cwd}, (error, stdout, stderr) => {
        if (stderr.length > 0) {
          atom.notifications.addError('Prettifier problems', {
            message: 'Prettifier reported some problems',
            detail: stderr,
            dismissable: true
          })
        }
        if (!error) {
          resolve(stdout)
        } else {
          reject(error)
        }
      })
      if (stdin) {
        proc.stdin.write(stdin)
        proc.stdin.end()
      }
    } catch (error) {
     console.error(error)
     reject(error)
    }
  })
}
