{Provider, Suggestion} = require "autocomplete-plus"

class HaskellProvider extends Provider
  completionList: null

  initialize: ->
    @buildCompletionList()

    @currentBuffer = @editor.getBuffer()
    @currentBuffer.on "saved", @onSaved

  onSaved: =>
    @buildCompletionList()

  # confirm: (item) ->
  #   return true

  buildSuggestions: ->
    # selection = @editor.getSelection()
    # prefix = @prefixOfSelection selection
    # return unless prefix.length
    #
    # console.log prefix
    suggestions = []
    # suggestions.push new Suggestion(this, word: "LANGUAGE", label: "test")
    return suggestions

  # findSuggestionsForWord: (prefix) ->
  #   console.log prefix

  # function get import modules from current buffer
  # and buffer module itself, then it starts ghc-mod browse
  # for each module serially and get the output
  buildCompletionList: ->

    # get all imports in current document
    @editor.getBuffer().scan /^import\s+(qualified\s+)?([A-Z][^ \r\n]*)(\s+as\s+([A-Z][^ \r\n]*))?/g, ({match}) ->
      console.log 'qualified:', match[1]?, ', module name:', match[2], ', as:', match[4]

    # TODO get module name itself - should we do this or we can use just default provider?

  # clean up everything
  dispose: ->
    @currentBuffer?.off "saved", @onSaved

module.exports = {
  HaskellProvider
}
