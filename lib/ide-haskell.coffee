{$} = require 'atom'
{Subscriber} = require 'emissary'

{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
{HaskellProvider} = require './haskell-provider'
{CompletionDatabase} = require './completion-db'
{isCabalProject} = require './utils'
utilGhcMod = require './util-ghc-mod'


configDefaults =
  checkOnFileSave: true,
  lintOnFileSave: true,
  switchTabOnCheck: true,
  expressionTypeInterval: 300,
  ghcModPath: 'ghc-mod'


_isCabalProject = false         # true if cabal project
editorSubscription = null       # editor view subscription for controller
outputView = null               # output view

providers = []                  # registered autocompletion providers
autocomplete = null             # auto-completion
completeSubscription = null     # editor view subscription for completion
completeDatabase = null         # complete database

activate = (state) ->
  _isCabalProject = isCabalProject()
  $(window).on 'focus', updateMenu

  # activate only on cabal project
  return unless _isCabalProject
  updateMenu()

  # create global views
  outputView = new OutputView(state.outputView)

  # attach controller to every editor view
  editorSubscription = atom.workspaceView.eachEditorView (editorView) ->
    new EditorControl(editorView, outputView)

  # global commands
  atom.workspaceView.command 'ide-haskell:toggle-output', ->
    outputView.toggle()
  atom.workspaceView.command 'ide-haskell:check-file', ->
    outputView.checkFile(utilGhcMod.check)
  atom.workspaceView.command 'ide-haskell:lint-file', ->
    outputView.checkFile(utilGhcMod.lint)

  # autocompletion
  if atom.packages.isPackageLoaded('autocomplete-plus')
    atom.packages.activatePackage('autocomplete-plus')
      .then (pkg) =>
        autocomplete = pkg.mainModule
        registerProviders()

  # update completion database with external modules
  completeDatabase = new CompletionDatabase outputView
  completeDatabase.build()

deactivate = ->
  $(window).off 'focus', updateMenu
  return unless _isCabalProject

  # remove menu
  clearMenu()

  # remove editor controllers from all opened views
  for editorView in atom.workspaceView.getEditorViews()
    editorView.haskellController?.deactivate()

  # remove subscriptions
  editorSubscription?.off()
  editorSubscription = null

  completeSubscription?.off()
  completeSubscription = null

  # remove completion providers
  providers.forEach (provider) ->
    autocomplete.unregisterProvider provider
  providers = []

  # clear commands
  atom.workspaceView.off 'ide-haskell:toggle-output'
  atom.workspaceView.off 'ide-haskell:check-file'
  atom.workspaceView.off 'ide-haskell:lint-file'

  # remove output panel
  outputView.deactivate()
  outputView = null

  # clear completion database
  completeDatabase = null

serialize = ->
  return unless _isCabalProject
  outputView: outputView.serialize()

updateMenu = ->
  clearMenu()
  return unless _isCabalProject

  atom.menu.add [
    {
      label: 'Haskell IDE'
      submenu : [
        {label: 'Check File', command: 'ide-haskell:check-file'},
        {label: 'Lint File', command: 'ide-haskell:lint-file'},
        {label: 'Separator1', type: 'separator'},
        {label: 'Toggle Panel', command: 'ide-haskell:toggle-output'}
      ]
    }
  ]

clearMenu = ->
  atom.menu.template = (
    obj for obj in atom.menu.template when obj.label isnt "Haskell IDE"
  )
  atom.menu.update()

registerProviders = ->
  completeSubscription = atom.workspaceView.eachEditorView (editorView) ->
    if editorView.attached and not editorView.mini
      provider = new HaskellProvider editorView, completeDatabase, outputView
      autocomplete.registerProviderForEditorView provider, editorView
      providers.push provider


module.exports = {
  configDefaults,
  activate
  deactivate,
  serialize
}
