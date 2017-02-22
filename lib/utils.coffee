module.exports = Utils =
  MainMenuLabel: 'Haskell IDE'

  getEventType: (detail) ->
    if detail?.contextCommand? or detail?[0]?.contextCommand?
      'context'
    else
      'keyboard'

  # screen position from mouse event
  bufferPositionFromMouseEvent: (editor, event) ->
    sp = atom.views.getView(editor).component.screenPositionForMouseEvent event
    return null if isNaN(sp.row) or isNaN(sp.column)
    editor.bufferPositionForScreenPosition sp
