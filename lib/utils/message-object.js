'use babel';
export default class MessageObject {
    constructor({ text, highlighter, html }) {
        this.text = text;
        this.highlighter = highlighter;
        this.html = html;
    }
    static fromObject(message) {
        if (typeof message === 'string') {
            return new MessageObject({ text: message });
        }
        else if (typeof message === 'object') {
            MessageObject.validate(message);
            return new MessageObject(message);
        }
    }
    static validate(message) {
        if (message.text && message.html)
            throw new Error('Can\'t have both text and html set');
        if (message.highlighter && !message.text)
            throw new Error('Must pass text when highlighter is set');
        if (!message.text && !message.html)
            throw new Error('Neither text nor html is set');
    }
    toHtml() {
        if (this.highlighter && this.text) {
            const html = require('atom-highlight')({
                fileContents: this.text,
                scopeName: this.highlighter,
                nbsp: false
            });
            if (html)
                return html;
            this.highlighter = null;
            return this.toHtml();
        }
        else if (this.html) {
            return this.html;
        }
        else {
            let div = document.createElement('div');
            div.innerText = this.text;
            return div.innerHTML;
        }
    }
    paste(element) {
        element.innerHTML = this.toHtml();
    }
}
