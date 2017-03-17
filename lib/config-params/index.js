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
import { ParamControl } from './param-control';
import { ConfigParamStore } from './param-store';
export class ConfigParamManager {
    constructor(outputPanel, state) {
        this.outputPanel = outputPanel;
        this.store = new ConfigParamStore(state);
    }
    destroy() {
        this.store.destroy();
        this.store = null;
        this.outputPanel = null;
    }
    serialize() {
        return this.store.serialize();
    }
    add(pluginName, specs) {
        let disp = new CompositeDisposable();
        for (let name of Object.keys(specs)) {
            let spec = specs[name];
            disp.add(this.store.addParamSpec(pluginName, name, spec));
            disp.add(this.outputPanel.addPanelControl(ParamControl, {
                pluginName,
                name,
                spec,
                store: this.store
            }));
        }
        return disp;
    }
    get(pluginName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.getValue(pluginName, name);
        });
    }
    set(pluginName, name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.setValue(pluginName, name, value);
        });
    }
}
