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
                    behavior: 'smooth',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQXFEO0FBUXJEO0lBSUUsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsS0FBSyxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxJQUFJLElBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDSyxDQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxLQUFhOztZQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFDLElBQWdCOztZQUNwQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztvQkFDMUIsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRU0sS0FBSztRQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUMvRCxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEdBQUcsU0FBQyxtQ0FBZSxJQUFDLEtBQUssRUFBRSxJQUFJLEdBQUksQ0FBQTtZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUE7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNiLENBQUMsQ0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBeERELDRDQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7IE91dHB1dFBhbmVsSXRlbSB9IGZyb20gJy4vb3V0cHV0LXBhbmVsLWl0ZW0nXG5pbXBvcnQgeyBSZXN1bHRzREIsIFJlc3VsdEl0ZW0gfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIG1vZGVsOiBSZXN1bHRzREJcbiAgZmlsdGVyOiAoaXRlbTogUmVzdWx0SXRlbSkgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtcyBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZFxuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgaXRlbU1hcDogV2Vha01hcDxSZXN1bHRJdGVtLCB7IGNvbXBvbmVudDogT3V0cHV0UGFuZWxJdGVtLCBkb21Ob2RlOiBIVE1MRWxlbWVudCB9PlxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIHRoaXMuaXRlbU1hcCA9IG5ldyBXZWFrTWFwKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtcyBjbGFzcz1cIm5hdGl2ZS1rZXktYmluZGluZ3NcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnJlbmRlckl0ZW1zKCl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IElQcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd0l0ZW0oaXRlbTogUmVzdWx0SXRlbSkge1xuICAgIGF3YWl0IGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgY29uc3QgdmlldyA9IHRoaXMuaXRlbU1hcC5nZXQoaXRlbSlcbiAgICBpZiAodmlldykge1xuICAgICAgdmlldy5jb21wb25lbnQuY2xpY2tQb3NpdGlvbigpXG4gICAgICB2aWV3LmRvbU5vZGUuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICBibG9jazogJ3N0YXJ0JyxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2Nyb2xsVG9FbmQoKSB7XG4gICAgYXdhaXQgZXRjaC51cGRhdGUodGhpcylcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodFxuICB9XG5cbiAgcHVibGljIGF0RW5kKCkge1xuICAgIHJldHVybiAodGhpcy5lbGVtZW50LnNjcm9sbFRvcCA+PSAodGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHQpKVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJJdGVtcygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnByb3BzLm1vZGVsLmZpbHRlcih0aGlzLnByb3BzLmZpbHRlcikpLm1hcChcbiAgICAgIChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSA8T3V0cHV0UGFuZWxJdGVtIG1vZGVsPXtpdGVtfSAvPlxuICAgICAgICB0aGlzLml0ZW1NYXAuc2V0KGl0ZW0sIHZpZXcgYXMgYW55KVxuICAgICAgICByZXR1cm4gdmlld1xuICAgICAgfSxcbiAgICApXG4gIH1cbn1cbiJdfQ==