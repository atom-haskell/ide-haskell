{MessagePanelView, PlainMessageView} = require 'atom-message-panel'
MessageViewCheck                     = require './message-view-check'
TaskGhcMod                           = require './task-ghc-mod'

module.exports =
  activate: (state) ->
    @taskGhcMod = new TaskGhcMod

    atom.workspaceView.command "ide-haskell:check", => @check()
    atom.workspaceView.command "ide-haskell:get-type", => @getType()
    atom.workspaceView.command "ide-haskell:lint", => @lint()

  deactivate: ->

  serialize: ->

  # ghc-mod check
  check: ->
    editorView = atom.workspaceView.getActiveView()
    fileName = atom.workspace.getActiveEditor()?.getPath()
    return unless editorView? or fileName?

    # clear view
    editorView.find('.ide-haskell-error').removeClass('ide-haskell-error')
    editorView.find('.ide-haskell-warning').removeClass('ide-haskell-warning')
    @messagePanel?.detach()
    @messagePanel = null

    panelInView = false

    # run check process
    @taskGhcMod.check
      fileName: fileName
      onResult: (result) =>
        console.log "ghc-mod check results:", result
        {type, content, fname} = result
        [line, column] = result.pos

        # show message panel
        if !panelInView
          @messagePanel = new MessagePanelView
            title: 'IDE Haskell: ghc-mod check'
          @messagePanel.attach()
          panelInView = true

        # TODO create preview code

        # highligh errors and warnings
        if fname == fileName
          editorView.lineElementForScreenRow(line - 1).addClass(
              if type == 'Error' then 'ide-haskell-error' else 'ide-haskell-warning'
          )

        # TODO count warnings and errors

        @messagePanel.add(
            new MessageViewCheck
                line: line
                column: column
                fileName: fname
                message: type
                preview: 'preview'
        )

        content.map (m) => @messagePanel.add(
            new PlainMessageView
                message: m
        )

  # ghc-mod type
  getType: ->
    editor = atom.workspace.getActiveEditor()
    fileName = editor?.getPath()
    return unless editor? or fileName?

    pos = editor.getCursor().getBufferPosition()

    @messagePanel?.detach()
    @messagePanel = null
    panelInView = false

    @taskGhcMod.getType
      fileName: fileName
      pos: [pos.row, pos.column]
      onResult: (result) =>
        console.log "ghc-mod type results:", result

        # show message panel
        if !panelInView
          @messagePanel = new MessagePanelView
            title: 'IDE Haskell: ghc-mod type'
          @messagePanel.attach()
          panelInView = true

        expr = editor.getTextInRange(
            [ [ result.startPos[0] - 1, result.startPos[1] - 1 ]
            , [ result.endPos[0] - 1, result.endPos[1] - 1]
            ]
        )

        @messagePanel.add(
            new PlainMessageView
                message: "<span class=\"code\">#{expr}</span><span class=\"type\">#{result.type}"
                raw: true
                className: "ide-haskell-typeinfo"
        )


  # ghc-mod lint
  lint: ->
