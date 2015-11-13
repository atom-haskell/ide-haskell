class ProgressBar extends HTMLElement
  createdCallback: ->
    @appendChild @span = document.createElement 'span'

  setProgress: (progress) ->
    @span.style.setProperty 'width', "#{progress * 100}%"
    if progress <= 0
      @style.setProperty 'visibility', 'hidden'
      # we remove the enabled class to avoid the expensive animation styles
      # associated with this element. See issue #123
      @span.classList.remove 'enabled';
    else
      @style.setProperty 'visibility', 'visible'
      # enable the aforementioned styles
      @span.classList.add 'enabled';


ProgressBarElement =
  document.registerElement 'ide-haskell-progress-bar',
    prototype: ProgressBar.prototype

module.exports = ProgressBarElement
