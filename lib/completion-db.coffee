utilGhcMod = require './util-ghc-mod'


class CompletionDatabase
  constructor: (@outputView) ->

  # Public: build this database as main database
  build: ->
    # TODO run ghc-mod lang and flag

    # run ghc-mod list to get all module dependencies


module.exports = {
  CompletionDatabase
}
