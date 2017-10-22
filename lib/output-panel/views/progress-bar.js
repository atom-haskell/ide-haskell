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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFRNUI7SUFDRSxZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUVMLHVDQUEwQixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDbkUsbUJBQU0sS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFJLENBQ3JELENBRTVCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVPLFdBQVc7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO0lBQ3BGLENBQUM7Q0FDRjtBQWhDRCxrQ0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgcHJvZ3Jlc3M6IG51bWJlcltdXG59XG5cbnR5cGUgRWxlbWVudENsYXNzID0gSlNYLkVsZW1lbnRDbGFzc1xuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIgaW1wbGVtZW50cyBFbGVtZW50Q2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuYXZlUHJvZ3Jlc3MoKVxuICAgIHJldHVybiAoXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgICA8aWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyIGNsYXNzTmFtZT17aXNOYU4ocHJvZ3Jlc3MpID8gJycgOiAndmlzaWJsZSd9PlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWAsIGhlaWdodDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWAgfX0gLz5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyPlxuICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucHJvZ3Jlc3MgIT09IHByb3BzLnByb2dyZXNzKSB7XG4gICAgICB0aGlzLnByb3BzLnByb2dyZXNzID0gcHJvcHMucHJvZ3Jlc3NcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgYXZlUHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucHJvZ3Jlc3MucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkgLyB0aGlzLnByb3BzLnByb2dyZXNzLmxlbmd0aFxuICB9XG59XG4iXX0=