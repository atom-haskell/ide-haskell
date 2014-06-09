{Emitter} = require 'emissary'


class PendingBackend
  pendingTasks: []        # pending tasks here
  activeTask: null        # active tasks here

  constructor: ->
    Emitter.extend(this)

  # kill all runnning processes
  deactivate: ->

  # append new process to start
  start: (func, params) ->
    @pendingTasks.push ({func, params})
    @processPendingTask()

  # pending tasks processing
  processPendingTask: ->
    return if @activeTask?

    if @pendingTasks.length is 0
      @emit 'backend-idle'
      return

    @emit 'backend-active'

    @activeTask = @pendingTasks[0]
    @pendingTasks.splice(0, 1)

    # every backend must call onDone once it stopped
    @activeTask.params.onDone = ((success = true, errorMsg = null) =>
      # TODO output messages to output view?

      @activeTask = null
      @processPendingTask()
    )

    # call function
    @activeTask.func(@activeTask.params)


module.exports = {
  PendingBackend
}
