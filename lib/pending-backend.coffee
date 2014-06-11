{Emitter} = require 'emissary'


Channel =
  checkAndLint: 0
  expressionType: 0
  completion: 1


class PendingBackend

  constructor: ->
    Emitter.extend(this)
    @pendingTasks = [[], []]
    @activeTask = []

  # kill all runnning processes
  deactivate: ->

  # append new process to start
  start: (channel, func, params) ->
    @pendingTasks[channel].push ({func, params})
    @processPendingTask channel

  # pending tasks processing
  processPendingTask: (channel) ->
    return if @activeTask[channel]?

    # calc total length
    pendingLength = @pendingTasks.reduce (x, y) -> x.length + y.length
    # pendingLength = pendingLength + tasks.length for tasks in @pendingTasks
    @emit 'backend-idle' if pendingLength is 0

    return if @pendingTasks[channel].length is 0
    @emit 'backend-active'

    @activeTask[channel] = @pendingTasks[channel][0]
    @pendingTasks[channel].splice(0, 1)

    console.log 'run', @activeTask[channel]

    # every backend must call onDone once it stopped
    @activeTask[channel].params.onDone = ((success = true, errorMsg = null) =>
      # TODO output messages to output view?

      @activeTask[channel] = null
      @processPendingTask channel
    )

    # call function
    @activeTask[channel].func(@activeTask[channel].params)


module.exports = {
  PendingBackend,
  Channel
}
