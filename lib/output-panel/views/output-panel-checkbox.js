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
const atom_1 = require("atom");
const etch = require("etch");
class OutputPanelCheckbox {
    constructor(props) {
        this.props = props;
        this.tooltipTitle = () => {
            if (this.props.state) {
                return this.props.enabledHint;
            }
            else {
                return this.props.disabledHint;
            }
        };
        this.disposables = new atom_1.CompositeDisposable();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle }));
    }
    render() {
        return (etch.dom("ide-haskell-checkbox", { class: `${this.props.class}${this.props.state ? ' enabled' : ''}`, on: { click: this.props.onSwitched } }));
    }
    update(props = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.props = Object.assign({}, this.props, props);
            return etch.update(this);
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
        });
    }
}
exports.OutputPanelCheckbox = OutputPanelCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBMEM7QUFDMUMsNkJBQTRCO0FBVzVCO0lBSUUsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUE0QnhCLGlCQUFZLEdBQUcsR0FBRyxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFBO1lBQy9CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUE7WUFDaEMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQWpDQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUM5RCxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FFTCxtQ0FDRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFDakUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQ3BDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUMsUUFBeUIsRUFBRTs7WUFDN0MsSUFBSSxDQUFDLEtBQUsscUJBQU8sSUFBSSxDQUFDLEtBQUssRUFBSyxLQUFLLENBQUMsQ0FBQTtZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUM1QixDQUFDO0tBQUE7Q0FTRjtBQXZDRCxrREF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBzdGF0ZTogYm9vbGVhblxuICBjbGFzczogc3RyaW5nXG4gIG9uU3dpdGNoZWQ6ICgpID0+IHZvaWRcbiAgZW5hYmxlZEhpbnQ6IHN0cmluZ1xuICBkaXNhYmxlZEhpbnQ6IHN0cmluZ1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsQ2hlY2tib3ggaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZFxuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwgeyB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxpZGUtaGFza2VsbC1jaGVja2JveFxuICAgICAgICBjbGFzcz17YCR7dGhpcy5wcm9wcy5jbGFzc30ke3RoaXMucHJvcHMuc3RhdGUgPyAnIGVuYWJsZWQnIDogJyd9YH1cbiAgICAgICAgb249e3sgY2xpY2s6IHRoaXMucHJvcHMub25Td2l0Y2hlZCB9fVxuICAgICAgLz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBQYXJ0aWFsPElQcm9wcz4gPSB7fSkge1xuICAgIHRoaXMucHJvcHMgPSB7Li4udGhpcy5wcm9wcywgLi4ucHJvcHN9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuc3RhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmVuYWJsZWRIaW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRpc2FibGVkSGludFxuICAgIH1cbiAgfVxufVxuIl19