{Provider, Suggestion} = require 'autocomplete-plus'
fuzzaldrin = require 'fuzzaldrin'

{CompletionDatabase} = require './completion-db'
{isHaskellSource} = require './utils'
ArrayHelperModule = require './utils'
{CompleteType} = require './util-data'

ArrayHelperModule.extendArray(Array)


class CompleteProvider extends Provider

  pragmasWords: [
    'LANGUAGE', 'OPTIONS_GHC', 'INCLUDE', 'WARNING', 'DEPRECATED', 'INLINE',
    'NOINLINE', 'ANN', 'LINE', 'RULES', 'SPECIALIZE', 'UNPACK', 'SOURCE'
  ]

  keyWords: [
    'class', 'data', 'default', 'import', 'infix', 'infixl', 'infixr',
    'instance', 'main', 'module', 'newtype', 'type'
  ]

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
    suggestions = @getSelectionSuggestion selection
    return unless suggestions.length
    return suggestions

  getSelectionSuggestion: (selection) ->
    selectionRange = selection.getBufferRange()
    for test in [ @isLanguagePragmas,
                  @isLanguageExtensions,
                  @isLanguageGhcFlags,
                  @isLanguageKeywords]
      suggestions = test selectionRange
      return suggestions if suggestions?

    currentScope = @getCurrentScope selectionRange
    for test in [ @isLanguageImports]
      suggestions = test selectionRange, currentScope
      return suggestions if suggestions?

    return []

  # check for pragmas
  isLanguagePragmas: (srange) =>
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    match = @editor.getBuffer().getTextInRange(lrange).match /^\{\-#\s+([A-Za-z_]*)$/
    return null unless match?

    prefix = match[1]
    words = fuzzaldrin.filter @pragmasWords, prefix

    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix
    return suggestions

  # check for language extensions
  isLanguageExtensions: (srange) =>
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    match = @editor.getBuffer().getTextInRange(lrange).match /^\{\-#\s+LANGUAGE(\s*([a-zA-Z0-9_]*)\s*,?)*$/
    return null unless match?

    prefix = if match[1].slice(-1) is "," then "" else (match[2] ? "")
    words = fuzzaldrin.filter @manager.mainCDB.extensions, prefix

    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix
    return suggestions

  # check for ghc flags
  isLanguageGhcFlags: (srange) =>
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    match = @editor.getBuffer().getTextInRange(lrange).match /^\{\-#\s+OPTIONS_GHC(\s*([a-zA-Z0-9\-]*)\s*,?)*$/
    return null unless match?

    prefix = if match[1].slice(-1) is "," then "" else (match[2] ? "")
    words = fuzzaldrin.filter @manager.mainCDB.ghcFlags, prefix

    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix
    return suggestions

  # check for keywords
  isLanguageKeywords: (srange) =>
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    match = @editor.getBuffer().getTextInRange(lrange).match /^([a-z]*)$/
    return null unless match?

    prefix = match[1]
    words = fuzzaldrin.filter @keyWords, prefix

    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix
    return suggestions

  # completions inside import statement
  isLanguageImports: (srange, scope) =>
    return unless scope == "import"
    lrange = [[0, 0], [srange.end.row, srange.end.column]]

    scopeMatch = undefined
    @editor.getBuffer().backwardsScanInRange /^import\s+(qualified\s+)?([A-Z][a-zA-Z0-9\.]*\s+)?((hiding\s+)|(as\s+)?([A-Z][a-zA-Z0-9\.]*\s+)?)?(\()?/g, lrange, ({match, stop}) ->
      scopeMatch = match
      stop()
    return unless scopeMatch?

    if scopeMatch[7]?
      prefix = @getCurrentPrefix(srange, /[\(\s,]+([a-zA-Z0-9']*)/)[1]
      # TODO list of module methods goes here

    else if scopeMatch[4]? or scopeMatch[5]? or scopeMatch[6]?

    else if scopeMatch[2]?
      prefix = @getCurrentPrefix(srange, /\s+([a-z]*)/)[1]
      words = fuzzaldrin.filter ['hiding', 'as'], prefix

    else if scopeMatch[1]? or scopeMatch[0]?
      prefix = @getCurrentPrefix(srange, /\s+([a-zA-Z0-9\.]*)/)[1]
      words = fuzzaldrin.filter ['qualified'], prefix
      if scopeMatch[1]? or words.length is 0
        # TODO add list with local cabal project imports
        words = fuzzaldrin.filter @manager.mainCDB.moduleNames, prefix

    return unless prefix? and words?

    suggestions = for word in words when word isnt prefix
      new Suggestion this, word: word, prefix: prefix
    return suggestions

  # get prefix before cursor
  getCurrentPrefix: (srange, regex) =>
    currentMatch = undefined
    lrange = [[srange.start.row, 0], [srange.end.row, srange.end.column]]
    @editor.getBuffer().backwardsScanInRange regex, lrange, ({match, stop}) ->
      currentMatch = match
      stop()
    return currentMatch

  # get the scope where the cursor is
  getCurrentScope: (srange) =>
    currentScope = undefined
    lrange = [[0, 0], [srange.end.row, srange.end.column]]
    @editor.getBuffer().backwardsScanInRange /^[^\s]+/g, lrange, ({match, stop}) ->
      currentScope = match[0]
      stop()
    return currentScope

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
