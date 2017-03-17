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
        this.store = null;
        this.outputPanel = null;
    }
    serialize() {
        return this.store.serialize();
    }
    add(pluginName, specs) {
        let disp = new atom_1.CompositeDisposable();
        for (let name of Object.keys(specs)) {
            let spec = specs[name];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLXBhcmFtcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7Ozs7Ozs7QUFFWCwrQkFBd0M7QUFDeEMsbURBQTRDO0FBQzVDLCtDQUE4QztBQUU5QztJQUNFLFlBQWEsV0FBVyxFQUFFLEtBQUs7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDhCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUUsVUFBVSxFQUFFLEtBQUs7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3BDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN6RCxJQUFJLENBQUMsR0FBRyxDQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLDRCQUFZLEVBQUU7Z0JBQzdDLFVBQVU7Z0JBQ1YsSUFBSTtnQkFDSixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNsQixDQUFDLENBQ0gsQ0FBQTtRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVLLEdBQUcsQ0FBRSxVQUFVLEVBQUUsSUFBSTs7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLOztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNyRCxDQUFDO0tBQUE7Q0FDRjtBQXhDRCxnREF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5pbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge1BhcmFtQ29udHJvbH0gZnJvbSAnLi9wYXJhbS1jb250cm9sJ1xuaW1wb3J0IHtDb25maWdQYXJhbVN0b3JlfSBmcm9tICcuL3BhcmFtLXN0b3JlJ1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyYW1NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IgKG91dHB1dFBhbmVsLCBzdGF0ZSkge1xuICAgIHRoaXMub3V0cHV0UGFuZWwgPSBvdXRwdXRQYW5lbFxuICAgIHRoaXMuc3RvcmUgPSBuZXcgQ29uZmlnUGFyYW1TdG9yZShzdGF0ZSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc3RvcmUuZGVzdHJveSgpXG4gICAgdGhpcy5zdG9yZSA9IG51bGxcbiAgICB0aGlzLm91dHB1dFBhbmVsID0gbnVsbFxuICB9XG5cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXJpYWxpemUoKVxuICB9XG5cbiAgYWRkIChwbHVnaW5OYW1lLCBzcGVjcykge1xuICAgIGxldCBkaXNwID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGZvciAobGV0IG5hbWUgb2YgT2JqZWN0LmtleXMoc3BlY3MpKSB7XG4gICAgICBsZXQgc3BlYyA9IHNwZWNzW25hbWVdXG4gICAgICBkaXNwLmFkZCh0aGlzLnN0b3JlLmFkZFBhcmFtU3BlYyhwbHVnaW5OYW1lLCBuYW1lLCBzcGVjKSlcbiAgICAgIGRpc3AuYWRkKFxuICAgICAgICB0aGlzLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChQYXJhbUNvbnRyb2wsIHtcbiAgICAgICAgICBwbHVnaW5OYW1lLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgc3BlYyxcbiAgICAgICAgICBzdG9yZTogdGhpcy5zdG9yZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gZGlzcFxuICB9XG5cbiAgYXN5bmMgZ2V0IChwbHVnaW5OYW1lLCBuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0VmFsdWUocGx1Z2luTmFtZSwgbmFtZSlcbiAgfVxuXG4gIGFzeW5jIHNldCAocGx1Z2luTmFtZSwgbmFtZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXRWYWx1ZShwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgfVxufVxuIl19