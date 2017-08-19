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
                onClick: props.onClick,
            });
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQThDO0FBQzlDLDZCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBWWxCO0lBR0UsWUFBbUIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsNENBQ0csS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDUCxDQUM3QixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxLQUFjOztZQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFF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Q2QsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUztnQkFDOUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO2dCQUNoQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzthQUN2QixDQUFDLENBQUE7UUFDSixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBM0ZELGdEQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vb3V0cHV0LXBhbmVsLWJ1dHRvbidcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmNvbnN0ICQgPSBldGNoLmRvbVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdG5EZXNjIHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvdW50OiBudW1iZXJcbiAgb25DbGljazogKCkgPT4gdm9pZFxuICB1cmlGaWx0ZXI6IGJvb2xlYW5cbiAgYXV0b1Njcm9sbDogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7IG9uQ2hhbmdlPzogKGJ0bjogc3RyaW5nKSA9PiB2b2lkIH1cblxuZXhwb3J0IGNsYXNzIE91dHB1dFBhbmVsQnV0dG9ucyBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGJ1dHRvbnM6IE1hcDxzdHJpbmcsIElCdG5EZXNjPlxuICBwcml2YXRlIGFjdGl2ZUJ0bjogc3RyaW5nXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5idXR0b25zID0gbmV3IE1hcCgpXG4gICAgdGhpcy5hY3RpdmVCdG4gPSAnZXJyb3InO1xuICAgIFsnZXJyb3InLCAnd2FybmluZycsICdsaW50J10uZm9yRWFjaCgoYnRuKSA9PiB0aGlzLmNyZWF0ZUJ1dHRvbihidG4pKVxuICAgIHRoaXMuY3JlYXRlQnV0dG9uKCdidWlsZCcsIHsgdXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZSB9KVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAgIHtBcnJheS5mcm9tKHRoaXMucmVuZGVyQnV0dG9ucygpKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzPzogSVByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7IHRoaXMucHJvcHMgPSBwcm9wcyB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQnV0dG9uKGJ0bjogc3RyaW5nLCB7IHVyaUZpbHRlciA9IHRydWUsIGF1dG9TY3JvbGwgPSBmYWxzZSB9OiBVUEkuSVNldmVyaXR5VGFiRGVmaW5pdGlvbiA9IHt9KSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwubWVzc2FnZURpc3BsYXlGcm9udGVuZCcpICE9PSAnYnVpbHRpbicgJiZcbiAgICAgIHVyaUZpbHRlciA9PT0gdHJ1ZSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IGJ1dHRvbjogSUJ0bkRlc2MgPSB7XG4gICAgICBuYW1lOiBidG4sXG4gICAgICBjb3VudDogMCxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2V0QWN0aXZlKGJ0biksXG4gICAgICB1cmlGaWx0ZXIsXG4gICAgICBhdXRvU2Nyb2xsLFxuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuc2V0KGJ0biwgYnV0dG9uKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBvcHRpb25zKGJ0bjogc3RyaW5nKTogSUJ0bkRlc2MgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmJ1dHRvbnMuZ2V0KGJ0bilcbiAgfVxuXG4gIHB1YmxpYyBidXR0b25OYW1lcygpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmJ1dHRvbnMua2V5cygpKVxuICB9XG5cbiAgcHVibGljIHNldENvdW50KGJ0bjogc3RyaW5nLCBjb3VudDogbnVtYmVyKSB7XG4gICAgY29uc3QgcCA9IHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICAgIGlmIChwKSB7XG4gICAgICBwLmNvdW50ID0gY291bnRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q291bnQoYnRuOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwID0gdGhpcy5idXR0b25zLmdldChidG4pXG4gICAgaWYgKHApIHtcbiAgICAgIHJldHVybiBwLmNvdW50XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEFjdGl2ZShidG46IHN0cmluZykge1xuICAgIGlmIChidG4gPT09IHRoaXMuYWN0aXZlQnRuKSB7IHJldHVybiB9XG4gICAgaWYgKCF0aGlzLmJ1dHRvbnMuaGFzKGJ0bikpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKGBJREUtSGFza2VsbDogVW5rbm93biBidXR0b24gYWN0aXZhdGVkOiAke2J0bn1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlQnRuID0gYnRuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7IHRoaXMucHJvcHMub25DaGFuZ2UoYnRuKSB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmJ1dHRvbnMuY2xlYXIoKVxuICB9XG5cbiAgcHVibGljIGdldEFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVCdG5cbiAgfVxuXG4gIHByaXZhdGUgKiByZW5kZXJCdXR0b25zKCkge1xuICAgIGZvciAoY29uc3QgW2J0biwgcHJvcHNdIG9mIHRoaXMuYnV0dG9ucy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkICQoQnV0dG9uLCB7XG4gICAgICAgIGFjdGl2ZTogYnRuID09PSB0aGlzLmFjdGl2ZUJ0bixcbiAgICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgICAgY291bnQ6IHByb3BzLmNvdW50LFxuICAgICAgICBvbkNsaWNrOiBwcm9wcy5vbkNsaWNrLFxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==