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
        this.buttons = new Map();
        this.activeBtn = 'error';
        this.onChange = props.onChange;
        ['error', 'warning', 'lint'].forEach((btn) => this.createButton(btn));
        this.createButton('build', { uriFilter: false, autoScroll: true });
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
        if (this.onChange) {
            this.onChange(btn);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQWlFO0FBQ2pFLDZCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO0FBaUJsQjtJQUlFLFlBQWEsS0FBeUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUMvQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLDRDQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQ1AsQ0FDN0IsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLFlBQVksQ0FBRSxHQUFXLEVBQUUsRUFBQyxTQUFTLEdBQUcsSUFBSSxFQUFFLFVBQVUsR0FBRyxLQUFLLEtBQTRCLEVBQUU7UUFDbkcsRUFB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IHtCdXR0b24sIElQcm9wcyBhcyBJQnRuUHJvcHN9IGZyb20gJy4vb3V0cHV0LXBhbmVsLWJ1dHRvbidcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmNvbnN0ICQgPSBldGNoLmRvbVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXZlcml0eVRhYkRlZmluaXRpb24ge1xuICAvKiogc2hvdWxkIHVyaSBmaWx0ZXIgYXBwbHkgdG8gdGFiPyAqL1xuICB1cmlGaWx0ZXI/OiBib29sZWFuXG4gIC8qKiBzaG91bGQgdGFiIGF1dG8tc2Nyb2xsPyAqL1xuICBhdXRvU2Nyb2xsPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCdG5EZXNjIHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvdW50OiBudW1iZXJcbiAgb25DbGljazogKCkgPT4gdm9pZFxuICB1cmlGaWx0ZXI6IGJvb2xlYW5cbiAgYXV0b1Njcm9sbDogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxCdXR0b25zIHtcbiAgcHJpdmF0ZSBidXR0b25zOiBNYXA8c3RyaW5nLCBJQnRuRGVzYz5cbiAgcHJpdmF0ZSBhY3RpdmVCdG46IHN0cmluZ1xuICBwcml2YXRlIG9uQ2hhbmdlPzogKGJ0bjogc3RyaW5nKSA9PiB2b2lkXG4gIGNvbnN0cnVjdG9yIChwcm9wczoge29uQ2hhbmdlPzogKGJ0bjogc3RyaW5nKSA9PiB2b2lkfSkge1xuICAgIHRoaXMuYnV0dG9ucyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuYWN0aXZlQnRuID0gJ2Vycm9yJ1xuICAgIHRoaXMub25DaGFuZ2UgPSBwcm9wcy5vbkNoYW5nZTtcbiAgICBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnbGludCddLmZvckVhY2goKGJ0bikgPT4gdGhpcy5jcmVhdGVCdXR0b24oYnRuKSlcbiAgICB0aGlzLmNyZWF0ZUJ1dHRvbignYnVpbGQnLCB7dXJpRmlsdGVyOiBmYWxzZSwgYXV0b1Njcm9sbDogdHJ1ZX0pXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAgIHtBcnJheS5mcm9tKHRoaXMucmVuZGVyQnV0dG9ucygpKX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFuZWwtYnV0dG9ucz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlICgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVCdXR0b24gKGJ0bjogc3RyaW5nLCB7dXJpRmlsdGVyID0gdHJ1ZSwgYXV0b1Njcm9sbCA9IGZhbHNlfTogSVNldmVyaXR5VGFiRGVmaW5pdGlvbiA9IHt9KSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwubWVzc2FnZURpc3BsYXlGcm9udGVuZCcpICE9PSAnYnVpbHRpbicgJiZcbiAgICAgICAgICB1cmlGaWx0ZXIgPT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBidXR0b246IElCdG5EZXNjID0ge1xuICAgICAgbmFtZTogYnRuLFxuICAgICAgY291bnQ6IDAsXG4gICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLnNldEFjdGl2ZShidG4pLFxuICAgICAgdXJpRmlsdGVyLFxuICAgICAgYXV0b1Njcm9sbCxcbiAgICB9XG4gICAgdGhpcy5idXR0b25zLnNldChidG4sIGJ1dHRvbilcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgb3B0aW9ucyAoYnRuOiBzdHJpbmcpOiBJQnRuRGVzYyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYnV0dG9ucy5nZXQoYnRuKVxuICB9XG5cbiAgcHVibGljIGJ1dHRvbk5hbWVzICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmJ1dHRvbnMua2V5cygpKVxuICB9XG5cbiAgcHVibGljIHNldENvdW50IChidG46IHN0cmluZywgY291bnQ6IG51bWJlcikge1xuICAgIGNvbnN0IHAgPSB0aGlzLmJ1dHRvbnMuZ2V0KGJ0bilcbiAgICBpZiAocCkge1xuICAgICAgcC5jb3VudCA9IGNvdW50XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvdW50IChidG46IHN0cmluZykge1xuICAgIGNvbnN0IHAgPSB0aGlzLmJ1dHRvbnMuZ2V0KGJ0bilcbiAgICBpZiAocCkge1xuICAgICAgcmV0dXJuIHAuY291bnRcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0QWN0aXZlIChidG46IHN0cmluZykge1xuICAgIGlmIChidG4gPT09IHRoaXMuYWN0aXZlQnRuKSB7IHJldHVybiB9XG4gICAgaWYgKCEgdGhpcy5idXR0b25zLmhhcyhidG4pKSB7IHRocm93IG5ldyBFcnJvcihgVW5rbm93biBidXR0b24gJHtidG59YCl9XG4gICAgdGhpcy5hY3RpdmVCdG4gPSBidG5cbiAgICB0aGlzLnVwZGF0ZSgpXG4gICAgaWYgKHRoaXMub25DaGFuZ2UpIHsgdGhpcy5vbkNoYW5nZShidG4pIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmJ1dHRvbnMuY2xlYXIoKVxuICB9XG5cbiAgcHVibGljIGdldEFjdGl2ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQnRuXG4gIH1cblxuICBwcml2YXRlICogcmVuZGVyQnV0dG9ucyAoKSB7XG4gICAgZm9yIChjb25zdCBbYnRuLCBwcm9wc10gb2YgdGhpcy5idXR0b25zLmVudHJpZXMoKSkge1xuICAgICAgeWllbGQgJChCdXR0b24sIHsuLi5wcm9wcywgYWN0aXZlOiBidG4gPT09IHRoaXMuYWN0aXZlQnRufSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==