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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWlEO0FBQ2pELCtEQUFpRTtBQUNqRSw2QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQVlsQjtJQU1FO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVNLE1B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QUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEIsQ0FBQztLQUFBO0lBRU0sU0FBUztRQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxDQUFVLGFBQWE7UUFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLENBQUMsNEJBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBdkdELGdEQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7QnV0dG9uLCBJUHJvcHMgYXMgSUJ0blByb3BzfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5jb25zdCAkID0gZXRjaC5kb21cblxuZXhwb3J0IGludGVyZmFjZSBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uIHtcbiAgdXJpRmlsdGVyPzogYm9vbGVhblxuICBhdXRvU2Nyb2xsPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdG5EZXNjIGV4dGVuZHMgSUJ0blByb3BzIHtcbiAgdXJpRmlsdGVyOiBib29sZWFuXG4gIGF1dG9TY3JvbGw6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsQnV0dG9ucyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBlbWl0dGVyOiBFbWl0dGVyXG4gIHByaXZhdGUgYnV0dG9uczogU2V0PElCdG5EZXNjPlxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZC1jbGFzcy1wcm9wZXJ0aWVzXG4gIHByaXZhdGUgcmVmczogeyBbYnRuTmFtZTogc3RyaW5nXTogQnV0dG9uIH1cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlcilcbiAgICB0aGlzLmJ1dHRvbnMgPSBuZXcgU2V0KCk7XG4gICAgWydlcnJvcicsICd3YXJuaW5nJywgJ2xpbnQnXS5mb3JFYWNoKChidG4pID0+IHRoaXMuY3JlYXRlQnV0dG9uKGJ0bikpXG4gICAgdGhpcy5jcmVhdGVCdXR0b24oJ2J1aWxkJywge3VyaUZpbHRlcjogZmFsc2UsIGF1dG9TY3JvbGw6IHRydWV9KVxuICAgIHRoaXMub25CdXR0b25DbGlja2VkKHRoaXMuZGlzYWJsZUFsbC5iaW5kKHRoaXMpKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgICAgICB7QXJyYXkuZnJvbSh0aGlzLnJlbmRlckJ1dHRvbnMoKSl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQnV0dG9uIChidG46IHN0cmluZywge3VyaUZpbHRlciA9IHRydWUsIGF1dG9TY3JvbGwgPSBmYWxzZX06IElTZXZlcml0eVRhYkRlZmluaXRpb24gPSB7fSkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQnKSAhPT0gJ2J1aWx0aW4nICYmXG4gICAgICAgICAgdXJpRmlsdGVyID09PSB0cnVlKSB7IHJldHVybiB9XG4gICAgY29uc3QgYnV0dG9uOiBJQnRuRGVzYyA9IHtcbiAgICAgIHJlZjogYnRuLFxuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIGNvdW50OiAwLFxuICAgICAgdXJpRmlsdGVyLFxuICAgICAgYXV0b1Njcm9sbCxcbiAgICAgIGVtaXR0ZXI6IHRoaXMuZW1pdHRlclxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuYWRkKGJ1dHRvbilcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgb3B0aW9ucyAoYnRuOiBzdHJpbmcpOiBJQnRuRGVzYyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICByZXR1cm4gKHRoaXMucmVmc1tidG5dLnByb3BzIGFzIElCdG5EZXNjKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkJ1dHRvbkNsaWNrZWQgKGNhbGxiYWNrOiAoYnRuTmFtZTogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignYnV0dG9uLWNsaWNrZWQnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHB1YmxpYyBidXR0b25OYW1lcyAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmVmcylcbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlQWxsIChuYW1lPzogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCB2IGluIHRoaXMucmVmcykge1xuICAgICAgaWYgKHYgIT09IG5hbWUpIHtcbiAgICAgICAgdGhpcy5yZWZzW3ZdLmRlYWN0aXZhdGUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRDb3VudCAoYnRuOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHtcbiAgICAgIHRoaXMucmVmc1tidG5dLnNldENvdW50KGNvdW50KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudCAoYnRuOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHtcbiAgICAgIHRoaXMucmVmc1tidG5dLmdldENvdW50KClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xpY2tCdXR0b24gKGJ0bjogc3RyaW5nKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5nZXRBY3RpdmUoKSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLnJlZnNbYnRuXSkge1xuICAgICAgdGhpcy5yZWZzW2J0bl0uYWN0aXZhdGUoKVxuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2J1dHRvbi1jbGlja2VkJywgYnRuKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMuYnV0dG9ucy5jbGVhcigpXG4gIH1cblxuICBwdWJsaWMgZ2V0QWN0aXZlICgpIHtcbiAgICBmb3IgKGNvbnN0IHYgaW4gdGhpcy5yZWZzKSB7XG4gICAgICBpZiAodGhpcy5yZWZzW3ZdLnByb3BzLmFjdGl2ZSkgeyByZXR1cm4gdiB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgYnRuIG9mIHRoaXMuYnV0dG9ucy52YWx1ZXMoKSkge1xuICAgICAgeWllbGQgJChCdXR0b24sIGJ0bilcbiAgICB9XG4gIH1cbn1cbiJdfQ==