{Provider, Suggestion} = require "autocomplete-plus"

class HaskellProvider extends Provider
  buildSuggestions: ->
    suggestions = []
    suggestions.push new Suggestion(this, word: "async", label: "@async")
    suggestions.push new Suggestion(this, word: "attribute", label: "@attribute")
    suggestions.push new Suggestion(this, word: "author", label: "@author")
    return suggestions


module.exports = {
  HaskellProvider
}
