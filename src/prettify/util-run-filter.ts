import * as CP from 'child_process'

export interface IRunFilterArgs {
    command: string
    args: string[]
    cwd: string
    stdin?: string
}

export async function runFilter ({command, args, cwd, stdin}: IRunFilterArgs) {
  return new Promise((resolve, reject) => {
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
          if (stderr.length > 0) {
              reject()
          } else {
              reject(error)
          }
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
