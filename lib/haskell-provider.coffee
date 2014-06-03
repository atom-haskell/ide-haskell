{Provider, Suggestion} = require "autocomplete-plus"
ArrayHelperModule = require './utils'

ArrayHelperModule.extendArray(Array)

class HaskellProvider extends Provider
  completionList: {}    # map of module name to list of functions

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

    # get all import modules in current document and their qualified names
    importModuleList = []
    modulePrefixList = {}
    @editor.getBuffer().scan /^import\s+(qualified\s+)?([A-Z][^ \r\n]*)(\s+as\s+([A-Z][^ \r\n]*))?/g, ({match}) ->
      [_, isQualified, name, _, newQualifier] = match
      isQualified = isQualified?

      # remember module name
      importModuleList.push name
      modulePrefixList[name] = [] unless modulePrefixList[name]?

      # calculate prefixes for modules
      newQualifier = name unless newQualifier?
      prefixList = ["#{newQualifier}."]
      prefixList.push '' unless isQualified

      prefixList = prefixList.concat modulePrefixList[name]
      modulePrefixList[name] = prefixList.unique()

    importModuleList = importModuleList.unique()

    # remove obsolete modules from completions
    for module, v of @completionList
      delete @completionList[module] if importModuleList.indexOf(module) is -1

    # find module to get completions of
    updateModuleList = []
    for module in importModuleList
      updateModuleList.push module unless @completionList[module]?

    # TODO start completions update procedure
    console.log updateModuleList

    # TODO update prefixes for modules

  # clean up everything
  dispose: ->
    @currentBuffer?.off "saved", @onSaved

module.exports = {
  HaskellProvider
}
