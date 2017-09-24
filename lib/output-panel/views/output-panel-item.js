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
class OutputPanelItem {
    constructor(props) {
        this.props = props;
        this.clickPosition = () => {
            if (this.props.model.uri) {
                atom.workspace.open(this.props.model.uri, {
                    searchAllPanes: true,
                    initialLine: this.props.model.position && this.props.model.position.row,
                    initialColumn: this.props.model.position && this.props.model.position.column,
                });
            }
        };
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-item", { key: this.props.model.hash() },
            this.renderPosition(),
            this.renderContext(),
            etch.dom("ide-haskell-item-description", { innerHTML: this.props.model.message.toHtml() })));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (props && props.model) {
                this.props.model = props.model;
            }
            return etch.update(this);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    renderPosition() {
        if (this.props.model.uri) {
            const positionText = this.props.model.position
                ? `${this.props.model.uri}: ${this.props.model.position.row + 1}, ${this.props.model.position.column + 1}`
                : this.props.model.uri;
            return (etch.dom("ide-haskell-item-position", { on: { click: this.clickPosition } }, positionText));
        }
        else {
            return '';
        }
    }
    renderContext() {
        if (this.props.model.context) {
            return (etch.dom("ide-haskell-item-context", null, this.props.model.context));
        }
        else {
            return '';
        }
    }
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBSzVCO0lBR0UsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUF1QnpCLGtCQUFhLEdBQUc7WUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDcEI7b0JBQ0UsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUc7b0JBQ3ZFLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU07aUJBQzdFLENBQ0YsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDLENBQUE7UUFqQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLHFDQUF3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQiwyQ0FBOEIsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBSSxDQUN2RCxDQUMxQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxLQUFhOztZQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQWVPLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLFlBQVksR0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtrQkFDckIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7a0JBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQTtZQUMxQixNQUFNLENBQUMsQ0FDTCx3Q0FBMkIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFDekQsWUFBWSxDQUNhLENBQzdCLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLENBQ0wsMkNBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBNEIsQ0FDaEYsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBaEVELDBDQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7IFJlc3VsdEl0ZW0gfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7IG1vZGVsOiBSZXN1bHRJdGVtIH1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsSXRlbSBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWRcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtaXRlbSBrZXk9e3RoaXMucHJvcHMubW9kZWwuaGFzaCgpfT5cbiAgICAgICAge3RoaXMucmVuZGVyUG9zaXRpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ29udGV4dCgpfVxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1kZXNjcmlwdGlvbiBpbm5lckhUTUw9e3RoaXMucHJvcHMubW9kZWwubWVzc2FnZS50b0h0bWwoKX0gLz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICBpZiAocHJvcHMgJiYgcHJvcHMubW9kZWwpIHsgdGhpcy5wcm9wcy5tb2RlbCA9IHByb3BzLm1vZGVsIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNsaWNrUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpKSB7XG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKFxuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnVyaSxcbiAgICAgICAge1xuICAgICAgICAgIHNlYXJjaEFsbFBhbmVzOiB0cnVlLFxuICAgICAgICAgIGluaXRpYWxMaW5lOiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uICYmIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24ucm93LFxuICAgICAgICAgIGluaXRpYWxDb2x1bW46IHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24gJiYgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC51cmkpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVGV4dCA9XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb25cbiAgICAgICAgICA/IGAke3RoaXMucHJvcHMubW9kZWwudXJpfTogJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCAke3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uICsgMX1gXG4gICAgICAgICAgOiB0aGlzLnByb3BzLm1vZGVsLnVyaVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24gb249e3sgY2xpY2s6IHRoaXMuY2xpY2tQb3NpdGlvbiB9fT5cbiAgICAgICAgICB7cG9zaXRpb25UZXh0fVxuICAgICAgICA8L2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0Pnt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHR9PC9pZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxufVxuIl19