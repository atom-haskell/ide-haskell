interface IMessageText {
  text: string
  highlighter?: string
}

interface IMessageHTML {
  html: string
}

function isTextMessage (msg: TMessage): msg is IMessageText {
  return !!(msg && (msg as IMessageText).text)
}

function isHTMLMessage (msg: TMessage): msg is IMessageHTML {
  return !!(msg && (msg as IMessageHTML).html)
}
export type TMessage = string | IMessageText | IMessageHTML | MessageObject

export class MessageObject {
  public static fromObject (message: TMessage): MessageObject  {
    if (message instanceof MessageObject) {
      return message
    } else {
      return new MessageObject(message)
    }
  }

  private htmlCache?: string
  constructor (private msg: string | IMessageText | IMessageHTML) {
    // noop
  }

  public toHtml (): string {
    if (this.htmlCache !== undefined) { return this.htmlCache }
    if (isTextMessage(this.msg) && this.msg.highlighter) {
      const html = require('atom-highlight')({
        fileContents: this.msg.text,
        scopeName: this.msg.highlighter,
        nbsp: false
      })
      if (html) { return this.htmlCache = html }

      this.msg.highlighter = undefined
      return this.toHtml()
    } else if (isHTMLMessage(this.msg)) {
      return this.htmlCache = this.msg.html
    } else {
      let text: string
      if (isTextMessage(this.msg)) {
        text = this.msg.text
      } else {
        text = this.msg
      }
      const div = document.createElement('div')
      div.innerText = text
      return this.htmlCache = div.innerHTML
    }
  }

  public paste (element: HTMLElement) {
    element.innerHTML = this.toHtml()
  }
}
