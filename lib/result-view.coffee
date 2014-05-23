{View} = require 'atom'


class ResultView extends View
  @content: ->
    @ul outlet: 'contents', class: 'list-group'

  update: (results) ->
    

module.exports = {
  ResultView
}
