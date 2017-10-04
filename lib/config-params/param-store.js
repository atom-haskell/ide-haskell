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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQW9EO0FBQ3BELCtCQUF5RTtBQWN6RTtJQU9FLFlBQVksUUFBZ0IsRUFBRTtRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFJLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxRQUE2QjtRQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sWUFBWSxDQUFJLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxJQUF1QjtRQUNuRixJQUFJLFlBQVksR0FB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QUFDO2dCQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsVUFBVSxtQ0FBbUMsTUFBTSxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1lBQ3RHLENBQUM7WUFDRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFNBQVMsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtZQUNyRyxDQUFDO1lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQTtRQUNwQixDQUFDO0tBQUE7SUFFYSxVQUFVLENBQUksSUFBdUI7O1lBQ2pELE1BQU0sQ0FBQyxrQ0FBYyxDQUFJO2dCQUN2QixLQUFLLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ3JFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDMUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO2FBQ2xDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtDQUNGO0FBMUdELDRDQTBHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdExpc3RWaWV3IH0gZnJvbSAnLi9wYXJhbS1zZWxlY3QtdmlldydcbmltcG9ydCB7IFRFbWl0dGVyLCBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxuaW50ZXJmYWNlIElQYXJhbURhdGE8VD4ge1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICB2YWx1ZT86IFRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xuICBbcGx1Z2luTmFtZVBhcmFtTmFtZTogc3RyaW5nXTogT2JqZWN0XG59XG5cbmludGVyZmFjZSBUVXBkYXRlZENhbGxiYWNrQXJnPFQ+IHsgcGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgdmFsdWU6IFQgfCB1bmRlZmluZWQgfVxuZXhwb3J0IHR5cGUgVFVwZGF0ZWRDYWxsYmFjazxUPiA9IChhcmc6IFRVcGRhdGVkQ2FsbGJhY2tBcmc8VD4pID0+IHZvaWRcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1BhcmFtU3RvcmUge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgZW1pdHRlcjogVEVtaXR0ZXI8e1xuICAgICdkaWQtdXBkYXRlJzogeyBwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55IH1cbiAgfT5cbiAgcHJpdmF0ZSBzYXZlZDogSVN0YXRlXG4gIHByaXZhdGUgcGx1Z2luczogTWFwPHN0cmluZywgTWFwPHN0cmluZywgSVBhcmFtRGF0YTxhbnk+Pj5cbiAgY29uc3RydWN0b3Ioc3RhdGU6IElTdGF0ZSA9IHt9KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuc2F2ZWQgPSBzdGF0ZVxuICAgIHRoaXMucGx1Z2lucyA9IG5ldyBNYXAoKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zYXZlZFxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHB1YmxpYyBvbkRpZFVwZGF0ZTxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBjYWxsYmFjazogVFVwZGF0ZWRDYWxsYmFjazxUPikge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC11cGRhdGUnLCAodmFsKSA9PiB7XG4gICAgICBpZiAodmFsLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdmFsLnBhcmFtTmFtZSA9PT0gcGFyYW1OYW1lKSB7XG4gICAgICAgIGNhbGxiYWNrKHZhbClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFkZFBhcmFtU3BlYzxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPikge1xuICAgIGxldCBwbHVnaW5Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpXG4gICAgaWYgKCFwbHVnaW5Db25maWcpIHtcbiAgICAgIHBsdWdpbkNvbmZpZyA9IG5ldyBNYXAoKVxuICAgICAgdGhpcy5wbHVnaW5zLnNldChwbHVnaW5OYW1lLCBwbHVnaW5Db25maWcpXG4gICAgfVxuICAgIGlmIChwbHVnaW5Db25maWcuaGFzKHBhcmFtTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9IGFscmVhZHkgZGVmaW5lZCFgKVxuICAgIH1cbiAgICBsZXQgdmFsdWU6IFQgfCB1bmRlZmluZWQgPSB0aGlzLnNhdmVkW2Ake3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWBdIGFzIFRcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9IHNwZWMuZGVmYXVsdCB9XG4gICAgcGx1Z2luQ29uZmlnLnNldChwYXJhbU5hbWUsIHsgc3BlYywgdmFsdWUgfSlcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXVwZGF0ZScsIHsgcGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZSB9KVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBpZiAocGx1Z2luQ29uZmlnKSB7XG4gICAgICAgIHBsdWdpbkNvbmZpZy5kZWxldGUocGFyYW1OYW1lKVxuICAgICAgICBpZiAocGx1Z2luQ29uZmlnLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlPFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHZhbHVlPzogVCk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gYXdhaXQgdGhpcy5nZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdzZXQnKVxuICAgIGlmIChwYXJhbUNvbmZpZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHsgdmFsdWUgPSBhd2FpdCB0aGlzLnNob3dTZWxlY3Q8VD4ocGFyYW1Db25maWcuc3BlYykgfVxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbUNvbmZpZy52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLnNhdmVkW2Ake3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWBdID0gdmFsdWVcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJywgeyBwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlIH0pXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFZhbHVlPFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IGF3YWl0IHRoaXMuZ2V0UGFyYW1Db25maWc8VD4ocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnZ2V0JylcbiAgICBpZiAocGFyYW1Db25maWcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGlmIChwYXJhbUNvbmZpZy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IGF3YWl0IHRoaXMuc2V0VmFsdWUocGx1Z2luTmFtZSwgcGFyYW1OYW1lKSB9XG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnLnZhbHVlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VmFsdWVSYXc8VD4ocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gYXdhaXQgdGhpcy5nZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdnZXQgcmF3JylcbiAgICBpZiAocGFyYW1Db25maWcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCByZWFzb246IHN0cmluZyk6IFByb21pc2U8SVBhcmFtRGF0YTxUPiB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICghYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VMb2FkZWQocGx1Z2luTmFtZSkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKGBObyAke3BsdWdpbk5hbWV9IHBhY2thZ2Ugd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAoIWF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKHBsdWdpbk5hbWUpKSB7XG4gICAgICBhd2FpdCBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZShwbHVnaW5OYW1lKVxuICAgIH1cbiAgICBjb25zdCBwbHVnaW5Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpXG4gICAgaWYgKCFwbHVnaW5Db25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwbHVnaW5OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSBwbHVnaW5Db25maWcuZ2V0KHBhcmFtTmFtZSlcbiAgICBpZiAoIXBhcmFtQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGFyYW1OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNob3dTZWxlY3Q8VD4oc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gc2VsZWN0TGlzdFZpZXc8VD4oe1xuICAgICAgaXRlbXM6ICh0eXBlb2Ygc3BlYy5pdGVtcyA9PT0gJ2Z1bmN0aW9uJykgPyBzcGVjLml0ZW1zKCkgOiBzcGVjLml0ZW1zLFxuICAgICAgaGVhZGluZzogc3BlYy5kZXNjcmlwdGlvbixcbiAgICAgIGl0ZW1UZW1wbGF0ZTogc3BlYy5pdGVtVGVtcGxhdGUuYmluZChzcGVjKSxcbiAgICAgIGl0ZW1GaWx0ZXJLZXk6IHNwZWMuaXRlbUZpbHRlcktleSxcbiAgICB9KVxuICB9XG59XG4iXX0=