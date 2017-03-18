'use babel'

import {Point} from 'atom'

interface IMessageText {
  text: string
  highlighter?: string
}

interface IMessageHTML {
  html: string
}

function isTextMessage(msg: TMessage): msg is IMessageText {
  return msg && msg['text']
}

function isHTMLMessage(msg: TMessage): msg is IMessageHTML {
  return msg && msg['html']
}

export type TMessage = string | IMessageText | IMessageHTML

export class MessageObject {
  constructor (private msg: TMessage) {
    // noop
  }

  static fromObject (message: TMessage) {
    return new MessageObject(message)
  }

  toHtml (): string {
    if (isTextMessage(this.msg) && this.msg.highlighter) {
      const html = require('atom-highlight')({
        fileContents: this.msg.text,
        scopeName: this.msg.highlighter,
        nbsp: false
      })
      if (html) return html

      this.msg.highlighter = undefined
      return this.toHtml()
    } else if (isHTMLMessage(this.msg)) {
      return this.msg.html
    } else {
      let text: string
      if(isTextMessage(this.msg)) {
        text = this.msg.text
      } else {
        text = this.msg
      }
      let div = document.createElement('div')
      div.innerText = text
      return div.innerHTML
    }
  }

  paste (element: HTMLElement) {
    element.innerHTML = this.toHtml()
  }
}
