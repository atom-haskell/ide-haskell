path = require 'path'

module.exports = Utils =
  getCabalProjectDir: ->
    [dir] = atom.project.getDirectories().filter (dir) ->
      dir?.getEntriesSync().some (e) ->
        e.isFile() and e.getBaseName().endsWith('.cabal')
    dir ?= null
    dir

  # screen position from mouse event
  bufferPositionFromMouseEvent: (editor, event) ->
    editor.bufferPositionForScreenPosition (
      atom.views.getView(editor).component.screenPositionForMouseEvent event)
