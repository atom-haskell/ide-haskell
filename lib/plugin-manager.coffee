{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
utilStylishHaskell = require './util-stylish-haskell'
utilCabalFormat = require './util-cabal-format'
{CompositeDisposable, Emitter} = require 'atom'

class PluginManager

  constructor: (state, backend) ->
    @checkResults = {}            # all errors, warings and lints here
    @currentError = null

    @disposables = new CompositeDisposable
    @controllers = new WeakMap

    @disposables.add @emitter = new Emitter

    @createOutputViewPanel(state)
    @subscribeEditorController()

    @setBackend backend if backend?

  deactivate: ->
    @disposables.dispose()
    @backend?.shutdownBackend?()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()

  setBackend: (backend) =>
    @backend = backend

    if @backend?.onBackendActive?
      @disposables.add @backend.onBackendActive =>
        @outputView.backendActive()
    if @backend?.onBackendIdle?
      @disposables.add @backend.onBackendIdle =>
        @outputView.backendIdle()

  backendWarning: =>
    @outputView.backendWarning()

  togglePanel: ->
    @outputView?.toggle()

  checkFile: (editor) ->
    if @backend?.checkBuffer?
      @checkOrLint editor, @backend.checkBuffer, ['error', 'warning']
    else if @backend?
      atom.notifications.addWarning "Backend #{@backend.name()} doesn't support
                                    checkFile command"

  lintFile: (editor) ->
    if @backend?.lintBuffer?
      @checkOrLint editor, @backend.lintBuffer, ['lint']
    else if @backend?
      atom.notifications.addWarning "Backend #{@backend.name()} doesn't support
                                    lintFile command"

  checkOrLint: (editor, func, types) =>
    return unless func?
    if atom.config.get 'ide-haskell.useLinter'
      return atom.commands.dispatch atom.views.getView(editor), 'linter:lint'
    @outputView?.pendingCheck()
    @currentError = null
    func editor.getBuffer(), (res) =>
      @checkResults[t] = (res.filter ({severity}) -> severity == t) for t in types
      @emitter.emit 'results-updated', {res: @checkResults, types}

  onResultsUpdated: (callback) =>
    @emitter.on 'results-updated', callback

  # File prettify
  prettifyFile: (editor, format = 'haskell') ->
    [firstCursor, cursors...] = editor.getCursors().map (cursor) ->
      cursor.getBufferPosition()
    util = switch format
      when 'haskell' then utilStylishHaskell
      when 'cabal' then utilCabalFormat
      else throw new Error "Unknown format #{format}"
    util.prettify editor.getText(),
      onComplete: (text) ->
        editor.setText(text)
        if editor.getLastCursor()?
          editor.getLastCursor().setBufferPosition firstCursor,
            autoscroll: false
          cursors.forEach (cursor) ->
            editor.addCursorAtBufferPosition cursor,
              autoscroll: false


  controller: (editor) ->
    @controllers?.get? editor

  # Update internals with results.
  updateResults: (types, results) ->
    @checkResults[t] = [] for t in types
    @checkResults[r.type].push(r) for r in results

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputView(state.outputView, this)

  deleteOutputViewPanel: ->
    @outputView?.deactivate()
    @outputView = null

  addController: (editor) ->
    unless @controllers.get(editor)?
      @controllers.set(editor, new EditorControl(editor, this))
      @disposables.add editor.onDidDestroy =>
        @controllers.delete(editor) #deactivation is handled in EditorControl

  removeController: (editor) ->
    @controllers.get(editor)?.deactivate()
    @controllers.delete(editor)

  controllerOnGrammar: (editor, grammar) ->
    if grammar.scopeName.match /haskell$/
      @addController editor
    else
      @removeController editor

  # Observe text editors to attach controller
  subscribeEditorController: ->
    @disposables.add atom.workspace.observeTextEditors (editor) =>
      @disposables.add editor.onDidChangeGrammar (grammar) =>
        @controllerOnGrammar editor, grammar
      @controllerOnGrammar editor, editor.getGrammar()

  deleteEditorControllers: ->
    for editor in atom.workspace.getTextEditors()
      @removeController editor

  nextError: ->
    @outputView?.next()

  prevError: ->
    @outputView?.prev()


module.exports = {
  PluginManager
}
