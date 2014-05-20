{BufferedProcess} = require 'atom'
ResultType = require './constants'
path = require 'path'

module.exports =
  class BackendGhcMod
    constructor: ->

    check: ({onResult, onComplete, fileName}) ->
      @run
        cmd: 'check'
        args: [fileName]
        cwd: atom.project.getRootDirectory().getPath()
        onMessage: (line) =>
          if matches = /([^:]+):(\d+):(\d+):((?:Warning: )?)(.*)/.exec(line)
            [_, fname, line, col, warning, content] = matches
            type =
              if warning.length
                ResultType.Warning
              else
                ResultType.Error
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

    lint: ({onResult, onComplete, fileName}) ->
      @run
        cmd: 'lint'
        args: [fileName]
        cwd: atom.project.getRootDirectory().getPath()
        onMessage: (line) =>
          if matches = /([^:]+):(\d+):(\d+):\s([^:]+):\s(.*)/.exec(line)
            [_, fname, line, col, type, content] = matches
            pos = [parseInt(line, 10), parseInt(col, 10)]
            details = content.split('\0').filter((l)-> 0 != l.length)
            onResult
              line: pos[0]
              column: pos[1]
              fname: fname
              type: ResultType.Lint
              details: details
          else
            console.warn "got something strange from ghc-mod lint:", [line]
        onComplete: onComplete

    type: ({onResult, fileName, point}) ->
      resultViewed = false
      @run
        cmd: 'type'
        args: [fileName, 'DummyModule', point.row + 1, point.column + 1]
        cwd: atom.project.getRootDirectory().getPath()
        onMessage: (line) =>
          return if resultViewed is true
          if matches = /(\d+)\s(\d+)\s(\d+)\s(\d+)\s\"([^\"]+)/.exec(line)
            [_, sr, sc, er, ec, type] = matches
            spos = [parseInt(sr, 10), parseInt(sc, 10)]
            epos = [parseInt(er, 10), parseInt(ec, 10)]
            onResult
              startPos: spos
              endPos: epos
              type: type
          else
            console.warn "got something strange from ghc-mod type:", [line]
          resultViewed = true

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
