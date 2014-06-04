{Provider, Suggestion} = require "autocomplete-plus"
ArrayHelperModule = require './utils'

ArrayHelperModule.extendArray(Array)

class HaskellProvider extends Provider
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

  buildCompletionList: ->
    [imports, @prefixes] = @parseImports()

    # TODO remove obsolete modules from local completion database
    console.log imports

    # # remove obsolete modules from completions
    # for module, v of @completionList
    #   delete @completionList[module] if importModuleList.indexOf(module) is -1
    #
    # # find module to get completions of
    # updateModuleList = []
    # for module in importModuleList
    #   updateModuleList.push module unless @completionList[module]?
    #
    # # TODO start completions update procedure
    # console.log updateModuleList
    #
    # # TODO update prefixes for modules

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
    return [imports, prefixes]

  # clean up everything
  dispose: ->
    @currentBuffer?.off "saved", @onSaved

module.exports = {
  HaskellProvider
}
