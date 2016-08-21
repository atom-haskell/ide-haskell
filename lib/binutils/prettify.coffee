module.exports = Prettify =
  prettifyFile: (editor, format = 'haskell') ->
    [firstCursor, cursors...] = editor.getCursors().map (cursor) ->
      cursor.getBufferPosition()
    prettify = switch format
      when 'haskell' then require './util-stylish-haskell'
      when 'cabal' then require './util-cabal-format'
      else throw new Error "Unknown format #{format}"
    {getRootDir} = require 'atom-haskell-utils'
    workDir = getRootDir(editor.getBuffer()).getPath()
    prettify editor.getText(), workDir,
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
