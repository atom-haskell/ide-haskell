'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const etch_1 = require("etch");
const output_panel_item_1 = require("./output-panel-item");
class OutputPanelItems {
    constructor({ model } = {}) {
        this.model = model;
        this.items = [];
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-panel-items", { class: 'native-key-bindings', tabIndex: '-1' }, this.renderItems()));
    }
    renderItems() {
        return this.items.map((item) => etch_1.default.dom(output_panel_item_1.OutputPanelItem, { model: item }));
    }
    update({ model } = {}) {
        if (model)
            this.model = model;
        return etch_1.default.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
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
            let view = [].slice.call(this.element.querySelectorAll(`ide-haskell-panel-item`))[this.items.indexOf(item)];
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
}
exports.OutputPanelItems = OutputPanelItems;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtaXRlbXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBR1gsK0JBQXVCO0FBQ3ZCLDJEQUFtRDtBQUVuRDtJQUNFLFlBQWEsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ2YsY0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxDQUNMLGdEQUF5QixLQUFLLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLElBQUksSUFDL0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUNLLENBQzNCLENBQUE7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsQ0FBQyxJQUFJLEtBQUssbUJBQUMsbUNBQWUsSUFBQyxLQUFLLEVBQUUsSUFBSSxHQUFJLENBQzNDLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRTtRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUM3QixNQUFNLENBQUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUssT0FBTzs7WUFDWCxNQUFNLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFFLFlBQVk7O1lBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ25ELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtZQUNqQixDQUFDO1lBQ0QsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDckIsQ0FBQztLQUFBO0lBRUssUUFBUSxDQUFFLElBQUk7O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQ25CLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDM0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUM7b0JBQ2xCLEtBQUssRUFBRSxPQUFPO29CQUNkLFFBQVEsRUFBRSxRQUFRO2lCQUNuQixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUssV0FBVzs7WUFDZixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUNwRCxDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDNUYsQ0FBQztDQUNGO0FBNURELDRDQTREQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG4vKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtPdXRwdXRQYW5lbEl0ZW19IGZyb20gJy4vb3V0cHV0LXBhbmVsLWl0ZW0nXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW1zIHtcbiAgY29uc3RydWN0b3IgKHttb2RlbH0gPSB7fSkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbFxuICAgIHRoaXMuaXRlbXMgPSBbXVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW1zIGNsYXNzPSduYXRpdmUta2V5LWJpbmRpbmdzJyB0YWJJbmRleD0nLTEnPlxuICAgICAgICB7dGhpcy5yZW5kZXJJdGVtcygpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtcz5cbiAgICApXG4gIH1cblxuICByZW5kZXJJdGVtcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKFxuICAgICAgKGl0ZW0pID0+IDxPdXRwdXRQYW5lbEl0ZW0gbW9kZWw9e2l0ZW19IC8+XG4gICAgKVxuICB9XG5cbiAgdXBkYXRlICh7bW9kZWx9ID0ge30pIHtcbiAgICBpZiAobW9kZWwpIHRoaXMubW9kZWwgPSBtb2RlbFxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBhc3luYyBmaWx0ZXIgKGFjdGl2ZUZpbHRlcikge1xuICAgIHRoaXMuYWN0aXZlRmlsdGVyID0gYWN0aXZlRmlsdGVyXG4gICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLm1vZGVsLmZpbHRlcih0aGlzLmFjdGl2ZUZpbHRlcilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdXG4gICAgfVxuICAgIGF3YWl0IHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIGFzeW5jIHNob3dJdGVtIChpdGVtKSB7XG4gICAgYXdhaXQgdGhpcy51cGRhdGUoKVxuICAgIGxldCB2aWV3ID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgaWRlLWhhc2tlbGwtcGFuZWwtaXRlbWApKVt0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSldXG4gICAgaWYgKHZpZXcpIHtcbiAgICAgIHZpZXcucXVlcnlTZWxlY3RvcignaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbicpLmNsaWNrKClcbiAgICAgIHZpZXcuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICBibG9jazogJ3N0YXJ0JyxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNjcm9sbFRvRW5kICgpIHtcbiAgICBhd2FpdCB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIGF0RW5kICgpIHtcbiAgICByZXR1cm4gKHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgPj0gKHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQgLSB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0KSlcbiAgfVxufVxuIl19