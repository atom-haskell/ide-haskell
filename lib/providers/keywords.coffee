{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{isHaskellSource} = require '../utils'


class KeywordsProvider extends Provider

  wordRegex: /^[a-z]+/g
  exclusive: true

  possibleWords: [
    'class', 'data', 'default', 'import', 'infix', 'infixl', 'infixr',
    'instance', 'main', 'module', 'newtype', 'type'
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
    # Filter the words using fuzzaldrin
    words = fuzzaldrin.filter @possibleWords, prefix

    # Builds suggestions for the words
    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix

    return suggestions


module.exports = {
  KeywordsProvider
}
