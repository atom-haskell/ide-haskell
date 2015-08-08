{$, $$$, View} = require 'atom-space-pen-views'
{Point} = require 'atom'


class ResultView extends View
  @content: ->
    @div class: 'result-view', =>
      @ul outlet: 'resultList', class: 'list-group'

  initialize: (state) ->
    @on 'click', '.position', ->
      pos = new Point parseInt($(this).attr('row'), 10),
                      parseInt($(this).attr('col'), 10)
      uri = $(this).attr('uri')
      atom.workspace.open(uri).then (editor) ->
        editor.setCursorBufferPosition pos

  update: (results) ->
    @resultList.empty()

    for r in results
      @resultList.append $$$ ->
        @li class: 'result-block', =>
          if r.uri?
            @div
              class: 'position'
              row: r.position.row
              col: r.position.column
              uri: r.uri
              "#{r.uri}: #{r.position.row + 1}, #{r.position.column + 1}"
          @div class: 'description', r.message ? r


module.exports = {
  ResultView
}
