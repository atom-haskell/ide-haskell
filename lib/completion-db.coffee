{Emitter} = require 'emissary'

utilGhcMod = require './util-ghc-mod'


class CompletionDatabase
  modules: {}       # all modules completion

  constructor: (@manager) ->
    Emitter.extend(this)

  # Reset database
  reset: ->
    @modules = {}

  # Remove obsolete imports - which not in provided list
  removeObsolete: (imports) ->
    for module, v of @modules
      delete @modules[module] if imports.indexOf(module) is -1

  # Update completion database
  update: (fileName, moduleName, forceCreate = false) ->
    needUpdate = false

    if not @modules[moduleName]?
      return false unless forceCreate
      @modules[moduleName] = []
      needUpdate = true

    # update database only if it is empty
    if needUpdate
      @manager.pendingProcessController.start utilGhcMod.browse, {
        fileName: fileName
        moduleName: moduleName
        onResult: (result) => @modules[moduleName]?.push result
      }

    return true


class MainCompletionDatabase extends CompletionDatabase
  readyCounter: 0
  rebuildActive: false

  ready: false      # if true database is ready

  extensions: []    # language extensions (only for main)
  ghcFlags: []      # GHC flags (only for main)

  constructor: ->
    super
    @rebuild()

  reset: ->
    super
    @readyCounter = 0
    @rebuildActive = true
    @ready = false
    @extensions = []
    @ghcFlags = []

  # Build this database
  rebuild: ->
    return if @rebuildActive
    @reset()

    # TODO run ghc-mod lang and flag

    # run ghc-mod list to get all module dependencies
    @manager.pendingProcessController.start utilGhcMod.list, {
      onResult: (result) => @modules[result] = []
      onComplete: => @updateReadyCounter()
    }

  # increase ready counter
  updateReadyCounter: ->
    @readyCounter++
    return unless @readyCounter is 1

    # set database ready and emmit ready event
    @rebuildActive = false
    @ready = true

    # emit ready event
    @emit 'database-updated'


module.exports = {
  CompletionDatabase,
  MainCompletionDatabase
}
