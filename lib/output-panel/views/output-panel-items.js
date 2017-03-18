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
const output_panel_item_1 = require("./output-panel-item");
class OutputPanelItems {
    constructor({ model }) {
        this.model = model;
        this.items = [];
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-items", { class: "native-key-bindings", tabIndex: "-1" }, this.renderItems()));
    }
    update(props) {
        if (props && props.model) {
            this.model = props.model;
        }
        return etch.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    filter(activeFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeFilter = activeFilter;
            if (this.model) {
                this.items = this.model.filter(this.activeFilter);
            }
            else {
                this.items = [];
            }
            yield this.update();
        });
    }
    showItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update();
            const view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)];
            if (view) {
                view.querySelector('ide-haskell-item-position').click();
                view.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            }
        });
    }
    scrollToEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update();
            this.element.scrollTop = this.element.scrollHeight;
        });
    }
    atEnd() {
        return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight));
    }
    renderItems() {
        return this.items.map((item) => etch.dom(output_panel_item_1.OutputPanelItem, { model: item }));
    }
}
exports.OutputPanelItems = OutputPanelItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBR25EO0lBS0UsWUFBYSxFQUFDLEtBQUssRUFBcUI7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsc0NBQXlCLEtBQUssRUFBQyxxQkFBcUIsRUFBQyxRQUFRLEVBQUMsSUFBSSxJQUMvRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQ0ssQ0FDM0IsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsS0FBMEI7UUFDdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVZLE1BQU0sQ0FBRSxZQUEyQzs7WUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNyQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUUsSUFBZ0I7O1lBQ3JDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ25CLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDN0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUM7b0JBQ2xCLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxRQUFRO2lCQUNuQixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRVksV0FBVzs7WUFDdEIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRU0sS0FBSztRQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsQ0FBQyxJQUFJLEtBQUssU0FBQyxtQ0FBZSxJQUFDLEtBQUssRUFBRSxJQUFJLEdBQUksQ0FDM0MsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQWhFRCw0Q0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge091dHB1dFBhbmVsSXRlbX0gZnJvbSAnLi9vdXRwdXQtcGFuZWwtaXRlbSdcbmltcG9ydCB7UmVzdWx0c0RCLCBSZXN1bHRJdGVtfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtcyB7XG4gIHByaXZhdGUgbW9kZWw6IFJlc3VsdHNEQlxuICBwcml2YXRlIGl0ZW1zOiBSZXN1bHRJdGVtW11cbiAgcHJpdmF0ZSBhY3RpdmVGaWx0ZXI6IChpdGVtOiBSZXN1bHRJdGVtKSA9PiBib29sZWFuXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IgKHttb2RlbH06IHttb2RlbDogUmVzdWx0c0RCfSkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbFxuICAgIHRoaXMuaXRlbXMgPSBbXVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtcyBjbGFzcz1cIm5hdGl2ZS1rZXktYmluZGluZ3NcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKHByb3BzPzoge21vZGVsOiBSZXN1bHRzREJ9KSB7XG4gICAgaWYgKHByb3BzICYmIHByb3BzLm1vZGVsKSB7IHRoaXMubW9kZWwgPSBwcm9wcy5tb2RlbCB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZmlsdGVyIChhY3RpdmVGaWx0ZXI6IChpdGVtOiBSZXN1bHRJdGVtKSA9PiBib29sZWFuKSB7XG4gICAgdGhpcy5hY3RpdmVGaWx0ZXIgPSBhY3RpdmVGaWx0ZXJcbiAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMubW9kZWwuZmlsdGVyKHRoaXMuYWN0aXZlRmlsdGVyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zID0gW11cbiAgICB9XG4gICAgYXdhaXQgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNob3dJdGVtIChpdGVtOiBSZXN1bHRJdGVtKSB7XG4gICAgYXdhaXQgdGhpcy51cGRhdGUoKVxuICAgIGNvbnN0IHZpZXcgPSBbXS5zbGljZS5jYWxsKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBpZGUtaGFza2VsbC1wYW5lbC1pdGVtYCkpW3RoaXMuaXRlbXMuaW5kZXhPZihpdGVtKV1cbiAgICBpZiAodmlldykge1xuICAgICAgdmlldy5xdWVyeVNlbGVjdG9yKCdpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uJykuY2xpY2soKVxuICAgICAgdmlldy5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgIGJsb2NrOiAnc3RhcnQnLFxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNjcm9sbFRvRW5kICgpIHtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIHB1YmxpYyBhdEVuZCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID49ICh0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCkpXG4gIH1cblxuICBwcml2YXRlIHJlbmRlckl0ZW1zICgpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5tYXAoXG4gICAgICAoaXRlbSkgPT4gPE91dHB1dFBhbmVsSXRlbSBtb2RlbD17aXRlbX0gLz5cbiAgICApXG4gIH1cbn1cbiJdfQ==