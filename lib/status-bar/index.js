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
        etch.destroy(this);
    }
}
exports.StatusBarView = StatusBarView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhdHVzLWJhci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QixtRUFBOEQ7QUFHOUQ7SUFJRSxZQUFvQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBaUM5QixhQUFRLEdBQUcsR0FBRyxFQUFFO1lBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDckIsQ0FBQyxDQUFBO1FBbkNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBRUwsa0JBQUssS0FBSyxFQUFDLDBCQUEwQixFQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hFO2dCQUNFLG9DQUFzQjtnQkFDdEIsU0FBQyx3QkFBVSxJQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFJLENBQ3BDLENBQ0gsQ0FFUCxDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU07O1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLGFBQWEsQ0FBQyxVQUFrQixFQUFFLEVBQWU7UUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWxDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFTSxPQUFPO1FBRVosSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0NBTUY7QUF6Q0Qsc0NBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgT3V0cHV0UGFuZWwgfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQgeyBTdGF0dXNJY29uIH0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsL3ZpZXdzL3N0YXR1cy1pY29uJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5cbmV4cG9ydCBjbGFzcyBTdGF0dXNCYXJWaWV3IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWRcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgc3RhdHVzTWFwOiBNYXA8c3RyaW5nLCBVUEkuSVN0YXR1cz5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYW5lbDogT3V0cHV0UGFuZWwpIHtcbiAgICB0aGlzLnN0YXR1c01hcCA9IG5ldyBNYXAoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsIGlubGluZS1ibG9ja1wiIG9uPXt7IGNsaWNrOiB0aGlzLmRpZENsaWNrIH19PlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8aWRlLWhhc2tlbGwtbGFtYmRhIC8+XG4gICAgICAgICAgPFN0YXR1c0ljb24gc3RhdHVzTWFwPXt0aGlzLnN0YXR1c01hcH0gLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZTogc3RyaW5nLCBzdDogVVBJLklTdGF0dXMpIHtcbiAgICB0aGlzLnN0YXR1c01hcC5zZXQocGx1Z2luTmFtZSwgc3QpXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwcml2YXRlIGRpZENsaWNrID0gKCkgPT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHRoaXMucGFuZWwudG9nZ2xlKClcbiAgfVxufVxuIl19