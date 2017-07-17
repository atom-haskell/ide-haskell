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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMO1lBQ0csSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLDJDQUE4QixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQ3RELENBQzFCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFFLEtBQWE7O1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRVksYUFBYTs7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxNQUFNLEdBQWUsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDMUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUMzRCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVPLGNBQWM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLFlBQVksR0FDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtrQkFDdkIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7a0JBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQTtZQUN4QixNQUFNLENBQUMsQ0FDTCx3Q0FBMkIsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQ2xFLFlBQVksQ0FDYSxDQUM3QixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUNMLDJDQUEyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQTRCLENBQ2hGLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTVERCwwQ0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQge1Jlc3VsdEl0ZW19IGZyb20gJy4uLy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1RleHRFZGl0b3J9IGZyb20gJ2F0b20nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHttb2RlbDogUmVzdWx0SXRlbX1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsSXRlbSBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWl0ZW0+XG4gICAgICAgIHt0aGlzLnJlbmRlclBvc2l0aW9uKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRleHQoKX1cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb24gaW5uZXJIVE1MPXt0aGlzLnByb3BzLm1vZGVsLm1lc3NhZ2UudG9IdG1sKCl9Lz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzICYmIHByb3BzLm1vZGVsKSB7IHRoaXMucHJvcHMubW9kZWwgPSBwcm9wcy5tb2RlbCB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xpY2tQb3NpdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpKSB7XG4gICAgICBjb25zdCBlZGl0b3I6IFRleHRFZGl0b3IgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMucHJvcHMubW9kZWwudXJpKVxuICAgICAgaWYgKHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pIHtcbiAgICAgICAgZWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uKHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwudXJpKSB7XG4gICAgICBjb25zdCBwb3NpdGlvblRleHQgPVxuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uXG4gICAgICAgID8gYCR7dGhpcy5wcm9wcy5tb2RlbC51cml9OiAke3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24ucm93ICsgMX0sICR7dGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4gKyAxfWBcbiAgICAgICAgOiB0aGlzLnByb3BzLm1vZGVsLnVyaVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24gb249e3tjbGljazogdGhpcy5jbGlja1Bvc2l0aW9uLmJpbmQodGhpcyl9fT5cbiAgICAgICAgICB7cG9zaXRpb25UZXh0fVxuICAgICAgICA8L2lkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubW9kZWwuY29udGV4dCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tY29udGV4dD57dGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0fTwvaWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cbn1cbiJdfQ==