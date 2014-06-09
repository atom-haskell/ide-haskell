{Provider, Suggestion} = require "autocomplete-plus"

{CompletionDatabase} = require './completion-db'
{isHaskellSource} = require './utils'
ArrayHelperModule = require './utils'

ArrayHelperModule.extendArray(Array)


class HaskellProvider extends Provider
  completionDatabase: null    # local completion database

  initialize: (@editorView, @manager) ->
    @completionDatabase = new CompletionDatabase @manager

    # if saved, rebuild completion list
    @currentBuffer = @editor.getBuffer()
    @currentBuffer.on "saved", @onSaved

    # if main database updated, rebuild completion list
    @manager.completionDatabase.on 'database-updated', @buildCompletionList

    @buildCompletionList()

  dispose: ->
    @currentBuffer?.off "saved", @onSaved
    @manager?.completionDatabase.off 'database-updated', @buildCompletionList

  onSaved: =>
    return unless isHaskellSource @currentBuffer.getUri()

    # TODO remove current module from all providers modules

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

  buildCompletionList: =>
    # check if main database is ready, and if its not, subscribe on ready event
    return unless isHaskellSource @currentBuffer.getUri()
    return unless @manager.completionDatabase.ready

    {imports, @prefixes} = @parseImports()

    # remove obsolete modules from local completion database
    @completionDatabase.removeObsolete imports

    # get completions for all modules in list
    fileName = @editor.getUri()
    for module in imports
      if not @manager.completionDatabase.update fileName, module
        @completionDatabase.update fileName, module, true

  # parse import modules from document buffer
  parseImports: =>
    imports = []
    prefixes = {}
    @editor.getBuffer().scan /^import\s+(qualified\s+)?([A-Z][^ \r\n]*)(\s+as\s+([A-Z][^ \r\n]*))?/g, ({match}) ->
      [_, isQualified, name, _, newQualifier] = match
      isQualified = isQualified?

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
