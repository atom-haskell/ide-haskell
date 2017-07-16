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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBd0M7QUFDeEMsNkJBQTRCO0FBVTVCO0lBS0UsWUFBb0IsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLEtBQUssQ0FBQyxZQUFZLENBQUE7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQ3ZFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLG1DQUNFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUMzRCxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUM5QyxDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFjOztZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTSxRQUFRO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzVCLENBQUM7S0FBQTtJQUVPLFFBQVEsQ0FBRSxLQUFjO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFTyxZQUFZO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFBO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUNoQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckRELGtEQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIGluaXRpYWxTdGF0ZT86IGJvb2xlYW5cbiAgY2xhc3M/OiBzdHJpbmdcbiAgb25Td2l0Y2hlZD86IChzdGF0ZTogYm9vbGVhbikgPT4gdm9pZFxuICBlbmFibGVkSGludD86IHN0cmluZ1xuICBkaXNhYmxlZEhpbnQ/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsQ2hlY2tib3ggaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBzdGF0ZTogYm9vbGVhblxuICBjb25zdHJ1Y3RvciAocHVibGljIHByb3BzOiBJUHJvcHMgPSB7fSkge1xuICAgIHRoaXMuc3RhdGUgPSAhISBwcm9wcy5pbml0aWFsU3RhdGVcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7dGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLmJpbmQodGhpcyl9KVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtY2hlY2tib3hcbiAgICAgICAgY2xhc3M9e2Ake3RoaXMucHJvcHMuY2xhc3N9JHt0aGlzLnN0YXRlID8gJyBlbmFibGVkJyA6ICcnfWB9XG4gICAgICAgIG9uPXt7Y2xpY2s6IHRoaXMudG9nZ2xlU3RhdGUuYmluZCh0aGlzKX19Lz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wcz86IElQcm9wcykge1xuICAgIGlmIChwcm9wcykgeyB0aGlzLnByb3BzID0gcHJvcHMgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGdldFN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHNldFN0YXRlIChzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgIGlmICh0aGlzLnByb3BzLm9uU3dpdGNoZWQpIHsgdGhpcy5wcm9wcy5vblN3aXRjaGVkKHRoaXMuc3RhdGUpIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwcml2YXRlIHRvZ2dsZVN0YXRlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKCF0aGlzLmdldFN0YXRlKCkpXG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBUaXRsZSAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0U3RhdGUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZW5hYmxlZEhpbnRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzYWJsZWRIaW50XG4gICAgfVxuICB9XG59XG4iXX0=