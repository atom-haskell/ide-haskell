{BufferedProcess} = require 'atom'
path = require 'path'


# run stylish-haskell backend
prettify = (text, {onComplete, onFailure}) ->

  lines=[]

  proc = new BufferedProcess
    command: atom.config.get('ide-haskell.paths.stylishHaskell')
    args: []
    stdout: (line) ->
      lines.push(line)
    exit: -> onComplete?(lines.join(''))

  proc.onWillThrowError ({error, handle}) ->
    atom.notifications.addError "Ide-haskell could not spawn
      #{atom.config.get('ide-haskell.paths.stylishHaskell')}",
      detail: "#{error}"
    console.error error
    onFailure?()
    handle()

  proc.process.stdin.write(text)
  proc.process.stdin.end()

module.exports = {
  prettify
}
