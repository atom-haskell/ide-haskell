path = require 'path'

module.exports = Utils =
  MainMenuLabel: 'Haskell IDE'

  getEventType: (detail) ->
    if detail?.contextCommand? or detail?[0]?.contextCommand?
      'context'
    else
      'keyboard'

  # screen position from mouse event
  bufferPositionFromMouseEvent: (editor, event) ->
    editor.bufferPositionForScreenPosition (
      atom.views.getView(editor).component.screenPositionForMouseEvent event)
