'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import MessageObject from '../message-object.coffee'

export class TooltipMessage {
  constructor (message) {
    if (Array.isArray(message)) { this.message = message.map((m) => <div innerHTML={MessageObject.fromObject(m).toHtml()}/>) } else { this.message = [<div innerHTML={MessageObject.fromObject(message).toHtml()}/>] }
    etch.initialize(this)
  }

  render () {
    return (
      <ide-haskell-tooltip>
        {this.message}
      </ide-haskell-tooltip>
    )
  }

  update () {
    return etch.update(this)
  }

  writeAfterUpdate () {
    this.element.parentElement.classList.add('ide-haskell')
  }
}
