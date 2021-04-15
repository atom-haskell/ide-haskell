import { hightlightLines } from 'atom-highlight'
import * as cast from './cast'
import * as UPI from 'atom-haskell-upi'
import Memoize from 'lodash-decorators/memoize'

export class MessageObject {
  constructor(private msg: UPI.TMessage) {
    // noop
  }

  public static fromObject = (
    message: UPI.TMessage | MessageObject,
  ): MessageObject => {
    if (message instanceof MessageObject) {
      return message
    } else {
      return new MessageObject(message)
    }
  }

  @Memoize()
  public toHtml(): string {
    if (cast.isTextMessage(this.msg) && this.msg.highlighter !== undefined) {
      const html = Array.from(
        hightlightLines(this.msg.text.split('\n'), this.msg.highlighter),
      )
      if (html.length > 0) return html.join('\n')

      this.msg.highlighter = undefined
      return this.toHtml()
    } else if (cast.isHTMLMessage(this.msg)) {
      return this.msg.html
    } else {
      let text: string
      if (cast.isTextMessage(this.msg)) {
        text = this.msg.text
      } else {
        text = this.msg
      }
      const div = document.createElement('div')
      div.innerText = text
      return div.innerHTML
    }
  }

  @Memoize()
  public toPlain(): string {
    if (cast.isHTMLMessage(this.msg)) {
      const div = document.createElement('div')
      div.innerHTML = this.msg.html
      return div.innerText
    } else {
      let text: string
      if (cast.isTextMessage(this.msg)) {
        text = this.msg.text
      } else {
        text = this.msg
      }
      return text
    }
  }

  public raw(): string {
    if (cast.isTextMessage(this.msg)) {
      return this.msg.text
    } else if (cast.isHTMLMessage(this.msg)) {
      return this.msg.html
    } else {
      return this.msg
    }
  }
}
