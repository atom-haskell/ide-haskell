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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQWtEO0FBQ2xELCtCQUE2RDtBQTBEN0Q7SUFLRSxZQUFhLFFBQWdCLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVNLFdBQVcsQ0FBRSxRQUEwQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFTSxZQUFZLENBQUssVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQW1CO1FBQ2hGLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFB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LEVBQUUsTUFBYztRQUMzRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFVBQVUsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUN0RyxDQUFDO1FBQ0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFNBQVMsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUNyRyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBRWEsVUFBVSxDQUFLLElBQW1COztZQUM5QyxNQUFNLENBQUMsa0NBQWMsQ0FBSTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDckUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDbEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUExRkQsNENBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzZWxlY3RMaXN0Vmlld30gZnJvbSAnLi9wYXJhbS1zZWxlY3QtdmlldydcbmltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJUGFyYW1TcGVjPFQ+IHtcbiAgLyoqXG4gIG5hbWUgb2YgaXRlbSBrZXkgdGhhdCB0aGUgZmlsdGVyIGluIHNlbGVjdCBkaWFsb2cgd2lsbCBtYXRjaFxuICAqL1xuICBpdGVtRmlsdGVyS2V5OiBzdHJpbmdcbiAgLyoqXG4gIHRoaXMgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGhlYWRpbmcgb2Ygc2VsZWN0IGRpYWxvZ1xuICAqL1xuICBkZXNjcmlwdGlvbj86IHN0cmluZ1xuICAvKipcbiAgZGlzcGxheSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgaW4gb3V0cHV0IHBhbmVsXG4gICovXG4gIGRpc3BsYXlOYW1lPzogc3RyaW5nXG4gIC8qKlxuICBkZWZhdWx0IHZhbHVlXG4gICovXG4gIGRlZmF1bHQ/OiBUXG4gIC8qKlxuICBwb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIHBhcmFtZXRlci4gY2FuIGJlIGEgY2FsbGJhY2suXG4gICovXG4gIGl0ZW1zOiBUW10gfCBQcm9taXNlPFRbXT4gfCAoKCkgPT4gVFtdIHwgUHJvbWlzZTxUW10+KVxuICAvKipcbiAgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlIG9mIHBhcmFtZXRlciBjaGFuZ2VzXG5cbiAgQHBhcmFtIHZhbHVlIG5ldyB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyXG4gICovXG4gIG9uQ2hhbmdlZCAodmFsdWU6IFQpOiB2b2lkXG4gIC8qKlxuICBob3cgYW4gaXRlbSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHVzZXJcblxuICBAcGFyYW0gaXRlbSBpdGVtIHRvIGJlIGRpc3BsYXllZFxuXG4gIEByZXR1cm5zIEhUTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgaXRlbVxuICAqL1xuICBpdGVtVGVtcGxhdGUgKGl0ZW06IFQpOiBzdHJpbmdcbiAgLyoqXG4gIHRlbXBsYXRlIGZvciBkaXNwbGF5aW5nIHZhbHVlIG9mIHBhcmFtZXRlciBpbiBvdXRwdXQgcGFuZWxcblxuICBAcGFyYW0gaXRlbSBpdGVtIHRvIGJlIGRpc3BsYXllZFxuXG4gIEByZXR1cm5zIHBsYWludGV4dCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBpdGVtXG4gICovXG4gIGRpc3BsYXlUZW1wbGF0ZSAoaXRlbTogVCk6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgSVBhcmFtRGF0YTxUPiB7XG4gIHNwZWM6IElQYXJhbVNwZWM8VD5cbiAgdmFsdWU/OiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcbiAgW3BsdWdpbk5hbWVQYXJhbU5hbWU6IHN0cmluZ106IE9iamVjdFxufVxuXG5leHBvcnQgdHlwZSBUVXBkYXRlZENhbGxiYWNrID0gKGFyZzoge3BsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHZhbHVlOiBPYmplY3R9KSA9PiB2b2lkXG5cbmV4cG9ydCBjbGFzcyBDb25maWdQYXJhbVN0b3JlIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgcHJpdmF0ZSBzYXZlZDogSVN0YXRlXG4gIHByaXZhdGUgcGx1Z2luczogTWFwPHN0cmluZywgTWFwPHN0cmluZywgSVBhcmFtRGF0YTxPYmplY3Q+Pj5cbiAgY29uc3RydWN0b3IgKHN0YXRlOiBJU3RhdGUgPSB7fSkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlcilcbiAgICB0aGlzLnNhdmVkID0gc3RhdGVcbiAgICB0aGlzLnBsdWdpbnMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIHB1YmxpYyBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB0aGlzLnNhdmVkXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHB1YmxpYyBvbkRpZFVwZGF0ZSAoY2FsbGJhY2s6IFRVcGRhdGVkQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtdXBkYXRlJywgY2FsbGJhY2spXG4gIH1cblxuICBwdWJsaWMgYWRkUGFyYW1TcGVjPFQ+IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBJUGFyYW1TcGVjPFQ+KSB7XG4gICAgbGV0IHBsdWdpbkNvbmZpZyA9IHRoaXMucGx1Z2lucy5nZXQocGx1Z2luTmFtZSlcbiAgICBpZiAoIXBsdWdpbkNvbmZpZykge1xuICAgICAgcGx1Z2luQ29uZmlnID0gbmV3IE1hcCgpXG4gICAgICB0aGlzLnBsdWdpbnMuc2V0KHBsdWdpbk5hbWUsIHBsdWdpbkNvbmZpZylcbiAgICB9XG4gICAgaWYgKHBsdWdpbkNvbmZpZy5oYXMocGFyYW1OYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX0gYWxyZWFkeSBkZWZpbmVkIWApXG4gICAgfVxuICAgIGxldCB2YWx1ZTogT2JqZWN0IHwgdW5kZWZpbmVkID0gdGhpcy5zYXZlZFtgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gXVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHZhbHVlID0gc3BlYy5kZWZhdWx0IH1cbiAgICBwbHVnaW5Db25maWcuc2V0KHBhcmFtTmFtZSwge3NwZWMsIHZhbHVlfSlcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXVwZGF0ZScsIHtwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlfSlcbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgaWYgKHBsdWdpbkNvbmZpZykge1xuICAgICAgICBwbHVnaW5Db25maWcuZGVsZXRlKHBhcmFtTmFtZSlcbiAgICAgICAgaWYgKHBsdWdpbkNvbmZpZy5zaXplID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wbHVnaW5zLmRlbGV0ZShwbHVnaW5OYW1lKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRWYWx1ZSAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgdmFsdWU/OiBPYmplY3QpIHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHRoaXMuZ2V0UGFyYW1Db25maWcocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnc2V0JylcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9IGF3YWl0IHRoaXMuc2hvd1NlbGVjdChwYXJhbUNvbmZpZy5zcGVjKSB9XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtQ29uZmlnLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gPSB2YWx1ZVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFZhbHVlIChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSB0aGlzLmdldFBhcmFtQ29uZmlnKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCcpXG4gICAgaWYgKHBhcmFtQ29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpIHsgYXdhaXQgdGhpcy5zZXRWYWx1ZShwbHVnaW5OYW1lLCBwYXJhbU5hbWUpIH1cbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHB1YmxpYyBnZXRWYWx1ZVJhdyAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gdGhpcy5nZXRQYXJhbUNvbmZpZyhwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdnZXQgcmF3JylcbiAgICByZXR1cm4gcGFyYW1Db25maWcudmFsdWVcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYW1Db25maWcgKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHJlYXNvbjogc3RyaW5nKSB7XG4gICAgY29uc3QgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGx1Z2luTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gcGx1Z2luQ29uZmlnLmdldChwYXJhbU5hbWUpXG4gICAgaWYgKCFwYXJhbUNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3BhcmFtTmFtZX0gaXMgbm90IGRlZmluZWQgd2hpbGUgdHJ5aW5nIHRvICR7cmVhc29ufSAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWApXG4gICAgfVxuICAgIHJldHVybiBwYXJhbUNvbmZpZ1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzaG93U2VsZWN0PFQ+IChzcGVjOiBJUGFyYW1TcGVjPFQ+KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHNlbGVjdExpc3RWaWV3PFQ+KHtcbiAgICAgIGl0ZW1zOiAodHlwZW9mIHNwZWMuaXRlbXMgPT09ICdmdW5jdGlvbicpID8gc3BlYy5pdGVtcygpIDogc3BlYy5pdGVtcyxcbiAgICAgIGhlYWRpbmc6IHNwZWMuZGVzY3JpcHRpb24sXG4gICAgICBpdGVtVGVtcGxhdGU6IHNwZWMuaXRlbVRlbXBsYXRlLmJpbmQoc3BlYyksXG4gICAgICBpdGVtRmlsdGVyS2V5OiBzcGVjLml0ZW1GaWx0ZXJLZXlcbiAgICB9KVxuICB9XG59XG4iXX0=