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
const output_panel_button_1 = require("./output-panel-button");
const etch = require("etch");
const $ = etch.dom;
class OutputPanelButtons {
    constructor(props) {
        this.props = props;
        this.buttons = new Map();
        this.activeBtn = 'error';
        ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn));
        this.createButton('build', { uriFilter: false, autoScroll: true });
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-buttons", null, Array.from(this.renderButtons())));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (props) {
                this.props = props;
            }
            return etch.update(this);
        });
    }
    createButton(btn, { uriFilter = true, autoScroll = false } = {}) {
        if (atom.config.get('ide-haskell.messageDisplayFrontend') !== 'builtin' &&
            uriFilter === true) {
            return;
        }
        const button = {
            name: btn,
            count: 0,
            onClick: () => this.setActive(btn),
            uriFilter,
            autoScroll,
        };
        this.buttons.set(btn, button);
        this.update();
    }
    options(btn) {
        return this.buttons.get(btn);
    }
    buttonNames() {
        return Array.from(this.buttons.keys());
    }
    setCount(btn, count) {
        const p = this.buttons.get(btn);
        if (p) {
            p.count = count;
        }
    }
    getCount(btn) {
        const p = this.buttons.get(btn);
        if (p) {
            return p.count;
        }
    }
    setActive(btn) {
        if (btn === this.activeBtn) {
            return;
        }
        if (!this.buttons.has(btn)) {
            throw new Error(`Unknown button ${btn}`);
        }
        this.activeBtn = btn;
        this.update();
        if (this.props.onChange) {
            this.props.onChange(btn);
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.buttons.clear();
        });
    }
    getActive() {
        return this.activeBtn;
    }
    *renderButtons() {
        for (const [btn, props] of this.buttons.entries()) {
            yield $(output_panel_button_1.Button, Object.assign({}, props, { active: btn === this.activeBtn }));
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQWlFO0FBQ2pFLDZCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBbUJsQjtJQUdFLFlBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLDRDQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQ1AsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUUsS0FBYzs7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lB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QUUsR0FBRyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUUsQ0FBQTtRQUM3RCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBbEZELGdEQWtGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QnV0dG9uLCBJUHJvcHMgYXMgSUJ0blByb3BzfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5jb25zdCAkID0gZXRjaC5kb21cblxuZXhwb3J0IGludGVyZmFjZSBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uIHtcbiAgLyoqIHNob3VsZCB1cmkgZmlsdGVyIGFwcGx5IHRvIHRhYj8gKi9cbiAgdXJpRmlsdGVyPzogYm9vbGVhblxuICAvKiogc2hvdWxkIHRhYiBhdXRvLXNjcm9sbD8gKi9cbiAgYXV0b1Njcm9sbD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQnRuRGVzYyB7XG4gIG5hbWU6IHN0cmluZ1xuICBjb3VudDogbnVtYmVyXG4gIG9uQ2xpY2s6ICgpID0+IHZvaWRcbiAgdXJpRmlsdGVyOiBib29sZWFuXG4gIGF1dG9TY3JvbGw6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge29uQ2hhbmdlPzogKGJ0bjogc3RyaW5nKSA9PiB2b2lkfVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgYnV0dG9uczogTWFwPHN0cmluZywgSUJ0bkRlc2M+XG4gIHByaXZhdGUgYWN0aXZlQnRuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5idXR0b25zID0gbmV3IE1hcCgpXG4gICAgdGhpcy5hY3RpdmVCdG4gPSAnZXJyb3InO1xuICAgIFsnZXJyb3InLCAnd2FybmluZycsICdsaW50J10uZm9yRWFjaCgoYnRuKSA9PiB0aGlzLmNyZWF0ZUJ1dHRvbihidG4pKVxuICAgIHRoaXMuY3JlYXRlQnV0dG9uKCdidWlsZCcsIHt1cmlGaWx0ZXI6IGZhbHNlLCBhdXRvU2Nyb2xsOiB0cnVlfSlcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICAgICAge0FycmF5LmZyb20odGhpcy5yZW5kZXJCdXR0b25zKCkpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzPzogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7IHRoaXMucHJvcHMgPSBwcm9wcyB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQnV0dG9uIChidG46IHN0cmluZywge3VyaUZpbHRlciA9IHRydWUsIGF1dG9TY3JvbGwgPSBmYWxzZX06IElTZXZlcml0eVRhYkRlZmluaXRpb24gPSB7fSkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm1lc3NhZ2VEaXNwbGF5RnJvbnRlbmQnKSAhPT0gJ2J1aWx0aW4nICYmXG4gICAgICAgICAgdXJpRmlsdGVyID09PSB0cnVlKSB7IHJldHVybiB9XG4gICAgY29uc3QgYnV0dG9uOiBJQnRuRGVzYyA9IHtcbiAgICAgIG5hbWU6IGJ0bixcbiAgICAgIGNvdW50OiAwLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zZXRBY3RpdmUoYnRuKSxcbiAgICAgIHVyaUZpbHRlcixcbiAgICAgIGF1dG9TY3JvbGwsXG4gICAgfVxuICAgIHRoaXMuYnV0dG9ucy5zZXQoYnRuLCBidXR0b24pXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIG9wdGlvbnMgKGJ0bjogc3RyaW5nKTogSUJ0bkRlc2MgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmJ1dHRvbnMuZ2V0KGJ0bilcbiAgfVxuXG4gIHB1YmxpYyBidXR0b25OYW1lcyAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5idXR0b25zLmtleXMoKSlcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb3VudCAoYnRuOiBzdHJpbmcsIGNvdW50OiBudW1iZXIpIHtcbiAgICBjb25zdCBwID0gdGhpcy5idXR0b25zLmdldChidG4pXG4gICAgaWYgKHApIHtcbiAgICAgIHAuY291bnQgPSBjb3VudFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb3VudCAoYnRuOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwID0gdGhpcy5idXR0b25zLmdldChidG4pXG4gICAgaWYgKHApIHtcbiAgICAgIHJldHVybiBwLmNvdW50XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEFjdGl2ZSAoYnRuOiBzdHJpbmcpIHtcbiAgICBpZiAoYnRuID09PSB0aGlzLmFjdGl2ZUJ0bikgeyByZXR1cm4gfVxuICAgIGlmICghIHRoaXMuYnV0dG9ucy5oYXMoYnRuKSkgeyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gYnV0dG9uICR7YnRufWApfVxuICAgIHRoaXMuYWN0aXZlQnRuID0gYnRuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7IHRoaXMucHJvcHMub25DaGFuZ2UoYnRuKSB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5idXR0b25zLmNsZWFyKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmUgKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJ0blxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgW2J0biwgcHJvcHNdIG9mIHRoaXMuYnV0dG9ucy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkICQoQnV0dG9uLCB7Li4ucHJvcHMsIGFjdGl2ZTogYnRuID09PSB0aGlzLmFjdGl2ZUJ0bn0pXG4gICAgfVxuICB9XG59XG4iXX0=