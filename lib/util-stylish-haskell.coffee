{BufferedProcess} = require 'atom'
path = require 'path'


# run stylish-haskell backend
run = ({onComplete, onFailure, args}) ->

  proc = new BufferedProcess
    command: atom.config.get('ide-haskell.stylishHaskellPath')
    args: args
    exit: -> onComplete?()

  # on error hack (from http://discuss.atom.io/t/catching-exceptions-when-using-bufferedprocess/6407)
  proc.process.on 'error', (node_error) ->
    # TODO this error should be in output view log tab
    console.error "stylish-haskell utility not found at #{atom.config.get('ide-haskell.stylishHaskellPath')}, please run 'cabal install stylish-haskell'"
    onFailure?()


# ghc-mod check
prettify = ({fileName, onComplete, onFailure, onDone}) ->
  run
    args: ['-i', fileName]
    onComplete: ->
      onComplete?()
      onDone()
    onFailure: ->
      onFailure?()
      onDone(false)


module.exports = {
  prettify
}
