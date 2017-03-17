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
import { OutputPanelItem } from './output-panel-item';
export class OutputPanelItems {
    constructor({ model } = {}) {
        this.model = model;
        this.items = [];
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-items", { class: 'native-key-bindings', tabIndex: '-1' }, this.renderItems()));
    }
    renderItems() {
        return this.items.map((item) => etch.dom(OutputPanelItem, { model: item }));
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
    filter(activeFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeFilter = activeFilter;
            if (this.model) {
                this.items = this.model.filter(this.activeFilter);
            }
            else {
                this.items = [];
            }
            yield this.update();
        });
    }
    showItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update();
            let view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)];
            if (view) {
                view.querySelector('ide-haskell-item-position').click();
                view.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            }
        });
    }
    scrollToEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update();
            this.element.scrollTop = this.element.scrollHeight;
        });
    }
    atEnd() {
        return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight));
    }
}
