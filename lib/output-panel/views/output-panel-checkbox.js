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
    constructor({ id, enabled = false } = {}) {
        this.id = id;
        this.state = enabled;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(this.emitter = new atom_1.Emitter());
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle.bind(this) }));
    }
    render() {
        return (etch.dom("ide-haskell-checkbox", { id: this.id, class: this.state ? 'enabled' : '', on: { click: this.toggleFileFilter.bind(this) } }));
    }
    update(props) {
        if (props && props.enabled !== undefined) {
            this.state = props.enabled;
        }
        return etch.update(this);
    }
    onCheckboxSwitched(callback) {
        return this.emitter.on('checkbox-switched', callback);
    }
    setFileFilter(state) {
        this.state = state;
        this.emitter.emit('checkbox-switched', this.state);
        this.update();
    }
    getFileFilter() {
        return this.state;
    }
    toggleFileFilter() {
        this.setFileFilter(!this.getFileFilter());
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
        });
    }
    tooltipTitle() {
        if (this.getFileFilter()) {
            return 'Show current file messages';
        }
        else {
            return 'Show all project messages';
        }
    }
}
exports.OutputPanelCheckbox = OutputPanelCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUQ7QUFDakQsNkJBQTRCO0FBRTVCO0lBTUUsWUFBYSxFQUFDLEVBQUUsRUFBRSxPQUFPLEdBQUcsS0FBSyxLQUFzQyxFQUFFO1FBQ3ZFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQ3ZFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLG1DQUFzQixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFDL0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUUsRUFDbEMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUNuRCxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUEyQjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBO1FBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sa0JBQWtCLENBQUUsUUFBa0M7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFTSxhQUFhLENBQUUsS0FBYztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLGFBQWE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzVCLENBQUM7S0FBQTtJQUVPLFlBQVk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsNEJBQTRCLENBQUE7UUFDckMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLDJCQUEyQixDQUFBO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUE1REQsa0RBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxDaGVja2JveCB7XG4gIHByaXZhdGUgaWQ/OiBzdHJpbmdcbiAgcHJpdmF0ZSBzdGF0ZTogYm9vbGVhblxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yICh7aWQsIGVuYWJsZWQgPSBmYWxzZX06IHtpZD86IHN0cmluZywgZW5hYmxlZD86IGJvb2xlYW59ID0ge30pIHtcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnN0YXRlID0gZW5hYmxlZFxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKSlcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwge3RpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZS5iaW5kKHRoaXMpfSlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLWNoZWNrYm94IGlkPXt0aGlzLmlkfVxuICAgICAgICBjbGFzcz17dGhpcy5zdGF0ZSA/ICdlbmFibGVkJyA6ICcnfVxuICAgICAgICBvbj17e2NsaWNrOiB0aGlzLnRvZ2dsZUZpbGVGaWx0ZXIuYmluZCh0aGlzKX19Lz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wcz86IHtlbmFibGVkPzogYm9vbGVhbn0pIHtcbiAgICBpZiAocHJvcHMgJiYgcHJvcHMuZW5hYmxlZCAhPT0gdW5kZWZpbmVkKSB7IHRoaXMuc3RhdGUgPSBwcm9wcy5lbmFibGVkIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBvbkNoZWNrYm94U3dpdGNoZWQgKGNhbGxiYWNrOiAoc3RhdGU6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdjaGVja2JveC1zd2l0Y2hlZCcsIGNhbGxiYWNrKVxuICB9XG5cbiAgcHVibGljIHNldEZpbGVGaWx0ZXIgKHN0YXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NoZWNrYm94LXN3aXRjaGVkJywgdGhpcy5zdGF0ZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsZUZpbHRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVGaWxlRmlsdGVyICgpIHtcbiAgICB0aGlzLnNldEZpbGVGaWx0ZXIoIXRoaXMuZ2V0RmlsZUZpbHRlcigpKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBUaXRsZSAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0RmlsZUZpbHRlcigpKSB7XG4gICAgICByZXR1cm4gJ1Nob3cgY3VycmVudCBmaWxlIG1lc3NhZ2VzJ1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Nob3cgYWxsIHByb2plY3QgbWVzc2FnZXMnXG4gICAgfVxuICB9XG59XG4iXX0=