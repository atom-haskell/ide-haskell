'use babel'

export function prettifyFile (editor, format = 'haskell') {
  let [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition())
  let modMap = {
    haskell: './util-stylish-haskell',
    cabal: './util-cabal-format'
  }
  if (!modMap[format]) { throw new Error(`Unknown format ${format}`) }
  let prettify = require(modMap[format])
  let {getRootDir} = require('atom-haskell-utils')
  let workDir = getRootDir(editor.getBuffer()).getPath()
  prettify(editor.getText(), workDir, {
    onComplete: (text) => {
      editor.setText(text)
      if (editor.getLastCursor()) {
        editor.getLastCursor().setBufferPosition(firstCursor, {autoscroll: false})
      }
      cursors.forEach((cursor) => {
        editor.addCursorAtBufferPosition(cursor, {autoscroll: false})
      })
    },
    onFailure: ({message, detail}) => {
      atom.notifications.addError(message, {detail})
    }
  })
}
