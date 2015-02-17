{Emitter} = require 'emissary'

{Channel} = require './pending-backend'
utilGhcMod = require './util-ghc-mod'


class CompletionDatabase

  constructor: (@manager) ->
    Emitter.extend(this)
    @modules = {}

  # Remove obsolete imports - which not in provided list
  removeObsolete: (imports) ->
    for module, v of @modules
      @remove module if imports.indexOf(module) is -1

  # Remove module
  remove: (module) ->
    removed = @modules[module]?
    delete @modules[module] if removed
    return removed

  # Update module symbols.
  # This function updates module symbols if module does not present in
  # module list. If module is in list, just return true.
  update: (fileName, moduleName) ->
    return true if @modules[moduleName]?
    @_update fileName, moduleName
    return true

  # Real module update
  _update: (fileName, moduleName) ->
    @modules[moduleName] = []
    #This is a temporary hack-fix for #29, #36
    unless @manager.pendingProcessController?
      @manager.createPendingProcessController()
    @manager.pendingProcessController.start Channel.completion, utilGhcMod.browse, {
      fileName: fileName
      moduleName: moduleName
      onResult: (result) => @modules[moduleName]?.push result
      onComplete: => @emit 'updated'
    }


class MainCompletionDatabase extends CompletionDatabase
  constructor: (@manager) ->
    super(@manager)
    @rebuild()

  reset: ->
    @readyCounter = 0
    @rebuildActive = true
    @ready = false
    @extensions = []
    @ghcFlags = []
    @moduleNames = []
    @modules = {}

  # Build this database
  rebuild: ->
    return if @rebuildActive
    @reset()

    # run ghc-mod flag
    @manager.pendingProcessController.start Channel.completion, utilGhcMod.flag, {
      onResult: (result) => @ghcFlags.push result
      onComplete: => @updateReadyCounter()
    }
    # language extensions
    @manager.pendingProcessController.start Channel.completion, utilGhcMod.lang, {
      onResult: (result) =>
        @extensions.push result
        @ghcFlags.push "-X#{result}"
      onComplete: => @updateReadyCounter()
    }

    # run ghc-mod list to get all module dependencies
    @manager.pendingProcessController.start Channel.completion, utilGhcMod.list, {
      onResult: (result) =>
        @modules[result] = null
        @moduleNames.push result
      onComplete: => @updateReadyCounter()
    }

  # Increase ready counter
  updateReadyCounter: ->
    @readyCounter++
    return unless @readyCounter is 3

    # set database ready and emmit ready event
    @rebuildActive = false
    @ready = true

    # emit ready event
    @emit 'rebuild'

  # Update module symbols.
  # In main database we got another behaviour. If module is not preset,
  # return false. If present and null, then update. And if not null, then
  # simply return true.
  update: (fileName, moduleName) ->
    return false if @modules[moduleName] is undefined
    return true if @modules[moduleName] isnt null
    @_update fileName, moduleName
    return true


module.exports = {
  CompletionDatabase,
  MainCompletionDatabase
}
