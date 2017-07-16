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
        return (etch.dom("ide-haskell-panel-item", { dataset: { hash: this.props.model.hash() } },
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
        if (this.props.model.uri && this.props.model.position) {
            return (etch.dom("ide-haskell-item-position", { on: { click: this.didClickPosition.bind(this) } },
                this.props.model.uri,
                ": ",
                this.props.model.position.row + 1,
                ", ",
                this.props.model.position.column + 1));
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
    didClickPosition() {
        atom.workspace.open(this.props.model.uri).then((editor) => {
            if (this.props.model.position) {
                editor.setCursorBufferPosition(this.props.model.position);
            }
        });
    }
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBQ0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLHFDQUF3QixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUM7WUFDN0QsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLDJDQUE4QixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQ3RELENBQzFCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sY0FBYztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsQ0FDTCx3Q0FBMkIsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7O2dCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7Z0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQ3hFLENBQzdCLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLENBQ0wsMkNBQTJCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBNEIsQ0FDaEYsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFrQjtZQUNoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDM0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBckRELDBDQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7UmVzdWx0SXRlbX0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcbmltcG9ydCB7VGV4dEVkaXRvcn0gZnJvbSAnYXRvbSdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge21vZGVsOiBSZXN1bHRJdGVtfVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtIGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtIGRhdGFzZXQ9e3toYXNoOiB0aGlzLnByb3BzLm1vZGVsLmhhc2goKX19PlxuICAgICAgICB7dGhpcy5yZW5kZXJQb3NpdGlvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDb250ZXh0KCl9XG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWRlc2NyaXB0aW9uIGlubmVySFRNTD17dGhpcy5wcm9wcy5tb2RlbC5tZXNzYWdlLnRvSHRtbCgpfS8+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM6IElQcm9wcykge1xuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5tb2RlbCkgeyB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWwgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpICYmIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7Y2xpY2s6IHRoaXMuZGlkQ2xpY2tQb3NpdGlvbi5iaW5kKHRoaXMpfX0+XG4gICAgICAgICAge3RoaXMucHJvcHMubW9kZWwudXJpfToge3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24ucm93ICsgMX0sIHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLmNvbHVtbiArIDF9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJDb250ZXh0ICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0Pnt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHR9PC9pZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlkQ2xpY2tQb3NpdGlvbiAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLnByb3BzLm1vZGVsLnVyaSkudGhlbigoZWRpdG9yOiBUZXh0RWRpdG9yKSA9PiB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbikge1xuICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24odGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbilcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXX0=