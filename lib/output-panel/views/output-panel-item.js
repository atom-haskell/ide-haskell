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
    clickPosition() {
        if (this.props.model.uri) {
            atom.workspace.open(this.props.model.uri, {
                searchAllPanes: true,
                initialLine: this.props.model.position && this.props.model.position.row,
                initialColumn: this.props.model.position && this.props.model.position.column,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBSzVCO0lBR0UsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLHFDQUF3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQiwyQ0FBOEIsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBSSxDQUN2RCxDQUMxQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxLQUFhOztZQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLGFBQWE7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNwQjtnQkFDRSxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFDdkUsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTthQUM3RSxDQUNGLENBQUE7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLFlBQVksR0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtrQkFDckIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7a0JBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQTtZQUMxQixNQUFNLENBQUMsQ0FDTCx3Q0FBMkIsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQ3BFLFlBQVksQ0FDYSxDQUM3QixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUNMLDJDQUEyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQTRCLENBQ2hGLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWhFRCwwQ0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBSZXN1bHRJdGVtIH0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMgeyBtb2RlbDogUmVzdWx0SXRlbSB9XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW0ga2V5PXt0aGlzLnByb3BzLm1vZGVsLmhhc2goKX0+XG4gICAgICAgIHt0aGlzLnJlbmRlclBvc2l0aW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRleHQoKX1cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb24gaW5uZXJIVE1MPXt0aGlzLnByb3BzLm1vZGVsLm1lc3NhZ2UudG9IdG1sKCl9IC8+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzICYmIHByb3BzLm1vZGVsKSB7IHRoaXMucHJvcHMubW9kZWwgPSBwcm9wcy5tb2RlbCB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1Bvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSkge1xuICAgICAgYXRvbS53b3Jrc3BhY2Uub3BlbihcbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC51cmksXG4gICAgICAgIHtcbiAgICAgICAgICBzZWFyY2hBbGxQYW5lczogdHJ1ZSxcbiAgICAgICAgICBpbml0aWFsTGluZTogdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbiAmJiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyxcbiAgICAgICAgICBpbml0aWFsQ29sdW1uOiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uICYmIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uLFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpKSB7XG4gICAgICBjb25zdCBwb3NpdGlvblRleHQgPVxuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uXG4gICAgICAgICAgPyBgJHt0aGlzLnByb3BzLm1vZGVsLnVyaX06ICR7dGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5yb3cgKyAxfSwgJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLmNvbHVtbiArIDF9YFxuICAgICAgICAgIDogdGhpcy5wcm9wcy5tb2RlbC51cmlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7IGNsaWNrOiB0aGlzLmNsaWNrUG9zaXRpb24uYmluZCh0aGlzKSB9fT5cbiAgICAgICAgICB7cG9zaXRpb25UZXh0fVxuICAgICAgICA8L2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0Pnt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHR9PC9pZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxufVxuIl19