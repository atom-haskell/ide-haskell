{$$$, View} = require 'atom-space-pen-views'
$ = require 'jquery'
{Point} = require 'atom'


class ResultView extends View
  @content: ->
    @div class: 'result-view', =>
      @ul outlet: 'resultList', class: 'list-group'

  initialize: (state) ->
    @on 'click', '.position',  ->
      pos = new Point $(this).attr('row'), $(this).attr('col')
      uri = $(this).attr('uri')
      atom.workspace.open(uri).then (editor) ->
        editor.setCursorBufferPosition(pos)

  update: (results) ->
    @resultList.empty()

    for r in results
      @resultList.append $$$ ->
        @li class: 'result-block', =>
          @div
            class: 'position'
            row: r.position.row
            col: r.position.column
            uri: r.file
            "#{r.file}: #{r.position.row + 1}, #{r.position.column + 1}"
          @div class: 'description', r.message


module.exports = {
  ResultView
}
