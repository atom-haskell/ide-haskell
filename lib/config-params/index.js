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
    add(pluginName, specs) {
        const disp = new atom_1.CompositeDisposable();
        for (const name of Object.keys(specs)) {
            const spec = specs[name];
            disp.add(this.store.addParamSpec(pluginName, name, spec));
            disp.add(this.outputPanel.addPanelControl(param_control_1.ParamControl, {
                pluginName,
                name,
                spec,
                store: this.store
            }));
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQXdDO0FBQ3hDLG1EQUE0QztBQUM1QywrQ0FBaUY7QUFRakY7SUFFRSxZQUFxQixXQUF3QixFQUFFLEtBQWE7UUFBdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFTSxHQUFHLENBQUUsVUFBa0IsRUFBRSxLQUErQztRQUM3RSxNQUFNLElBQUksR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdEMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxHQUFHLENBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsNEJBQVksRUFBRTtnQkFDN0MsVUFBVTtnQkFDVixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2xCLENBQUMsQ0FDSCxDQUFBO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRVksR0FBRyxDQUFFLFVBQWtCLEVBQUUsSUFBWTs7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0tBQUE7SUFFWSxHQUFHLENBQUUsVUFBa0IsRUFBRSxJQUFZLEVBQUUsS0FBVTs7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDckQsQ0FBQztLQUFBO0NBQ0Y7QUF0Q0QsZ0RBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtQYXJhbUNvbnRyb2x9IGZyb20gJy4vcGFyYW0tY29udHJvbCdcbmltcG9ydCB7Q29uZmlnUGFyYW1TdG9yZSwgSVBhcmFtU3BlYywgSVN0YXRlIGFzIElTdG9yZVN0YXRlfSBmcm9tICcuL3BhcmFtLXN0b3JlJ1xuZXhwb3J0IHtJUGFyYW1TcGVjfVxuXG5pbXBvcnQge091dHB1dFBhbmVsfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5cbnR5cGUgSVN0YXRlID0gSVN0b3JlU3RhdGVcbmV4cG9ydCB7SVN0YXRlfVxuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBvdXRwdXRQYW5lbDogT3V0cHV0UGFuZWwsIHN0YXRlOiBJU3RhdGUpIHtcbiAgICB0aGlzLnN0b3JlID0gbmV3IENvbmZpZ1BhcmFtU3RvcmUoc3RhdGUpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5zdG9yZS5kZXN0cm95KClcbiAgfVxuXG4gIHB1YmxpYyBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlcmlhbGl6ZSgpXG4gIH1cblxuICBwdWJsaWMgYWRkIChwbHVnaW5OYW1lOiBzdHJpbmcsIHNwZWNzOiB7IFtwYXJhbU5hbWU6IHN0cmluZ106IElQYXJhbVNwZWM8YW55PiB9KSB7XG4gICAgY29uc3QgZGlzcCA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMoc3BlY3MpKSB7XG4gICAgICBjb25zdCBzcGVjID0gc3BlY3NbbmFtZV1cbiAgICAgIGRpc3AuYWRkKHRoaXMuc3RvcmUuYWRkUGFyYW1TcGVjKHBsdWdpbk5hbWUsIG5hbWUsIHNwZWMpKVxuICAgICAgZGlzcC5hZGQoXG4gICAgICAgIHRoaXMub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKFBhcmFtQ29udHJvbCwge1xuICAgICAgICAgIHBsdWdpbk5hbWUsXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBzcGVjLFxuICAgICAgICAgIHN0b3JlOiB0aGlzLnN0b3JlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBkaXNwXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0IChwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFZhbHVlKHBsdWdpbk5hbWUsIG5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0IChwbHVnaW5OYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNldFZhbHVlKHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICB9XG59XG4iXX0=