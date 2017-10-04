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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFNNUI7SUFDRSxZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUNMLHVDQUEwQixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDbkUsbUJBQU0sS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFJLENBQ3JELENBQzVCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVPLFdBQVc7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQ3BGLENBQUM7Q0FDRjtBQTlCRCxrQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgcHJvZ3Jlc3M6IG51bWJlcltdXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuYXZlUHJvZ3Jlc3MoKVxuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyIGNsYXNzTmFtZT17aXNOYU4ocHJvZ3Jlc3MpID8gJycgOiAndmlzaWJsZSd9PlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWAsIGhlaWdodDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWAgfX0gLz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IElQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnByb2dyZXNzICE9PSBwcm9wcy5wcm9ncmVzcykge1xuICAgICAgdGhpcy5wcm9wcy5wcm9ncmVzcyA9IHByb3BzLnByb2dyZXNzXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwcml2YXRlIGF2ZVByb2dyZXNzKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnByb2dyZXNzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIC8gdGhpcy5wcm9wcy5wcm9ncmVzcy5sZW5ndGhcbiAgfVxufVxuIl19