"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
const utils_1 = require("../utils");
class StatusBarView {
    constructor(panel, bsc) {
        this.panel = panel;
        this.bsc = bsc;
        this.didClick = () => {
            utils_1.handlePromise(this.panel.toggle());
        };
        etch.initialize(this);
        this.disp = bsc.onDidUpdate(() => {
            utils_1.handlePromise(this.update());
        });
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell inline-block", on: { click: this.didClick } },
            etch.dom("span", null,
                etch.dom("ide-haskell-lambda", null),
                this.bsc.renderStatusIcon())));
    }
    async update() {
        return etch.update(this);
    }
    destroy() {
        this.disp.dispose();
        utils_1.handlePromise(etch.destroy(this));
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFFNUIsb0NBQXdDO0FBSXhDLE1BQWEsYUFBYTtJQUd4QixZQUNVLEtBQWtCLEVBQ2xCLEdBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDbEIsUUFBRyxHQUFILEdBQUcsQ0FBeUI7UUE0QjlCLGFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDdEIscUJBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDcEMsQ0FBQyxDQUFBO1FBNUJDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUMvQixxQkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLENBQ0wsa0JBQUssS0FBSyxFQUFDLDBCQUEwQixFQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hFO2dCQUNFLG9DQUFzQjtnQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUN2QixDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ25CLHFCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ25DLENBQUM7Q0FLRjtBQXBDRCxzQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBPdXRwdXRQYW5lbCB9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7IGhhbmRsZVByb21pc2UgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IEJhY2tlbmRTdGF0dXNDb250cm9sbGVyIH0gZnJvbSAnLi4vYmFja2VuZC1zdGF0dXMnXG5pbXBvcnQgeyBEaXNwb3NhYmxlTGlrZSB9IGZyb20gJ2F0b20nXG5cbmV4cG9ydCBjbGFzcyBTdGF0dXNCYXJWaWV3IHtcbiAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnQhOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIHJlYWRvbmx5IGRpc3A6IERpc3Bvc2FibGVMaWtlXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFuZWw6IE91dHB1dFBhbmVsLFxuICAgIHByaXZhdGUgYnNjOiBCYWNrZW5kU3RhdHVzQ29udHJvbGxlcixcbiAgKSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgdGhpcy5kaXNwID0gYnNjLm9uRGlkVXBkYXRlKCgpID0+IHtcbiAgICAgIGhhbmRsZVByb21pc2UodGhpcy51cGRhdGUoKSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsIGlubGluZS1ibG9ja1wiIG9uPXt7IGNsaWNrOiB0aGlzLmRpZENsaWNrIH19PlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8aWRlLWhhc2tlbGwtbGFtYmRhIC8+XG4gICAgICAgICAge3RoaXMuYnNjLnJlbmRlclN0YXR1c0ljb24oKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcC5kaXNwb3NlKClcbiAgICBoYW5kbGVQcm9taXNlKGV0Y2guZGVzdHJveSh0aGlzKSlcbiAgfVxuXG4gIHByaXZhdGUgZGlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgaGFuZGxlUHJvbWlzZSh0aGlzLnBhbmVsLnRvZ2dsZSgpKVxuICB9XG59XG4iXX0=