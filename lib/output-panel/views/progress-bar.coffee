class ProgressBar extends HTMLElement
  createdCallback: ->
    @appendChild @span = document.createElement 'span'

  setProgress: (progress, direction = 'horizontal') ->
    if direction is 'horizontal'
      @span.style.setProperty 'width', "#{progress * 100}%"
      @span.style.removeProperty 'height'
    else
      @span.style.setProperty 'height', "#{progress * 100}%"
      @span.style.removeProperty 'width'
    if progress <= 0
      @classList.remove 'visible'
    else
      @classList.add 'visible'


module.exports = ProgressBarElement =
  document.registerElement 'ide-haskell-progress-bar',
    prototype: ProgressBar.prototype
