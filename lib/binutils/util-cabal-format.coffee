FS = require 'fs'

withTempFile = (contents, callback) ->
  Temp = require 'temp'
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
module.exports =
prettify = (text, workingDirectory, {onComplete, onFailure}) ->
  shpath = atom.config.get('ide-haskell.cabalPath')

  withTempFile text, (path, close) ->
    {BufferedProcess} = require 'atom'
    proc = new BufferedProcess
      command: shpath
      args: ['format', path]
      options:
        cwd: workingDirectory
      exit: (code) ->
        if code is 0
          FS.readFile path, encoding: 'utf-8', (error, text) ->
            if error?
              console.error error
              onFailure? {
                message: "Ide-haskell could not read #{path}"
                detail: "#{error}"
              }
            else
              onComplete?(text)
        else
          onFailure? {
            message: "Failed to prettify"
            detail: "cabal format ended with non-zero exit code #{code}"
          }

    proc.onWillThrowError ({error, handle}) ->
      console.error error
      close()
      onFailure? {
        message: "Ide-haskell could not spawn #{shpath}",
        detail: "#{error}"
      }
      handle()
