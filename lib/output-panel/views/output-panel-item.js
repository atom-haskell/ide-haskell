'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import etch from 'etch';
import { MessageObject } from '../../utils';
export class OutputPanelItem {
    constructor({ model } = {}) {
        this.model = model;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-item", null,
            this.renderPosition(),
            etch.dom("ide-haskell-item-description", { innerHTML: MessageObject.fromObject(this.model.message).toHtml() })));
    }
    renderPosition() {
        if (this.model.uri && this.model.position) {
            return (etch.dom("ide-haskell-item-position", { on: { click: this.didClickPosition } },
                this.model.uri,
                ": ",
                this.model.position.row + 1,
                ", ",
                this.model.position.column + 1));
        }
        else
            return null;
    }
    update({ model } = {}) {
        if (model)
            this.model = model;
        return etch.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    didClickPosition() {
        atom.workspace.open(this.model.uri).then((editor) => editor.setCursorBufferPosition(this.model.position));
    }
}
