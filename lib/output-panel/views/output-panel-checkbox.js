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
        this.state = props.enabled !== undefined ? props.enabled : false;
        this.class = props.class || '';
        this.disposables = new atom_1.CompositeDisposable();
        this.emitter = new atom_1.Emitter();
        this.disposables.add(this.emitter);
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle.bind(this) }));
    }
    render() {
        return (etch.dom("ide-haskell-checkbox", { class: `${this.class}${this.state ? ' enabled' : ''}`, on: { click: this.toggleFileFilter.bind(this) } }));
    }
    update() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBaUQ7QUFDakQsNkJBQTRCO0FBRTVCO0lBT0UsWUFBYSxRQUE2QyxFQUFFO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUN2RSxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxtQ0FDRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUNyRCxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLENBQ25ELENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxrQkFBa0IsQ0FBRSxRQUFrQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVNLGFBQWEsQ0FBRSxLQUFjO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRU0sYUFBYTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRU0sZ0JBQWdCO1FBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUIsQ0FBQztLQUFBO0lBRU8sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQTtRQUNyQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsMkJBQTJCLENBQUE7UUFDcEMsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTdERCxrREE2REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbENoZWNrYm94IHtcbiAgcHJpdmF0ZSBzdGF0ZTogYm9vbGVhblxuICBwcml2YXRlIGNsYXNzOiBzdHJpbmdcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yIChwcm9wczoge2VuYWJsZWQ/OiBib29sZWFuLCBjbGFzcz86IHN0cmluZ30gPSB7fSkge1xuICAgIHRoaXMuc3RhdGUgPSBwcm9wcy5lbmFibGVkICE9PSB1bmRlZmluZWQgPyBwcm9wcy5lbmFibGVkIDogZmFsc2VcbiAgICB0aGlzLmNsYXNzID0gcHJvcHMuY2xhc3MgfHwgJydcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHt0aXRsZTogdGhpcy50b29sdGlwVGl0bGUuYmluZCh0aGlzKX0pXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1jaGVja2JveFxuICAgICAgICBjbGFzcz17YCR7dGhpcy5jbGFzc30ke3RoaXMuc3RhdGUgPyAnIGVuYWJsZWQnIDogJyd9YH1cbiAgICAgICAgb249e3tjbGljazogdGhpcy50b2dnbGVGaWxlRmlsdGVyLmJpbmQodGhpcyl9fS8+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgb25DaGVja2JveFN3aXRjaGVkIChjYWxsYmFjazogKHN0YXRlOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignY2hlY2tib3gtc3dpdGNoZWQnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHB1YmxpYyBzZXRGaWxlRmlsdGVyIChzdGF0ZTogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZVxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGVja2JveC1zd2l0Y2hlZCcsIHRoaXMuc3RhdGUpXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGdldEZpbGVGaWx0ZXIgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlXG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRmlsZUZpbHRlciAoKSB7XG4gICAgdGhpcy5zZXRGaWxlRmlsdGVyKCF0aGlzLmdldEZpbGVGaWx0ZXIoKSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgKCkge1xuICAgIGlmICh0aGlzLmdldEZpbGVGaWx0ZXIoKSkge1xuICAgICAgcmV0dXJuICdTaG93IGN1cnJlbnQgZmlsZSBtZXNzYWdlcydcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdTaG93IGFsbCBwcm9qZWN0IG1lc3NhZ2VzJ1xuICAgIH1cbiAgfVxufVxuIl19