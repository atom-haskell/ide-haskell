
class EditorControl
  constructor: (@editorView, @outputView) ->
    @editorView.control = this

    # TODO say output view to update me

module.exports = {
  EditorControl
}
