import {TextEditor} from 'atom'
import {getRootDir} from 'atom-haskell-utils'
import {format as cabalFormat} from './util-cabal-format'
import {format as filterFormat} from './util-stylish-haskell'

export async function prettifyFile (editor: TextEditor, format: 'haskell' | 'cabal' = 'haskell') {
  const [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition())
  const modMap = {
    haskell: filterFormat,
    cabal: cabalFormat
  }
  if (!modMap[format]) { throw new Error(`Unknown format ${format}`) }
  const prettify = modMap[format]
  const workDir = (await getRootDir(editor.getBuffer())).getPath()
  try {
    const {stdout, stderr} = await prettify(editor.getText(), workDir)
    editor.setText(stdout)
    if (editor.getLastCursor()) {
      editor.getLastCursor().setBufferPosition(firstCursor, {autoscroll: false})
    }
    cursors.forEach((cursor) => {
      editor.addCursorAtBufferPosition(cursor, {autoscroll: false})
    })
    if (stderr.length > 0) {
      atom.notifications.addWarning('Prettifier reported the following problems:', {
        detail: stderr,
        dismissable: true
      })
    }
  } catch (e) {
    const err: Error = e.error || e
    let stderr: string = e.stderr ? e.stderr.trim() : ''
    if (err.message.includes(stderr)) {
      stderr = ''
    }
    atom.notifications.addError('Failed to prettify', {
      detail: `${stderr ? `${stderr}\n\n` : ''}${err.message}`,
      stack: err.stack,
      dismissable: true
    })
  }
}

export {PrettifyEditorController} from './editor-controller'
