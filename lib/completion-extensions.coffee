{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{isHaskellSource} = require './utils'


class ExtensionsProvider extends Provider

  wordRegex: /\{-\#\s+LANGUAGE\s(\s*[A-Za-z0-9]+(\s*,)?)*/g
  exclusive: true

  initialize: (@editorView, @manager) ->

  buildSuggestions: ->
    return unless isHaskellSource @editor.getBuffer().getUri()
    return unless @manager.completionDatabase.ready

    selection = @editor.getSelection()
    prefix = @prefixOfSelection selection
    return unless prefix.length

    suggestions = @findSuggestionsForPrefix prefix
    return unless suggestions.length
    return suggestions

  findSuggestionsForPrefix: (prefix) ->
    prefix = prefix.replace /^.*(\b([A-Za-z0-9]+)|,)$/, '$2'
    return [] unless prefix.length

    # Filter the words using fuzzaldrin
    words = fuzzaldrin.filter @manager.completionDatabase.extensions, prefix

    # Builds suggestions for the words
    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix

    return suggestions


module.exports = {
  ExtensionsProvider
}
