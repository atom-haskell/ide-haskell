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
        atom.workspace.open(this.props.model.uri).then((editor) => {
            if (this.props.model.position) {
                editor.setCursorBufferPosition(this.props.model.position);
            }
        });
    }
    renderPosition() {
        if (this.props.model.uri && this.props.model.position) {
            return (etch.dom("ide-haskell-item-position", { on: { click: this.clickPosition.bind(this) } },
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
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMO1lBQ0csSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLDJDQUE4QixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQ3RELENBQzFCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU0sYUFBYTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFrQjtZQUNoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDM0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLENBQ0wsd0NBQTJCLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRzs7Z0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDOztnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDeEUsQ0FDN0IsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGFBQWE7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsQ0FDTCwyQ0FBMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUE0QixDQUNoRixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF2REQsMENBdURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtSZXN1bHRJdGVtfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHtUZXh0RWRpdG9yfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7bW9kZWw6IFJlc3VsdEl0ZW19XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtPlxuICAgICAgICB7dGhpcy5yZW5kZXJQb3NpdGlvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDb250ZXh0KCl9XG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWRlc2NyaXB0aW9uIGlubmVySFRNTD17dGhpcy5wcm9wcy5tb2RlbC5tZXNzYWdlLnRvSHRtbCgpfS8+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM6IElQcm9wcykge1xuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5tb2RlbCkgeyB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWwgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNsaWNrUG9zaXRpb24gKCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcy5wcm9wcy5tb2RlbC51cmkpLnRoZW4oKGVkaXRvcjogVGV4dEVkaXRvcikgPT4ge1xuICAgICAgaWYgKHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pIHtcbiAgICAgICAgZWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uKHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUG9zaXRpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSAmJiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbiBvbj17e2NsaWNrOiB0aGlzLmNsaWNrUG9zaXRpb24uYmluZCh0aGlzKX19PlxuICAgICAgICAgIHt0aGlzLnByb3BzLm1vZGVsLnVyaX06IHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCB7dGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4gKyAxfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwuY29udGV4dCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tY29udGV4dD57dGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0fTwvaWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cbn1cbiJdfQ==