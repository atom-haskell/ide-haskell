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
                this.items = Array.from(this.model.filter(this.activeFilter));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFDNUIsMkRBQW1EO0FBR25EO0lBTUUsWUFBYSxFQUFDLEtBQUssRUFBcUI7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFBO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FBeUIsS0FBSyxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxJQUFJLElBQy9ELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDSyxDQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUEwQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFFLFlBQTJDOztZQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7WUFDL0QsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNyQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUUsSUFBZ0I7O1lBQ3JDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ25CLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDN0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUM7b0JBQ2xCLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxRQUFRO2lCQUNuQixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRVksV0FBVzs7WUFDdEIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRU0sS0FBSztRQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO0lBQzVGLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsQ0FBQyxJQUFJLEtBQUssU0FBQyxtQ0FBZSxJQUFDLEtBQUssRUFBRSxJQUFJLEdBQUksQ0FDM0MsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQWxFRCw0Q0FrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge091dHB1dFBhbmVsSXRlbX0gZnJvbSAnLi9vdXRwdXQtcGFuZWwtaXRlbSdcbmltcG9ydCB7UmVzdWx0c0RCLCBSZXN1bHRJdGVtfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtcyB7XG4gIHByaXZhdGUgbW9kZWw6IFJlc3VsdHNEQlxuICBwcml2YXRlIGl0ZW1zOiBSZXN1bHRJdGVtW11cbiAgcHJpdmF0ZSBhY3RpdmVGaWx0ZXI6IChpdGVtOiBSZXN1bHRJdGVtKSA9PiBib29sZWFuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvciAoe21vZGVsfToge21vZGVsOiBSZXN1bHRzREJ9KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsXG4gICAgdGhpcy5pdGVtcyA9IFtdXG4gICAgdGhpcy5hY3RpdmVGaWx0ZXIgPSAoKSA9PiB0cnVlXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zIGNsYXNzPVwibmF0aXZlLWtleS1iaW5kaW5nc1wiIHRhYkluZGV4PVwiLTFcIj5cbiAgICAgICAge3RoaXMucmVuZGVySXRlbXMoKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbXM+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAocHJvcHM/OiB7bW9kZWw6IFJlc3VsdHNEQn0pIHtcbiAgICBpZiAocHJvcHMgJiYgcHJvcHMubW9kZWwpIHsgdGhpcy5tb2RlbCA9IHByb3BzLm1vZGVsIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBmaWx0ZXIgKGFjdGl2ZUZpbHRlcjogKGl0ZW06IFJlc3VsdEl0ZW0pID0+IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFjdGl2ZUZpbHRlciA9IGFjdGl2ZUZpbHRlclxuICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICB0aGlzLml0ZW1zID0gQXJyYXkuZnJvbSh0aGlzLm1vZGVsLmZpbHRlcih0aGlzLmFjdGl2ZUZpbHRlcikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd0l0ZW0gKGl0ZW06IFJlc3VsdEl0ZW0pIHtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZSgpXG4gICAgY29uc3QgdmlldyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW1gKSlbdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pXVxuICAgIGlmICh2aWV3KSB7XG4gICAgICB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24nKS5jbGljaygpXG4gICAgICB2aWV3LnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgYmxvY2s6ICdzdGFydCcsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2Nyb2xsVG9FbmQgKCkge1xuICAgIGF3YWl0IHRoaXMudXBkYXRlKClcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodFxuICB9XG5cbiAgcHVibGljIGF0RW5kICgpIHtcbiAgICByZXR1cm4gKHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPj0gKHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0KSlcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVySXRlbXMgKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLm1hcChcbiAgICAgIChpdGVtKSA9PiA8T3V0cHV0UGFuZWxJdGVtIG1vZGVsPXtpdGVtfSAvPlxuICAgIClcbiAgfVxufVxuIl19