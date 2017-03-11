'use babel'

export async function prettifyFile (editor, format = 'haskell') {
  let [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition())
  let modMap = {
    haskell: './util-stylish-haskell',
    cabal: './util-cabal-format'
  }
  if (!modMap[format]) { throw new Error(`Unknown format ${format}`) }
  let prettify = require(modMap[format])
  let {getRootDir} = require('atom-haskell-utils')
  let workDir = getRootDir(editor.getBuffer()).getPath()
  try {
    let text = await prettify(editor.getText(), workDir)
    editor.setText(text)
    if (editor.getLastCursor()) {
      editor.getLastCursor().setBufferPosition(firstCursor, {autoscroll: false})
    }
    cursors.forEach((cursor) => {
      editor.addCursorAtBufferPosition(cursor, {autoscroll: false})
    })
  } catch (e) {
    atom.notifications.addError('Failed to prettify', {
      detail: e.message, stack: e.stack, dismissable: true
    })
  }
}
