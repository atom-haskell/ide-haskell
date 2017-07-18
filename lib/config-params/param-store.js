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
    onDidUpdate(callback) {
        return this.emitter.on('did-update', callback);
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
            const paramConfig = this.getParamConfig(pluginName, paramName, 'set');
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
            const paramConfig = this.getParamConfig(pluginName, paramName, 'get');
            if (paramConfig.value === undefined) {
                yield this.setValue(pluginName, paramName);
            }
            return paramConfig.value;
        });
    }
    getValueRaw(pluginName, paramName) {
        const paramConfig = this.getParamConfig(pluginName, paramName, 'get raw');
        return paramConfig.value;
    }
    getParamConfig(pluginName, paramName, reason) {
        const pluginConfig = this.plugins.get(pluginName);
        if (!pluginConfig) {
            throw new Error(`${pluginName} is not defined while trying to ${reason} ${pluginName}.${paramName}`);
        }
        const paramConfig = pluginConfig.get(paramName);
        if (!paramConfig) {
            throw new Error(`${paramName} is not defined while trying to ${reason} ${pluginName}.${paramName}`);
        }
        return paramConfig;
    }
    showSelect(spec) {
        return __awaiter(this, void 0, void 0, function* () {
            return param_select_view_1.selectListView({
                items: (typeof spec.items === 'function') ? spec.items() : spec.items,
                heading: spec.description,
                itemTemplate: spec.itemTemplate.bind(spec),
                itemFilterKey: spec.itemFilterKey
            });
        });
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQWtEO0FBQ2xELCtCQUE2RDtBQWE3RDtJQUtFLFlBQWEsUUFBZ0IsRUFBRTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFFLFFBQTBCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVNLFlBQVksQ0FBSyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsSUFBdUI7UUFDcEYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxZQUFZ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RUFBRSxNQUFjO1FBQzNFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsVUFBVSxtQ0FBbUMsTUFBTSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3RHLENBQUM7UUFDRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsU0FBUyxtQ0FBbUMsTUFBTSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3JHLENBQUM7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFBO0lBQ3BCLENBQUM7SUFFYSxVQUFVLENBQUssSUFBdUI7O1lBQ2xELE1BQU0sQ0FBQyxrQ0FBYyxDQUFJO2dCQUN2QixLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLO2dCQUNyRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ3pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQzFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNsQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQTFGRCw0Q0EwRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NlbGVjdExpc3RWaWV3fSBmcm9tICcuL3BhcmFtLXNlbGVjdC12aWV3J1xuaW1wb3J0IHtFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuXG5pbnRlcmZhY2UgSVBhcmFtRGF0YTxUPiB7XG4gIHNwZWM6IFVQSS5JUGFyYW1TcGVjPFQ+XG4gIHZhbHVlPzogVFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XG4gIFtwbHVnaW5OYW1lUGFyYW1OYW1lOiBzdHJpbmddOiBPYmplY3Rcbn1cblxuZXhwb3J0IHR5cGUgVFVwZGF0ZWRDYWxsYmFjayA9IChhcmc6IHtwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZTogT2JqZWN0fSkgPT4gdm9pZFxuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1TdG9yZSB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBlbWl0dGVyOiBFbWl0dGVyXG4gIHByaXZhdGUgc2F2ZWQ6IElTdGF0ZVxuICBwcml2YXRlIHBsdWdpbnM6IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIElQYXJhbURhdGE8T2JqZWN0Pj4+XG4gIGNvbnN0cnVjdG9yIChzdGF0ZTogSVN0YXRlID0ge30pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIpXG4gICAgdGhpcy5zYXZlZCA9IHN0YXRlXG4gICAgdGhpcy5wbHVnaW5zID0gbmV3IE1hcCgpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5zYXZlZFxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwdWJsaWMgb25EaWRVcGRhdGUgKGNhbGxiYWNrOiBUVXBkYXRlZENhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLXVwZGF0ZScsIGNhbGxiYWNrKVxuICB9XG5cbiAgcHVibGljIGFkZFBhcmFtU3BlYzxUPiAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pIHtcbiAgICBsZXQgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICBwbHVnaW5Db25maWcgPSBuZXcgTWFwKClcbiAgICAgIHRoaXMucGx1Z2lucy5zZXQocGx1Z2luTmFtZSwgcGx1Z2luQ29uZmlnKVxuICAgIH1cbiAgICBpZiAocGx1Z2luQ29uZmlnLmhhcyhwYXJhbU5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfSBhbHJlYWR5IGRlZmluZWQhYClcbiAgICB9XG4gICAgbGV0IHZhbHVlOiBPYmplY3QgfCB1bmRlZmluZWQgPSB0aGlzLnNhdmVkW2Ake3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWBdXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHsgdmFsdWUgPSBzcGVjLmRlZmF1bHQgfVxuICAgIHBsdWdpbkNvbmZpZy5zZXQocGFyYW1OYW1lLCB7c3BlYywgdmFsdWV9KVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJywge3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBpZiAocGx1Z2luQ29uZmlnKSB7XG4gICAgICAgIHBsdWdpbkNvbmZpZy5kZWxldGUocGFyYW1OYW1lKVxuICAgICAgICBpZiAocGx1Z2luQ29uZmlnLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlIChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZT86IE9iamVjdCkge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gdGhpcy5nZXRQYXJhbUNvbmZpZyhwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdzZXQnKVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHZhbHVlID0gYXdhaXQgdGhpcy5zaG93U2VsZWN0KHBhcmFtQ29uZmlnLnNwZWMpIH1cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1Db25maWcudmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpcy5zYXZlZFtgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gXSA9IHZhbHVlXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXVwZGF0ZScsIHtwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlfSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VmFsdWUgKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHRoaXMuZ2V0UGFyYW1Db25maWcocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnZ2V0JylcbiAgICBpZiAocGFyYW1Db25maWcudmFsdWUgPT09IHVuZGVmaW5lZCkgeyBhd2FpdCB0aGlzLnNldFZhbHVlKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSkgfVxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgcHVibGljIGdldFZhbHVlUmF3IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSB0aGlzLmdldFBhcmFtQ29uZmlnKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCByYXcnKVxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhbUNvbmZpZyAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwbHVnaW5Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpXG4gICAgaWYgKCFwbHVnaW5Db25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwbHVnaW5OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSBwbHVnaW5Db25maWcuZ2V0KHBhcmFtTmFtZSlcbiAgICBpZiAoIXBhcmFtQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGFyYW1OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNob3dTZWxlY3Q8VD4gKHNwZWM6IFVQSS5JUGFyYW1TcGVjPFQ+KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHNlbGVjdExpc3RWaWV3PFQ+KHtcbiAgICAgIGl0ZW1zOiAodHlwZW9mIHNwZWMuaXRlbXMgPT09ICdmdW5jdGlvbicpID8gc3BlYy5pdGVtcygpIDogc3BlYy5pdGVtcyxcbiAgICAgIGhlYWRpbmc6IHNwZWMuZGVzY3JpcHRpb24sXG4gICAgICBpdGVtVGVtcGxhdGU6IHNwZWMuaXRlbVRlbXBsYXRlLmJpbmQoc3BlYyksXG4gICAgICBpdGVtRmlsdGVyS2V5OiBzcGVjLml0ZW1GaWx0ZXJLZXlcbiAgICB9KVxuICB9XG59XG4iXX0=