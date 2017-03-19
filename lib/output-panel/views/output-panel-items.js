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
        this.activeFilter = () => true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBR25EO0lBTUUsWUFBYSxFQUFDLEtBQUssRUFBcUI7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsS0FBSyxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxJQUFJLElBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDSyxDQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUEwQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFFLFlBQTJDOztZQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7WUFDakIsQ0FBQztZQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3JCLENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBRSxJQUFnQjs7WUFDckMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDbkIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUM3RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQztvQkFDbEIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUNwRCxDQUFDO0tBQUE7SUFFTSxLQUFLO1FBQ1YsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDNUYsQ0FBQztJQUVPLFdBQVc7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixDQUFDLElBQUksS0FBSyxTQUFDLG1DQUFlLElBQUMsS0FBSyxFQUFFLElBQUksR0FBSSxDQUMzQyxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBbEVELDRDQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7T3V0cHV0UGFuZWxJdGVtfSBmcm9tICcuL291dHB1dC1wYW5lbC1pdGVtJ1xuaW1wb3J0IHtSZXN1bHRzREIsIFJlc3VsdEl0ZW19IGZyb20gJy4uLy4uL3Jlc3VsdHMtZGInXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW1zIHtcbiAgcHJpdmF0ZSBtb2RlbDogUmVzdWx0c0RCXG4gIHByaXZhdGUgaXRlbXM6IFJlc3VsdEl0ZW1bXVxuICBwcml2YXRlIGFjdGl2ZUZpbHRlcjogKGl0ZW06IFJlc3VsdEl0ZW0pID0+IGJvb2xlYW5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yICh7bW9kZWx9OiB7bW9kZWw6IFJlc3VsdHNEQn0pIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWxcbiAgICB0aGlzLml0ZW1zID0gW11cbiAgICB0aGlzLmFjdGl2ZUZpbHRlciA9ICgpID0+IHRydWVcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtaXRlbXMgY2xhc3M9XCJuYXRpdmUta2V5LWJpbmRpbmdzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtcz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wcz86IHttb2RlbDogUmVzdWx0c0RCfSkge1xuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5tb2RlbCkgeyB0aGlzLm1vZGVsID0gcHJvcHMubW9kZWwgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGZpbHRlciAoYWN0aXZlRmlsdGVyOiAoaXRlbTogUmVzdWx0SXRlbSkgPT4gYm9vbGVhbikge1xuICAgIHRoaXMuYWN0aXZlRmlsdGVyID0gYWN0aXZlRmlsdGVyXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm1vZGVsLmZpbHRlcih0aGlzLmFjdGl2ZUZpbHRlcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdXG4gICAgfVxuICAgIGF3YWl0IHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93SXRlbSAoaXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGF3YWl0IHRoaXMudXBkYXRlKClcbiAgICBjb25zdCB2aWV3ID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgaWRlLWhhc2tlbGwtcGFuZWwtaXRlbWApKVt0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSldXG4gICAgaWYgKHZpZXcpIHtcbiAgICAgIHZpZXcucXVlcnlTZWxlY3RvcignaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbicpLmNsaWNrKClcbiAgICAgIHZpZXcuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICBibG9jazogJ3N0YXJ0JyxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzY3JvbGxUb0VuZCAoKSB7XG4gICAgYXdhaXQgdGhpcy51cGRhdGUoKVxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0XG4gIH1cblxuICBwdWJsaWMgYXRFbmQgKCkge1xuICAgIHJldHVybiAodGhpcy5lbGVtZW50LnNjcm9sbFRvcCA+PSAodGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHQpKVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJJdGVtcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKFxuICAgICAgKGl0ZW0pID0+IDxPdXRwdXRQYW5lbEl0ZW0gbW9kZWw9e2l0ZW19IC8+XG4gICAgKVxuICB9XG59XG4iXX0=