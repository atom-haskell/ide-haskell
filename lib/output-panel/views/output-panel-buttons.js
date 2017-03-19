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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWlEO0FBQ2pELCtEQUFpRTtBQUNqRSw2QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQVlsQjtJQU1FO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1B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QUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUVELENBQVUsYUFBYTtRQUNyQixHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsQ0FBQyw0QkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFqR0QsZ0RBaUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtCdXR0b24sIElQcm9wcyBhcyBJQnRuUHJvcHN9IGZyb20gJy4vb3V0cHV0LXBhbmVsLWJ1dHRvbidcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmNvbnN0ICQgPSBldGNoLmRvbVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXZlcml0eVRhYkRlZmluaXRpb24ge1xuICB1cmlGaWx0ZXI/OiBib29sZWFuXG4gIGF1dG9TY3JvbGw/OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBJQnRuRGVzYyBleHRlbmRzIElCdG5Qcm9wcyB7XG4gIHVyaUZpbHRlcjogYm9vbGVhblxuICBhdXRvU2Nyb2xsOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEJ1dHRvbnMge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgZW1pdHRlcjogRW1pdHRlclxuICBwcml2YXRlIGJ1dHRvbnM6IFNldDxJQnRuRGVzYz5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIHJlZnM6IHsgW2J0bk5hbWU6IHN0cmluZ106IEJ1dHRvbiB9XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLmVtaXR0ZXIpXG4gICAgdGhpcy5idXR0b25zID0gbmV3IFNldCgpO1xuICAgIFsnZXJyb3InLCAnd2FybmluZycsICdsaW50J10uZm9yRWFjaCgoYnRuKSA9PiB0aGlzLmNyZWF0ZUJ1dHRvbihidG4pKVxuICAgIHRoaXMuY3JlYXRlQnV0dG9uKCdidWlsZCcsIHt1cmlGaWx0ZXI6IGZhbHNlLCBhdXRvU2Nyb2xsOiB0cnVlfSlcbiAgICB0aGlzLm9uQnV0dG9uQ2xpY2tlZCh0aGlzLmRpc2FibGVBbGwuYmluZCh0aGlzKSlcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICAgICAge0FycmF5LmZyb20odGhpcy5yZW5kZXJCdXR0b25zKCkpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUJ1dHRvbiAoYnRuOiBzdHJpbmcsIHt1cmlGaWx0ZXIgPSB0cnVlLCBhdXRvU2Nyb2xsID0gZmFsc2V9OiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uID0ge30pIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgIT09ICdidWlsdGluJyAmJlxuICAgICAgICAgIHVyaUZpbHRlciA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IGJ1dHRvbjogSUJ0bkRlc2MgPSB7XG4gICAgICByZWY6IGJ0bixcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICBjb3VudDogMCxcbiAgICAgIHVyaUZpbHRlcixcbiAgICAgIGF1dG9TY3JvbGwsXG4gICAgICBlbWl0dGVyOiB0aGlzLmVtaXR0ZXJcbiAgICB9XG4gICAgdGhpcy5idXR0b25zLmFkZChidXR0b24pXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIG9wdGlvbnMgKGJ0bjogc3RyaW5nKTogSUJ0bkRlc2MgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgcmV0dXJuICh0aGlzLnJlZnNbYnRuXS5wcm9wcyBhcyBJQnRuRGVzYylcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25CdXR0b25DbGlja2VkIChjYWxsYmFjazogKGJ0bk5hbWU6IHN0cmluZykgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2J1dHRvbi1jbGlja2VkJywgY2FsbGJhY2spXG4gIH1cblxuICBwdWJsaWMgYnV0dG9uTmFtZXMgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnJlZnMpXG4gIH1cblxuICBwdWJsaWMgZGlzYWJsZUFsbCAobmFtZT86IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgdiBpbiB0aGlzLnJlZnMpIHtcbiAgICAgIGlmICh2ICE9PSBuYW1lKSB7XG4gICAgICAgIHRoaXMucmVmc1t2XS5kZWFjdGl2YXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0Q291bnQgKGJ0bjogc3RyaW5nLCBjb3VudDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICB0aGlzLnJlZnNbYnRuXS5zZXRDb3VudChjb3VudClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xpY2tCdXR0b24gKGJ0bjogc3RyaW5nKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5nZXRBY3RpdmUoKSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uYWN0aXZhdGUoKVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2J1dHRvbi1jbGlja2VkJywgYnRuKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMuYnV0dG9ucy5jbGVhcigpXG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZlICgpIHtcbiAgICBmb3IgKGNvbnN0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodGhpcy5yZWZzW3ZdLnByb3BzLmFjdGl2ZSkgeyByZXR1cm4gdiB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgYnRuIG9mIHRoaXMuYnV0dG9ucy52YWx1ZXMoKSkge1xuICAgICAgeWllbGQgJChCdXR0b24sIGJ0bilcbiAgICB9XG4gIH1cbn1cbiJdfQ==