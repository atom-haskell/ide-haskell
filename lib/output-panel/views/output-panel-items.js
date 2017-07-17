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
        this.itemMap = new WeakMap();
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
            const view = this.itemMap.get(item);
            if (view) {
                view.component.clickPosition();
                view.domNode.scrollIntoView({
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
        return Array.from(this.props.model.filter(this.props.filter)).map((item) => {
            const view = etch.dom(output_panel_item_1.OutputPanelItem, { model: item });
            this.itemMap.set(item, view);
            return view;
        });
    }
}
exports.OutputPanelItems = OutputPanelItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBUW5EO0lBSUUsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsS0FBSyxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxJQUFJLElBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDSyxDQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFhOztZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFFLElBQWdCOztZQUNyQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztvQkFDMUIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRU0sS0FBSztRQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUMvRCxDQUFDLElBQUk7WUFDSCxNQUFNLElBQUksR0FBRyxTQUFDLG1DQUFlLElBQUMsS0FBSyxFQUFFLElBQUksR0FBSSxDQUFBO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFXLENBQUMsQ0FBQTtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF4REQsNENBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtPdXRwdXRQYW5lbEl0ZW19IGZyb20gJy4vb3V0cHV0LXBhbmVsLWl0ZW0nXG5pbXBvcnQge1Jlc3VsdHNEQiwgUmVzdWx0SXRlbX0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBtb2RlbDogUmVzdWx0c0RCXG4gIGZpbHRlcjogKGl0ZW06IFJlc3VsdEl0ZW0pID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsSXRlbXMgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgaXRlbU1hcDogV2Vha01hcDxSZXN1bHRJdGVtLCB7Y29tcG9uZW50OiBPdXRwdXRQYW5lbEl0ZW0sIGRvbU5vZGU6IEhUTUxFbGVtZW50fT5cbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5pdGVtTWFwID0gbmV3IFdlYWtNYXAoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtcyBjbGFzcz1cIm5hdGl2ZS1rZXktYmluZGluZ3NcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93SXRlbSAoaXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGF3YWl0IGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgY29uc3QgdmlldyA9IHRoaXMuaXRlbU1hcC5nZXQoaXRlbSlcbiAgICBpZiAodmlldykge1xuICAgICAgdmlldy5jb21wb25lbnQuY2xpY2tQb3NpdGlvbigpXG4gICAgICB2aWV3LmRvbU5vZGUuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICBibG9jazogJ3N0YXJ0JyxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzY3JvbGxUb0VuZCAoKSB7XG4gICAgYXdhaXQgZXRjaC51cGRhdGUodGhpcylcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodFxuICB9XG5cbiAgcHVibGljIGF0RW5kICgpIHtcbiAgICByZXR1cm4gKHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPj0gKHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0KSlcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVySXRlbXMgKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucHJvcHMubW9kZWwuZmlsdGVyKHRoaXMucHJvcHMuZmlsdGVyKSkubWFwKFxuICAgICAgKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgdmlldyA9IDxPdXRwdXRQYW5lbEl0ZW0gbW9kZWw9e2l0ZW19IC8+XG4gICAgICAgIHRoaXMuaXRlbU1hcC5zZXQoaXRlbSwgdmlldyBhcyBhbnkpXG4gICAgICAgIHJldHVybiB2aWV3XG4gICAgICB9XG4gICAgKVxuICB9XG59XG4iXX0=