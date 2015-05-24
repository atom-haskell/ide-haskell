path = require 'path'

module.exports = Utils =
  getCabalProjectDir: ->
    # just want to check the project root directory,
    # but getRootDirectory is deprecated.
    # getDirectories() returns a list of directories,
    # including(only?) the project root, but it
    # isn't properly flagged as root (isRoot() returns false;
    # it must be the filesystem root, not the project root).
    # So, just scan for cabal files in each directory.
    files = []
    for dir in atom.project.getDirectories()
      if dir # sometimes it is null...woooo
        files = files.concat dir.getEntriesSync()
    return null unless files?
    for file in files
      if path.extname(file.getPath()) is '.cabal'
        return path.dirname(file.getPath())
    return null

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
