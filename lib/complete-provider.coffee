{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{CompletionDatabase} = require './completion-db'
{isHaskellSource} = require './utils'
ArrayHelperModule = require './utils'
{CompleteType} = require './util-data'

ArrayHelperModule.extendArray(Array)


class CompleteProvider extends Provider

  initialize: (@editorView, @manager) ->
    # if saved, rebuild completion list
    @currentBuffer = @editor.getBuffer()
    @currentBuffer.on 'will-be-saved', @onBeforeSaved
    @currentBuffer.on 'saved', @onSaved

    # if main database updated, rebuild completion list
    @manager.mainCDB.on 'rebuild', @buildCompletionList
    @manager.mainCDB.on 'updated', @setUpdatedFlag

    @buildCompletionList()

  dispose: ->
    @currentBuffer?.off 'saved', @onSaved
    @currentBuffer?.off 'will-be-saved', @onBeforeSaved
    @manager?.mainCDB.off 'rebuild', @buildCompletionList
    @manager?.mainCDB.off 'updated', @setUpdatedFlag
    @manager.localCDB[@currentBuffer.getUri()]?.off 'updated', @setUpdatedFlag

  setUpdatedFlag: =>
    @databaseUpdated = true

  onBeforeSaved: =>
    # in case file name was changed turn off notifications
    @manager.localCDB[@currentBuffer.getUri()]?.off 'updated', @setUpdatedFlag

  onSaved: =>
    fileName = @currentBuffer.getUri()
    return unless isHaskellSource fileName

    # turn on notifications
    @manager.localCDB[fileName]?.on 'updated', @setUpdatedFlag

    # rebuild completion list for all affected databases
    module = @parseModule()
    for fname, localCDB of @manager.localCDB
      if fname isnt fileName
        if localCDB.remove module
          localCDB.update fname, module

    # rebuild local completion database
    @buildCompletionList()

  buildSuggestions: ->
    # try to rebuild completion list if database changed
    @rebuildWordList()
    return unless @totalWordList?

    selection = @editor.getSelection()
    tipType = @getSelectionType selection

  getSelectionType: (selection) ->
    selectionRange = selection.getBufferRange()
    return CompleteType.Pragmas if @isHaskellPragmas selectionRange

  isHaskellPragmas: (srange) ->
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    match = @editor.getBuffer().getTextInRange(lrange).match /^\{\-#\s+_?([A-Z_]*)$/
    return false unless match?

    words = fuzzaldrin.filter ['LANGUAGE', 'OPTIONS_GHC'], match[1]

    console.log words

    # console.log lrange
    # @editor.getBuffer().scanInRange /^\{\-#\s+[A-Z_]*$/g, lrange, ({match, range, stop}) ->
    #   stop() if range.start.isGreaterThan(srange.end)
    #   console.log match, range, stop

    # lineRange = [[selectionRange.start.row, 0], [selectionRange.end.row, @editor.lineLengthForBufferRow(selectionRange.end.row)]]
    # console.log lineRange

    # return unless @isSuitablePrefixOfSelection selection
    #
    # prefix = @prefixOfSelection selection
    # return unless prefix.length
    #
    # suggestions = @findSuggestionsForPrefix prefix
    # return unless suggestions.length
    # return suggestions

  # isSuitablePrefixOfSelection: (selection) ->
  #   selectionRange = selection.getBufferRange()
  #   lineRange = [[selectionRange.start.row, 0], [selectionRange.end.row, @editor.lineLengthForBufferRow(selectionRange.end.row)]]
  #
  #   result = true
  #
  #   @editor.getBuffer().scanInRange /^(import)\s.*$/g, lineRange, ({match, range, stop}) ->
  #     stop() if range.start.isGreaterThan(selectionRange.end)
  #     result = false
  #
  #   return result
  #
  # findSuggestionsForPrefix: (prefix) ->
  #   prefix = prefix.replace /^\s+(.*)$/, '$1'
  #
  #   # Filter the words using fuzzaldrin
  #   words = fuzzaldrin.filter @totalWordList, prefix, key: 'expr'
  #
  #   # Builds suggestions for the words
  #   suggestions = for word in words when word isnt prefix
  #     new Suggestion this, word: word.expr, prefix: prefix, label: word.type
  #
  #   return suggestions

  # If database or prefixes was updated, rebuild world list
  rebuildWordList: ->
    return unless @databaseUpdated? and @databaseUpdated
    fileName = @currentBuffer.getUri()
    @databaseUpdated = false

    @totalWordList = []
    localCDB = @manager.localCDB[fileName]

    for module, prefixes of @prefixes
      @rebuildWordList1 prefixes, localCDB.modules[module]
      @rebuildWordList1 prefixes, @manager.mainCDB.modules[module]

    # # append keywords
    # for keyword in ['case', 'deriving', 'do', 'else', 'if', 'in', 'let', 'module', 'of', 'then', 'where']
    #   @totalWordList.push {expr: keyword}

  rebuildWordList1: (prefixes, module) ->
    return unless module?
    for data in module
      for prefix in prefixes
        @totalWordList.push {expr: "#{prefix}#{data.expr}", type: data.type}

  buildCompletionList: =>
    fileName = @currentBuffer.getUri()

    # check if main database is ready, and if its not, subscribe on ready event
    return unless isHaskellSource fileName
    return unless @manager.mainCDB.ready

    # create local database if it is not created yet
    localCDB = @manager.localCDB[fileName]
    if not localCDB?
      localCDB = new CompletionDatabase @manager
      localCDB.on 'updated', @setUpdatedFlag
      @manager.localCDB[fileName] = localCDB

    {imports, prefixes} = @parseImports()

    # remember prefixes and set update flag if it was changed
    if JSON.stringify(@prefixes) isnt JSON.stringify(prefixes)
      @prefixes = prefixes
      @setUpdatedFlag()

    # remove obsolete modules from local completion database
    localCDB.removeObsolete imports

    # get completions for all modules in list
    for module in imports
      if not @manager.mainCDB.update fileName, module
        localCDB.update fileName, module

  # parse import modules from document buffer
  parseImports: ->
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

    # add prelude import by default
    preludes = ['Prelude']
    for name in preludes
      prefixList = ["#{name}.", '']
      prefixes[name] = [] if not prefixes[name]?
      prefixList = prefixList.concat prefixes[name]
      prefixes[name] = prefixList.unique()
      imports.push name

    imports = imports.unique()
    return {imports, prefixes}

  # parse module name
  parseModule: ->
    module = undefined
    @editor.getBuffer().scan /^module\s+([\w\.]+)/g, ({match}) ->
      [_, module] = match
    return module

module.exports = {
  CompleteProvider
}
