{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{isHaskellSource} = require '../utils'


class ImportsProvider extends Provider

  wordRegex: /^import\s+(qualified\s+)?[\w\.]*/g
  exclusive: true

  initialize: (@editorView, @manager) ->

  buildSuggestions: ->
    return unless isHaskellSource @editor.getBuffer().getUri()
    return unless @manager.mainCDB.ready

    selection = @editor.getSelection()
    prefix = @prefixOfSelection selection
    return unless prefix.length

    suggestions = @findSuggestionsForPrefix prefix
    return unless suggestions.length
    return suggestions

  findSuggestionsForPrefix: (prefix) ->
    prefix = prefix.replace /^.*\s([\w\.]+)$/, '$1'
    return [] unless prefix.length

    # Filter the words using fuzzaldrin
    words = fuzzaldrin.filter ['qualified'], prefix
    if words.length is 0
      words = fuzzaldrin.filter @manager.mainCDB.moduleNames, prefix

    # Builds suggestions for the words
    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix

    return suggestions


module.exports = {
  ImportsProvider
}
