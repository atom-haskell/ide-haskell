{BufferedProcess} = require 'atom'
path = require 'path'
Temp = require 'temp'
FS = require 'fs'

withTempFile = (contents, callback) ->
  Temp.open
    prefix:'haskell-ghc-mod',
    suffix:'.hs',
    (err, info) ->
      if err
        console.log(err)
        return
      FS.writeSync info.fd, contents
      callback info.path, ->
        FS.close info.fd, -> FS.unlink info.path

# run cabal format
prettify = (text, workingDirectory, {onComplete, onFailure}) ->
  shpath = atom.config.get('ide-haskell.cabalPath')

  withTempFile text, (path, close) ->
    proc = new BufferedProcess
      command: shpath
      args: ['format', path]
      options:
        cwd: workingDirectory
      exit: ->
        FS.readFile path, encoding: 'utf-8', (error, text) ->
          if error?
            atom.notifications.addError "Ide-haskell could not read #{path}",
              detail: "#{error}"
            console.error error
            onFailure?()
          else
            onComplete?(text)

    proc.onWillThrowError ({error, handle}) ->
      atom.notifications.addError "Ide-haskell could not spawn #{shpath}",
        detail: "#{error}"
      console.error error
      close()
      onFailure?()
      handle()

module.exports = {
  prettify
}
