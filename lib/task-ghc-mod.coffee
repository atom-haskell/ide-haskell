{BufferedProcess} = require 'atom'
path              = require 'path'

getGhcModPath = ->
  return atom.config.get('ide-haskell.ghcModPath')

module.exports =
  class TaskGhcMod
    constructor: ->

    check: ({onResult, fileName})->
      @run
        cmd: 'check'
        args: [fileName]
        cwd: path.dirname(fileName)
        onMessage: (line) =>
          if matches = /([^:]+):(\d+):(\d+):((?:Warning: )?)(.*)/.exec(line)
            [_, fname, line, col, warning, content] = matches
            type = if warning.length then 'Warning' else 'Error'
            pos = [parseInt(line, 10), parseInt(col, 10)]
            content = content.split('\0').filter((l)-> 0 != l.length)
            onResult {type, fname, pos, content}
          else
            console.warn "got something strange from ghc-mod check:", [line]

    getType: ({onResult, fileName, pos}) ->
      @run
        cmd: 'type'
        args: [fileName, 'DummyModule', pos[0] + 1, pos[1] + 1]
        cwd: path.dirname(fileName)
        onMessage: (line) =>
          if matches = /(\d+) (\d+) (\d+) (\d+) "([^"]+)"/.exec(line)
              [_, startLine, startCol, endLine, endCol, type] = matches
              onResult
                type: type
                startPos: [parseInt(startLine, 10), parseInt(startCol, 10)]
                endPos: [parseInt(endLine, 10), parseInt(endCol, 10)]
          else
              console.warn "got something strange from ghc-mod type:", [line]

    lint: ->

    # run ghc-mod proecess with parameters
    run: ({onMessage, onComplete, cmd, args, cwd}) ->
      options = if cwd then { cwd: cwd } else {}

      cmdArgs = args.slice(0)
      cmdArgs.unshift(cmd)

      proc = new BufferedProcess
        command: getGhcModPath()
        args: cmdArgs
        options: options
        stdout: (line) => @stdout(onMessage, line)
        stderr: (line) => @stdout(onMessage, line)
        exit: => @exit(onComplete)

    stdout: (onMessage, line) ->
      line.split('\n').filter((l)->0 != l.length).map onMessage

    exit: (onComplete) ->
      onComplete?()
