OutputPanel = require './output-panel/output-panel'
OutputPanelElement = require './output-panel/views/output-panel'
{EditorControl} = require './editor-control'
utilStylishHaskell = require './binutils/util-stylish-haskell'
utilCabalFormat = require './binutils/util-cabal-format'
ImportListView = require './views/import-list-view'
{TooltipMessage, TooltipElement} = require './views/tooltip-view'
ResultsDB = require './results-db'
ResultItem = require './result-item'
OutputPanelItemElement = require './output-panel/views/output-panel-item'
{CompositeDisposable} = require 'atom'
TargetListView = require './views/target-list-view'

class PluginManager
  constructor: (state, backend, buildBackend) ->
    @checkResults = new ResultsDB

    @disposables = new CompositeDisposable
    @controllers = new WeakMap

    @disposables.add atom.views.addViewProvider TooltipMessage, (message) ->
      (new TooltipElement).setMessage message
    @disposables.add atom.views.addViewProvider OutputPanel, (panel) ->
      (new OutputPanelElement).setModel panel
    @disposables.add atom.views.addViewProvider ResultItem, (resultitem) ->
      (new OutputPanelItemElement).setModel resultitem
    @disposables.add @onResultsUpdated ({types}) => @updateEditorsWithResults(types)

    @createOutputViewPanel(state)
    @subscribeEditorController()

    @setBackend backend if backend?
    @setBuildBackend buildBackend if buildBackend?

  deactivate: ->
    @checkResults.destroy()
    @disposables.dispose()
    @backend?.shutdownBackend?()

    @deleteEditorControllers()
    @deleteOutputViewPanel()

  serialize: ->
    outputView: @outputView?.serialize()

  setBackend: (@backend) =>
    if @backend?.onBackendActive?
      @disposables.add @backend.onBackendActive =>
        @outputView.backendStatus status: 'progress'
    if @backend?.onBackendIdle?
      @disposables.add @backend.onBackendIdle =>
        @outputView.backendStatus status: 'ready'

  setBuildBackend: (@buildBackend) =>
    if @buildBackend?.onBackendStatus?
      @disposables.add @buildBackend.onBackendStatus ({status, opts}) =>
        @outputView.backendStatus {status, progress: opts}
    if @buildBackend?.onMessages?
      @disposables.add @buildBackend.onMessages (msgs) =>
        @checkResults.appendResults msgs
    if @buildBackend?.onClearMessages?
      @disposables.add @buildBackend.onClearMessages (types) =>
        @checkResults.setResults [], types
    if @buildBackend?.getPossibleMessageTypes?
      types = @buildBackend.getPossibleMessageTypes()
      for type, opts of types
        @outputView.createTab type, opts

  backendWarning: =>
    @outputView.backendStatus status: 'warning'

  togglePanel: ->
    @outputView?.toggle()

  buildProject: =>
    return unless @buildBackend?
    @buildBackend.getTargets().then (targets) =>
      new TargetListView
        items: targets.targets
        onConfirmed: (target) =>
          @buildBackend.build target, # TODO: target selection
            setCancelAction: (action) =>
              @outputView.onActionCancelled action

  cleanProject: =>
    return unless @buildBackend?

    @buildBackend.clean()

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
    func editor.getBuffer(), (res) =>
      @checkResults.setResults res, types

  updateEditorsWithResults: (types) ->
    for ed in atom.workspace.getTextEditors()
      @controller(ed)?.updateResults?(@checkResults.filter uri: ed.getPath(), types)

  onResultsUpdated: (callback) =>
    @checkResults.onDidUpdate callback

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

  # Create and delete output view panel.
  createOutputViewPanel: (state) ->
    @outputView = new OutputPanel(state.outputView, @checkResults)

  deleteOutputViewPanel: ->
    @outputView.destroy()
    @outputView = null

  addController: (editor) ->
    unless @controllers.get(editor)?
      @controllers.set editor, controller = new EditorControl(editor)
      @disposables.add editor.onDidDestroy =>
        @controllers.delete(editor) #deactivation is handled in EditorControl
      @disposables.add controller.onShouldShowTooltip ({editor, pos}) =>
        action = atom.config.get('ide-haskell.onMouseHoverShow')
        return if action == 'Nothing'
        @['show' + action + 'Tooltip'] editor, pos, 'mouse'
      controller.updateResults @checkResults.filter uri: editor.getPath()

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
    @outputView?.showNextError()

  prevError: ->
    @outputView?.showPrevError()


module.exports = {
  PluginManager
}
