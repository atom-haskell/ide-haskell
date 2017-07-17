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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBUW5EO0lBSUUsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsS0FBSyxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxJQUFJLElBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDSyxDQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFhOztZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFFLElBQWdCOztZQUNyQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztvQkFDMUIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRU0sS0FBSztRQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUMvRCxDQUFDLElBQUk7WUFDSCxNQUFNLElBQUksR0FBRyxTQUFDLG1DQUFlLElBQUMsS0FBSyxFQUFFLElBQUksR0FBSSxDQUFBO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2IsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF4REQsNENBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtPdXRwdXRQYW5lbEl0ZW19IGZyb20gJy4vb3V0cHV0LXBhbmVsLWl0ZW0nXG5pbXBvcnQge1Jlc3VsdHNEQiwgUmVzdWx0SXRlbX0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBtb2RlbDogUmVzdWx0c0RCXG4gIGZpbHRlcjogKGl0ZW06IFJlc3VsdEl0ZW0pID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsSXRlbXMgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgaXRlbU1hcDogV2Vha01hcDxSZXN1bHRJdGVtLCBhbnk+XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIHRoaXMuaXRlbU1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtaXRlbXMgY2xhc3M9XCJuYXRpdmUta2V5LWJpbmRpbmdzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtcz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd0l0ZW0gKGl0ZW06IFJlc3VsdEl0ZW0pIHtcbiAgICBhd2FpdCBldGNoLnVwZGF0ZSh0aGlzKVxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLml0ZW1NYXAuZ2V0KGl0ZW0pXG4gICAgaWYgKHZpZXcpIHtcbiAgICAgIHZpZXcuY29tcG9uZW50LmNsaWNrUG9zaXRpb24oKVxuICAgICAgdmlldy5kb21Ob2RlLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgYmxvY2s6ICdzdGFydCcsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2Nyb2xsVG9FbmQgKCkge1xuICAgIGF3YWl0IGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIHB1YmxpYyBhdEVuZCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID49ICh0aGlzLmVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCkpXG4gIH1cblxuICBwcml2YXRlIHJlbmRlckl0ZW1zICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnByb3BzLm1vZGVsLmZpbHRlcih0aGlzLnByb3BzLmZpbHRlcikpLm1hcChcbiAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSA8T3V0cHV0UGFuZWxJdGVtIG1vZGVsPXtpdGVtfSAvPlxuICAgICAgICB0aGlzLml0ZW1NYXAuc2V0KGl0ZW0sIHZpZXcpXG4gICAgICAgIHJldHVybiB2aWV3XG4gICAgICB9XG4gICAgKVxuICB9XG59XG4iXX0=