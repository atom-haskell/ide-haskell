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
class OutputPanelButtons {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-panel-buttons", null, Array.from(this.renderButtons())));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this.props = props;
            return etch.update(this);
        });
    }
    *renderButtons() {
        for (const props of this.props.buttons) {
            yield (etch.dom(output_panel_button_1.Button, { active: props.name === this.props.activeBtn, name: props.name, count: props.count, onClick: props.onClick }));
        }
    }
}
exports.OutputPanelButtons = OutputPanelButtons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0RBQThDO0FBQzlDLDZCQUE0QjtBQWE1QjtJQUNFLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FFTCw0Q0FDRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUNQLENBRTdCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVPLENBQUUsYUFBYTtRQUNyQixHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUNKLFNBQUMsNEJBQU0sSUFDTCxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDM0MsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUNsQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FDdEIsQ0FDSCxDQUFBO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWhDRCxnREFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL291dHB1dC1wYW5lbC1idXR0b24nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJ0bkRlc2Mge1xuICBuYW1lOiBzdHJpbmdcbiAgY291bnQ6IG51bWJlclxuICBvbkNsaWNrOiAoKSA9PiB2b2lkXG4gIHVyaUZpbHRlcjogYm9vbGVhblxuICBhdXRvU2Nyb2xsOiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHsgYnV0dG9uczogSUJ0bkRlc2NbXSwgYWN0aXZlQnRuPzogc3RyaW5nIH1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEJ1dHRvbnMgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMpIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxpZGUtaGFza2VsbC1wYW5lbC1idXR0b25zPlxuICAgICAgICB7QXJyYXkuZnJvbSh0aGlzLnJlbmRlckJ1dHRvbnMoKSl9XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhbmVsLWJ1dHRvbnM+XG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgKiByZW5kZXJCdXR0b25zKCkge1xuICAgIGZvciAoY29uc3QgcHJvcHMgb2YgdGhpcy5wcm9wcy5idXR0b25zKSB7XG4gICAgICB5aWVsZCAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBhY3RpdmU9e3Byb3BzLm5hbWUgPT09IHRoaXMucHJvcHMuYWN0aXZlQnRufVxuICAgICAgICAgIG5hbWU9e3Byb3BzLm5hbWV9XG4gICAgICAgICAgY291bnQ9e3Byb3BzLmNvdW50fVxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICB9XG59XG4iXX0=