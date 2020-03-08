"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
class OutputPanelItem {
    constructor(props) {
        this.props = props;
        this.clickPosition = () => {
            if (this.props.model.uri !== undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QjtBQU81QixNQUFhLGVBQWU7SUFFMUIsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUF5QnpCLGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFFdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO29CQUN4QyxjQUFjLEVBQUUsSUFBSTtvQkFDcEIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztvQkFDdkUsYUFBYSxFQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtpQkFDaEUsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUE7UUFsQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sQ0FDTCxxQ0FBd0IsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsMkNBQ0UsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FDNUMsQ0FDcUIsQ0FDMUIsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtRQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBY08sY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDNUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUk7cUJBQ25FLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDeEIsT0FBTyxDQUNMLHdDQUEyQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUN6RCxZQUFZLENBQ2EsQ0FDN0IsQ0FBQTtTQUNGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzFDLE9BQU8sQ0FDTCwyQ0FDRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ0EsQ0FDNUIsQ0FBQTtTQUNGO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQTtTQUNWO0lBQ0gsQ0FBQztDQUNGO0FBbEVELDBDQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7IFJlc3VsdEl0ZW0gfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIG1vZGVsOiBSZXN1bHRJdGVtXG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHVibGljIGVsZW1lbnQhOiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW0ga2V5PXt0aGlzLnByb3BzLm1vZGVsLmhhc2goKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlclBvc2l0aW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRleHQoKX1cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb25cbiAgICAgICAgICBpbm5lckhUTUw9e3RoaXMucHJvcHMubW9kZWwubWVzc2FnZS50b0h0bWwoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWxcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNsaWNrUG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLnByb3BzLm1vZGVsLnVyaSwge1xuICAgICAgICBzZWFyY2hBbGxQYW5lczogdHJ1ZSxcbiAgICAgICAgaW5pdGlhbExpbmU6IHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24gJiYgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5yb3csXG4gICAgICAgIGluaXRpYWxDb2x1bW46XG4gICAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbiAmJiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLmNvbHVtbixcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC51cmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcG9zaXRpb25UZXh0ID0gdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvblxuICAgICAgICA/IGAke3RoaXMucHJvcHMubW9kZWwudXJpfTogJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCAke3RoaXNcbiAgICAgICAgICAgIC5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4gKyAxfWBcbiAgICAgICAgOiB0aGlzLnByb3BzLm1vZGVsLnVyaVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24gb249e3sgY2xpY2s6IHRoaXMuY2xpY2tQb3NpdGlvbiB9fT5cbiAgICAgICAgICB7cG9zaXRpb25UZXh0fVxuICAgICAgICA8L2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICAgICAge3RoaXMucHJvcHMubW9kZWwuY29udGV4dH1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxufVxuIl19