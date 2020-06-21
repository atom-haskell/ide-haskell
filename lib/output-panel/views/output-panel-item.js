"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
const utils_1 = require("../../utils");
class OutputPanelItem {
    constructor(props) {
        this.props = props;
        this.clickPosition = () => {
            if (this.props.model.uri !== undefined) {
                utils_1.handlePromise(atom.workspace.open(this.props.model.uri, {
                    searchAllPanes: true,
                    initialLine: this.props.model.position && this.props.model.position.row,
                    initialColumn: this.props.model.position && this.props.model.position.column,
                }));
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
    async update(props) {
        this.props.model = props.model;
        return etch.update(this);
    }
    async destroy() {
        await etch.destroy(this);
    }
    renderPosition() {
        if (this.props.model.uri !== undefined) {
            const positionText = this.props.model.position
                ? `${this.props.model.uri}: ${this.props.model.position.row + 1}, ${this
                    .props.model.position.column + 1}`
                : this.props.model.uri;
            return (etch.dom("ide-haskell-item-position", { on: { click: this.clickPosition } }, positionText));
        }
        else {
            return '';
        }
    }
    renderContext() {
        if (this.props.model.context !== undefined) {
            return (etch.dom("ide-haskell-item-context", null, this.props.model.context));
        }
        else {
            return '';
        }
    }
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QjtBQUU1Qix1Q0FBMkM7QUFNM0MsTUFBYSxlQUFlO0lBRTFCLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBeUJ6QixrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLHFCQUFhLENBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUN4QyxjQUFjLEVBQUUsSUFBSTtvQkFDcEIsV0FBVyxFQUNULElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztvQkFDNUQsYUFBYSxFQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtpQkFDaEUsQ0FBQyxDQUNILENBQUE7YUFDRjtRQUNILENBQUMsQ0FBQTtRQXBDQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxDQUNMLHFDQUF3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQiwyQ0FDRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUM1QyxDQUNxQixDQUMxQixDQUFBO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFnQk8sY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDNUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUk7cUJBQ25FLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDeEIsT0FBTyxDQUNMLHdDQUEyQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUN6RCxZQUFZLENBQ2EsQ0FDN0IsQ0FBQTtTQUNGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzFDLE9BQU8sQ0FDTCwyQ0FDRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ0EsQ0FDNUIsQ0FBQTtTQUNGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQztDQUNGO0FBcEVELDBDQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7IFJlc3VsdEl0ZW0gfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHsgaGFuZGxlUHJvbWlzZSB9IGZyb20gJy4uLy4uL3V0aWxzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIG1vZGVsOiBSZXN1bHRJdGVtXG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHVibGljIGVsZW1lbnQhOiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW0ga2V5PXt0aGlzLnByb3BzLm1vZGVsLmhhc2goKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlclBvc2l0aW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRleHQoKX1cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb25cbiAgICAgICAgICBpbm5lckhUTUw9e3RoaXMucHJvcHMubW9kZWwubWVzc2FnZS50b0h0bWwoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWxcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNsaWNrUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZVByb21pc2UoXG4gICAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcy5wcm9wcy5tb2RlbC51cmksIHtcbiAgICAgICAgICBzZWFyY2hBbGxQYW5lczogdHJ1ZSxcbiAgICAgICAgICBpbml0aWFsTGluZTpcbiAgICAgICAgICAgIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24gJiYgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5yb3csXG4gICAgICAgICAgaW5pdGlhbENvbHVtbjpcbiAgICAgICAgICAgIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24gJiYgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4sXG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVGV4dCA9IHRoaXMucHJvcHMubW9kZWwucG9zaXRpb25cbiAgICAgICAgPyBgJHt0aGlzLnByb3BzLm1vZGVsLnVyaX06ICR7dGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5yb3cgKyAxfSwgJHt0aGlzXG4gICAgICAgICAgICAucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uICsgMX1gXG4gICAgICAgIDogdGhpcy5wcm9wcy5tb2RlbC51cmlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7IGNsaWNrOiB0aGlzLmNsaWNrUG9zaXRpb24gfX0+XG4gICAgICAgICAge3Bvc2l0aW9uVGV4dH1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckNvbnRleHQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwuY29udGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0PlxuICAgICAgICAgIHt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHR9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cbn1cbiJdfQ==