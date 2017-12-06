"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
const status_icon_1 = require("../output-panel/views/status-icon");
class StatusBarView {
    constructor(panel) {
        this.panel = panel;
        this.didClick = () => {
            this.panel.toggle();
        };
        this.statusMap = new Map();
        etch.initialize(this);
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell inline-block", on: { click: this.didClick } },
            etch.dom("span", null,
                etch.dom("ide-haskell-lambda", null),
                etch.dom(status_icon_1.StatusIcon, { statusMap: this.statusMap }))));
    }
    async update() {
        return etch.update(this);
    }
    backendStatus(pluginName, st) {
        this.statusMap.set(pluginName, st);
        this.update();
    }
    destroy() {
        etch.destroy(this);
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFFNUIsbUVBQThEO0FBRzlEO0lBSUUsWUFBb0IsS0FBa0I7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQWlDOUIsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUV0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JCLENBQUMsQ0FBQTtRQW5DQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUVMLGtCQUFLLEtBQUssRUFBQywwQkFBMEIsRUFBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoRTtnQkFDRSxvQ0FBc0I7Z0JBQ3RCLFNBQUMsd0JBQVUsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBSSxDQUNwQyxDQUNILENBRVAsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCLEVBQUUsRUFBZTtRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLE9BQU87UUFFWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7Q0FNRjtBQXpDRCxzQ0F5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBPdXRwdXRQYW5lbCB9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7IFN0YXR1c0ljb24gfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwvdmlld3Mvc3RhdHVzLWljb24nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhclZpZXcge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZFxuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBzdGF0dXNNYXA6IE1hcDxzdHJpbmcsIFVQSS5JU3RhdHVzPlxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhbmVsOiBPdXRwdXRQYW5lbCkge1xuICAgIHRoaXMuc3RhdHVzTWFwID0gbmV3IE1hcCgpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwgaW5saW5lLWJsb2NrXCIgb249e3sgY2xpY2s6IHRoaXMuZGlkQ2xpY2sgfX0+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxpZGUtaGFza2VsbC1sYW1iZGEgLz5cbiAgICAgICAgICA8U3RhdHVzSWNvbiBzdGF0dXNNYXA9e3RoaXMuc3RhdHVzTWFwfSAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lOiBzdHJpbmcsIHN0OiBVUEkuSVN0YXR1cykge1xuICAgIHRoaXMuc3RhdHVzTWFwLnNldChwbHVnaW5OYW1lLCBzdClcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgZGlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgdGhpcy5wYW5lbC50b2dnbGUoKVxuICB9XG59XG4iXX0=