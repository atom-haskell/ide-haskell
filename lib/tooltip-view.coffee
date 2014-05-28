{$, View} = require 'atom'

class TooltipView extends View
  @content: (text) ->
    @div class: 'ide-haskell-tooltip', "#{text}"

module.exports = {
  TooltipView
}
