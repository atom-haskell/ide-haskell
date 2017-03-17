'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import selectListView from './param-select-view';
import { Emitter, CompositeDisposable, Disposable } from 'atom';
export class ConfigParamStore {
    constructor(state = {}) {
        this.disposables = new CompositeDisposable();
        this.emitter = new Emitter();
        this.disposables.add(this.emitter);
        this.saved = state;
        this.plugins = new Map();
    }
    serialize() {
        return this.saved;
    }
    destroy() {
        this.disposables.dispose();
        this.disposables = null;
        this.emitter = null;
        this.saved = null;
        this.plugins = null;
    }
    onDidUpdate(callback) {
        return this.emitter.on('did-update', callback);
    }
    addParamSpec(pluginName, paramName, spec) {
        if (!this.plugins.has(pluginName))
            this.plugins.set(pluginName, new Map());
        let pluginConfig = this.plugins.get(pluginName);
        if (pluginConfig.has(paramName))
            throw new Error(`Parameter ${pluginName}.${paramName} already defined!`);
        let value = this.saved[`${pluginName}.${paramName}`];
        if (value === undefined)
            value = spec.default;
        pluginConfig.set(paramName, { spec, value });
        this.emitter.emit('did-update', { pluginName, paramName, value });
        return new Disposable(() => {
            let pluginConfig = this.plugins.get(pluginName);
            pluginConfig.delete(paramName);
            if (pluginConfig.size === 0)
                this.plugins.delete(pluginName);
        });
    }
    setValue(pluginName, paramName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let paramConfig = this.plugins.get(pluginName).get(paramName);
            if (value === undefined)
                value = yield this.showSelect(paramConfig.spec);
            if (value !== undefined) {
                paramConfig.value = value;
                this.saved[`${pluginName}.${paramName}`] = value;
                this.emitter.emit('did-update', { pluginName, paramName, value });
            }
            return value;
        });
    }
    getValue(pluginName, paramName) {
        return __awaiter(this, void 0, void 0, function* () {
            let paramConfig = this.plugins.get(pluginName).get(paramName);
            if (paramConfig.value === undefined)
                yield this.setValue(pluginName, paramName);
            return paramConfig.value;
        });
    }
    getValueRaw(pluginName, paramName) {
        let paramConfig = this.plugins.get(pluginName).get(paramName);
        return paramConfig.value;
    }
    showSelect(spec) {
        return __awaiter(this, void 0, void 0, function* () {
            return selectListView({
                items: (typeof spec.items === 'function') ? spec.items() : spec.items,
                heading: spec.description,
                itemTemplate: spec.itemTemplate,
                itemFilterKey: spec.itemFilterKey
            });
        });
    }
}
