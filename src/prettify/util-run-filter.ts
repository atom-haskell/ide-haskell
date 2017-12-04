import * as CP from 'child_process'

export interface IRunFilterArgs {
  command: string
  args: string[]
  cwd: string
  stdin?: string
}

export async function runFilter({ command, args, cwd, stdin }: IRunFilterArgs) {
  return new Promise<{stdout: string, stderr: string}>((resolve, reject) => {
    try {
      const proc = CP.execFile(command, args, { cwd }, (error, stdout, stderr) => {
        if (!error) {
          resolve({ stdout, stderr })
        } else {
          reject({ error, stderr })
        }
      })
      if (stdin) {
        proc.stdin.write(stdin)
        proc.stdin.end()
      }
    } catch (error) {
     // tslint:disable-next-line:no-console
      console.error(error)
      reject(error)
    }
  })
}
