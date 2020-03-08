"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const etch = require("etch");
class ProgressBar {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        const progress = this.aveProgress();
        if (isNaN(progress))
            return etch.dom("progress", { style: { display: 'none' } });
        else if (progress === 0)
            return etch.dom("progress", null);
        else
            return etch.dom("progress", { value: progress.toString(), max: "1" });
    }
    async update(props) {
        if (this.props.progress !== props.progress) {
            this.props.progress = props.progress;
            return etch.update(this);
        }
        else {
            return Promise.resolve();
        }
    }
    async destroy() {
        await etch.destroy(this);
    }
    aveProgress() {
        return (this.props.progress.reduce((a, b) => a + b, 0) /
            this.props.progress.length);
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTRCO0FBUTVCLE1BQWEsV0FBVztJQUN0QixZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25DLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU8sdUJBQVUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFJLENBQUE7YUFDL0QsSUFBSSxRQUFRLEtBQUssQ0FBQztZQUFFLE9BQU8sMEJBQVksQ0FBQTs7WUFDdkMsT0FBTyx1QkFBVSxLQUFLLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBQyxHQUFHLEdBQUcsQ0FBQTtJQUM5RCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN6QjthQUFNO1lBQ0wsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDekI7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLE9BQU87UUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTyxXQUFXO1FBQ2pCLE9BQU8sQ0FDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQzNCLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUEvQkQsa0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHByb2dyZXNzOiBudW1iZXJbXVxufVxuXG50eXBlIEVsZW1lbnRDbGFzcyA9IEpTWC5FbGVtZW50Q2xhc3NcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIGltcGxlbWVudHMgRWxlbWVudENsYXNzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMpIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLmF2ZVByb2dyZXNzKClcbiAgICBpZiAoaXNOYU4ocHJvZ3Jlc3MpKSByZXR1cm4gPHByb2dyZXNzIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fSAvPlxuICAgIGVsc2UgaWYgKHByb2dyZXNzID09PSAwKSByZXR1cm4gPHByb2dyZXNzIC8+XG4gICAgZWxzZSByZXR1cm4gPHByb2dyZXNzIHZhbHVlPXtwcm9ncmVzcy50b1N0cmluZygpfSBtYXg9XCIxXCIgLz5cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IElQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnByb2dyZXNzICE9PSBwcm9wcy5wcm9ncmVzcykge1xuICAgICAgdGhpcy5wcm9wcy5wcm9ncmVzcyA9IHByb3BzLnByb2dyZXNzXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwcml2YXRlIGF2ZVByb2dyZXNzKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnByb3BzLnByb2dyZXNzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIC9cbiAgICAgIHRoaXMucHJvcHMucHJvZ3Jlc3MubGVuZ3RoXG4gICAgKVxuICB9XG59XG4iXX0=