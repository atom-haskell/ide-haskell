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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tlbmQtc3RhdHVzL3ZpZXdzL3Byb2dyZXNzLWJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFRNUIsTUFBYSxXQUFXO0lBQ3RCLFlBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbkMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTyx1QkFBVSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUksQ0FBQTthQUMvRCxJQUFJLFFBQVEsS0FBSyxDQUFDO1lBQUUsT0FBTywwQkFBWSxDQUFBOztZQUN2QyxPQUFPLHVCQUFVLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFDLEdBQUcsR0FBRyxDQUFBO0lBQzlELENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUE7WUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3pCO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUN6QjtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVPLFdBQVc7UUFDakIsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDM0IsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgcHJvZ3Jlc3M6IG51bWJlcltdXG59XG5cbnR5cGUgRWxlbWVudENsYXNzID0gSlNYLkVsZW1lbnRDbGFzc1xuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIgaW1wbGVtZW50cyBFbGVtZW50Q2xhc3Mge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHRoaXMuYXZlUHJvZ3Jlc3MoKVxuICAgIGlmIChpc05hTihwcm9ncmVzcykpIHJldHVybiA8cHJvZ3Jlc3Mgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+XG4gICAgZWxzZSBpZiAocHJvZ3Jlc3MgPT09IDApIHJldHVybiA8cHJvZ3Jlc3MgLz5cbiAgICBlbHNlIHJldHVybiA8cHJvZ3Jlc3MgdmFsdWU9e3Byb2dyZXNzLnRvU3RyaW5nKCl9IG1heD1cIjFcIiAvPlxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucHJvZ3Jlc3MgIT09IHByb3BzLnByb2dyZXNzKSB7XG4gICAgICB0aGlzLnByb3BzLnByb2dyZXNzID0gcHJvcHMucHJvZ3Jlc3NcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxuXG4gIHByaXZhdGUgYXZlUHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMucHJvcHMucHJvZ3Jlc3MucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkgL1xuICAgICAgdGhpcy5wcm9wcy5wcm9ncmVzcy5sZW5ndGhcbiAgICApXG4gIH1cbn1cbiJdfQ==