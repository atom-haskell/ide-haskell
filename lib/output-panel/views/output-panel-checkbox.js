'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
export class OutputPanelCheckbox {
    constructor({ id, enabled = false } = {}) {
        this.id = id;
        this.state = enabled;
        this.disposables = new CompositeDisposable();
        this.disposables.add(this.emitter = new Emitter());
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            title: () => {
                if (this.getFileFilter())
                    return 'Show current file messages';
                else
                    return 'Show all project messages';
            }
        }));
    }
    render({ enabled } = {}) {
        if (enabled !== undefined)
            this.state = enabled;
        return (etch.dom("ide-haskell-checkbox", { id: this.id, class: this.state ? 'enabled' : '', on: { click: this.toggleFileFilter } }));
    }
    update() {
        return etch.update(this);
    }
    onCheckboxSwitched(callback) {
        return this.emitter.on('checkbox-switched', callback);
    }
    setFileFilter(state) {
        this.state = state;
        this.emitter.emit('checkbox-switched', this.state);
        this.update();
    }
    getFileFilter() {
        return this.state;
    }
    toggleFileFilter() {
        this.setFileFilter(!this.getFileFilter());
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
        });
    }
}
