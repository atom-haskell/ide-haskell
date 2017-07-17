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
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-item", null,
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
    clickPosition() {
        if (this.props.model.uri) {
            atom.workspace.open(this.props.model.uri).then((editor) => {
                if (this.props.model.position) {
                    editor.setCursorBufferPosition(this.props.model.position);
                }
            });
        }
    }
    renderPosition() {
        if (this.props.model.uri) {
            const positionText = this.props.model.position
                ? `${this.props.model.uri}: ${this.props.model.position.row + 1}, ${this.props.model.position.column + 1}`
                : this.props.model.uri;
            return (etch.dom("ide-haskell-item-position", { on: { click: this.clickPosition.bind(this) } }, positionText));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMO1lBQ0csSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLDJDQUE4QixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQ3RELENBQzFCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU0sYUFBYTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQWtCO2dCQUNoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQzNELENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDO0lBRU8sY0FBYztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sWUFBWSxHQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRO2tCQUN2QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtrQkFDeEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBQ3hCLE1BQU0sQ0FBQyxDQUNMLHdDQUEyQixFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFDbEUsWUFBWSxDQUNhLENBQzdCLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLENBQ0wsMkNBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBNEIsQ0FDaEYsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBN0RELDBDQTZEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7UmVzdWx0SXRlbX0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcbmltcG9ydCB7VGV4dEVkaXRvcn0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge21vZGVsOiBSZXN1bHRJdGVtfVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtIGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvciAocHVibGljIHByb3BzOiBJUHJvcHMpIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICAgICAge3RoaXMucmVuZGVyUG9zaXRpb24oKX1cbiAgICAgICAge3RoaXMucmVuZGVyQ29udGV4dCgpfVxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1kZXNjcmlwdGlvbiBpbm5lckhUTUw9e3RoaXMucHJvcHMubW9kZWwubWVzc2FnZS50b0h0bWwoKX0vPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzOiBJUHJvcHMpIHtcbiAgICBpZiAocHJvcHMgJiYgcHJvcHMubW9kZWwpIHsgdGhpcy5wcm9wcy5tb2RlbCA9IHByb3BzLm1vZGVsIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1Bvc2l0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC51cmkpIHtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcy5wcm9wcy5tb2RlbC51cmkpLnRoZW4oKGVkaXRvcjogVGV4dEVkaXRvcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbikge1xuICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbih0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUG9zaXRpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSkge1xuICAgICAgY29uc3QgcG9zaXRpb25UZXh0ID1cbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvblxuICAgICAgICA/IGAke3RoaXMucHJvcHMubW9kZWwudXJpfTogJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCAke3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uICsgMX1gXG4gICAgICAgIDogdGhpcy5wcm9wcy5tb2RlbC51cmlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7Y2xpY2s6IHRoaXMuY2xpY2tQb3NpdGlvbi5iaW5kKHRoaXMpfX0+XG4gICAgICAgICAge3Bvc2l0aW9uVGV4dH1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckNvbnRleHQgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLmNvbnRleHQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+e3RoaXMucHJvcHMubW9kZWwuY29udGV4dH08L2lkZS1oYXNrZWxsLWl0ZW0tY29udGV4dD5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=