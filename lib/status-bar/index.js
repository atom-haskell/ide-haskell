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
                etch.dom("ide-haskell-status-icon", { dataset: { status: this.currentStatus.status } }))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQWM1QjtJQUlFLFlBQXFCLEtBQWtCO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxrQkFBSyxLQUFLLEVBQUMsMEJBQTBCLEVBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ3pFO2dCQUNFLG9DQUFxQjtnQkFDckIsc0NBQXlCLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQ25FLENBQ0gsQ0FDUCxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sU0FBUyxDQUFFLE1BQWU7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUE7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTyxRQUFRO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25DLENBQUM7Q0FDRjtBQXBDRCxzQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge0lTdGF0dXMsIE91dHB1dFBhbmVsfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRpbGUge1xuICBnZXRQcmlvcml0eSAoKTogbnVtYmVyXG4gIGdldEl0ZW0gKCk6IE9iamVjdFxuICBkZXN0cm95ICgpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXR1c0JhciB7XG4gIGFkZExlZnRUaWxlIChwYXJhbXM6IHtpdGVtOiBPYmplY3QsIHByaW9yaXR5OiBudW1iZXJ9KTogSVRpbGVcbiAgYWRkUmlnaHRUaWxlIChwYXJhbXM6IHtpdGVtOiBPYmplY3QsIHByaW9yaXR5OiBudW1iZXJ9KTogSVRpbGVcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhclZpZXcge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGN1cnJlbnRTdGF0dXM6IElTdGF0dXNcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcGFuZWw6IE91dHB1dFBhbmVsKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0geyBzdGF0dXM6ICdyZWFkeScsIGRldGFpbDogJycgfVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbCBpbmxpbmUtYmxvY2tcIiBvbj17e2NsaWNrOiB0aGlzLmRpZENsaWNrLmJpbmQodGhpcyl9fT5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGlkZS1oYXNrZWxsLWxhbWJkYS8+XG4gICAgICAgICAgPGlkZS1oYXNrZWxsLXN0YXR1cy1pY29uIGRhdGFzZXQ9e3tzdGF0dXM6IHRoaXMuY3VycmVudFN0YXR1cy5zdGF0dXN9fS8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gc3RhdHVzXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGljayAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKHRoaXMucGFuZWwpXG4gIH1cbn1cbiJdfQ==