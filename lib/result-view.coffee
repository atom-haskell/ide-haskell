{$, $$$, View} = require 'atom'


class ResultView extends View
  @content: ->
    @div class: 'result-view', =>
      @ul outlet: 'resultList', class: 'list-group'

  initialize: (state) ->
    @on 'click', '.position',  ->
      pos = [$(this).attr('row') - 1, $(this).attr('col') - 1]
      uri = $(this).attr('uri')
      atom.workspace.open(uri).then (editor) ->
        editor.setCursorBufferPosition(pos)

  update: (results) ->
    @resultList.empty()

    for r in results
      @resultList.append $$$ ->
        @li class: 'result-block', =>
          @div class: 'position', row: r.pos[0], col: r.pos[1], uri: r.uri, "#{r.uri}: #{r.pos[0]}, #{r.pos[1]}"
          @div class: 'description', r.desc


module.exports = {
  ResultView
}
