'use babel';
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
        return new atom_1.Disposable(() => {
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
            return param_select_view_1.default({
                items: (typeof spec.items === 'function') ? spec.items() : spec.items,
                heading: spec.description,
                itemTemplate: spec.itemTemplate,
                itemFilterKey: spec.itemFilterKey
            });
        });
    }
}
exports.ConfigParamStore = ConfigParamStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9wYXJhbS1zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7Ozs7Ozs7QUFFWCwyREFBZ0Q7QUFDaEQsK0JBQTZEO0FBRTdEO0lBQ0UsWUFBYSxLQUFLLEdBQUcsRUFBRTtRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtJQUNyQixDQUFDO0lBRUQsV0FBVyxDQUFFLFFBQVE7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQsWUFBWSxDQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSTtRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFP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U0FBUyxDQUFDLENBQUE7UUFDN0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUE7SUFDMUIsQ0FBQztJQUVLLFVBQVUsQ0FBRSxJQUFJOztZQUNwQixNQUFNLENBQUMsMkJBQWMsQ0FBQztnQkFDcEIsS0FBSyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDckUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTthQUNsQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQXpFRCw0Q0F5RUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5pbXBvcnQgc2VsZWN0TGlzdFZpZXcgZnJvbSAnLi9wYXJhbS1zZWxlY3QtdmlldydcbmltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1BhcmFtU3RvcmUge1xuICBjb25zdHJ1Y3RvciAoc3RhdGUgPSB7fSkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlcilcbiAgICB0aGlzLnNhdmVkID0gc3RhdGVcbiAgICB0aGlzLnBsdWdpbnMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZWRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG51bGxcbiAgICB0aGlzLmVtaXR0ZXIgPSBudWxsXG4gICAgdGhpcy5zYXZlZCA9IG51bGxcbiAgICB0aGlzLnBsdWdpbnMgPSBudWxsXG4gIH1cblxuICBvbkRpZFVwZGF0ZSAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtdXBkYXRlJywgY2FsbGJhY2spXG4gIH1cblxuICBhZGRQYXJhbVNwZWMgKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgc3BlYykge1xuICAgIGlmICghdGhpcy5wbHVnaW5zLmhhcyhwbHVnaW5OYW1lKSkgdGhpcy5wbHVnaW5zLnNldChwbHVnaW5OYW1lLCBuZXcgTWFwKCkpXG4gICAgbGV0IHBsdWdpbkNvbmZpZyA9IHRoaXMucGx1Z2lucy5nZXQocGx1Z2luTmFtZSlcbiAgICBpZiAocGx1Z2luQ29uZmlnLmhhcyhwYXJhbU5hbWUpKSB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAke3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfSBhbHJlYWR5IGRlZmluZWQhYClcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnNhdmVkW2Ake3BsdWdpbk5hbWV9LiR7cGFyYW1OYW1lfWBdXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gc3BlYy5kZWZhdWx0XG4gICAgcGx1Z2luQ29uZmlnLnNldChwYXJhbU5hbWUsIHtzcGVjLCB2YWx1ZX0pXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pXG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIGxldCBwbHVnaW5Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpXG4gICAgICBwbHVnaW5Db25maWcuZGVsZXRlKHBhcmFtTmFtZSlcbiAgICAgIGlmIChwbHVnaW5Db25maWcuc2l6ZSA9PT0gMCkgdGhpcy5wbHVnaW5zLmRlbGV0ZShwbHVnaW5OYW1lKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBzZXRWYWx1ZSAocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZSkge1xuICAgIC8vIFRPRE86IGNoZWNrIGlmIHBhcmFtIGRlZmluZWRcbiAgICBsZXQgcGFyYW1Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpLmdldChwYXJhbU5hbWUpXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gYXdhaXQgdGhpcy5zaG93U2VsZWN0KHBhcmFtQ29uZmlnLnNwZWMpXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtQ29uZmlnLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXMuc2F2ZWRbYCR7cGx1Z2luTmFtZX0uJHtwYXJhbU5hbWV9YF0gPSB2YWx1ZVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC11cGRhdGUnLCB7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgYXN5bmMgZ2V0VmFsdWUgKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSkge1xuICAgIC8vIFRPRE86IGNoZWNrIGlmIHBhcmFtIGRlZmluZWRcbiAgICBsZXQgcGFyYW1Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpLmdldChwYXJhbU5hbWUpXG4gICAgaWYgKHBhcmFtQ29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpIGF3YWl0IHRoaXMuc2V0VmFsdWUocGx1Z2luTmFtZSwgcGFyYW1OYW1lKVxuICAgIHJldHVybiBwYXJhbUNvbmZpZy52YWx1ZVxuICB9XG5cbiAgZ2V0VmFsdWVSYXcgKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSkge1xuICAgIC8vIFRPRE86IGNoZWNrIGlmIHBhcmFtIGRlZmluZWRcbiAgICBsZXQgcGFyYW1Db25maWcgPSB0aGlzLnBsdWdpbnMuZ2V0KHBsdWdpbk5hbWUpLmdldChwYXJhbU5hbWUpXG4gICAgcmV0dXJuIHBhcmFtQ29uZmlnLnZhbHVlXG4gIH1cblxuICBhc3luYyBzaG93U2VsZWN0IChzcGVjKSB7XG4gICAgcmV0dXJuIHNlbGVjdExpc3RWaWV3KHtcbiAgICAgIGl0ZW1zOiAodHlwZW9mIHNwZWMuaXRlbXMgPT09ICdmdW5jdGlvbicpID8gc3BlYy5pdGVtcygpIDogc3BlYy5pdGVtcyxcbiAgICAgIGhlYWRpbmc6IHNwZWMuZGVzY3JpcHRpb24sXG4gICAgICBpdGVtVGVtcGxhdGU6IHNwZWMuaXRlbVRlbXBsYXRlLFxuICAgICAgaXRlbUZpbHRlcktleTogc3BlYy5pdGVtRmlsdGVyS2V5XG4gICAgfSlcbiAgfVxufVxuIl19