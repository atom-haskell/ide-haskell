'use babel';
import etch from 'etch';
import { MessageObject } from '../utils';
export class TooltipMessage {
    constructor(message) {
        if (Array.isArray(message)) {
            this.message = message.map((m) => etch.dom("div", { innerHTML: MessageObject.fromObject(m).toHtml() }));
        }
        else {
            this.message = [etch.dom("div", { innerHTML: MessageObject.fromObject(message).toHtml() })];
        }
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-tooltip", null, this.message));
    }
    update() {
        return etch.update(this);
    }
    writeAfterUpdate() {
        this.element.parentElement.classList.add('ide-haskell');
    }
}
