{$$$, View} = require 'atom-space-pen-views'
$ = require 'jquery'


class ResultView extends View
  @content: ->
    @div class: 'result-view', =>
      @ul outlet: 'resultList', class: 'list-group'

  initialize: (state) ->
    @on 'click', '.position',  ->
      pos = [parseInt($(this).attr('row'), 10), parseInt($(this).attr('col'), 10)]
      uri = $(this).attr('uri')
      atom.workspace.open(uri).then (editor) ->
        editor.setCursorBufferPosition(pos)

  update: (results) ->
    @resultList.empty()

    for r in results
      @resultList.append $$$ ->
        @li class: 'result-block', =>
          @div class: 'position', row: r.range[0][0], col: r.range[0][1], uri: r.uri, "#{r.uri}: #{r.range[0][0] + 1}, #{r.range[0][1] + 1}"
          @div class: 'description', r.desc


module.exports = {
  ResultView
}
