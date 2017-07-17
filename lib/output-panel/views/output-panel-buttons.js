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
            yield $(output_panel_button_1.Button, Object.assign({}, props, { active: btn === this.activeBtn }));
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQWlFO0FBQ2pFLDZCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBbUJsQjtJQUdFLFlBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLDRDQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQ1AsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUUsS0FBYzs7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtZQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lB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QUFLLElBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxJQUFFLENBQUE7UUFDN0QsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXRGRCxnREFzRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0J1dHRvbiwgSVByb3BzIGFzIElCdG5Qcm9wc30gZnJvbSAnLi9vdXRwdXQtcGFuZWwtYnV0dG9uJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuY29uc3QgJCA9IGV0Y2guZG9tXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNldmVyaXR5VGFiRGVmaW5pdGlvbiB7XG4gIC8qKiBzaG91bGQgdXJpIGZpbHRlciBhcHBseSB0byB0YWI/ICovXG4gIHVyaUZpbHRlcj86IGJvb2xlYW5cbiAgLyoqIHNob3VsZCB0YWIgYXV0by1zY3JvbGw/ICovXG4gIGF1dG9TY3JvbGw/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJ0bkRlc2Mge1xuICBuYW1lOiBzdHJpbmdcbiAgY291bnQ6IG51bWJlclxuICBvbkNsaWNrOiAoKSA9PiB2b2lkXG4gIHVyaUZpbHRlcjogYm9vbGVhblxuICBhdXRvU2Nyb2xsOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtvbkNoYW5nZT86IChidG46IHN0cmluZykgPT4gdm9pZH1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsQnV0dG9ucyBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGJ1dHRvbnM6IE1hcDxzdHJpbmcsIElCdG5EZXNjPlxuICBwcml2YXRlIGFjdGl2ZUJ0bjogc3RyaW5nXG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIHRoaXMuYnV0dG9ucyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuYWN0aXZlQnRuID0gJ2Vycm9yJztcbiAgICBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnbGludCddLmZvckVhY2goKGJ0bikgPT4gdGhpcy5jcmVhdGVCdXR0b24oYnRuKSlcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbignYnVpbGQnLCB7dXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZX0pXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAgIHtBcnJheS5mcm9tKHRoaXMucmVuZGVyQnV0dG9ucygpKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wcz86IElQcm9wcykge1xuICAgIGlmIChwcm9wcykgeyB0aGlzLnByb3BzID0gcHJvcHMgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZUJ1dHRvbiAoYnRuOiBzdHJpbmcsIHt1cmlGaWx0ZXIgPSB0cnVlLCBhdXRvU2Nyb2xsID0gZmFsc2V9OiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uID0ge30pIHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5tZXNzYWdlRGlzcGxheUZyb250ZW5kJykgIT09ICdidWlsdGluJyAmJlxuICAgICAgICAgIHVyaUZpbHRlciA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IGJ1dHRvbjogSUJ0bkRlc2MgPSB7XG4gICAgICBuYW1lOiBidG4sXG4gICAgICBjb3VudDogMCxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0QWN0aXZlKGJ0biksXG4gICAgICB1cmlGaWx0ZXIsXG4gICAgICBhdXRvU2Nyb2xsLFxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuc2V0KGJ0biwgYnV0dG9uKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25zIChidG46IHN0cmluZyk6IElCdG5EZXNjIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5idXR0b25zLmdldChidG4pXG4gIH1cblxuICBwdWJsaWMgYnV0dG9uTmFtZXMgKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuYnV0dG9ucy5rZXlzKCkpXG4gIH1cblxuICBwdWJsaWMgc2V0Q291bnQgKGJ0bjogc3RyaW5nLCBjb3VudDogbnVtYmVyKSB7XG4gICAgY29uc3QgcCA9IHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICAgIGlmIChwKSB7XG4gICAgICBwLmNvdW50ID0gY291bnRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnQgKGJ0bjogc3RyaW5nKSB7XG4gICAgY29uc3QgcCA9IHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICAgIGlmIChwKSB7XG4gICAgICByZXR1cm4gcC5jb3VudFxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRBY3RpdmUgKGJ0bjogc3RyaW5nKSB7XG4gICAgaWYgKGJ0biA9PT0gdGhpcy5hY3RpdmVCdG4pIHsgcmV0dXJuIH1cbiAgICBpZiAoISB0aGlzLmJ1dHRvbnMuaGFzKGJ0bikpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKGBJREUtSGFza2VsbDogVW5rbm93biBidXR0b24gYWN0aXZhdGVkOiAke2J0bn1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlQnRuID0gYnRuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7IHRoaXMucHJvcHMub25DaGFuZ2UoYnRuKSB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5idXR0b25zLmNsZWFyKClcbiAgfVxuXG4gIHB1YmxpYyBnZXRBY3RpdmUgKCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUJ0blxuICB9XG5cbiAgcHJpdmF0ZSAqIHJlbmRlckJ1dHRvbnMgKCkge1xuICAgIGZvciAoY29uc3QgW2J0biwgcHJvcHNdIG9mIHRoaXMuYnV0dG9ucy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkICQoQnV0dG9uLCB7Li4ucHJvcHMsIGFjdGl2ZTogYnRuID09PSB0aGlzLmFjdGl2ZUJ0bn0pXG4gICAgfVxuICB9XG59XG4iXX0=