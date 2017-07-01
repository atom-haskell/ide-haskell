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
class StatusBarView {
    constructor(panel) {
        this.panel = panel;
        this.currentStatus = { status: 'ready', detail: '' };
        etch.initialize(this);
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell inline-block", on: { click: this.didClick.bind(this) } },
            etch.dom("span", null,
                etch.dom("ide-haskell-lambda", null),
                etch.dom("ide-haskell-status-icon", { ref: "status", id: "status", dataset: { status: this.currentStatus.status } }))));
    }
    update() {
        return etch.update(this);
    }
    setStatus(status) {
        this.currentStatus = status;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQWM1QjtJQUlFLFlBQXFCLEtBQWtCO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxrQkFBSyxLQUFLLEVBQUMsMEJBQTBCLEVBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ3pFO2dCQUNFLG9DQUFxQjtnQkFDckIsc0NBQXlCLEdBQUcsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUM1RixDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLFNBQVMsQ0FBRSxNQUFlO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFBO1FBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0Y7QUFwQ0Qsc0NBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtJU3RhdHVzLCBPdXRwdXRQYW5lbH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElUaWxlIHtcbiAgZ2V0UHJpb3JpdHkgKCk6IG51bWJlclxuICBnZXRJdGVtICgpOiBPYmplY3RcbiAgZGVzdHJveSAoKTogdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0dXNCYXIge1xuICBhZGRMZWZ0VGlsZSAocGFyYW1zOiB7aXRlbTogT2JqZWN0LCBwcmlvcml0eTogbnVtYmVyfSk6IElUaWxlXG4gIGFkZFJpZ2h0VGlsZSAocGFyYW1zOiB7aXRlbTogT2JqZWN0LCBwcmlvcml0eTogbnVtYmVyfSk6IElUaWxlXG59XG5cbmV4cG9ydCBjbGFzcyBTdGF0dXNCYXJWaWV3IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBjdXJyZW50U3RhdHVzOiBJU3RhdHVzXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHBhbmVsOiBPdXRwdXRQYW5lbCkge1xuICAgIHRoaXMuY3VycmVudFN0YXR1cyA9IHsgc3RhdHVzOiAncmVhZHknLCBkZXRhaWw6ICcnIH1cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwgaW5saW5lLWJsb2NrXCIgb249e3tjbGljazogdGhpcy5kaWRDbGljay5iaW5kKHRoaXMpfX0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxpZGUtaGFza2VsbC1sYW1iZGEvPlxuICAgICAgICAgIDxpZGUtaGFza2VsbC1zdGF0dXMtaWNvbiByZWY9XCJzdGF0dXNcIiBpZD1cInN0YXR1c1wiIGRhdGFzZXQ9e3tzdGF0dXM6IHRoaXMuY3VycmVudFN0YXR1cy5zdGF0dXN9fS8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gc3RhdHVzXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGljayAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKHRoaXMucGFuZWwpXG4gIH1cbn1cbiJdfQ==