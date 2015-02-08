_projSettings =
  isCabalProject: false,        # true if cabal project
  root: ""                      # detected project root directory (parent of cabal file)

getProjectSettings = ->
  _projSettings

setProjectSettings = (settings) ->
  _projSettings = settings

module.exports = {
  getProjectSettings
}
