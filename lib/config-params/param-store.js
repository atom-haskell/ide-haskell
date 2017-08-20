"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const param_select_view_1 = require("./param-select-view");
const atom_1 = require("atom");
class ConfigParamStore {
    constructor(state = {}) {
        this.disposables = new atom_1.CompositeDisposable();
        this.emitter = new atom_1.Emitter();
        this.disposables.add(this.emitter);
        this.saved = state;
        this.plugins = new Map();
    }
    serialize() {
        return this.saved;
    }
    destroy() {
        this.disposables.dispose();
    }
    onDidUpdate(pluginName, paramName, callback) {
        return this.emitter.on('did-update', (val) => {
            if (val.pluginName === pluginName && val.paramName === paramName) {
                callback(val);
            }
        });
    }
    addParamSpec(pluginName, paramName, spec) {
        let pluginConfig = this.plugins.get(pluginName);
        if (!pluginConfig) {
            pluginConfig = new Map();
            this.plugins.set(pluginName, pluginConfig);
        }
        if (pluginConfig.has(paramName)) {
            throw new Error(`Parameter ${pluginName}.${paramName} already defined!`);
        }
        let value = this.saved[`${pluginName}.${paramName}`];
        if (value === undefined) {
            value = spec.default;
        }
        pluginConfig.set(paramName, { spec, value });
        this.emitter.emit('did-update', { pluginName, paramName, value });
        return new atom_1.Disposable(() => {
            if (pluginConfig) {
                pluginConfig.delete(paramName);
                if (pluginConfig.size === 0) {
                    this.plugins.delete(pluginName);
                }
            }
        });
    }
    setValue(pluginName, paramName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const paramConfig = yield this.getParamConfig(pluginName, paramName, 'set');
            if (paramConfig === undefined)
                return undefined;
            if (value === undefined) {
                value = yield this.showSelect(paramConfig.spec);
            }
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
            const paramConfig = yield this.getParamConfig(pluginName, paramName, 'get');
            if (paramConfig === undefined)
                return undefined;
            if (paramConfig.value === undefined) {
                yield this.setValue(pluginName, paramName);
            }
            return paramConfig.value;
        });
    }
    getValueRaw(pluginName, paramName) {
        return __awaiter(this, void 0, void 0, function* () {
            const paramConfig = yield this.getParamConfig(pluginName, paramName, 'get raw');
            if (paramConfig === undefined)
                return undefined;
            return paramConfig.value;
        });
    }
    getParamConfig(pluginName, paramName, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!atom.packages.isPackageLoaded(pluginName)) {
                console.error(new Error(`No ${pluginName} package while trying to ${reason} ${pluginName}.${paramName}`));
                return undefined;
            }
            if (!atom.packages.isPackageActive(pluginName)) {
                yield atom.packages.activatePackage(pluginName);
            }
            const pluginConfig = this.plugins.get(pluginName);
            if (!pluginConfig) {
                throw new Error(`${pluginName} is not defined while trying to ${reason} ${pluginName}.${paramName}`);
            }
            const paramConfig = pluginConfig.get(paramName);
            if (!paramConfig) {
                throw new Error(`${paramName} is not defined while trying to ${reason} ${pluginName}.${paramName}`);
            }
            return paramConfig;
        });
    }
    showSelect(spec) {
        return __awaiter(this, void 0, void 0, function* () {
            return param_select_view_1.selectListView({
                items: (typeof spec.items === 'function') ? spec.items() : spec.items,
                heading: spec.description,
                itemTemplate: spec.itemTemplate.bind(spec),
                itemFilterKey: spec.itemFilterKey,
            });
        });
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQW9EO0FBQ3BELCtCQUF5RTtBQWN6RTtJQU9FLFlBQVksUUFBZ0IsRUFBRTtRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFJLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxRQUE2QjtRQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRztZQUN2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxZQUFZLENBQUksVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQXVCO1FBQ25GLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDNUMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxVQUFVLElBQUksU0FBUyxtQkFBbUIsQ0FBQyxDQUFBO1FBQzFFLENBQUM7UUFDRCxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBTSxDQUFBO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7UUFBQyxDQUFDO1FBQ2pELFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtnQkFDakMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFWSxRQUFRLENBQUksVUFBa0IsRUFBRSxTQUFpQixFQUFFLEtBQVM7O1lBQ3ZFLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBSSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzlFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUMvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUFDLENBQUM7WUFDL0UsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxJQUFJLFNBQVMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFBO2dCQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDbkUsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDZCxDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUksVUFBa0IsRUFBRSxTQUFpQjs7WUFDNUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFJLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDOUUsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxXQUFXLENBQUksVUFBa0IsRUFBRSxTQUFpQjs7WUFDL0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFJLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFDbEYsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVhLGNBQWMsQ0FBSSxVQUFrQixFQUFFLFNBQWlCLEVBQUUsTUFBYzs7WUFDbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxVQUFVLDRCQUE0QixNQUFNLElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDekcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFVBQVUsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUN0RyxDQUFDO1lBQ0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxTQUFTLG1DQUFtQyxNQUFNLElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUE7WUFDckcsQ0FBQztZQUNELE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDcEIsQ0FBQztLQUFBO0lBRWEsVUFBVSxDQUFJLElBQXVCOztZQUNqRCxNQUFNLENBQUMsa0NBQWMsQ0FBSTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDckUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDbEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUExR0QsNENBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0TGlzdFZpZXcgfSBmcm9tICcuL3BhcmFtLXNlbGVjdC12aWV3J1xuaW1wb3J0IHsgVEVtaXR0ZXIsIEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuXG5pbnRlcmZhY2UgSVBhcmFtRGF0YTxUPiB7XG4gIHNwZWM6IFVQSS5JUGFyYW1TcGVjPFQ+XG4gIHZhbHVlPzogVFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XG4gIFtwbHVnaW5OYW1lUGFyYW1OYW1lOiBzdHJpbmddOiBPYmplY3Rcbn1cblxuaW50ZXJmYWNlIFRVcGRhdGVkQ2FsbGJhY2tBcmc8VD4geyBwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZTogVCB8IHVuZGVmaW5lZCB9XG5leHBvcnQgdHlwZSBUVXBkYXRlZENhbGxiYWNrPFQ+ID0gKGFyZzogVFVwZGF0ZWRDYWxsYmFja0FyZzxUPikgPT4gdm9pZFxuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1TdG9yZSB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBlbWl0dGVyOiBURW1pdHRlcjx7XG4gICAgJ2RpZC11cGRhdGUnOiB7IHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkgfVxuICB9PlxuICBwcml2YXRlIHNhdmVkOiBJU3RhdGVcbiAgcHJpdmF0ZSBwbHVnaW5zOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBJUGFyYW1EYXRhPGFueT4+PlxuICBjb25zdHJ1Y3RvcihzdGF0ZTogSVN0YXRlID0ge30pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIpXG4gICAgdGhpcy5zYXZlZCA9IHN0YXRlXG4gICAgdGhpcy5wbHVnaW5zID0gbmV3IE1hcCgpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLnNhdmVkXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIG9uRGlkVXBkYXRlPFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBUVXBkYXRlZENhbGxiYWNrPFQ+KSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXVwZGF0ZScsICh2YWwpID0+IHtcbiAgICAgIGlmICh2YWwucGx1Z2luTmFtZSA9PT0gcGx1Z2luTmFtZSAmJiB2YWwucGFyYW1OYW1lID09PSBwYXJhbU5hbWUpIHtcbiAgICAgICAgY2FsbGJhY2sodmFsKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYWRkUGFyYW1TcGVjPFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IFVQSS5JUGFyYW1TcGVjPFQ+KSB7XG4gICAgbGV0IHBsdWdpbkNvbmZpZyA9IHRoaXMucGx1Z2lucy5nZXQocGx1Z2luTmFtZSlcbiAgICBpZiAoIXBsdWdpbkNvbmZpZykge1xuICAgICAgcGx1Z2luQ29uZmlnID0gbmV3IE1hcCgpXG4gICAgICB0aGlzLnBsdWdpbnMuc2V0KHBsdWdpbk5hbWUsIHBsdWdpbkNvbmZpZylcbiAgICB9XG4gICAgaWYgKHBsdWdpbkNvbmZpZy5oYXMocGFyYW1OYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX0gYWxyZWFkeSBkZWZpbmVkIWApXG4gICAgfVxuICAgIGxldCB2YWx1ZTogVCB8IHVuZGVmaW5lZCA9IHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gYXMgVFxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHZhbHVlID0gc3BlYy5kZWZhdWx0IH1cbiAgICBwbHVnaW5Db25maWcuc2V0KHBhcmFtTmFtZSwgeyBzcGVjLCB2YWx1ZSB9KVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJywgeyBwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlIH0pXG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIGlmIChwbHVnaW5Db25maWcpIHtcbiAgICAgICAgcGx1Z2luQ29uZmlnLmRlbGV0ZShwYXJhbU5hbWUpXG4gICAgICAgIGlmIChwbHVnaW5Db25maWcuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucGx1Z2lucy5kZWxldGUocGx1Z2luTmFtZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWU8VD4ocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgdmFsdWU/OiBUKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSBhd2FpdCB0aGlzLmdldFBhcmFtQ29uZmlnPFQ+KHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ3NldCcpXG4gICAgaWYgKHBhcmFtQ29uZmlnID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9IGF3YWl0IHRoaXMuc2hvd1NlbGVjdDxUPihwYXJhbUNvbmZpZy5zcGVjKSB9XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtQ29uZmlnLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gPSB2YWx1ZVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7IHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWUgfSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VmFsdWU8VD4ocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gYXdhaXQgdGhpcy5nZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdnZXQnKVxuICAgIGlmIChwYXJhbUNvbmZpZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgaWYgKHBhcmFtQ29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpIHsgYXdhaXQgdGhpcy5zZXRWYWx1ZShwbHVnaW5OYW1lLCBwYXJhbU5hbWUpIH1cbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRWYWx1ZVJhdzxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSBhd2FpdCB0aGlzLmdldFBhcmFtQ29uZmlnPFQ+KHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCByYXcnKVxuICAgIGlmIChwYXJhbUNvbmZpZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnLnZhbHVlXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFBhcmFtQ29uZmlnPFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nKTogUHJvbWlzZTxJUGFyYW1EYXRhPFQ+IHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCFhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUxvYWRlZChwbHVnaW5OYW1lKSkge1xuICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoYE5vICR7cGx1Z2luTmFtZX0gcGFja2FnZSB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YCkpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIGlmICghYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUocGx1Z2luTmFtZSkpIHtcbiAgICAgIGF3YWl0IGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKHBsdWdpbk5hbWUpXG4gICAgfVxuICAgIGNvbnN0IHBsdWdpbkNvbmZpZyA9IHRoaXMucGx1Z2lucy5nZXQocGx1Z2luTmFtZSlcbiAgICBpZiAoIXBsdWdpbkNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3BsdWdpbk5hbWV9IGlzIG5vdCBkZWZpbmVkIHdoaWxlIHRyeWluZyB0byAke3JlYXNvbn0gJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gKVxuICAgIH1cbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHBsdWdpbkNvbmZpZy5nZXQocGFyYW1OYW1lKVxuICAgIGlmICghcGFyYW1Db25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwYXJhbU5hbWV9IGlzIG5vdCBkZWZpbmVkIHdoaWxlIHRyeWluZyB0byAke3JlYXNvbn0gJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gKVxuICAgIH1cbiAgICByZXR1cm4gcGFyYW1Db25maWdcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2hvd1NlbGVjdDxUPihzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPik6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBzZWxlY3RMaXN0VmlldzxUPih7XG4gICAgICBpdGVtczogKHR5cGVvZiBzcGVjLml0ZW1zID09PSAnZnVuY3Rpb24nKSA/IHNwZWMuaXRlbXMoKSA6IHNwZWMuaXRlbXMsXG4gICAgICBoZWFkaW5nOiBzcGVjLmRlc2NyaXB0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiBzcGVjLml0ZW1UZW1wbGF0ZS5iaW5kKHNwZWMpLFxuICAgICAgaXRlbUZpbHRlcktleTogc3BlYy5pdGVtRmlsdGVyS2V5LFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==