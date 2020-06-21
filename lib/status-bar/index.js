"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
const status_icon_1 = require("../output-panel/views/status-icon");
const utils_1 = require("../utils");
class StatusBarView {
    constructor(panel) {
        this.panel = panel;
        this.didClick = () => {
            utils_1.handlePromise(this.panel.toggle());
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
        utils_1.handlePromise(this.update());
    }
    destroy() {
        utils_1.handlePromise(etch.destroy(this));
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFFNUIsbUVBQThEO0FBRTlELG9DQUF3QztBQUV4QyxNQUFhLGFBQWE7SUFHeEIsWUFBb0IsS0FBa0I7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQTZCOUIsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUN0QixxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUNwQyxDQUFDLENBQUE7UUE5QkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLENBQ0wsa0JBQUssS0FBSyxFQUFDLDBCQUEwQixFQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hFO2dCQUNFLG9DQUFzQjtnQkFDdEIsU0FBQyx3QkFBVSxJQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFJLENBQ3BDLENBQ0gsQ0FDUCxDQUFBO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCLEVBQUUsRUFBZTtRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDbEMscUJBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRU0sT0FBTztRQUNaLHFCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ25DLENBQUM7Q0FLRjtBQW5DRCxzQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBPdXRwdXRQYW5lbCB9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7IFN0YXR1c0ljb24gfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwvdmlld3Mvc3RhdHVzLWljb24nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCB7IGhhbmRsZVByb21pc2UgfSBmcm9tICcuLi91dGlscydcblxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhclZpZXcge1xuICBwdWJsaWMgZWxlbWVudCE6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgc3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBVUEkuSVN0YXR1cz5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYW5lbDogT3V0cHV0UGFuZWwpIHtcbiAgICB0aGlzLnN0YXR1c01hcCA9IG5ldyBNYXAoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsIGlubGluZS1ibG9ja1wiIG9uPXt7IGNsaWNrOiB0aGlzLmRpZENsaWNrIH19PlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8aWRlLWhhc2tlbGwtbGFtYmRhIC8+XG4gICAgICAgICAgPFN0YXR1c0ljb24gc3RhdHVzTWFwPXt0aGlzLnN0YXR1c01hcH0gLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBiYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWU6IHN0cmluZywgc3Q6IFVQSS5JU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXNNYXAuc2V0KHBsdWdpbk5hbWUsIHN0KVxuICAgIGhhbmRsZVByb21pc2UodGhpcy51cGRhdGUoKSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIGhhbmRsZVByb21pc2UoZXRjaC5kZXN0cm95KHRoaXMpKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGljayA9ICgpID0+IHtcbiAgICBoYW5kbGVQcm9taXNlKHRoaXMucGFuZWwudG9nZ2xlKCkpXG4gIH1cbn1cbiJdfQ==