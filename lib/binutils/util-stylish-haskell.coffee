{BufferedProcess} = require 'atom'
path = require 'path'


# run stylish-haskell backend
prettify = (text, workingDirectory, {onComplete, onFailure}) ->

  lines = []

  shpath = atom.config.get('ide-haskell.stylishHaskellPath')

  proc = new BufferedProcess
    command: shpath
    args: []
    options:
      cwd: workingDirectory
    stdout: (line) ->
      lines.push(line)
    exit: -> onComplete?(lines.join(''))

  proc.onWillThrowError ({error, handle}) ->
    atom.notifications.addError "Ide-haskell could not spawn #{shpath}",
      detail: "#{error}"
    console.error error
    onFailure?()
    handle()

  proc.process.stdin.write(text)
  proc.process.stdin.end()

module.exports = {
  prettify
}
