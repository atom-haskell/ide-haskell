'use babel'

export default function (text, workingDirectory, {onComplete, onFailure}) {
  let lines = []
  let stderr = []

  let shpath = atom.config.get('ide-haskell.stylishHaskellPath')

  let {BufferedProcess} = require('atom')
  let proc = new BufferedProcess({
    command: shpath,
    args: atom.config.get('ide-haskell.stylishHaskellArguments'),
    options:
      {cwd: workingDirectory},
    stdout: (line) => { lines.push(line) },
    stderr: (line) => { stderr.push(line) },
    exit: (code) => {
      if (stderr.length > 0) {
        atom.notifications.addError('Prettifier problems', {
          message: 'Prettifier reported some problems',
          detail: stderr.join('\n'),
          dismissable: true
        })
      }
      if (code === 0) {
        if (onComplete) onComplete(lines.join(''))
        else
          if (onFailure) {
            onFailure({
              message: 'Failed to prettify',
              detail: 'Prettifier exited with non-zero exit status #{code}'
            })
          }
      }
    }
  })

  proc.onWillThrowError(({error, handle}) => {
    console.error(error)
    if (onFailure) { onFailure({message: 'Ide-haskell could not spawn #{shpath}', detail: '#{error}'}) }
    handle()
  })

  proc.process.stdin.write(text)
  proc.process.stdin.end()
}
