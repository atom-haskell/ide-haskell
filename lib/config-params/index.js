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
const atom_1 = require("atom");
const param_control_1 = require("./param-control");
const param_store_1 = require("./param-store");
class ConfigParamManager {
    constructor(outputPanel, state) {
        this.outputPanel = outputPanel;
        this.store = new param_store_1.ConfigParamStore(state);
    }
    destroy() {
        this.store.destroy();
    }
    serialize() {
        return this.store.serialize();
    }
    add(pluginName, paramName, spec) {
        const disp = new atom_1.CompositeDisposable();
        disp.add(this.store.addParamSpec(pluginName, paramName, spec), this.outputPanel.addPanelControl({
            element: param_control_1.ParamControl,
            opts: {
                pluginName,
                name: paramName,
                spec,
                store: this.store
            }
        }));
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
exports.ConfigParamManager = ConfigParamManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQXdDO0FBQ3hDLG1EQUE0QztBQUM1QywrQ0FBaUY7QUFRakY7SUFFRSxZQUFxQixXQUF3QixFQUFFLEtBQWE7UUFBdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFTSxHQUFHLENBQUUsVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQXdCO1FBQ3pFLE1BQU0sSUFBSSxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQy9CLE9BQU8sRUFBRSw0QkFBWTtZQUNyQixJQUFJLEVBQUU7Z0JBQ0osVUFBVTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FDSCxDQUFBO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFWSxHQUFHLENBQUUsVUFBa0IsRUFBRSxJQUFZOztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlDLENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBRSxVQUFrQixFQUFFLElBQVksRUFBRSxLQUFjOztZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQUE7Q0FDRjtBQXRDRCxnREFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge1BhcmFtQ29udHJvbH0gZnJvbSAnLi9wYXJhbS1jb250cm9sJ1xuaW1wb3J0IHtDb25maWdQYXJhbVN0b3JlLCBJUGFyYW1TcGVjLCBJU3RhdGUgYXMgSVN0b3JlU3RhdGV9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5leHBvcnQge0lQYXJhbVNwZWN9XG5cbmltcG9ydCB7T3V0cHV0UGFuZWx9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcblxudHlwZSBJU3RhdGUgPSBJU3RvcmVTdGF0ZVxuZXhwb3J0IHtJU3RhdGV9XG5cbmV4cG9ydCBjbGFzcyBDb25maWdQYXJhbU1hbmFnZXIge1xuICBwcml2YXRlIHN0b3JlOiBDb25maWdQYXJhbVN0b3JlXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIG91dHB1dFBhbmVsOiBPdXRwdXRQYW5lbCwgc3RhdGU6IElTdGF0ZSkge1xuICAgIHRoaXMuc3RvcmUgPSBuZXcgQ29uZmlnUGFyYW1TdG9yZShzdGF0ZSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnN0b3JlLmRlc3Ryb3koKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VyaWFsaXplKClcbiAgfVxuXG4gIHB1YmxpYyBhZGQgKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IElQYXJhbVNwZWM8T2JqZWN0Pikge1xuICAgIGNvbnN0IGRpc3AgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgZGlzcC5hZGQoXG4gICAgICB0aGlzLnN0b3JlLmFkZFBhcmFtU3BlYyhwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpLFxuICAgICAgdGhpcy5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woe1xuICAgICAgICBlbGVtZW50OiBQYXJhbUNvbnRyb2wsXG4gICAgICAgIG9wdHM6IHtcbiAgICAgICAgICBwbHVnaW5OYW1lLFxuICAgICAgICAgIG5hbWU6IHBhcmFtTmFtZSxcbiAgICAgICAgICBzcGVjLFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICAgIHJldHVybiBkaXNwXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0IChwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFZhbHVlKHBsdWdpbk5hbWUsIG5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0IChwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU/OiBPYmplY3QpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXRWYWx1ZShwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgfVxufVxuIl19