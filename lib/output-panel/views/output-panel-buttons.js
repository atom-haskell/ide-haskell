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
const output_panel_button_1 = require("./output-panel-button");
const etch_1 = require("etch");
const $ = etch_1.default.dom;
class OutputPanelButtons {
    constructor() {
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(this.emitter = new atom_1.Emitter());
        this.buttons = new Set();
        ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn));
        this.createButton('build', { uriFilter: false, autoScroll: true });
        this.onButtonClicked(this.disableAll.bind(this));
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-panel-buttons", null, Array.from(this.renderButtons())));
    }
    *renderButtons() {
        for (let btn of this.buttons.values()) {
            yield $(output_panel_button_1.Button, btn);
        }
    }
    update() {
        return etch_1.default.update(this);
    }
    createButton(btn, { uriFilter = true, autoScroll = false } = {}) {
        if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin' &&
            uriFilter === true) {
            return;
        }
        let button = {
            ref: btn,
            active: false,
            count: 0,
            uriFilter: uriFilter,
            autoScroll: autoScroll,
            emitter: this.emitter
        };
        this.buttons.add(button);
        this.update();
    }
    options(btn) {
        if (this.refs[btn])
            return this.refs[btn].props;
        else
            return {};
    }
    onButtonClicked(callback) {
        return this.emitter.on('button-clicked', callback);
    }
    buttonNames() {
        return Object.keys(this.refs);
    }
    disableAll(name) {
        for (let v in this.refs) {
            if (v !== name)
                this.refs[v].deactivate();
        }
    }
    setCount(btn, count) {
        if (this.refs[btn]) {
            this.refs[btn].setCount(count);
        }
    }
    clickButton(btn) {
        if (btn === this.getActive())
            return;
        if (this.refs[btn]) {
            this.refs[btn].activate();
            this.emitter.emit('button-clicked', btn);
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
            this.disposables.dispose();
            this.buttons = null;
        });
    }
    getActive() {
        for (let v in this.refs) {
            if (this.refs[v].props.active)
                return v;
        }
        return null;
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7Ozs7OztBQUdYLCtCQUFpRDtBQUNqRCwrREFBNEM7QUFDNUMsK0JBQXVCO0FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLGNBQUksQ0FBQyxHQUFHLENBQUE7QUFFbEI7SUFDRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN6QixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2hELGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsQ0FDTCxzREFDRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUNQLENBQzdCLENBQUE7SUFDSCxDQUFDO0lBRUQsQ0FBRSxhQUFhO1FBQ2Is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QUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNyQixDQUFDO0tBQUE7SUFFRCxTQUFTO1FBQ1AsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDekMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDYixDQUFDO0NBQ0Y7QUF6RkQsZ0RBeUZDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcbi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuY29uc3QgJCA9IGV0Y2guZG9tXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEJ1dHRvbnMge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpKVxuICAgIHRoaXMuYnV0dG9ucyA9IG5ldyBTZXQoKTtcbiAgICBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnbGludCddLmZvckVhY2goKGJ0bikgPT4gdGhpcy5jcmVhdGVCdXR0b24oYnRuKSlcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbignYnVpbGQnLCB7dXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZX0pXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrZWQodGhpcy5kaXNhYmxlQWxsLmJpbmQodGhpcykpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICAgICAge0FycmF5LmZyb20odGhpcy5yZW5kZXJCdXR0b25zKCkpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgIClcbiAgfVxuXG4gICogcmVuZGVyQnV0dG9ucyAoKSB7XG4gICAgZm9yIChsZXQgYnRuIG9mIHRoaXMuYnV0dG9ucy52YWx1ZXMoKSkge1xuICAgICAgeWllbGQgJChCdXR0b24sIGJ0bilcbiAgICB9XG4gIH1cblxuICB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgY3JlYXRlQnV0dG9uIChidG4sIHt1cmlGaWx0ZXIgPSB0cnVlLCBhdXRvU2Nyb2xsID0gZmFsc2V9ID0ge30pIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgIT09ICdidWlsdGluJyAmJlxuICAgICAgICAgIHVyaUZpbHRlciA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgIGxldCBidXR0b24gPSB7XG4gICAgICByZWY6IGJ0bixcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBjb3VudDogMCxcbiAgICAgIHVyaUZpbHRlcjogdXJpRmlsdGVyLFxuICAgICAgYXV0b1Njcm9sbDogYXV0b1Njcm9sbCxcbiAgICAgIGVtaXR0ZXI6IHRoaXMuZW1pdHRlclxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuYWRkKGJ1dHRvbilcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBvcHRpb25zIChidG4pIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHJldHVybiB0aGlzLnJlZnNbYnRuXS5wcm9wc1xuICAgIGVsc2UgcmV0dXJuIHt9XG4gIH1cblxuICBvbkJ1dHRvbkNsaWNrZWQgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignYnV0dG9uLWNsaWNrZWQnLCBjYWxsYmFjaylcbiAgfVxuXG4gIGJ1dHRvbk5hbWVzICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5yZWZzKVxuICB9XG5cbiAgZGlzYWJsZUFsbCAobmFtZSkge1xuICAgIGZvciAobGV0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodiAhPT0gbmFtZSkgdGhpcy5yZWZzW3ZdLmRlYWN0aXZhdGUoKVxuICAgIH1cbiAgfVxuXG4gIHNldENvdW50IChidG4sIGNvdW50KSB7XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICB0aGlzLnJlZnNbYnRuXS5zZXRDb3VudChjb3VudClcbiAgICB9XG4gIH1cblxuICBjbGlja0J1dHRvbiAoYnRuKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5nZXRBY3RpdmUoKSkgcmV0dXJuXG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICB0aGlzLnJlZnNbYnRuXS5hY3RpdmF0ZSgpXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYnV0dG9uLWNsaWNrZWQnLCBidG4pXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB0aGlzLmJ1dHRvbnMgPSBudWxsXG4gIH1cblxuICBnZXRBY3RpdmUgKCkge1xuICAgIGZvciAobGV0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodGhpcy5yZWZzW3ZdLnByb3BzLmFjdGl2ZSkgcmV0dXJuIHZcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIl19