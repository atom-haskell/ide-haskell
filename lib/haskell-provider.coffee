{Provider, Suggestion} = require "autocomplete-plus"

{CompletionDatabase} = require './completion-db'
ArrayHelperModule = require './utils'

ArrayHelperModule.extendArray(Array)

class HaskellProvider extends Provider
  completionDatabase: null    # local completion database

  initialize: (@editorView, @manager) ->
    @completionDatabase = new CompletionDatabase @manager

    @currentBuffer = @editor.getBuffer()
    @currentBuffer.on "saved", @onSaved

    @buildCompletionList()

  dispose: ->
    @currentBuffer?.off "saved", @onSaved

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
    # suggestions = []
    # suggestions.push new Suggestion(this, word: "LANGUAGE", label: "test")
    # return suggestions

  # findSuggestionsForWord: (prefix) ->
  #   console.log prefix

  buildCompletionList: ->
    {imports, @prefixes} = @parseImports()

    # remove obsolete modules from local completion database
    @completionDatabase.removeObsolete imports

    # TODO main database must be built before this moment!!!

    # get completions for all modules in list
    for module in imports
      if not @manager.completionDatabase.update module
        @completionDatabase.update module, true

    # console.log @manager.completionDatabase
    console.log @completionDatabase

  # parse import modules from document buffer
  parseImports: =>
    imports = []
    prefixes = {}
    @editor.getBuffer().scan /^import\s+(qualified\s+)?([A-Z][^ \r\n]*)(\s+as\s+([A-Z][^ \r\n]*))?/g, ({match}) ->
      [_, isQualified, name, _, newQualifier] = match
      isQualified = isQualified?

      # TODO find out if module is external and remember module name
      imports.push name

      # calculate prefixes for modules
      prefixes[name] = [] unless prefixes[name]?
      newQualifier = name unless newQualifier?
      prefixList = ["#{newQualifier}."]
      prefixList.push '' unless isQualified

      prefixList = prefixList.concat prefixes[name]
      prefixes[name] = prefixList.unique()

    imports = imports.unique()
    return {imports, prefixes}


module.exports = {
  HaskellProvider
}
