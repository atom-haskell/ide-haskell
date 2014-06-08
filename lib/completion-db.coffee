utilGhcMod = require './util-ghc-mod'


class CompletionDatabase
  extensions: []    # language extensions (only for main)
  ghcFlags: []      # GHC flags (only for main)

  modules: {}       # global or local modules

  constructor: (@manager) ->

  # Build this database as main database
  rebuildMainDatabase: ->
    # TODO run ghc-mod lang and flag

    # run ghc-mod list to get all module dependencies
    @manager.pendingProcessController.start utilGhcMod.list, {
      onResult: (result) =>
        @modules[result] = []
    }

  # Remove obsolete imports - which not in provided list
  removeObsolete: (imports) ->
    for module, v of @modules
      delete @modules[module] if imports.indexOf(module) is -1

  # Update completions for specific modules
  update: (module, createIfNotExists = false) ->
    if not @modules[module]?
      return false unless createIfNotExists
      @modules[module] = []

    # TODO start update process

    return true

module.exports = {
  CompletionDatabase
}
