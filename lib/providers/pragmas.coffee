{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{isHaskellSource} = require '../utils'


class PragmasProvider extends Provider

  wordRegex: /\{-\#\s+\w+/g
  exclusive: true

  possibleWords: [
    'LANGUAGE', 'OPTIONS_GHC', 'INCLUDE', 'WARNING', 'DEPRECATED', 'INLINE',
    'NOINLINE', 'ANN', 'LINE', 'RULES', 'SPECIALIZE', 'UNPACK', 'SOURCE'
  ]

  initialize: (@editorView, @manager) ->

  buildSuggestions: ->
    return unless isHaskellSource @editor.getBuffer().getUri()

    selection = @editor.getSelection()
    prefix = @prefixOfSelection selection
    return unless prefix.length

    suggestions = @findSuggestionsForPrefix prefix
    return unless suggestions.length
    return suggestions

  findSuggestionsForPrefix: (prefix) ->
    prefix = prefix.replace /^\{-\#\s+/, ''

    # Filter the words using fuzzaldrin
    words = fuzzaldrin.filter @possibleWords, prefix

    # Builds suggestions for the words
    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix

    return suggestions


module.exports = {
  PragmasProvider
}
