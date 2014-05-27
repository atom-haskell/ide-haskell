{BufferedProcess} = require 'atom'
path = require 'path'

{ ResultType
, CheckResult
, TypeResult
} = require './util-data'


# run ghc-mod backend
run = ({onMessage, onComplete, cmd, args, cwd}) ->
  options = if cwd then { cwd: cwd } else {}

  cmdArgs = args.slice(0)
  cmdArgs.unshift(cmd)

  proc = new BufferedProcess
    command: atom.config.get('ide-haskell.ghcModPath')
    args: cmdArgs
    options: options
    stdout: (line) -> stdout(onMessage, line)
    stderr: (line) -> stdout(onMessage, line)
    exit: -> onComplete?()

stdout = (onMessage, line) ->
  line.split('\n').filter((l)->0 != l.length).map onMessage


# ghc-mod check
check = ({onPrepare, onResult, onComplete, fileName}) ->
  onPrepare [ResultType.Error, ResultType.Warning]
  run
    cmd: 'check'
    args: [fileName]
    cwd: atom.project.getRootDirectory().getPath()
    onMessage: (line) ->
      if matches = /([^:]+):(\d+):(\d+):((?:Warning: )?)(.*)/.exec(line)
        [_, uri, row, col, isWarning, content] = matches
        type =
          if isWarning.length
            ResultType.Warning
          else
            ResultType.Error
        pos = [parseInt(row, 10), parseInt(col, 10)]
        desc = content.split('\0').filter((l)-> 0 != l.length)
        onResult(
          new CheckResult(
            pos: pos
            uri: uri
            type: type
            desc: desc.join('\n')
          )
        )
      else
        console.warn "got something strange from ghc-mod check:", [line]
    onComplete: ->
      onComplete [ResultType.Error, ResultType.Warning]

# ghc-mod lint
lint = ({onPrepare, onResult, onComplete, fileName}) ->
  onPrepare [ResultType.Lint]
  run
    cmd: 'lint'
    args: [fileName]
    cwd: atom.project.getRootDirectory().getPath()
    onMessage: (line) ->
      if matches = /([^:]+):(\d+):(\d+):\s([^:]+):\s(.*)/.exec(line)
        [_, uri, row, col, type, content] = matches
        pos = [parseInt(row, 10), parseInt(col, 10)]
        desc = content.split('\0').filter((l)-> 0 != l.length)
        onResult(
          new CheckResult(
            pos: pos
            uri: uri
            type: ResultType.Lint
            desc: desc.join('\n')
          )
        )
      else
        console.warn "got something strange from ghc-mod lint:", [line]
    onComplete: ->
      onComplete [ResultType.Lint]

# ghc-mod type
type = ({onResult, fileName, pt}) ->
  resultViewed = false
  run
    cmd: 'type'
    args: [fileName, 'DummyModule', pt.row + 1, pt.column + 1]
    cwd: atom.project.getRootDirectory().getPath()
    onMessage: (line) =>
      return if resultViewed is true
      if matches = /(\d+)\s(\d+)\s(\d+)\s(\d+)\s\"([^\"]+)/.exec(line)
        [_, sr, sc, er, ec, type] = matches
        onResult(
          new TypeResult(
            type: type
          )
        )
      else
        console.warn "got something strange from ghc-mod type:", [line]
      resultViewed = true

module.exports = {
  check,
  lint,
  type
}
