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
                itemTemplate: spec.itemTemplate,
                itemFilterKey: spec.itemFilterKey
            });
        });
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQWtEO0FBQ2xELCtCQUE2RDtBQTBEN0Q7SUFLRSxZQUFhLFFBQWdCLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVNLFdBQVcsQ0FBRSxRQUEwQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFTSxZQUFZLENBQUssVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQW1CO1FBQ2hGLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFB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LEVBQUUsTUFBYztRQUMzRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFVBQVUsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUN0RyxDQUFDO1FBQ0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFNBQVMsbUNBQW1DLE1BQU0sSUFBSSxVQUFVLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUNyRyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBRWEsVUFBVSxDQUFLLElBQW1COztZQUM5QyxNQUFNLENBQUMsa0NBQWMsQ0FBSTtnQkFDdkIsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDckUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNsQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQTFGRCw0Q0EwRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NlbGVjdExpc3RWaWV3fSBmcm9tICcuL3BhcmFtLXNlbGVjdC12aWV3J1xuaW1wb3J0IHtFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYXJhbVNwZWM8VD4ge1xuICAvKipcbiAgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlIG9mIHBhcmFtZXRlciBjaGFuZ2VzXG5cbiAgQHBhcmFtIHZhbHVlIG5ldyB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyXG4gICovXG4gIG9uQ2hhbmdlZCAodmFsdWU6IFQpOiB2b2lkXG4gIC8qKlxuICBwb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIHBhcmFtZXRlci4gY2FuIGJlIGEgY2FsbGJhY2suXG4gICovXG4gIGl0ZW1zOiBUW10gfCBQcm9taXNlPFRbXT4gfCAoKCkgPT4gVFtdIHwgUHJvbWlzZTxUW10+KVxuICAvKipcbiAgaG93IGFuIGl0ZW0gc2hvdWxkIGJlIGRpc3BsYXllZCB0byB1c2VyXG5cbiAgQHBhcmFtIGl0ZW0gaXRlbSB0byBiZSBkaXNwbGF5ZWRcblxuICBAcmV0dXJucyBIVE1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGl0ZW1cbiAgKi9cbiAgaXRlbVRlbXBsYXRlIChpdGVtOiBUKTogc3RyaW5nXG4gIC8qKlxuICBuYW1lIG9mIGl0ZW0ga2V5IHRoYXQgdGhlIGZpbHRlciBpbiBzZWxlY3QgZGlhbG9nIHdpbGwgbWF0Y2hcbiAgKi9cbiAgaXRlbUZpbHRlcktleTogc3RyaW5nXG4gIC8qKlxuICB0aGlzIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBoZWFkaW5nIG9mIHNlbGVjdCBkaWFsb2dcbiAgKi9cbiAgZGVzY3JpcHRpb24/OiBzdHJpbmdcbiAgLyoqXG4gIGRpc3BsYXkgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIGluIG91dHB1dCBwYW5lbFxuICAqL1xuICBkaXNwbGF5TmFtZT86IHN0cmluZ1xuICAvKipcbiAgdGVtcGxhdGUgZm9yIGRpc3BsYXlpbmcgdmFsdWUgb2YgcGFyYW1ldGVyIGluIG91dHB1dCBwYW5lbFxuXG4gIEBwYXJhbSBpdGVtIGl0ZW0gdG8gYmUgZGlzcGxheWVkXG5cbiAgQHJldHVybnMgcGxhaW50ZXh0IHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGl0ZW1cbiAgKi9cbiAgZGlzcGxheVRlbXBsYXRlIChpdGVtOiBUKTogc3RyaW5nXG4gIC8qKlxuICBkZWZhdWx0IHZhbHVlXG4gICovXG4gIGRlZmF1bHQ/OiBUXG59XG5cbmludGVyZmFjZSBJUGFyYW1EYXRhPFQ+IHtcbiAgc3BlYzogSVBhcmFtU3BlYzxUPlxuICB2YWx1ZT86IFRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xuICBbcGx1Z2luTmFtZVBhcmFtTmFtZTogc3RyaW5nXTogT2JqZWN0XG59XG5cbmV4cG9ydCB0eXBlIFRVcGRhdGVkQ2FsbGJhY2sgPSAoYXJnOiB7cGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgdmFsdWU6IE9iamVjdH0pID0+IHZvaWRcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1BhcmFtU3RvcmUge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIHNhdmVkOiBJU3RhdGVcbiAgcHJpdmF0ZSBwbHVnaW5zOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBJUGFyYW1EYXRhPE9iamVjdD4+PlxuICBjb25zdHJ1Y3RvciAoc3RhdGU6IElTdGF0ZSA9IHt9KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuc2F2ZWQgPSBzdGF0ZVxuICAgIHRoaXMucGx1Z2lucyA9IG5ldyBNYXAoKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZWRcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIG9uRGlkVXBkYXRlIChjYWxsYmFjazogVFVwZGF0ZWRDYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC11cGRhdGUnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHB1YmxpYyBhZGRQYXJhbVNwZWM8VD4gKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IElQYXJhbVNwZWM8VD4pIHtcbiAgICBsZXQgcGx1Z2luQ29uZmlnID0gdGhpcy5wbHVnaW5zLmdldChwbHVnaW5OYW1lKVxuICAgIGlmICghcGx1Z2luQ29uZmlnKSB7XG4gICAgICBwbHVnaW5Db25maWcgPSBuZXcgTWFwKClcbiAgICAgIHRoaXMucGx1Z2lucy5zZXQocGx1Z2luTmFtZSwgcGx1Z2luQ29uZmlnKVxuICAgIH1cbiAgICBpZiAocGx1Z2luQ29uZmlnLmhhcyhwYXJhbU5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfSBhbHJlYWR5IGRlZmluZWQhYClcbiAgICB9XG4gICAgbGV0IHZhbHVlOiBPYmplY3QgfCB1bmRlZmluZWQgPSB0aGlzLnNhdmVkW2Ake3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWBdXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHsgdmFsdWUgPSBzcGVjLmRlZmF1bHQgfVxuICAgIHBsdWdpbkNvbmZpZy5zZXQocGFyYW1OYW1lLCB7c3BlYywgdmFsdWV9KVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtdXBkYXRlJywge3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBpZiAocGx1Z2luQ29uZmlnKSB7XG4gICAgICAgIHBsdWdpbkNvbmZpZy5kZWxldGUocGFyYW1OYW1lKVxuICAgICAgICBpZiAocGx1Z2luQ29uZmlnLnNpemUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbnMuZGVsZXRlKHBsdWdpbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlIChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCB2YWx1ZT86IE9iamVjdCkge1xuICAgIGNvbnN0IHBhcmFtQ29uZmlnID0gdGhpcy5nZXRQYXJhbUNvbmZpZyhwbHVnaW5OYW1lLCBwYXJhbU5hbWUsICdzZXQnKVxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHZhbHVlID0gYXdhaXQgdGhpcy5zaG93U2VsZWN0KHBhcmFtQ29uZmlnLnNwZWMpIH1cbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1Db25maWcudmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpcy5zYXZlZFtgJHtwbHVnaW5OYW1lfS4ke3BhcmFtTmFtZX1gXSA9IHZhbHVlXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLXVwZGF0ZScsIHtwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlfSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VmFsdWUgKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJhbUNvbmZpZyA9IHRoaXMuZ2V0UGFyYW1Db25maWcocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCAnZ2V0JylcbiAgICBpZiAocGFyYW1Db25maWcudmFsdWUgPT09IHVuZGVmaW5lZCkgeyBhd2FpdCB0aGlzLnNldFZhbHVlKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSkgfVxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgcHVibGljIGdldFZhbHVlUmF3IChwbHVnaW5OYW1lOiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSB0aGlzLmdldFBhcmFtQ29uZmlnKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgJ2dldCByYXcnKVxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXJhbUNvbmZpZyAocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgcmVhc29uOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwbHVnaW5Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpXG4gICAgaWYgKCFwbHVnaW5Db25maWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwbHVnaW5OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgY29uc3QgcGFyYW1Db25maWcgPSBwbHVnaW5Db25maWcuZ2V0KHBhcmFtTmFtZSlcbiAgICBpZiAoIXBhcmFtQ29uZmlnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cGFyYW1OYW1lfSBpcyBub3QgZGVmaW5lZCB3aGlsZSB0cnlpbmcgdG8gJHtyZWFzb259ICR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YClcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNob3dTZWxlY3Q8VD4gKHNwZWM6IElQYXJhbVNwZWM8VD4pOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gc2VsZWN0TGlzdFZpZXc8VD4oe1xuICAgICAgaXRlbXM6ICh0eXBlb2Ygc3BlYy5pdGVtcyA9PT0gJ2Z1bmN0aW9uJykgPyBzcGVjLml0ZW1zKCkgOiBzcGVjLml0ZW1zLFxuICAgICAgaGVhZGluZzogc3BlYy5kZXNjcmlwdGlvbixcbiAgICAgIGl0ZW1UZW1wbGF0ZTogc3BlYy5pdGVtVGVtcGxhdGUsXG4gICAgICBpdGVtRmlsdGVyS2V5OiBzcGVjLml0ZW1GaWx0ZXJLZXlcbiAgICB9KVxuICB9XG59XG4iXX0=