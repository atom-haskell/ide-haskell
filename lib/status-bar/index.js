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
        return etch.update(this);
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
        atom.workspace.toggle(this.panel);
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QixtRUFBNEQ7QUFhNUQ7SUFJRSxZQUFxQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsa0JBQUssS0FBSyxFQUFDLDBCQUEwQixFQUFDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN6RTtnQkFDRSxvQ0FBcUI7Z0JBQ3JCLFNBQUMsd0JBQVUsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUNuQyxDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLGFBQWEsQ0FBRSxVQUFrQixFQUFFLEVBQVc7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0Y7QUFwQ0Qsc0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtJU3RhdHVzLCBPdXRwdXRQYW5lbH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsJ1xuaW1wb3J0IHtTdGF0dXNJY29ufSBmcm9tICcuLi9vdXRwdXQtcGFuZWwvdmlld3Mvc3RhdHVzLWljb24nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRpbGUge1xuICBnZXRQcmlvcml0eSAoKTogbnVtYmVyXG4gIGdldEl0ZW0gKCk6IE9iamVjdFxuICBkZXN0cm95ICgpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXR1c0JhciB7XG4gIGFkZExlZnRUaWxlIChwYXJhbXM6IHtpdGVtOiBPYmplY3QsIHByaW9yaXR5OiBudW1iZXJ9KTogSVRpbGVcbiAgYWRkUmlnaHRUaWxlIChwYXJhbXM6IHtpdGVtOiBPYmplY3QsIHByaW9yaXR5OiBudW1iZXJ9KTogSVRpbGVcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhclZpZXcge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIHN0YXR1c01hcDogTWFwPHN0cmluZywgSVN0YXR1cz5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcGFuZWw6IE91dHB1dFBhbmVsKSB7XG4gICAgdGhpcy5zdGF0dXNNYXAgPSBuZXcgTWFwKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwgaW5saW5lLWJsb2NrXCIgb249e3tjbGljazogdGhpcy5kaWRDbGljay5iaW5kKHRoaXMpfX0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxpZGUtaGFza2VsbC1sYW1iZGEvPlxuICAgICAgICAgIDxTdGF0dXNJY29uIHN0YXR1c01hcD17dGhpcy5zdGF0dXNNYXB9Lz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYmFja2VuZFN0YXR1cyAocGx1Z2luTmFtZTogc3RyaW5nLCBzdDogSVN0YXR1cykge1xuICAgIHRoaXMuc3RhdHVzTWFwLnNldChwbHVnaW5OYW1lLCBzdClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwcml2YXRlIGRpZENsaWNrICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUodGhpcy5wYW5lbClcbiAgfVxufVxuIl19