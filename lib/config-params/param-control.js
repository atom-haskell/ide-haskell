'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CompositeDisposable } from 'atom';
import etch from 'etch';
export class ParamControl {
    constructor({ pluginName, name, spec, store }, children) {
        this.pluginName = pluginName;
        this.spec = spec;
        this.name = name;
        this.store = store;
        this.disposables = new CompositeDisposable();
        this.disposables.add(atom.config.observe('ide-haskell.hideParameterValues', (val) => {
            this.hiddenValue = val;
            if (this.element)
                this.update();
        }));
        this.initStore();
        this.initSpec();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            title: () => {
                if (this.hiddenValue) {
                    return `${this.spec.displayName}: ${this.spec.displayTemplate(this.value)}`;
                }
                else {
                    return this.spec.displayName;
                }
            }
        }));
    }
    initStore() {
        if (this.storeDisposable)
            this.disposables.remove(this.storeDisposable);
        this.storeDisposable =
            this.store.onDidUpdate(({ pluginName, paramName, value }) => {
                if (this.pluginName === pluginName && this.name === paramName) {
                    this.value = value;
                    this.update();
                }
            });
        this.disposables.add(this.storeDisposable);
        this.value = this.store.getValueRaw(this.pluginName, this.name);
    }
    initSpec() {
        if (!this.spec.displayName) {
            this.spec.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        }
    }
    render() {
        let classList = [`ide-haskell--${this.pluginName}`, `ide-haskell-param--${this.name}`];
        if (this.hiddenValue) {
            classList.push('hidden-value');
        }
        return (etch.dom("ide-haskell-param", { class: classList.join(' '), on: { click: this.setValue } },
            etch.dom("ide-haskell-param-value", null, this.spec.displayTemplate(this.value))));
    }
    update({ pluginName, name, spec, store } = {}) {
        if (pluginName)
            this.pluginName = pluginName;
        if (name)
            this.name = name;
        if (spec && this.spec !== spec) {
            this.spec = spec;
            this.initSpec();
        }
        if (store && this.store !== store) {
            this.store = store;
            this.initStore();
        }
        return etch.update(this);
    }
    setValue(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.setValue(this.pluginName, this.name);
            this.update();
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
            this.pluginName = null;
            this.spec = null;
            this.name = null;
            this.store = null;
            this.value = null;
            this.storeDisposable = null;
        });
    }
}
