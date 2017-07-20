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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQWtEO0FBQ2xELCtCQUE2RDtBQXNCN0Q7SUFLRSxZQUFhLFFBQWdCLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVNLFdBQVcsQ0FBSyxVQUFrQixFQUFFLFNBQWlCLEVBQUUsUUFBNkI7UUFDekYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFJLFlBQVksRUFBRSxDQUFDLEdBQUc7WUFDMUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sWUFBWSxDQUFLLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxJQUF1QjtRQUNwRixJQUFJLFlBQVksR0FBRyxJQUFJLENB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Q0FBQTtRQUNKLENBQUM7S0FBQTtDQUNGO0FBOUZELDRDQThGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2VsZWN0TGlzdFZpZXd9IGZyb20gJy4vcGFyYW0tc2VsZWN0LXZpZXcnXG5pbXBvcnQge0VtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5cbmludGVyZmFjZSBJUGFyYW1EYXRhPFQ+IHtcbiAgc3BlYzogVVBJLklQYXJhbVNwZWM8VD5cbiAgdmFsdWU/OiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcbiAgW3BsdWdpbk5hbWVQYXJhbU5hbWU6IHN0cmluZ106IE9iamVjdFxufVxuXG5pbnRlcmZhY2UgVFVwZGF0ZWRDYWxsYmFja0FyZzxUPiB7IHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHZhbHVlOiBUIHwgdW5kZWZpbmVkIH1cbmV4cG9ydCB0eXBlIFRVcGRhdGVkQ2FsbGJhY2s8VD4gPSAoYXJnOiBUVXBkYXRlZENhbGxiYWNrQXJnPFQ+KSA9PiB2b2lkXG5cbnR5cGUgRXZlbnRzID0gJ2RpZC11cGRhdGUnXG5pbnRlcmZhY2UgTXlFbWl0dGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gIG9uPFQ+IChldmVudDogRXZlbnRzLCBjYWxsYmFjazogVFVwZGF0ZWRDYWxsYmFjazxUPik6IERpc3Bvc2FibGVcbiAgb25jZTxUPiAoZXZlbnQ6IEV2ZW50cywgY2FsbGJhY2s6IFRVcGRhdGVkQ2FsbGJhY2s8VD4pOiBEaXNwb3NhYmxlXG4gIHByZWVtcHQ8VD4gKGV2ZW50OiBFdmVudHMsIGNhbGxiYWNrOiBUVXBkYXRlZENhbGxiYWNrPFQ+KTogRGlzcG9zYWJsZVxuICBlbWl0PFQ+IChldmVudDogRXZlbnRzLCB2YWw6IFRVcGRhdGVkQ2FsbGJhY2tBcmc8VD4pOiB2b2lkXG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWdQYXJhbVN0b3JlIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IE15RW1pdHRlclxuICBwcml2YXRlIHNhdmVkOiBJU3RhdGVcbiAgcHJpdmF0ZSBwbHVnaW5zOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBJUGFyYW1EYXRhPGFueT4+PlxuICBjb25zdHJ1Y3RvciAoc3RhdGU6IElTdGF0ZSA9IHt9KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuc2F2ZWQgPSBzdGF0ZVxuICAgIHRoaXMucGx1Z2lucyA9IG5ldyBNYXAoKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZWRcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIG9uRGlkVXBkYXRlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBjYWxsYmFjazogVFVwZGF0ZWRDYWxsYmFjazxUPikge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub248VD4oJ2RpZC11cGRhdGUnLCAodmFsKSA9PiB7XG4gICAgICBpZiAodmFsLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdmFsLnBhcmFtTmFtZSA9PT0gcGFyYW1OYW1lKSB7XG4gICAgICAgIGNhbGxiYWNrKHZhbClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFkZFBhcmFtU3BlYzxUPiAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pIHtcbiAgICBsZXQgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICBwbHVnaW5Db25maWcgPSBuZXcgTWFwKClcbiAgICAgIHRoaXMucGx1Z2lucy5zZXQocGx1Z2luTmFtZSwgcGx1Z2luQ29uZmlnKVxuICAgIH1cbiAgICBpZiAocGx1Z2luQ29uZmlnLmhhcyhwYXJhbU5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfSBhbHJlYWR5IGRlZmluZWQhYClcbiAgICB9XG4gICAgbGV0IHZhbHVlOiBUIHwgdW5kZWZpbmVkID0gdGhpcy5zYXZlZFtgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gXSBhcyBUXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHsgdmFsdWUgPSBzcGVjLmRlZmF1bHQgfVxuICAgIHBsdWdpbkNvbmZpZy5zZXQocGFyYW1OYW1lLCB7c3BlYywgdmFsdWV9KVxuICAgIHRoaXMuZW1pdHRlci5lbWl0PFQ+KCdkaWQtdXBkYXRlJywge3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBpZiAocGx1Z2luQ29uZmlnKSB7XG4gICAgICAgIHBsdWdpbkNvbmZpZy5kZWxldGUocGFyYW1OYW1lKVxuICAgICAgICBpZiAocGx1Z2luQ29uZmlnLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHRoaXMuZ2V0UGFyYW1Db25maWc8VD4ocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnc2V0JylcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9IGF3YWl0IHRoaXMuc2hvd1NlbGVjdDxUPihwYXJhbUNvbmZpZy5zcGVjKSB9XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtQ29uZmlnLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gPSB2YWx1ZVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFZhbHVlPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSB0aGlzLmdldFBhcmFtQ29uZmlnPFQ+KHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCcpXG4gICAgaWYgKHBhcmFtQ29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpIHsgYXdhaXQgdGhpcy5zZXRWYWx1ZShwbHVnaW5OYW1lLCBwYXJhbU5hbWUpIH1cbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHB1YmxpYyBnZXRWYWx1ZVJhdzxUPiAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZyk6IFQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gdGhpcy5nZXRQYXJhbUNvbmZpZzxUPihwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdnZXQgcmF3JylcbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYW1Db25maWc8VD4gKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nKTogSVBhcmFtRGF0YTxUPiB7XG4gICAgY29uc3QgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2luTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gcGx1Z2luQ29uZmlnLmdldChwYXJhbU5hbWUpXG4gICAgaWYgKCFwYXJhbUNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3BhcmFtTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIHJldHVybiBwYXJhbUNvbmZpZ1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzaG93U2VsZWN0PFQ+IChzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPik6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBzZWxlY3RMaXN0VmlldzxUPih7XG4gICAgICBpdGVtczogKHR5cGVvZiBzcGVjLml0ZW1zID09PSAnZnVuY3Rpb24nKSA/IHNwZWMuaXRlbXMoKSA6IHNwZWMuaXRlbXMsXG4gICAgICBoZWFkaW5nOiBzcGVjLmRlc2NyaXB0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiBzcGVjLml0ZW1UZW1wbGF0ZS5iaW5kKHNwZWMpLFxuICAgICAgaXRlbUZpbHRlcktleTogc3BlYy5pdGVtRmlsdGVyS2V5XG4gICAgfSlcbiAgfVxufVxuIl19