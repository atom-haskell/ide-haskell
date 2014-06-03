path = require 'path'

# check if project contains cabal file
isCabalProject = ->
  files = atom.project.getRootDirectory()?.getEntriesSync()
  return false unless files?
  for file in files
    return true if path.extname(file.getPath()) is '.cabal'
  return false

# check if file is haskell source code
isHaskellSource = (fname) ->
  if path.extname(fname) is '.hs'
    return true
  return false

extendArray = (constructor) ->
  constructor.prototype.unique = ->
    output = {}
    output[@[key]] = @[key] for key in [0...@length]
    value for key, value of output

module.exports = {
  isCabalProject,
  isHaskellSource,
  extendArray
}
