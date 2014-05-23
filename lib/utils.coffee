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


module.exports = {
  isCabalProject,
  isHaskellSource
}
