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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQWtEO0FBQ2xELCtCQUF1RTtBQWN2RTtJQU9FLFlBQWEsUUFBZ0IsRUFBRTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU0sV0FBVyxDQUFLLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxRQUE2QjtRQUN6RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRztZQUN2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxZQUFZLENBQUssVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQXVCO1FBQ3BGLElBQUksWUFBWSxHQUFHLElBQUksQ0FB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QUFBO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUFoR0QsNENBZ0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzZWxlY3RMaXN0Vmlld30gZnJvbSAnLi9wYXJhbS1zZWxlY3QtdmlldydcbmltcG9ydCB7VEVtaXR0ZXIsIEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5cbmludGVyZmFjZSBJUGFyYW1EYXRhPFQ+IHtcbiAgc3BlYzogVVBJLklQYXJhbVNwZWM8VD5cbiAgdmFsdWU/OiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcbiAgW3BsdWdpbk5hbWVQYXJhbU5hbWU6IHN0cmluZ106IE9iamVjdFxufVxuXG5pbnRlcmZhY2UgVFVwZGF0ZWRDYWxsYmFja0FyZzxUPiB7IHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHZhbHVlOiBUIHwgdW5kZWZpbmVkIH1cbmV4cG9ydCB0eXBlIFRVcGRhdGVkQ2FsbGJhY2s8VD4gPSAoYXJnOiBUVXBkYXRlZENhbGxiYWNrQXJnPFQ+KSA9PiB2b2lkXG5cbmV4cG9ydCBjbGFzcyBDb25maWdQYXJhbVN0b3JlIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IFRFbWl0dGVyPHtcbiAgICAnZGlkLXVwZGF0ZSc6IHtwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55fVxuICB9PlxuICBwcml2YXRlIHNhdmVkOiBJU3RhdGVcbiAgcHJpdmF0ZSBwbHVnaW5zOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBJUGFyYW1EYXRhPGFueT4+PlxuICBjb25zdHJ1Y3RvciAoc3RhdGU6IElTdGF0ZSA9IHt9KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuc2F2ZWQgPSBzdGF0ZVxuICAgIHRoaXMucGx1Z2lucyA9IG5ldyBNYXAoKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZWRcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIG9uRGlkVXBkYXRlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBjYWxsYmFjazogVFVwZGF0ZWRDYWxsYmFjazxUPikge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC11cGRhdGUnLCAodmFsKSA9PiB7XG4gICAgICBpZiAodmFsLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdmFsLnBhcmFtTmFtZSA9PT0gcGFyYW1OYW1lKSB7XG4gICAgICAgIGNhbGxiYWNrKHZhbClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFkZFBhcmFtU3BlYzxUPiAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pIHtcbiAgICBsZXQgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICBwbHVnaW5Db25maWcgPSBuZXcgTWFwKClcbiAgICAgIHRoaXMucGx1Z2lucy5zZXQocGx1Z2luTmFtZSwgcGx1Z2luQ29uZmlnKVxuICAgIH1cbiAgICBpZiAocGx1Z2luQ29uZmlnLmhhcyhwYXJhbU5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfSBhbHJlYWR5IGRlZmluZWQhYClcbiAgICB9XG4gICAgbGV0IHZhbHVlOiBUIHwgdW5kZWZpbmVkID0gdGhpcy5zYXZlZFtgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gXSBhcyBUXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHsgdmFsdWUgPSBzcGVjLmRlZmF1bHQgfVxuICAgIHBsdWdpbkNvbmZpZy5zZXQocGFyYW1OYW1lLCB7c3BlYywgdmFsdWV9KVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJywge3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBpZiAocGx1Z2luQ29uZmlnKSB7XG4gICAgICAgIHBsdWdpbkNvbmZpZy5kZWxldGUocGFyYW1OYW1lKVxuICAgICAgICBpZiAocGx1Z2luQ29uZmlnLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHRoaXMuZ2V0UGFyYW1Db25maWc8VD4ocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnc2V0JylcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9IGF3YWl0IHRoaXMuc2hvd1NlbGVjdDxUPihwYXJhbUNvbmZpZy5zcGVjKSB9XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtQ29uZmlnLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gPSB2YWx1ZVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFZhbHVlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSB0aGlzLmdldFBhcmFtQ29uZmlnPFQ+KHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCcpXG4gICAgaWYgKHBhcmFtQ29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpIHsgYXdhaXQgdGhpcy5zZXRWYWx1ZShwbHVnaW5OYW1lLCBwYXJhbU5hbWUpIH1cbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHB1YmxpYyBnZXRWYWx1ZVJhdzxUPiAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZyk6IFQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gdGhpcy5nZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdnZXQgcmF3JylcbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYW1Db25maWc8VD4gKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nKTogSVBhcmFtRGF0YTxUPiB7XG4gICAgY29uc3QgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2luTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gcGx1Z2luQ29uZmlnLmdldChwYXJhbU5hbWUpXG4gICAgaWYgKCFwYXJhbUNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3BhcmFtTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIHJldHVybiBwYXJhbUNvbmZpZ1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzaG93U2VsZWN0PFQ+IChzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPik6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBzZWxlY3RMaXN0VmlldzxUPih7XG4gICAgICBpdGVtczogKHR5cGVvZiBzcGVjLml0ZW1zID09PSAnZnVuY3Rpb24nKSA/IHNwZWMuaXRlbXMoKSA6IHNwZWMuaXRlbXMsXG4gICAgICBoZWFkaW5nOiBzcGVjLmRlc2NyaXB0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiBzcGVjLml0ZW1UZW1wbGF0ZS5iaW5kKHNwZWMpLFxuICAgICAgaXRlbUZpbHRlcktleTogc3BlYy5pdGVtRmlsdGVyS2V5XG4gICAgfSlcbiAgfVxufVxuIl19