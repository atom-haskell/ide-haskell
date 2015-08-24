class ProgressBar extends HTMLElement
  createdCallback: ->
    @appendChild @span = document.createElement 'span'

  setProgress: (progress) ->
    @span.style.setProperty 'width', "#{progress * 100}%"
    if progress <= 0
      @style.setProperty 'visibility', 'hidden'
    else
      @style.setProperty 'visibility', 'visible'


ProgressBarElement =
  document.registerElement 'ide-haskell-progress-bar',
    prototype: ProgressBar.prototype

module.exports = ProgressBarElement
