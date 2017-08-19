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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQTBDO0FBQzFDLG1EQUE4QztBQUM5QywrQ0FBdUU7QUFPdkU7SUFFRSxZQUFvQixXQUF3QixFQUFFLEtBQWE7UUFBdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFTSxHQUFHLENBQUMsVUFBa0IsRUFBRSxTQUFpQixFQUFFLElBQTRCO1FBQzVFLE1BQU0sSUFBSSxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQy9CLE9BQU8sRUFBRSw0QkFBWTtZQUNyQixJQUFJLEVBQUU7Z0JBQ0osVUFBVTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FDSCxDQUFBO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFWSxHQUFHLENBQUksVUFBa0IsRUFBRSxJQUFZOztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUksVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBSSxVQUFrQixFQUFFLElBQVksRUFBRSxLQUFTOztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQUE7Q0FDRjtBQXRDRCxnREFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBhcmFtQ29udHJvbCB9IGZyb20gJy4vcGFyYW0tY29udHJvbCdcbmltcG9ydCB7IENvbmZpZ1BhcmFtU3RvcmUsIElTdGF0ZSBhcyBJU3RvcmVTdGF0ZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmltcG9ydCB7IE91dHB1dFBhbmVsIH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsJ1xuXG50eXBlIElTdGF0ZSA9IElTdG9yZVN0YXRlXG5leHBvcnQgeyBJU3RhdGUgfVxuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG91dHB1dFBhbmVsOiBPdXRwdXRQYW5lbCwgc3RhdGU6IElTdGF0ZSkge1xuICAgIHRoaXMuc3RvcmUgPSBuZXcgQ29uZmlnUGFyYW1TdG9yZShzdGF0ZSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlcmlhbGl6ZSgpXG4gIH1cblxuICBwdWJsaWMgYWRkKHBsdWdpbk5hbWU6IHN0cmluZywgcGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IFVQSS5JUGFyYW1TcGVjPE9iamVjdD4pIHtcbiAgICBjb25zdCBkaXNwID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGRpc3AuYWRkKFxuICAgICAgdGhpcy5zdG9yZS5hZGRQYXJhbVNwZWMocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKSxcbiAgICAgIHRoaXMub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKHtcbiAgICAgICAgZWxlbWVudDogUGFyYW1Db250cm9sLFxuICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgcGx1Z2luTmFtZSxcbiAgICAgICAgICBuYW1lOiBwYXJhbU5hbWUsXG4gICAgICAgICAgc3BlYyxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIClcbiAgICByZXR1cm4gZGlzcFxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldDxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFZhbHVlPFQ+KHBsdWdpbk5hbWUsIG5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0PFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXRWYWx1ZShwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgfVxufVxuIl19