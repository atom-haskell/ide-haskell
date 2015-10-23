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
    try
      workDir = dirname(editor.getPath())
      if not statSync(workDir).isDirectory()
        workDir = '.'
    catch
      workDir = '.'
    util.prettify editor.getText(), workDir,
      onComplete: (text) ->
        editor.setText(text)
        if editor.getLastCursor()?
          editor.getLastCursor().setBufferPosition firstCursor,
            autoscroll: false
          cursors.forEach (cursor) ->
            editor.addCursorAtBufferPosition cursor,
              autoscroll: false
