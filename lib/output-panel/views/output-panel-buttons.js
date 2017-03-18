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
        this.disposables.add(this.emitter = new atom_1.Emitter());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWlEO0FBQ2pELCtEQUFpRTtBQUNqRSw2QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtBQVlsQjtJQUtFO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLDRDQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQ1AsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLFlBQVksQ0FBRSxHQUFXLEVBQUUsRUFBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFVBQVUsR0FBRyxLQUFLLEtBQTRCLEVBQUU7UUFDbkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsS0FBSyxTQUFTO1lBQ2pFLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFBO1FBQUMsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBYTtZQUN2QixHQUFHLEVBQUUsR0FBRztZQUNSLE1BQU0sRUFBRSxLQUFLO1lBQ2IsS0FBSyxFQUFFLENBQUM7WUFDUixTQUFTO1lBQ1QsVUFBVTtZQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLE9BQU8sQ0FBRSxHQUFXO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQWtCLENBQUE7UUFDM0MsQ0FBQztJQUNILENBQUM7SUFFTSxlQUFlLENBQUUsUUFBbUM7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFTSxXQUFXO1FBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRU0sVUFBVSxDQUFFLElBQWE7UUFDOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUMzQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxRQUFRLENBQUUsR0FBVyxFQUFFLEtBQWE7UUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFFTSxXQUFXLENBQUUsR0FBVztRQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQTtRQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDdEIsQ0FBQztLQUFBO0lBRU0sU0FBUztRQUNkLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxDQUFVLGFBQWE7UUFDckIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLENBQUMsNEJBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN0QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBL0ZELGdEQStGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7QnV0dG9uLCBJUHJvcHMgYXMgSUJ0blByb3BzfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5jb25zdCAkID0gZXRjaC5kb21cblxuZXhwb3J0IGludGVyZmFjZSBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uIHtcbiAgdXJpRmlsdGVyPzogYm9vbGVhblxuICBhdXRvU2Nyb2xsPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgSUJ0bkRlc2MgZXh0ZW5kcyBJQnRuUHJvcHMge1xuICB1cmlGaWx0ZXI6IGJvb2xlYW5cbiAgYXV0b1Njcm9sbDogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVtaXR0ZXI6IEVtaXR0ZXJcbiAgcHJpdmF0ZSBidXR0b25zOiBTZXQ8SUJ0bkRlc2M+XG4gIHByaXZhdGUgcmVmczogeyBbYnRuTmFtZTogc3RyaW5nXTogQnV0dG9uIH1cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKSlcbiAgICB0aGlzLmJ1dHRvbnMgPSBuZXcgU2V0KCk7XG4gICAgWydlcnJvcicsICd3YXJuaW5nJywgJ2xpbnQnXS5mb3JFYWNoKChidG4pID0+IHRoaXMuY3JlYXRlQnV0dG9uKGJ0bikpXG4gICAgdGhpcy5jcmVhdGVCdXR0b24oJ2J1aWxkJywge3VyaUZpbHRlcjogZmFsc2UsIGF1dG9TY3JvbGw6IHRydWV9KVxuICAgIHRoaXMub25CdXR0b25DbGlja2VkKHRoaXMuZGlzYWJsZUFsbC5iaW5kKHRoaXMpKVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgICAgICB7QXJyYXkuZnJvbSh0aGlzLnJlbmRlckJ1dHRvbnMoKSl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQnV0dG9uIChidG46IHN0cmluZywge3VyaUZpbHRlciA9IHRydWUsIGF1dG9TY3JvbGwgPSBmYWxzZX06IElTZXZlcml0eVRhYkRlZmluaXRpb24gPSB7fSkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQnKSAhPT0gJ2J1aWx0aW4nICYmXG4gICAgICAgICAgdXJpRmlsdGVyID09PSB0cnVlKSB7IHJldHVybiB9XG4gICAgY29uc3QgYnV0dG9uOiBJQnRuRGVzYyA9IHtcbiAgICAgIHJlZjogYnRuLFxuICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgIGNvdW50OiAwLFxuICAgICAgdXJpRmlsdGVyLFxuICAgICAgYXV0b1Njcm9sbCxcbiAgICAgIGVtaXR0ZXI6IHRoaXMuZW1pdHRlclxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuYWRkKGJ1dHRvbilcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgb3B0aW9ucyAoYnRuOiBzdHJpbmcpOiBJQnRuRGVzYyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICByZXR1cm4gKHRoaXMucmVmc1tidG5dLnByb3BzIGFzIElCdG5EZXNjKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkJ1dHRvbkNsaWNrZWQgKGNhbGxiYWNrOiAoYnRuTmFtZTogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignYnV0dG9uLWNsaWNrZWQnLCBjYWxsYmFjaylcbiAgfVxuXG4gIHB1YmxpYyBidXR0b25OYW1lcyAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmVmcylcbiAgfVxuXG4gIHB1YmxpYyBkaXNhYmxlQWxsIChuYW1lPzogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCB2IGluIHRoaXMucmVmcykge1xuICAgICAgaWYgKHYgIT09IG5hbWUpIHtcbiAgICAgICAgdGhpcy5yZWZzW3ZdLmRlYWN0aXZhdGUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRDb3VudCAoYnRuOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5yZWZzW2J0bl0pIHtcbiAgICAgIHRoaXMucmVmc1tidG5dLnNldENvdW50KGNvdW50KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGlja0J1dHRvbiAoYnRuOiBzdHJpbmcpIHtcbiAgICBpZiAoYnRuID09PSB0aGlzLmdldEFjdGl2ZSgpKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMucmVmc1tidG5dKSB7XG4gICAgICB0aGlzLnJlZnNbYnRuXS5hY3RpdmF0ZSgpXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYnV0dG9uLWNsaWNrZWQnLCBidG4pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5idXR0b25zLmNsZWFyKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmUgKCkge1xuICAgIGZvciAoY29uc3QgdiBpbiB0aGlzLnJlZnMpIHtcbiAgICAgIGlmICh0aGlzLnJlZnNbdl0ucHJvcHMuYWN0aXZlKSB7IHJldHVybiB2IH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlICogcmVuZGVyQnV0dG9ucyAoKSB7XG4gICAgZm9yIChjb25zdCBidG4gb2YgdGhpcy5idXR0b25zLnZhbHVlcygpKSB7XG4gICAgICB5aWVsZCAkKEJ1dHRvbiwgYnRuKVxuICAgIH1cbiAgfVxufVxuIl19