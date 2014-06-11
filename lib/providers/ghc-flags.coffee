{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{isHaskellSource} = require '../utils'


class GHCFlagsProvider extends Provider

  wordRegex: /\{-\#\s+OPTIONS_GHC(\s+[A-Za-z0-9\-]+)*/g
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
    prefix = prefix.replace /^.*\s([A-Za-z0-9\-]+)$/, '$1'

    # Filter the words using fuzzaldrin
    words = fuzzaldrin.filter @manager.mainCDB.ghcFlags, prefix

    # Builds suggestions for the words
    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix

    return suggestions


module.exports = {
  GHCFlagsProvider
}
