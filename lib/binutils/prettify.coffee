{getRootDir} = require 'atom-haskell-utils'
utilStylishHaskell = require './util-stylish-haskell'
utilCabalFormat = require './util-cabal-format'

module.exports = Prettify =
  prettifyFile: (editor, format = 'haskell') ->
    [firstCursor, cursors...] = editor.getCursors().map (cursor) ->
      cursor.getBufferPosition()
    util = switch format
      when 'haskell' then utilStylishHaskell
      when 'cabal' then utilCabalFormat
      else throw new Error "Unknown format #{format}"
    workDir = getRootDir(editor.getBuffer()).getPath()
    util.prettify editor.getText(), workDir,
      onComplete: (text) ->
        editor.setText(text)
        if editor.getLastCursor()?
          editor.getLastCursor().setBufferPosition firstCursor,
            autoscroll: false
          cursors.forEach (cursor) ->
            editor.addCursorAtBufferPosition cursor,
              autoscroll: false
      onFailure: ({message, detail}) ->
        atom.notifications.addError message, {detail}
