{$, $$$, View} = require 'atom'

MessageView = require './message-view'

module.exports =
  class ResultView extends View
    tabs: null

    @content: ->
      @div class: 'ide-haskell-output-view', =>
        @div outlet: 'resizeHandle', class: 'resize-handle'
        @div class: 'panel', =>
          @div class: 'panel-heading', =>
            @div class: 'btn-toolbar pull-left', =>
              @div class: 'btn-group', =>
                @button outlet: 'errsBtn', class: 'btn selected', 'Errors'
                @button outlet: 'warnBtn', class: 'btn', 'Warnings'
              @div class: 'btn-group', =>
                @button outlet: 'lintBtn', class: 'btn', 'Lints'
            @div class: 'btn-toolbar pull-right', =>
              @button class: 'btn', 'Close'
          @div class: 'panel-body padding', =>
            @ul outlet: 'errsLst', class: 'list-group'
            @ul outlet: 'warnLst', class: 'list-group', style: 'display: none;'
            @ul outlet: 'lintLst', class: 'list-group', style: 'display: none;'

    initialize: (state) ->
      @height state?.height

      @tabs = [ {button: @errsBtn, view: @errsLst, count: 0}
              , {button: @warnBtn, view: @warnLst, count: 0}
              , {button: @lintBtn, view: @lintLst, count: 0}
              ]

      @resizeHandle.on 'mousedown', (e) => @resizeStarted e
      for tab in @tabs
        tab.button.on 'click', (e) => @switch e.currentTarget

      # prepare tabs
      @prepareEverything()

    serialize: ->
      height: @height()

    attach: ->
      atom.workspaceView.prependToBottom(this)

    resizeStarted: ({pageY}) =>
      @resizeData =
        pageY: pageY
        height: @height()
      $(document.body).on 'mousemove', @resizeView
      $(document.body).on 'mouseup', @resizeStopped

    resizeStopped: ->
      $(document.body).off 'mousemove', @resizeView
      $(document.body).off 'mouseup', @resizeStopped

    resizeView: ({pageY}) =>
      @height @resizeData.height + @resizeData.pageY - pageY

    switch: (btn) ->
      for tab, index in @tabs
        if tab.button[0] is btn
          tab.button.addClass('selected')
          tab.view.show()
        else
          tab.button.removeClass('selected')
          tab.view.hide()

    prepareEverything: ->
      @clearTab tab for tab in @tabs

    # Clear view.
    clearTab: (tab) ->
      tab.view.addClass('background-message')
      tab.view.text('Haskell IDE')
      tab.count = 0

    # Prepare tab for result list.
    prepareTab: (tab) ->
      tab.view.removeClass('background-message')
      tab.view.text('')

    # Render check results.
    renderCheck: (results) ->
      @clearTab tab for tab in [@tabs[0], @tabs[1]]
      @render results

    # Render lints.
    renderLints: (results) ->
      @clearTab tab for tab in [@tabs[2]]
      @render results

    # Render result due to result type
    render: (results) ->
      for res in results
        curTab = @tabs[res.type]
        @prepareTab curTab if curTab.count is 0
        curTab.view.append(new MessageView res)
        curTab.count = curTab.count + 1
