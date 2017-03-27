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
            etch.dom("ide-haskell-item-context", null, this.props.model.context || ""),
            etch.dom("ide-haskell-item-description", { innerHTML: this.props.model.message.toHtml() })));
    }
    update(props) {
        if (props && props.model) {
            this.props.model = props.model;
        }
        return etch.update(this);
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
    didClickPosition() {
        atom.workspace.open(this.props.model.uri).then((editor) => editor.setCursorBufferPosition(this.props.model.position));
    }
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBRzVCO0lBQ0UsWUFBcUIsS0FBMEI7UUFBMUIsVUFBSyxHQUFMLEtBQUssQ0FBcUI7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMO1lBQ0csSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QiwyQ0FBMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBNEI7WUFDckYsMkNBQThCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FDdEQsQ0FDMUIsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsS0FBMEI7UUFDdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtRQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTyxjQUFjO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxDQUNMLHdDQUEyQixFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRzs7Z0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDOztnQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDeEUsQ0FDN0IsQ0FBQTtRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDWCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQ3BELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQzlELENBQUM7Q0FDRjtBQXhDRCwwQ0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge1Jlc3VsdEl0ZW19IGZyb20gJy4uLy4uL3Jlc3VsdHMtZGInXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0ge1xuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwcm9wczoge21vZGVsOiBSZXN1bHRJdGVtfSkge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtPlxuICAgICAgICB7dGhpcy5yZW5kZXJQb3NpdGlvbigpfVxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0Pnt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHQgfHwgXCJcIn08L2lkZS1oYXNrZWxsLWl0ZW0tY29udGV4dD5cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb24gaW5uZXJIVE1MPXt0aGlzLnByb3BzLm1vZGVsLm1lc3NhZ2UudG9IdG1sKCl9Lz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wczoge21vZGVsOiBSZXN1bHRJdGVtfSkge1xuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5tb2RlbCkgeyB0aGlzLnByb3BzLm1vZGVsID0gcHJvcHMubW9kZWwgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpICYmIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLXBvc2l0aW9uIG9uPXt7Y2xpY2s6IHRoaXMuZGlkQ2xpY2tQb3NpdGlvbi5iaW5kKHRoaXMpfX0+XG4gICAgICAgICAge3RoaXMucHJvcHMubW9kZWwudXJpfToge3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24ucm93ICsgMX0sIHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLmNvbHVtbiArIDF9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGlja1Bvc2l0aW9uICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMucHJvcHMubW9kZWwudXJpKS50aGVuKChlZGl0b3IpID0+XG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24odGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbikpXG4gIH1cbn1cbiJdfQ==