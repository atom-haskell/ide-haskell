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
    constructor(props = {}) {
        this.props = props;
        this.state = !!props.initialState;
        this.disposables = new atom_1.CompositeDisposable();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle.bind(this) }));
    }
    render() {
        return (etch.dom("ide-haskell-checkbox", { class: `${this.props.class}${this.state ? ' enabled' : ''}`, on: { click: this.toggleState.bind(this) } }));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (props) {
                this.props = props;
            }
            return etch.update(this);
        });
    }
    getState() {
        return this.state;
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
        });
    }
    setState(state) {
        this.state = state;
        if (this.props.onSwitched) {
            this.props.onSwitched(this.state);
        }
        this.update();
    }
    toggleState() {
        this.setState(!this.getState());
    }
    tooltipTitle() {
        if (this.getState()) {
            return this.props.enabledHint;
        }
        else {
            return this.props.disabledHint;
        }
    }
}
exports.OutputPanelCheckbox = OutputPanelCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBd0M7QUFDeEMsNkJBQTRCO0FBVTVCO0lBS0UsWUFBb0IsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQ3ZFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLG1DQUNFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUMzRCxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUM5QyxDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFjOztZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTSxRQUFRO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzVCLENBQUM7S0FBQTtJQUVPLFFBQVEsQ0FBRSxLQUFjO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFTyxZQUFZO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFBO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUNoQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckRELGtEQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBpbml0aWFsU3RhdGU/OiBib29sZWFuXG4gIGNsYXNzPzogc3RyaW5nXG4gIG9uU3dpdGNoZWQ/OiAoc3RhdGU6IGJvb2xlYW4pID0+IHZvaWRcbiAgZW5hYmxlZEhpbnQ/OiBzdHJpbmdcbiAgZGlzYWJsZWRIaW50Pzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbENoZWNrYm94IGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgc3RhdGU6IGJvb2xlYW5cbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzID0ge30pIHtcbiAgICB0aGlzLnN0YXRlID0gISEgcHJvcHMuaW5pdGlhbFN0YXRlXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwge3RpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZS5iaW5kKHRoaXMpfSlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLWNoZWNrYm94XG4gICAgICAgIGNsYXNzPXtgJHt0aGlzLnByb3BzLmNsYXNzfSR7dGhpcy5zdGF0ZSA/ICcgZW5hYmxlZCcgOiAnJ31gfVxuICAgICAgICBvbj17e2NsaWNrOiB0aGlzLnRvZ2dsZVN0YXRlLmJpbmQodGhpcyl9fS8+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM/OiBJUHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHsgdGhpcy5wcm9wcyA9IHByb3BzIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBnZXRTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGF0ZSAoc3RhdGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGVcbiAgICBpZiAodGhpcy5wcm9wcy5vblN3aXRjaGVkKSB7IHRoaXMucHJvcHMub25Td2l0Y2hlZCh0aGlzLnN0YXRlKSB9XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVTdGF0ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSghdGhpcy5nZXRTdGF0ZSgpKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgKCkge1xuICAgIGlmICh0aGlzLmdldFN0YXRlKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmVuYWJsZWRIaW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmRpc2FibGVkSGludFxuICAgIH1cbiAgfVxufVxuIl19