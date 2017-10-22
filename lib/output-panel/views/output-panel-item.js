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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBTTVCO0lBR0UsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUF5QnpCLGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRXpCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQ3BCO29CQUNFLGNBQWMsRUFBRSxJQUFJO29CQUNwQixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUN2RSxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNO2lCQUM3RSxDQUNGLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBcENDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FFTCxxQ0FBd0IsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsMkNBQThCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUksQ0FDdkQsQ0FFMUIsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUMsS0FBYTs7WUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFnQk8sY0FBYztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sWUFBWSxHQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUN2QixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDMUIsTUFBTSxDQUFDLENBRUwsd0NBQTJCLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQ3pELFlBQVksQ0FDYSxDQUU3QixDQUFBO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0lBRU8sYUFBYTtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUVMLDJDQUEyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQTRCLENBQ2hGLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ1gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXRFRCwwQ0FzRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBSZXN1bHRJdGVtIH0gZnJvbSAnLi4vLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMgeyBtb2RlbDogUmVzdWx0SXRlbSB9XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxJdGVtIGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5pbml0aWFsaXplZFxuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMpIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1pdGVtIGtleT17dGhpcy5wcm9wcy5tb2RlbC5oYXNoKCl9PlxuICAgICAgICB7dGhpcy5yZW5kZXJQb3NpdGlvbigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJDb250ZXh0KCl9XG4gICAgICAgIDxpZGUtaGFza2VsbC1pdGVtLWRlc2NyaXB0aW9uIGlubmVySFRNTD17dGhpcy5wcm9wcy5tb2RlbC5tZXNzYWdlLnRvSHRtbCgpfSAvPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtPlxuICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzICYmIHByb3BzLm1vZGVsKSB7IHRoaXMucHJvcHMubW9kZWwgPSBwcm9wcy5tb2RlbCB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1Bvc2l0aW9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm1vZGVsLnVyaSkge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKFxuICAgICAgICB0aGlzLnByb3BzLm1vZGVsLnVyaSxcbiAgICAgICAge1xuICAgICAgICAgIHNlYXJjaEFsbFBhbmVzOiB0cnVlLFxuICAgICAgICAgIGluaXRpYWxMaW5lOiB0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uICYmIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24ucm93LFxuICAgICAgICAgIGluaXRpYWxDb2x1bW46IHRoaXMucHJvcHMubW9kZWwucG9zaXRpb24gJiYgdGhpcy5wcm9wcy5tb2RlbC5wb3NpdGlvbi5jb2x1bW4sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC51cmkpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVGV4dCA9XG4gICAgICAgIHRoaXMucHJvcHMubW9kZWwucG9zaXRpb25cbiAgICAgICAgICA/IGAke3RoaXMucHJvcHMubW9kZWwudXJpfTogJHt0aGlzLnByb3BzLm1vZGVsLnBvc2l0aW9uLnJvdyArIDF9LCAke3RoaXMucHJvcHMubW9kZWwucG9zaXRpb24uY29sdW1uICsgMX1gXG4gICAgICAgICAgOiB0aGlzLnByb3BzLm1vZGVsLnVyaVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbiBvbj17eyBjbGljazogdGhpcy5jbGlja1Bvc2l0aW9uIH19PlxuICAgICAgICAgIHtwb3NpdGlvblRleHR9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbj5cbiAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyQ29udGV4dCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlbC5jb250ZXh0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICAgICAgICA8aWRlLWhhc2tlbGwtaXRlbS1jb250ZXh0Pnt0aGlzLnByb3BzLm1vZGVsLmNvbnRleHR9PC9pZGUtaGFza2VsbC1pdGVtLWNvbnRleHQ+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxufVxuIl19