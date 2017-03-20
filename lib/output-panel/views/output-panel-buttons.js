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
const output_panel_button_1 = require("./output-panel-button");
const etch = require("etch");
const $ = etch.dom;
class OutputPanelButtons {
    constructor() {
        this.disposables = new atom_1.CompositeDisposable();
        this.emitter = new atom_1.Emitter();
        this.disposables.add(this.emitter);
        this.buttons = new Set();
        ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn));
        this.createButton('build', { uriFilter: false, autoScroll: true });
        this.onButtonClicked(this.disableAll.bind(this));
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-buttons", null, Array.from(this.renderButtons())));
    }
    update() {
        return etch.update(this);
    }
    createButton(btn, { uriFilter = true, autoScroll = false } = {}) {
        if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin' &&
            uriFilter === true) {
            return;
        }
        const button = {
            ref: btn,
            active: false,
            count: 0,
            uriFilter,
            autoScroll,
            emitter: this.emitter
        };
        this.buttons.add(button);
        this.update();
    }
    options(btn) {
        if (this.refs[btn]) {
            return this.refs[btn].props;
        }
    }
    onButtonClicked(callback) {
        return this.emitter.on('button-clicked', callback);
    }
    buttonNames() {
        return Object.keys(this.refs);
    }
    disableAll(name) {
        for (const v in this.refs) {
            if (v !== name) {
                this.refs[v].deactivate();
            }
        }
    }
    setCount(btn, count) {
        if (this.refs[btn]) {
            this.refs[btn].setCount(count);
        }
    }
    getCount(btn) {
        if (this.refs[btn]) {
            this.refs[btn].getCount();
        }
    }
    clickButton(btn) {
        if (btn === this.getActive()) {
            return;
        }
        if (this.refs[btn]) {
            this.refs[btn].activate();
            this.emitter.emit('button-clicked', btn);
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
            this.buttons.clear();
        });
    }
    getActive() {
        for (const v in this.refs) {
            if (this.refs[v].props.active) {
                return v;
            }
        }
    }
    *renderButtons() {
        for (const btn of this.buttons.values()) {
            yield $(output_panel_button_1.Button, btn);
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWlEO0FBQ2pELCtEQUFpRTtBQUNqRSw2QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQVlsQjtJQU1FO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1B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QUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEIsQ0FBQztLQUFBO0lBRU0sU0FBUztRQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxDQUFVLGFBQWE7UUFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLENBQUMsNEJBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBdkdELGdEQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7QnV0dG9uLCBJUHJvcHMgYXMgSUJ0blByb3BzfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5jb25zdCAkID0gZXRjaC5kb21cblxuZXhwb3J0IGludGVyZmFjZSBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uIHtcbiAgdXJpRmlsdGVyPzogYm9vbGVhblxuICBhdXRvU2Nyb2xsPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgSUJ0bkRlc2MgZXh0ZW5kcyBJQnRuUHJvcHMge1xuICB1cmlGaWx0ZXI6IGJvb2xlYW5cbiAgYXV0b1Njcm9sbDogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgcHJpdmF0ZSBidXR0b25zOiBTZXQ8SUJ0bkRlc2M+XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHJpdmF0ZSByZWZzOiB7IFtidG5OYW1lOiBzdHJpbmddOiBCdXR0b24gfVxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuYnV0dG9ucyA9IG5ldyBTZXQoKTtcbiAgICBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnbGludCddLmZvckVhY2goKGJ0bikgPT4gdGhpcy5jcmVhdGVCdXR0b24oYnRuKSlcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbignYnVpbGQnLCB7dXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZX0pXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrZWQodGhpcy5kaXNhYmxlQWxsLmJpbmQodGhpcykpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAgIHtBcnJheS5mcm9tKHRoaXMucmVuZGVyQnV0dG9ucygpKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlICgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVCdXR0b24gKGJ0bjogc3RyaW5nLCB7dXJpRmlsdGVyID0gdHJ1ZSwgYXV0b1Njcm9sbCA9IGZhbHNlfTogSVNldmVyaXR5VGFiRGVmaW5pdGlvbiA9IHt9KSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwubWVzc2FnZURpc3BsYXlGcm9udGVuZCcpICE9PSAnYnVpbHRpbicgJiZcbiAgICAgICAgICB1cmlGaWx0ZXIgPT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBidXR0b246IElCdG5EZXNjID0ge1xuICAgICAgcmVmOiBidG4sXG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgY291bnQ6IDAsXG4gICAgICB1cmlGaWx0ZXIsXG4gICAgICBhdXRvU2Nyb2xsLFxuICAgICAgZW1pdHRlcjogdGhpcy5lbWl0dGVyXG4gICAgfVxuICAgIHRoaXMuYnV0dG9ucy5hZGQoYnV0dG9uKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25zIChidG46IHN0cmluZyk6IElCdG5EZXNjIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHtcbiAgICAgIHJldHVybiAodGhpcy5yZWZzW2J0bl0ucHJvcHMgYXMgSUJ0bkRlc2MpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQnV0dG9uQ2xpY2tlZCAoY2FsbGJhY2s6IChidG5OYW1lOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdidXR0b24tY2xpY2tlZCcsIGNhbGxiYWNrKVxuICB9XG5cbiAgcHVibGljIGJ1dHRvbk5hbWVzICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5yZWZzKVxuICB9XG5cbiAgcHVibGljIGRpc2FibGVBbGwgKG5hbWU/OiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodiAhPT0gbmFtZSkge1xuICAgICAgICB0aGlzLnJlZnNbdl0uZGVhY3RpdmF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldENvdW50IChidG46IHN0cmluZywgY291bnQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uc2V0Q291bnQoY291bnQpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvdW50IChidG46IHN0cmluZykge1xuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uZ2V0Q291bnQoKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGlja0J1dHRvbiAoYnRuOiBzdHJpbmcpIHtcbiAgICBpZiAoYnRuID09PSB0aGlzLmdldEFjdGl2ZSgpKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICB0aGlzLnJlZnNbYnRuXS5hY3RpdmF0ZSgpXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYnV0dG9uLWNsaWNrZWQnLCBidG4pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5idXR0b25zLmNsZWFyKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmUgKCkge1xuICAgIGZvciAoY29uc3QgdiBpbiB0aGlzLnJlZnMpIHtcbiAgICAgIGlmICh0aGlzLnJlZnNbdl0ucHJvcHMuYWN0aXZlKSB7IHJldHVybiB2IH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlICogcmVuZGVyQnV0dG9ucyAoKSB7XG4gICAgZm9yIChjb25zdCBidG4gb2YgdGhpcy5idXR0b25zLnZhbHVlcygpKSB7XG4gICAgICB5aWVsZCAkKEJ1dHRvbiwgYnRuKVxuICAgIH1cbiAgfVxufVxuIl19