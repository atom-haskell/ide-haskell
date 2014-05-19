{$, View} = require 'atom'
ResultType = require './constants'
ResultView = require './result-view'

module.exports =
  class OutputView extends View

    checkCounter: 0     # working process counter

    @content: ->
      @div class: 'ide-haskell-output-view', =>
        @div outlet: 'resizeHandle', class: 'resize-handle'
        @div class: 'panel', =>
          @div class: 'panel-heading', =>
            @div class: 'btn-toolbar pull-left', =>
              @div class: 'btn-group', =>
                @div outlet: 'status', class: 'status'
              @div class: 'btn-group', =>
                @button outlet: 'errsBtn', class: 'btn selected'
                @button outlet: 'warnBtn', class: 'btn'
              @div class: 'btn-group', =>
                @button outlet: 'lintBtn', class: 'btn hidden'
            @div class: 'btn-toolbar pull-right', =>
              @button outlet: 'closeBtn', class: 'btn', 'Close'
          @div class: 'panel-body padding', =>
            @ul outlet: 'errsLst', class: 'list-group'
            @ul outlet: 'warnLst', class: 'list-group', style: 'display: none;'
            @ul outlet: 'lintLst', class: 'list-group', style: 'display: none;'

    initialize: (state) ->
      @height state?.height
      @show = if state?.show? then state.show else true

      @tabs = [
        {button: @errsBtn, view: @errsLst, count: 0, name: 'Errors'},
        {button: @warnBtn, view: @warnLst, count: 0, name: 'Warnings'},
        {button: @lintBtn, view: @lintLst, count: 0, name: 'Lints'}
      ]
      @tabFromResultType = [@tabs[0], @tabs[1], @tabs[2]]
      @checkTabs = [
        @tabFromResultType[ResultType.Error],
        @tabFromResultType[ResultType.Warning]
      ]
      @lintsTabs = [
        @tabFromResultType[ResultType.Lint]
      ]

      @resizeHandle.on 'mousedown', (e) => @resizeStarted e
      for tab in @tabs
        tab.button.on 'click', (e) => @switch e.currentTarget
      @closeBtn.on 'click', => @toggle()

      @prepareEverything()

    serialize: ->
      height: @height()
      show: @show

    attach: ->
      atom.workspaceView.prependToBottom(this)

    toggle: ->
      @show = not @show
      if @show then @attach() else @detach()

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
      for tab in @tabs
        @setButtonResult tab
        @clearTab tab
      @attach() if @show

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
      @clearTab tab for tab in @checkTabs
      @render results

    # Render lints.
    renderLints: (results) ->
      @clearTab tab for tab in @lintsTabs
      @render results

    # Render result due to result type
    render: (results) ->
      for res in results
        curTab = @tabFromResultType[res.type]
        continue unless curTab?

        @prepareTab curTab if curTab.count is 0
        curTab.view.append(new ResultView res)
        curTab.count = curTab.count + 1
      @setButtonResult tab for tab in @tabs

    # Set name of button with counter
    setButtonResult: (tab) ->
      if tab.count > 0
        tab.button.text("#{tab.name} (#{tab.count})")
      else
        tab.button.text("#{tab.name}")

    # Work process started
    incCheckCounter: ->
      @status.attr 'data-status', 'working' if @checkCounter is 0
      @checkCounter = @checkCounter + 1

    # Work process finished
    decCheckCounter: ->
      @checkCounter = @checkCounter - 1
      if @checkCounter is 0
        @status.attr 'data-status', 'ready'

        # automatic tab switching
        if atom.config.get('ide-haskell.tabSwitchOnCheck')
          for tab in @tabs
            if tab.count > 0
              @switch tab.button[0]
              break
