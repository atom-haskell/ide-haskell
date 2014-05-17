{BufferedProcess} = require 'atom'
ResultView = require './result-view'
path = require 'path'

module.exports =
  class BackendGhcMod
    constructor: ->

    check: ({onResult, onComplete, fileName})->
      @run
        cmd: 'check'
        args: [fileName]
        cwd: atom.project.getRootDirectory().getPath()
        onMessage: (line) =>
          if matches = /([^:]+):(\d+):(\d+):((?:Warning: )?)(.*)/.exec(line)
            [_, fname, line, col, warning, content] = matches
            type = if warning.length then ResultView.MessageType.Warning else ResultView.MessageType.Error
            pos = [parseInt(line, 10), parseInt(col, 10)]
            details = content.split('\0').filter((l)-> 0 != l.length)
            onResult
              line: pos[0]
              column: pos[1]
              fname: fname
              type: type
              details: details
          else
            console.warn "got something strange from ghc-mod check:", [line]
        onComplete: onComplete

    # run ghc-mod proecess with parameters
    run: ({onMessage, onComplete, cmd, args, cwd}) ->
      options = if cwd then { cwd: cwd } else {}

      cmdArgs = args.slice(0)
      cmdArgs.unshift(cmd)

      proc = new BufferedProcess
        command: atom.config.get('ide-haskell.ghcModPath')
        args: cmdArgs
        options: options
        stdout: (line) => @stdout(onMessage, line)
        stderr: (line) => @stdout(onMessage, line)
        exit: => @exit(onComplete)

    stdout: (onMessage, line) ->
      line.split('\n').filter((l)->0 != l.length).map onMessage

    exit: (onComplete) ->
      onComplete?()
