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
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-items", { class: "native-key-bindings", tabIndex: "-1" }, this.renderItems()));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this.props = props;
            return etch.update(this);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    showItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.update(this);
            const view = this.element.querySelector(`ide-haskell-panel-item[data-hash=${item.hash()}]`);
            if (view) {
                const pos = view.querySelector('ide-haskell-item-position');
                if (pos) {
                    pos.click();
                }
                view.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            }
        });
    }
    scrollToEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.update(this);
            this.element.scrollTop = this.element.scrollHeight;
        });
    }
    atEnd() {
        return (this.element.scrollTop >= (this.element.scrollHeight - this.element.clientHeight));
    }
    renderItems() {
        return Array.from(this.props.model.filter(this.props.filter)).map((item) => etch.dom(output_panel_item_1.OutputPanelItem, { model: item }));
    }
}
exports.OutputPanelItems = OutputPanelItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBUW5EO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLHNDQUF5QixLQUFLLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLElBQUksSUFDL0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUNLLENBQzNCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUUsSUFBZ0I7O1lBQ3JDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxvQ0FBb0MsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQWdCLENBQUE7WUFDMUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFnQixDQUFBO2dCQUMxRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDO29CQUNsQixLQUFLLEVBQUUsT0FBTztvQkFDZCxRQUFRLEVBQUUsUUFBUTtpQkFDbkIsQ0FBQyxDQUFBO1lBQ0osQ0FBQztRQUNILENBQUM7S0FBQTtJQUVZLFdBQVc7O1lBQ3RCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUNwRCxDQUFDO0tBQUE7SUFFTSxLQUFLO1FBQ1YsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDNUYsQ0FBQztJQUVPLFdBQVc7UUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQy9ELENBQUMsSUFBSSxLQUFLLFNBQUMsbUNBQWUsSUFBQyxLQUFLLEVBQUUsSUFBSSxHQUFJLENBQzNDLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFuREQsNENBbURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtPdXRwdXRQYW5lbEl0ZW19IGZyb20gJy4vb3V0cHV0LXBhbmVsLWl0ZW0nXG5pbXBvcnQge1Jlc3VsdHNEQiwgUmVzdWx0SXRlbX0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBtb2RlbDogUmVzdWx0c0RCXG4gIGZpbHRlcjogKGl0ZW06IFJlc3VsdEl0ZW0pID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsSXRlbXMgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtcyBjbGFzcz1cIm5hdGl2ZS1rZXktYmluZGluZ3NcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93SXRlbSAoaXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGF3YWl0IGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBpZGUtaGFza2VsbC1wYW5lbC1pdGVtW2RhdGEtaGFzaD0ke2l0ZW0uaGFzaCgpfV1gKSBhcyBIVE1MRWxlbWVudFxuICAgIGlmICh2aWV3KSB7XG4gICAgICBjb25zdCBwb3MgPSB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24nKSBhcyBIVE1MRWxlbWVudFxuICAgICAgaWYgKHBvcykgeyBwb3MuY2xpY2soKSB9XG4gICAgICB2aWV3LnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgYmxvY2s6ICdzdGFydCcsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2Nyb2xsVG9FbmQgKCkge1xuICAgIGF3YWl0IGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIHB1YmxpYyBhdEVuZCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID49ICh0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCkpXG4gIH1cblxuICBwcml2YXRlIHJlbmRlckl0ZW1zICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnByb3BzLm1vZGVsLmZpbHRlcih0aGlzLnByb3BzLmZpbHRlcikpLm1hcChcbiAgICAgIChpdGVtKSA9PiA8T3V0cHV0UGFuZWxJdGVtIG1vZGVsPXtpdGVtfSAvPlxuICAgIClcbiAgfVxufVxuIl19