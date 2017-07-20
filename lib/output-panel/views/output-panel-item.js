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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.model.uri) {
                const editor = yield atom.workspace.open(this.props.model.uri);
                if (this.props.model.position) {
                    editor.setCursorBufferPosition(this.props.model.position);
                }
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLHFDQUF3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQiwyQ0FBOEIsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUN0RCxDQUMxQixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFhOztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVZLGFBQWE7O1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sTUFBTSxHQUFlLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDM0QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFTyxjQUFjO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxZQUFZLEdBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7a0JBQ3ZCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2tCQUN4RyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDeEIsTUFBTSxDQUFDLENBQ0wsd0NBQTJCLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUNsRSxZQUFZLENBQ2EsQ0FDN0IsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGFBQWE7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsQ0FDTCwyQ0FBMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUE0QixDQUNoRixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUE1REQsMENBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtSZXN1bHRJdGVtfSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHtUZXh0RWRpdG9yfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7bW9kZWw6IFJlc3VsdEl0ZW19XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0gaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtIGtleT17dGhpcy5wcm9wcy5tb2RlbC5oYXNoKCl9PlxuICAgICAgICB7dGhpcy5yZW5kZXJQb3NpdGlvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDb250ZXh0KCl9XG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWRlc2NyaXB0aW9uIGlubmVySFRNTD17dGhpcy5wcm9wcy5tb2RlbC5tZXNzYWdlLnRvSHRtbCgpfS8+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWl0ZW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM6IElQcm9wcykge1xuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5tb2RlbCkgeyB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWwgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsaWNrUG9zaXRpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSkge1xuICAgICAgY29uc3QgZWRpdG9yOiBUZXh0RWRpdG9yID0gYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLnByb3BzLm1vZGVsLnVyaSlcbiAgICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uKSB7XG4gICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbih0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUG9zaXRpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSkge1xuICAgICAgY29uc3QgcG9zaXRpb25UZXh0ID1cbiAgICAgICAgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvblxuICAgICAgICA/IGAke3RoaXMucHJvcHMubW9kZWwudXJpfTogJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCAke3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uICsgMX1gXG4gICAgICAgIDogdGhpcy5wcm9wcy5tb2RlbC51cmlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7Y2xpY2s6IHRoaXMuY2xpY2tQb3NpdGlvbi5iaW5kKHRoaXMpfX0+XG4gICAgICAgICAge3Bvc2l0aW9uVGV4dH1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckNvbnRleHQgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLmNvbnRleHQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+e3RoaXMucHJvcHMubW9kZWwuY29udGV4dH08L2lkZS1oYXNrZWxsLWl0ZW0tY29udGV4dD5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=