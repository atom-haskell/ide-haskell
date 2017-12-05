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
                store: this.store,
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQTBDO0FBQzFDLG1EQUE4QztBQUM5QywrQ0FBdUU7QUFRdkU7SUFFRSxZQUFvQixXQUF3QixFQUFFLEtBQWE7UUFBdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFTSxHQUFHLENBQUMsVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQTRCO1FBQzVFLE1BQU0sSUFBSSxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQy9CLE9BQU8sRUFBRSw0QkFBWTtZQUNyQixJQUFJLEVBQUU7Z0JBQ0osVUFBVTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FDSCxDQUFBO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFWSxHQUFHLENBQUksVUFBa0IsRUFBRSxJQUFZOztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUksVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBSSxVQUFrQixFQUFFLElBQVksRUFBRSxLQUFTOztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQUE7Q0FDRjtBQXRDRCxnREFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBhcmFtQ29udHJvbCB9IGZyb20gJy4vcGFyYW0tY29udHJvbCdcbmltcG9ydCB7IENvbmZpZ1BhcmFtU3RvcmUsIElTdGF0ZSBhcyBJU3RvcmVTdGF0ZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmltcG9ydCB7IE91dHB1dFBhbmVsIH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5cbnR5cGUgSVN0YXRlID0gSVN0b3JlU3RhdGVcbmV4cG9ydCB7IElTdGF0ZSB9XG5cbmV4cG9ydCBjbGFzcyBDb25maWdQYXJhbU1hbmFnZXIge1xuICBwcml2YXRlIHN0b3JlOiBDb25maWdQYXJhbVN0b3JlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3V0cHV0UGFuZWw6IE91dHB1dFBhbmVsLCBzdGF0ZTogSVN0YXRlKSB7XG4gICAgdGhpcy5zdG9yZSA9IG5ldyBDb25maWdQYXJhbVN0b3JlKHN0YXRlKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdG9yZS5kZXN0cm95KClcbiAgfVxuXG4gIHB1YmxpYyBzZXJpYWxpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VyaWFsaXplKClcbiAgfVxuXG4gIHB1YmxpYyBhZGQocGx1Z2luTmFtZTogc3RyaW5nLCBwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8T2JqZWN0Pikge1xuICAgIGNvbnN0IGRpc3AgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgZGlzcC5hZGQoXG4gICAgICB0aGlzLnN0b3JlLmFkZFBhcmFtU3BlYyhwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpLFxuICAgICAgdGhpcy5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woe1xuICAgICAgICBlbGVtZW50OiBQYXJhbUNvbnRyb2wsXG4gICAgICAgIG9wdHM6IHtcbiAgICAgICAgICBwbHVnaW5OYW1lLFxuICAgICAgICAgIG5hbWU6IHBhcmFtTmFtZSxcbiAgICAgICAgICBzcGVjLFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKVxuICAgIHJldHVybiBkaXNwXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0PFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0VmFsdWU8VD4ocGx1Z2luTmFtZSwgbmFtZSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQ8VD4ocGx1Z2luTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlPzogVCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNldFZhbHVlKHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICB9XG59XG4iXX0=