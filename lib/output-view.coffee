{View} = require 'atom-space-pen-views'
$ = require 'jquery'
{ResultView} = require './result-view'
{ResultType} = require './util-data'

class OutputView extends View

  switchCounter: 0   # if counter is 0 the error tab is switched

  @content: ->
    @div class: 'ide-haskell-panel', =>
      @div outlet: 'resizeHandle', class: 'resize-handle'
      @div class: 'panel', =>
        @div class: 'panel-heading', =>
          @div class: 'btn-toolbar pull-left', =>
            @div class: 'btn-group btn-cell', =>
              @div outlet: 'statusIcon', class: 'status-icon'
            @div class: 'btn-group btn-cell', =>
              @button click: 'switchTabView', outlet: 'errorsButton', class: 'btn tab-btn selected', id: 'tab1', 'Errors'
              @button click: 'switchTabView', outlet: 'warningsButton', class: 'btn tab-btn', id: 'tab2', 'Warnings'
            @div class: 'btn-group btn-cell', =>
              @button click: 'switchTabView', outlet: 'lintsButton', class: 'btn tab-btn', id: 'tab3', 'Lints'
          @div class: 'btn-toolbar pull-right', =>
            @button outlet: 'closeButton', class: 'btn', 'Close'
        @div class: 'panel-body padding', =>
          @div class: 'tab-view', id: 'tab1', style: 'display: block;', =>
            @subview 'errorsListView', new ResultView()
          @div class: 'tab-view', id: 'tab2', style: 'display: none;', =>
            @subview 'warningsListView', new ResultView()
          @div class: 'tab-view', id: 'tab3', style: 'display: none;', =>
            @subview 'lintsListView', new ResultView()

  initialize: (state, @manager) ->
    @height state?.height
    if state?.isShow? then @toggle(state.isShow) else @toggle(true)

    @switchCounter = 0   # if counter is 0 the error tab is switched

    # prepare arrays for errors, warnings and lints data
    @checkControl = [
      { v: @errorsListView, b: @errorsButton, t: @errorsButton.text() },
      { v: @warningsListView, b: @warningsButton, t: @warningsButton.text() },
      { v: @lintsListView, b: @lintsButton, t: @lintsButton.text() },
    ]

    # events
    @resizeHandle.on 'mousedown', (e) => @resizeStarted e
    @closeButton.on 'click', => @toggle()

  deactivate: ->
    @remove()

  serialize: ->
    height: @height()
    isShow: @isShow

  # toggle
  toggle: (isShow = undefined) ->
    if isShow? then @isShow = isShow else @isShow = not @isShow
    if @isShow then @attach() else @detach()

  attach: ->
    atom.workspace.addBottomPanel
      item: this

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

  switchTabView: (_, element) ->
    this.find('.btn.tab-btn').removeClass('selected')
    element.addClass('selected')
    this.find("div##{element[0].id}").show().siblings().hide()

  # method is called before start of any check commands
  pendingCheck: ->
    @switchCounter++

  # update current results
  resultsUpdated: (types) ->

    # update result views if everything is ok
    if types?
      for t in types
        # button name calculation
        count = @manager.checkResults[t].length
        buttonName = @checkControl[t].t + (
          if count > 0 then " (#{count})" else ""
        )

        # update buttons and views
        @checkControl[t].v.update @manager.checkResults[t]
        @checkControl[t].b.text buttonName

    @autoSwitchTabView()

  # auto-switching tab
  autoSwitchTabView: ->
    @switchCounter = @switchCounter - 1
    if atom.config.get('ide-haskell.switchTabOnCheck') and @switchCounter is 0
      for btn, t in @checkControl
        if @manager.checkResults[t]?.length > 0
          @switchTabView null, btn.b
          break

  backendActive: ->
    @statusIcon.attr 'data-status', 'progress'

  backendIdle: ->
    @statusIcon.attr 'data-status', 'ready'


module.exports = {
  OutputView
}
