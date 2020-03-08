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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUEwQztBQUMxQyxtREFBOEM7QUFDOUMsK0NBQXVFO0FBUXZFLE1BQWEsa0JBQWtCO0lBRTdCLFlBQW9CLFdBQXdCLEVBQUUsS0FBYTtRQUF2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksOEJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFTSxHQUFHLENBQ1IsVUFBa0IsRUFDbEIsU0FBaUIsRUFDakIsSUFBNEI7UUFFNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxHQUFHLENBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7WUFDL0IsT0FBTyxFQUFFLDRCQUFZO1lBQ3JCLElBQUksRUFBRTtnQkFDSixVQUFVO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUk7Z0JBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCO1NBQ0YsQ0FBQyxDQUNILENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRyxDQUFJLFVBQWtCLEVBQUUsSUFBWTtRQUNsRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFJLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBSSxVQUFrQixFQUFFLElBQVksRUFBRSxLQUFTO1FBQzdELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0NBQ0Y7QUExQ0QsZ0RBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBQYXJhbUNvbnRyb2wgfSBmcm9tICcuL3BhcmFtLWNvbnRyb2wnXG5pbXBvcnQgeyBDb25maWdQYXJhbVN0b3JlLCBJU3RhdGUgYXMgSVN0b3JlU3RhdGUgfSBmcm9tICcuL3BhcmFtLXN0b3JlJ1xuXG5pbXBvcnQgeyBPdXRwdXRQYW5lbCB9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuXG50eXBlIElTdGF0ZSA9IElTdG9yZVN0YXRlXG5leHBvcnQgeyBJU3RhdGUgfVxuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG91dHB1dFBhbmVsOiBPdXRwdXRQYW5lbCwgc3RhdGU6IElTdGF0ZSkge1xuICAgIHRoaXMuc3RvcmUgPSBuZXcgQ29uZmlnUGFyYW1TdG9yZShzdGF0ZSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuc3RvcmUuZGVzdHJveSgpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlcmlhbGl6ZSgpXG4gIH1cblxuICBwdWJsaWMgYWRkKFxuICAgIHBsdWdpbk5hbWU6IHN0cmluZyxcbiAgICBwYXJhbU5hbWU6IHN0cmluZyxcbiAgICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxPYmplY3Q+LFxuICApIHtcbiAgICBjb25zdCBkaXNwID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGRpc3AuYWRkKFxuICAgICAgdGhpcy5zdG9yZS5hZGRQYXJhbVNwZWMocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKSxcbiAgICAgIHRoaXMub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKHtcbiAgICAgICAgZWxlbWVudDogUGFyYW1Db250cm9sLFxuICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgcGx1Z2luTmFtZSxcbiAgICAgICAgICBuYW1lOiBwYXJhbU5hbWUsXG4gICAgICAgICAgc3BlYyxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIClcbiAgICByZXR1cm4gZGlzcFxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldDxUPihwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFZhbHVlPFQ+KHBsdWdpbk5hbWUsIG5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0PFQ+KHBsdWdpbk5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXRWYWx1ZShwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgfVxufVxuIl19