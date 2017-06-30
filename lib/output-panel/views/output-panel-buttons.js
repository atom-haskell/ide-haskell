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
            return this.refs[btn].getCount();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWlEO0FBQ2pELCtEQUFpRTtBQUNqRSw2QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQWNsQjtJQU1FO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1B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QUMsSUFBSSxDQUFDLENBQUE7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3RCLENBQUM7S0FBQTtJQUVNLFNBQVM7UUFDZCxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBRUQsQ0FBVSxhQUFhO1FBQ3JCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxDQUFDLDRCQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDdEIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXZHRCxnREF1R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge0J1dHRvbiwgSVByb3BzIGFzIElCdG5Qcm9wc30gZnJvbSAnLi9vdXRwdXQtcGFuZWwtYnV0dG9uJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuY29uc3QgJCA9IGV0Y2guZG9tXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldmVyaXR5VGFiRGVmaW5pdGlvbiB7XG4gIC8qKiBzaG91bGQgdXJpIGZpbHRlciBhcHBseSB0byB0YWI/ICovXG4gIHVyaUZpbHRlcj86IGJvb2xlYW5cbiAgLyoqIHNob3VsZCB0YWIgYXV0by1zY3JvbGw/ICovXG4gIGF1dG9TY3JvbGw/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJ0bkRlc2MgZXh0ZW5kcyBJQnRuUHJvcHMge1xuICB1cmlGaWx0ZXI6IGJvb2xlYW5cbiAgYXV0b1Njcm9sbDogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgcHJpdmF0ZSBidXR0b25zOiBTZXQ8SUJ0bkRlc2M+XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHJpdmF0ZSByZWZzOiB7IFtidG5OYW1lOiBzdHJpbmddOiBCdXR0b24gfVxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKVxuICAgIHRoaXMuYnV0dG9ucyA9IG5ldyBTZXQoKTtcbiAgICBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnbGludCddLmZvckVhY2goKGJ0bikgPT4gdGhpcy5jcmVhdGVCdXR0b24oYnRuKSlcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbignYnVpbGQnLCB7dXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZX0pXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrZWQodGhpcy5kaXNhYmxlQWxsLmJpbmQodGhpcykpXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAgIHtBcnJheS5mcm9tKHRoaXMucmVuZGVyQnV0dG9ucygpKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlICgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVCdXR0b24gKGJ0bjogc3RyaW5nLCB7dXJpRmlsdGVyID0gdHJ1ZSwgYXV0b1Njcm9sbCA9IGZhbHNlfTogSVNldmVyaXR5VGFiRGVmaW5pdGlvbiA9IHt9KSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwubWVzc2FnZURpc3BsYXlGcm9udGVuZCcpICE9PSAnYnVpbHRpbicgJiZcbiAgICAgICAgICB1cmlGaWx0ZXIgPT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBidXR0b246IElCdG5EZXNjID0ge1xuICAgICAgcmVmOiBidG4sXG4gICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgY291bnQ6IDAsXG4gICAgICB1cmlGaWx0ZXIsXG4gICAgICBhdXRvU2Nyb2xsLFxuICAgICAgZW1pdHRlcjogdGhpcy5lbWl0dGVyXG4gICAgfVxuICAgIHRoaXMuYnV0dG9ucy5hZGQoYnV0dG9uKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25zIChidG46IHN0cmluZyk6IElCdG5EZXNjIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHtcbiAgICAgIHJldHVybiAodGhpcy5yZWZzW2J0bl0ucHJvcHMgYXMgSUJ0bkRlc2MpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQnV0dG9uQ2xpY2tlZCAoY2FsbGJhY2s6IChidG5OYW1lOiBzdHJpbmcpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdidXR0b24tY2xpY2tlZCcsIGNhbGxiYWNrKVxuICB9XG5cbiAgcHVibGljIGJ1dHRvbk5hbWVzICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5yZWZzKVxuICB9XG5cbiAgcHVibGljIGRpc2FibGVBbGwgKG5hbWU/OiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodiAhPT0gbmFtZSkge1xuICAgICAgICB0aGlzLnJlZnNbdl0uZGVhY3RpdmF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldENvdW50IChidG46IHN0cmluZywgY291bnQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uc2V0Q291bnQoY291bnQpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvdW50IChidG46IHN0cmluZykge1xuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVmc1tidG5dLmdldENvdW50KClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xpY2tCdXR0b24gKGJ0bjogc3RyaW5nKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5nZXRBY3RpdmUoKSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uYWN0aXZhdGUoKVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2J1dHRvbi1jbGlja2VkJywgYnRuKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMuYnV0dG9ucy5jbGVhcigpXG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZlICgpIHtcbiAgICBmb3IgKGNvbnN0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodGhpcy5yZWZzW3ZdLnByb3BzLmFjdGl2ZSkgeyByZXR1cm4gdiB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgYnRuIG9mIHRoaXMuYnV0dG9ucy52YWx1ZXMoKSkge1xuICAgICAgeWllbGQgJChCdXR0b24sIGJ0bilcbiAgICB9XG4gIH1cbn1cbiJdfQ==