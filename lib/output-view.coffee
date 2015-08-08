{$, View} = require 'atom-space-pen-views'
{ResultView} = require './result-view'

class OutputView extends View

  switchCounter: 0   # if counter is 0 the error tab is switched

  @content: ->
    @div class: 'ide-haskell-panel native-key-bindings', tabindex: -1, =>
      @div outlet: 'resizeHandle', class: 'resize-handle'
      @div class: 'panel', =>
        @div class: 'panel-heading', =>
          @div class: 'btn-toolbar pull-left', =>
            @div class: 'btn-group btn-cell', =>
              @div outlet: 'statusIcon', class: 'status-icon'
            @div class: 'btn-group btn-cell', =>
              @button
                click: 'switchTabView'
                outlet: 'errorsButton'
                class: 'btn tab-btn selected'
                id: 'tab1', 'Errors'
              @button
                click: 'switchTabView'
                outlet: 'warningsButton'
                class: 'btn tab-btn'
                id: 'tab2', 'Warnings'
            @div class: 'btn-group btn-cell', =>
              @button
                click: 'switchTabView'
                outlet: 'lintsButton'
                class: 'btn tab-btn'
                id: 'tab3', 'Lints'
            @div class: 'btn-group btn-cell', =>
              @button
                click: 'switchTabView'
                outlet: 'buildButton'
                class: 'btn tab-btn'
                id: 'tab4', 'Build'
          @div class: 'btn-toolbar pull-right', =>
            @button outlet: 'closeButton', class: 'btn', 'Close'
        @div class: 'panel-body padding', =>
          @div class: 'tab-view', id: 'tab1', style: 'display: block;', =>
            @subview 'errorsListView', new ResultView()
          @div class: 'tab-view', id: 'tab2', style: 'display: none;', =>
            @subview 'warningsListView', new ResultView()
          @div class: 'tab-view', id: 'tab3', style: 'display: none;', =>
            @subview 'lintsListView', new ResultView()
          @div class: 'tab-view', id: 'tab4', style: 'display: none;', =>
            @subview 'buildListView', new ResultView()

  initialize: (state, @manager) ->
    @height state?.height
    if state?.isShow? then @toggle(state.isShow) else @toggle(true)

    @switchCounter = 0   # if counter is 0 the error tab is switched

    # prepare arrays for errors, warnings and lints data
    @checkControl =
      error:
        v: @errorsListView
        b: @errorsButton
        t: @errorsButton.text()
      warning:
        v: @warningsListView
        b: @warningsButton
        t: @warningsButton.text()
      lint:
        v: @lintsListView
        b: @lintsButton
        t: @lintsButton.text()
      build:
        v: @buildListView
        b: @buildButton
        t: @buildButton.text()

    # events
    @resizeHandle.on 'mousedown', (e) => @resizeStarted e
    @closeButton.on 'click', => @toggle()

    @manager.onResultsUpdated @updateResults

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
    @switchCounter = 1

  # update current results
  updateResults: ({res, types}) =>
    @activeError = null
    for t in types
      count = res[t].length

      # update buttons and views
      @checkControl[t].v.update res[t]
      @checkControl[t].b.text @checkControl[t].t + (
        if count > 0 then " (#{count})" else ""
      )

    @autoSwitchTabView()

  # auto-switching tab
  autoSwitchTabView: ->
    @switchCounter = @switchCounter - 1
    if atom.config.get('ide-haskell.switchTabOnCheck') and @switchCounter is 0
      for t, btn of @checkControl
        if @manager.checkResults[t]?.length > 0
          @switchTabView null, btn.b
          break

  backendActive: ->
    @statusIcon.attr 'data-status', 'progress'

  backendIdle: ->
    switch @statusIcon.attr 'data-status'
      when 'error', 'warning' then return
      else @statusIcon.attr 'data-status', 'ready'

  backendWarning: ->
    switch @statusIcon.attr 'data-status'
      when 'error' then return
      else @statusIcon.attr 'data-status', 'warning'

  backendError: ->
    @statusIcon.attr 'data-status', 'error'

  next: ->
    if @activeError?
      if @activeError.next().length
        @activeError = @activeError.next()
      else
        @activeError = @activeError.closest('.tab-view').next().find('.result-block').first()
    unless @activeError?.length
      @activeError = @find('.result-block').first()
    return unless @activeError?.length
    @activeError.find('.position').click()
    id = '#' + @activeError.closest('.tab-view').attr('id')
    @find("#{id}.btn").click()
    panelDiv = @activeError.closest('.panel-body')
    panelDiv.animate
      scrollTop: panelDiv.scrollTop() + @activeError.position().top

  prev: ->
    if @activeError?
      if @activeError.prev().length
        @activeError = @activeError.prev()
      else
        @activeError = @activeError.closest('.tab-view').prev().find('.result-block').last()
    unless @activeError?.length
      @activeError = @find('.result-block').last()
    return unless @activeError?.length
    @activeError.find('.position').click()
    id = '#' + @activeError.closest('.tab-view').attr('id')
    @find("#{id}.btn").click()
    panelDiv = @activeError.closest('.panel-body')
    panelDiv.animate
      scrollTop: panelDiv.scrollTop() + @activeError.position().top

module.exports = {
  OutputView
}
