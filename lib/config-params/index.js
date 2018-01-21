"use strict";
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
    async get(pluginName, name) {
        return this.store.getValue(pluginName, name);
    }
    async set(pluginName, name, value) {
        return this.store.setValue(pluginName, name, value);
    }
}
exports.ConfigParamManager = ConfigParamManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUEwQztBQUMxQyxtREFBOEM7QUFDOUMsK0NBQXVFO0FBUXZFO0lBRUUsWUFBb0IsV0FBd0IsRUFBRSxLQUFhO1FBQXZDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw4QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRU0sR0FBRyxDQUNSLFVBQWtCLEVBQ2xCLFNBQWlCLEVBQ2pCLElBQTRCO1FBRTVCLE1BQU0sSUFBSSxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQy9CLE9BQU8sRUFBRSw0QkFBWTtZQUNyQixJQUFJLEVBQUU7Z0JBQ0osVUFBVTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQjtTQUNGLENBQUMsQ0FDSCxDQUFBO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFJLFVBQWtCLEVBQUUsSUFBWTtRQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUksVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFJLFVBQWtCLEVBQUUsSUFBWSxFQUFFLEtBQVM7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBMUNELGdEQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgUGFyYW1Db250cm9sIH0gZnJvbSAnLi9wYXJhbS1jb250cm9sJ1xuaW1wb3J0IHsgQ29uZmlnUGFyYW1TdG9yZSwgSVN0YXRlIGFzIElTdG9yZVN0YXRlIH0gZnJvbSAnLi9wYXJhbS1zdG9yZSdcblxuaW1wb3J0IHsgT3V0cHV0UGFuZWwgfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxudHlwZSBJU3RhdGUgPSBJU3RvcmVTdGF0ZVxuZXhwb3J0IHsgSVN0YXRlIH1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ1BhcmFtTWFuYWdlciB7XG4gIHByaXZhdGUgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdXRwdXRQYW5lbDogT3V0cHV0UGFuZWwsIHN0YXRlOiBJU3RhdGUpIHtcbiAgICB0aGlzLnN0b3JlID0gbmV3IENvbmZpZ1BhcmFtU3RvcmUoc3RhdGUpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLnN0b3JlLmRlc3Ryb3koKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXJpYWxpemUoKVxuICB9XG5cbiAgcHVibGljIGFkZChcbiAgICBwbHVnaW5OYW1lOiBzdHJpbmcsXG4gICAgcGFyYW1OYW1lOiBzdHJpbmcsXG4gICAgc3BlYzogVVBJLklQYXJhbVNwZWM8T2JqZWN0PixcbiAgKSB7XG4gICAgY29uc3QgZGlzcCA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBkaXNwLmFkZChcbiAgICAgIHRoaXMuc3RvcmUuYWRkUGFyYW1TcGVjKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgc3BlYyksXG4gICAgICB0aGlzLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbCh7XG4gICAgICAgIGVsZW1lbnQ6IFBhcmFtQ29udHJvbCxcbiAgICAgICAgb3B0czoge1xuICAgICAgICAgIHBsdWdpbk5hbWUsXG4gICAgICAgICAgbmFtZTogcGFyYW1OYW1lLFxuICAgICAgICAgIHNwZWMsXG4gICAgICAgICAgc3RvcmU6IHRoaXMuc3RvcmUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApXG4gICAgcmV0dXJuIGRpc3BcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXQ8VD4ocGx1Z2luTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRWYWx1ZTxUPihwbHVnaW5OYW1lLCBuYW1lKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldDxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU/OiBUKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2V0VmFsdWUocGx1Z2luTmFtZSwgbmFtZSwgdmFsdWUpXG4gIH1cbn1cbiJdfQ==