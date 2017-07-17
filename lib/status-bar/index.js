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
const etch = require("etch");
const status_icon_1 = require("../output-panel/views/status-icon");
class StatusBarView {
    constructor(panel) {
        this.panel = panel;
        this.statusMap = new Map();
        etch.initialize(this);
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell inline-block", on: { click: this.didClick.bind(this) } },
            etch.dom("span", null,
                etch.dom("ide-haskell-lambda", null),
                etch.dom(status_icon_1.StatusIcon, { statusMap: this.statusMap }))));
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return etch.update(this);
        });
    }
    backendStatus(pluginName, st) {
        this.statusMap.set(pluginName, st);
        this.update();
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    didClick() {
        this.panel.toggle();
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QixtRUFBNEQ7QUFhNUQ7SUFJRSxZQUFxQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsa0JBQUssS0FBSyxFQUFDLDBCQUEwQixFQUFDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN6RTtnQkFDRSxvQ0FBcUI7Z0JBQ3JCLFNBQUMsd0JBQVUsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUNuQyxDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNOztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTSxhQUFhLENBQUUsVUFBa0IsRUFBRSxFQUFXO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQXBDRCxzQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge0lTdGF0dXMsIE91dHB1dFBhbmVsfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQge1N0YXR1c0ljb259IGZyb20gJy4uL291dHB1dC1wYW5lbC92aWV3cy9zdGF0dXMtaWNvbidcblxuZXhwb3J0IGludGVyZmFjZSBJVGlsZSB7XG4gIGdldFByaW9yaXR5ICgpOiBudW1iZXJcbiAgZ2V0SXRlbSAoKTogT2JqZWN0XG4gIGRlc3Ryb3kgKCk6IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdHVzQmFyIHtcbiAgYWRkTGVmdFRpbGUgKHBhcmFtczoge2l0ZW06IE9iamVjdCwgcHJpb3JpdHk6IG51bWJlcn0pOiBJVGlsZVxuICBhZGRSaWdodFRpbGUgKHBhcmFtczoge2l0ZW06IE9iamVjdCwgcHJpb3JpdHk6IG51bWJlcn0pOiBJVGlsZVxufVxuXG5leHBvcnQgY2xhc3MgU3RhdHVzQmFyVmlldyB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgc3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBJU3RhdHVzPlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwYW5lbDogT3V0cHV0UGFuZWwpIHtcbiAgICB0aGlzLnN0YXR1c01hcCA9IG5ldyBNYXAoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbCBpbmxpbmUtYmxvY2tcIiBvbj17e2NsaWNrOiB0aGlzLmRpZENsaWNrLmJpbmQodGhpcyl9fT5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGlkZS1oYXNrZWxsLWxhbWJkYS8+XG4gICAgICAgICAgPFN0YXR1c0ljb24gc3RhdHVzTWFwPXt0aGlzLnN0YXR1c01hcH0vPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlICgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBiYWNrZW5kU3RhdHVzIChwbHVnaW5OYW1lOiBzdHJpbmcsIHN0OiBJU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXNNYXAuc2V0KHBsdWdpbk5hbWUsIHN0KVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgZGlkQ2xpY2sgKCkge1xuICAgIHRoaXMucGFuZWwudG9nZ2xlKClcbiAgfVxufVxuIl19