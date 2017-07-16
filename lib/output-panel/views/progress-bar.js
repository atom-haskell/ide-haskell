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
const etch = require("etch");
class ProgressBar {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        const progress = this.aveProgress();
        return (etch.dom("ide-haskell-progress-bar", { className: isNaN(progress) ? '' : 'visible' },
            etch.dom("span", { style: { width: `${progress * 100}%`, height: `${progress * 100}%` } })));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.progress !== props.progress) {
                this.props.progress = props.progress;
                return etch.update(this);
            }
            else {
                return Promise.resolve();
            }
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    aveProgress() {
        return this.props.progress.reduce((a, b) => a + b, 0) / this.props.progress.length;
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFNNUI7SUFDRSxZQUFvQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUNMLHVDQUEwQixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ25FLG1CQUFNLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUMsR0FDakUsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUUsS0FBYTs7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sV0FBVztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQTtJQUNwRixDQUFDO0NBQ0Y7QUEvQkQsa0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHByb2dyZXNzOiBudW1iZXJbXVxufVxuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuYXZlUHJvZ3Jlc3MoKVxuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyIGNsYXNzTmFtZT17aXNOYU4ocHJvZ3Jlc3MpID8gJycgOiAndmlzaWJsZSd9PlxuICAgICAgICA8c3BhbiBzdHlsZT17e3dpZHRoOiBgJHtwcm9ncmVzcyAqIDEwMH0lYCwgaGVpZ2h0OiBgJHtwcm9ncmVzcyAqIDEwMH0lYH19PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2lkZS1oYXNrZWxsLXByb2dyZXNzLWJhcj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucHJvZ3Jlc3MgIT09IHByb3BzLnByb2dyZXNzKSB7XG4gICAgICB0aGlzLnByb3BzLnByb2dyZXNzID0gcHJvcHMucHJvZ3Jlc3NcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwcml2YXRlIGF2ZVByb2dyZXNzICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5wcm9ncmVzcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKSAvIHRoaXMucHJvcHMucHJvZ3Jlc3MubGVuZ3RoXG4gIH1cbn1cbiJdfQ==