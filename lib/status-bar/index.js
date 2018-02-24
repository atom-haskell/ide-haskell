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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFFNUIsbUVBQThEO0FBRzlEO0lBR0UsWUFBb0IsS0FBa0I7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQStCOUIsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUV0QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JCLENBQUMsQ0FBQTtRQWpDQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLGtCQUFLLEtBQUssRUFBQywwQkFBMEIsRUFBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoRTtnQkFDRSxvQ0FBc0I7Z0JBQ3RCLFNBQUMsd0JBQVUsSUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBSSxDQUNwQyxDQUNILENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWtCLEVBQUUsRUFBZTtRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLE9BQU87UUFFWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7Q0FNRjtBQXRDRCxzQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBPdXRwdXRQYW5lbCB9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7IFN0YXR1c0ljb24gfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwvdmlld3Mvc3RhdHVzLWljb24nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuZXhwb3J0IGNsYXNzIFN0YXR1c0JhclZpZXcge1xuICBwdWJsaWMgZWxlbWVudCE6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgc3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBVUEkuSVN0YXR1cz5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYW5lbDogT3V0cHV0UGFuZWwpIHtcbiAgICB0aGlzLnN0YXR1c01hcCA9IG5ldyBNYXAoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsIGlubGluZS1ibG9ja1wiIG9uPXt7IGNsaWNrOiB0aGlzLmRpZENsaWNrIH19PlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8aWRlLWhhc2tlbGwtbGFtYmRhIC8+XG4gICAgICAgICAgPFN0YXR1c0ljb24gc3RhdHVzTWFwPXt0aGlzLnN0YXR1c01hcH0gLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBiYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWU6IHN0cmluZywgc3Q6IFVQSS5JU3RhdHVzKSB7XG4gICAgdGhpcy5zdGF0dXNNYXAuc2V0KHBsdWdpbk5hbWUsIHN0KVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGljayA9ICgpID0+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICB0aGlzLnBhbmVsLnRvZ2dsZSgpXG4gIH1cbn1cbiJdfQ==