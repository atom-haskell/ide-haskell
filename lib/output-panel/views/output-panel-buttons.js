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
            console.warn(`IDE-Haskell: Unknown button activated: ${btn}`);
            return;
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
            yield $(output_panel_button_1.Button, {
                active: btn === this.activeBtn,
                name: props.name,
                count: props.count,
                onClick: props.onClick
            });
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQWlFO0FBQ2pFLDZCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBWWxCO0lBR0UsWUFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBRSxLQUFjOztZQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFF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Q2QsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUztnQkFDOUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2dCQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzthQUN2QixDQUFDLENBQUE7UUFDSixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBM0ZELGdEQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QnV0dG9uLCBJUHJvcHMgYXMgSUJ0blByb3BzfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5jb25zdCAkID0gZXRjaC5kb21cblxuZXhwb3J0IGludGVyZmFjZSBJQnRuRGVzYyB7XG4gIG5hbWU6IHN0cmluZ1xuICBjb3VudDogbnVtYmVyXG4gIG9uQ2xpY2s6ICgpID0+IHZvaWRcbiAgdXJpRmlsdGVyOiBib29sZWFuXG4gIGF1dG9TY3JvbGw6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge29uQ2hhbmdlPzogKGJ0bjogc3RyaW5nKSA9PiB2b2lkfVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgYnV0dG9uczogTWFwPHN0cmluZywgSUJ0bkRlc2M+XG4gIHByaXZhdGUgYWN0aXZlQnRuOiBzdHJpbmdcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5idXR0b25zID0gbmV3IE1hcCgpXG4gICAgdGhpcy5hY3RpdmVCdG4gPSAnZXJyb3InO1xuICAgIFsnZXJyb3InLCAnd2FybmluZycsICdsaW50J10uZm9yRWFjaCgoYnRuKSA9PiB0aGlzLmNyZWF0ZUJ1dHRvbihidG4pKVxuICAgIHRoaXMuY3JlYXRlQnV0dG9uKCdidWlsZCcsIHt1cmlGaWx0ZXI6IGZhbHNlLCBhdXRvU2Nyb2xsOiB0cnVlfSlcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICAgICAge0FycmF5LmZyb20odGhpcy5yZW5kZXJCdXR0b25zKCkpfVxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUgKHByb3BzPzogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7IHRoaXMucHJvcHMgPSBwcm9wcyB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQnV0dG9uIChidG46IHN0cmluZywge3VyaUZpbHRlciA9IHRydWUsIGF1dG9TY3JvbGwgPSBmYWxzZX06IFVQSS5JU2V2ZXJpdHlUYWJEZWZpbml0aW9uID0ge30pIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgIT09ICdidWlsdGluJyAmJlxuICAgICAgICAgIHVyaUZpbHRlciA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IGJ1dHRvbjogSUJ0bkRlc2MgPSB7XG4gICAgICBuYW1lOiBidG4sXG4gICAgICBjb3VudDogMCxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0QWN0aXZlKGJ0biksXG4gICAgICB1cmlGaWx0ZXIsXG4gICAgICBhdXRvU2Nyb2xsLFxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuc2V0KGJ0biwgYnV0dG9uKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25zIChidG46IHN0cmluZyk6IElCdG5EZXNjIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5idXR0b25zLmdldChidG4pXG4gIH1cblxuICBwdWJsaWMgYnV0dG9uTmFtZXMgKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuYnV0dG9ucy5rZXlzKCkpXG4gIH1cblxuICBwdWJsaWMgc2V0Q291bnQgKGJ0bjogc3RyaW5nLCBjb3VudDogbnVtYmVyKSB7XG4gICAgY29uc3QgcCA9IHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICAgIGlmIChwKSB7XG4gICAgICBwLmNvdW50ID0gY291bnRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnQgKGJ0bjogc3RyaW5nKSB7XG4gICAgY29uc3QgcCA9IHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICAgIGlmIChwKSB7XG4gICAgICByZXR1cm4gcC5jb3VudFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRBY3RpdmUgKGJ0bjogc3RyaW5nKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5hY3RpdmVCdG4pIHsgcmV0dXJuIH1cbiAgICBpZiAoISB0aGlzLmJ1dHRvbnMuaGFzKGJ0bikpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKGBJREUtSGFza2VsbDogVW5rbm93biBidXR0b24gYWN0aXZhdGVkOiAke2J0bn1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlQnRuID0gYnRuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7IHRoaXMucHJvcHMub25DaGFuZ2UoYnRuKSB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5idXR0b25zLmNsZWFyKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmUgKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJ0blxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgW2J0biwgcHJvcHNdIG9mIHRoaXMuYnV0dG9ucy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkICQoQnV0dG9uLCB7XG4gICAgICAgIGFjdGl2ZTogYnRuID09PSB0aGlzLmFjdGl2ZUJ0bixcbiAgICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgICAgY291bnQ6IHByb3BzLmNvdW50LFxuICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNsaWNrXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIl19