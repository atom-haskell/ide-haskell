import highlight = require('atom-highlight')
import * as cast from './cast'

export class MessageObject implements UPI.IMessageObject {
  private htmlCache?: string
  constructor(private msg: UPI.TMessage) {
    // noop
  }

  public static fromObject(message: UPI.TMessage | UPI.IMessageObject): UPI.IMessageObject {
    if (cast.isIMessageObject(message)) {
      return message
    } else {
      return new MessageObject(message)
    }
  }

  public toHtml(linter: boolean = false): string {
    if (this.htmlCache !== undefined) { return this.htmlCache }
    if (cast.isTextMessage(this.msg) && this.msg.highlighter) {
      const html = highlight({
        fileContents: this.msg.text,
        scopeName: this.msg.highlighter,
        nbsp: linter,
        lineDivs: linter,
      })
      if (html) { return this.htmlCache = html }

      this.msg.highlighter = undefined
      return this.toHtml()
    } else if (cast.isHTMLMessage(this.msg)) {
      return this.htmlCache = this.msg.html
    } else {
      let text: string
      if (cast.isTextMessage(this.msg)) {
        text = this.msg.text
      } else {
        text = this.msg
      }
      const div = document.createElement('div')
      div.innerText = text
      return this.htmlCache = div.innerHTML
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
