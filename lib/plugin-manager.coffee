{OutputView} = require './output-view'
{EditorControl} = require './editor-control'
utilStylishHaskell = require './util-stylish-haskell'
utilCabalFormat = require './util-cabal-format'
ImportListView = require './import-list-view'
ResultsDB = require './results-db'
{CompositeDisposable, Emitter} = require 'atom'

class PluginManager
  constructor: (state, backend) ->
    @checkResults = new ResultsDB

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
    func editor.getBuffer(), (res) =>
      @checkResults.setResults res, types
      res = {}
      res[t] = @checkResults.resultsWithSeverity(t) for t in types
      @emitter.emit 'results-updated', {res, types}
      @updateEditorsWithResults()

  updateEditorsWithResults: ->
    types = Object.keys(@checkResults)
    for ed in atom.workspace.getTextEditors()
      @controller(ed)?.updateResults?(@checkResults.resultsForURI(ed.getPath()))

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

  showTypeTooltip: (editor, pos, eventType) ->
    @queueTooltipAction editor, pos, eventType, 'getType'

  showInfoTooltip: (editor, pos, eventType) ->
    @queueTooltipAction editor, pos, eventType, 'getInfo'

  insertType: (editor, eventType) ->
    unless @backend?.getType?
      atom.notifications.addWarning "Backend #{@manager.backend.name()} doesn't support
                                    getType command" if @manager.backend?
      return

    controller = @controller editor
    return unless controller?

    {crange} = controller.getEventRange null, eventType

    @backend.getType editor.getBuffer(), crange, ({range, type}) ->
      n = editor.indentationForBufferRow(range.start.row)
      indent = ' '.repeat n * editor.getTabLength()
      editor.scanInBufferRange /[\w'.]+/, range, ({matchText, stop}) ->
        symbol = matchText
        pos = [range.start.row, 0]
        editor.setTextInBufferRange [pos, pos],
          indent + symbol + " :: " + type + "\n"
        stop()

  insertImport: (editor, eventType) ->
    unless @backend?.getModulesExportingSymbolAt?
      atom.notifications.addWarning "Backend #{@backend.name()} doesn't support
                                    getModulesExportingSymbolAt command" if @backend?
      return

    controller = @controller editor
    return unless controller?

    {crange} = controller.getEventRange null, eventType
    @backend.getModulesExportingSymbolAt editor.getBuffer(), crange, (lines) ->
      new ImportListView
        items: lines
        onConfirmed: (mod) ->
          pi = controller.findImportsPos()
          if pi?
            editor.setTextInBufferRange [pi.pos, pi.pos], "\n#{pi.indent}import #{mod}"


  queueTooltipAction: (editor, pos, eventType, fun) ->
    controller = @controller editor
    return unless controller?
    {crange, pos} = controller.getEventRange pos, eventType

    runPendingEvent = ({fun, crange}) =>
      unless @backend?[fun]?
        atom.notifications.addWarning "Backend #{@backend.name()} doesn't support
                                      #{fun} command" if @backend?
        return
      @pendingTooltipAction = null
      @tooltipActionRunning = true
      @backend?[fun] editor.getBuffer(), crange, ({range, type, info}) =>
        if @pendingTooltipAction?
          runPendingEvent @pendingTooltipAction
          return
        @tooltipActionRunning = false
        text = type ? info
        unless text?
          @backendWarning()
          return
        controller.showTooltip pos, range, text, eventType

    @pendingTooltipAction = {fun, crange}
    unless @tooltipActionRunning
      runPendingEvent @pendingTooltipAction

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
      @controllers.set editor, controller = new EditorControl(editor)
      @disposables.add editor.onDidDestroy =>
        @controllers.delete(editor) #deactivation is handled in EditorControl
      @disposables.add controller.onShouldShowTooltip ({ed, pos}) =>
        action = atom.config.get('ide-haskell.onMouseHoverShow')
        return if action == 'Nothing'
        console.log '1'
        @['show' + action + 'Tooltip'] ed, bufferPt, 'mouse'
        # @showExpressionType bufferPt, 'mouse', 'get' + action
      controller.updateResults @checkResults

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
