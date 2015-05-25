path = require 'path'

module.exports = Utils =
  getCabalProjectDir: ->
    [dir] = atom.project.getDirectories().filter (dir) ->
      dir?.getEntriesSync().some (e) ->
        e.isFile() and e.getBaseName().endsWith('.cabal')
    dir ?= null
    dir

  # pixel position from mouse event
  pixelPositionFromMouseEvent: (editor, event) ->
    {clientX, clientY} = event
    lines = atom.views.getView(editor).rootElement.querySelector('.lines')
    linesClientRect = lines.getBoundingClientRect()
    top = clientY - linesClientRect.top
    left = clientX - linesClientRect.left
    {top, left}

  # screen position from mouse event
  screenPositionFromMouseEvent: (editor, event) ->
    editor.screenPositionForPixelPosition(
      Utils.pixelPositionFromMouseEvent(editor, event))
