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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFFNUIsbUVBQThEO0FBRzlELE1BQWEsYUFBYTtJQUd4QixZQUFvQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBK0I5QixhQUFRLEdBQUcsR0FBRyxFQUFFO1lBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDckIsQ0FBQyxDQUFBO1FBakNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxDQUNMLGtCQUFLLEtBQUssRUFBQywwQkFBMEIsRUFBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoRTtnQkFDRSxvQ0FBc0I7Z0JBQ3RCLFNBQUMsd0JBQVUsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBSSxDQUNwQyxDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxVQUFrQixFQUFFLEVBQWU7UUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWxDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFTSxPQUFPO1FBRVosSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0NBTUY7QUF0Q0Qsc0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgT3V0cHV0UGFuZWwgfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQgeyBTdGF0dXNJY29uIH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5cbmV4cG9ydCBjbGFzcyBTdGF0dXNCYXJWaWV3IHtcbiAgcHVibGljIGVsZW1lbnQhOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIHN0YXR1c01hcDogTWFwPHN0cmluZywgVVBJLklTdGF0dXM+XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFuZWw6IE91dHB1dFBhbmVsKSB7XG4gICAgdGhpcy5zdGF0dXNNYXAgPSBuZXcgTWFwKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbCBpbmxpbmUtYmxvY2tcIiBvbj17eyBjbGljazogdGhpcy5kaWRDbGljayB9fT5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGlkZS1oYXNrZWxsLWxhbWJkYSAvPlxuICAgICAgICAgIDxTdGF0dXNJY29uIHN0YXR1c01hcD17dGhpcy5zdGF0dXNNYXB9IC8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lOiBzdHJpbmcsIHN0OiBVUEkuSVN0YXR1cykge1xuICAgIHRoaXMuc3RhdHVzTWFwLnNldChwbHVnaW5OYW1lLCBzdClcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgZGlkQ2xpY2sgPSAoKSA9PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgdGhpcy5wYW5lbC50b2dnbGUoKVxuICB9XG59XG4iXX0=