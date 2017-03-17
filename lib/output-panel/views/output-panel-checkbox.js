'use babel';
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
const etch_1 = require("etch");
class OutputPanelCheckbox {
    constructor({ id, enabled = false } = {}) {
        this.id = id;
        this.state = enabled;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(this.emitter = new atom_1.Emitter());
        etch_1.default.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            title: () => {
                if (this.getFileFilter())
                    return 'Show current file messages';
                else
                    return 'Show all project messages';
            }
        }));
    }
    render({ enabled } = {}) {
        if (enabled !== undefined)
            this.state = enabled;
        return (etch_1.default.dom("ide-haskell-checkbox", { id: this.id, class: this.state ? 'enabled' : '', on: { click: this.toggleFileFilter } }));
    }
    update() {
        return etch_1.default.update(this);
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
            yield etch_1.default.destroy(this);
            this.disposables.dispose();
        });
    }
}
exports.OutputPanelCheckbox = OutputPanelCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBR1gsK0JBQWlEO0FBQ2pELCtCQUF1QjtBQUV2QjtJQUNFLFlBQWEsRUFBQyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUssRUFBQyxHQUFHLEVBQUU7UUFDckMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNsRCxjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsS0FBSyxFQUFFO2dCQUNMLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFBQyxNQUFNLENBQUMsNEJBQTRCLENBQUE7Z0JBQzdELElBQUk7b0JBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFBO1lBQ3pDLENBQUM7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtRQUMvQyxNQUFNLENBQUMsQ0FDTCw2Q0FBc0IsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxFQUFFLEVBQ2xDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsR0FBRyxDQUN4QyxDQUFBO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsa0JBQWtCLENBQUUsUUFBUTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVELGFBQWEsQ0FBRSxLQUFLO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVLLE9BQU87O1lBQ1gsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUIsQ0FBQztLQUFBO0NBQ0Y7QUFsREQsa0RBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcbi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbENoZWNrYm94IHtcbiAgY29uc3RydWN0b3IgKHtpZCwgZW5hYmxlZCA9IGZhbHNlfSA9IHt9KSB7XG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5zdGF0ZSA9IGVuYWJsZWRcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCkpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgICB0aXRsZTogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5nZXRGaWxlRmlsdGVyKCkpIHJldHVybiAnU2hvdyBjdXJyZW50IGZpbGUgbWVzc2FnZXMnXG4gICAgICAgIGVsc2UgcmV0dXJuICdTaG93IGFsbCBwcm9qZWN0IG1lc3NhZ2VzJ1xuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgcmVuZGVyICh7ZW5hYmxlZH0gPSB7fSkge1xuICAgIGlmIChlbmFibGVkICE9PSB1bmRlZmluZWQpIHRoaXMuc3RhdGUgPSBlbmFibGVkXG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1jaGVja2JveCBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3M9e3RoaXMuc3RhdGUgPyAnZW5hYmxlZCcgOiAnJ31cbiAgICAgICAgb249e3tjbGljazogdGhpcy50b2dnbGVGaWxlRmlsdGVyfX0vPlxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBvbkNoZWNrYm94U3dpdGNoZWQgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignY2hlY2tib3gtc3dpdGNoZWQnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHNldEZpbGVGaWx0ZXIgKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NoZWNrYm94LXN3aXRjaGVkJywgdGhpcy5zdGF0ZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBnZXRGaWxlRmlsdGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVxuICB9XG5cbiAgdG9nZ2xlRmlsZUZpbHRlciAoKSB7XG4gICAgdGhpcy5zZXRGaWxlRmlsdGVyKCF0aGlzLmdldEZpbGVGaWx0ZXIoKSlcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cbn1cbiJdfQ==