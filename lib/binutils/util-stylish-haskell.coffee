module.exports =
prettify = (text, workingDirectory, {onComplete, onFailure}) ->

  lines = []

  shpath = atom.config.get('ide-haskell.stylishHaskellPath')

  {BufferedProcess} = require 'atom'
  proc = new BufferedProcess
    command: shpath
    args: atom.config.get('ide-haskell.stylishHaskellArguments')
    options:
      cwd: workingDirectory
    stdout: (line) ->
      lines.push(line)
    exit: (code) ->
      if code is 0
        onComplete?(lines.join(''))
      else
        onFailure? {
          message: "Failed to prettify"
          detail: "Prettifier exited with non-zero exit status #{code}"
        }

  proc.onWillThrowError ({error, handle}) ->
    console.error error
    onFailure? {message: "Ide-haskell could not spawn #{shpath}", detail: "#{error}"}
    handle()

  proc.process.stdin.write(text)
  proc.process.stdin.end()
