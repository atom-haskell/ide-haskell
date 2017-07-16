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
        this.progress = props.progress;
        etch.initialize(this);
    }
    render() {
        const progress = this.aveProgress();
        return (etch.dom("ide-haskell-progress-bar", { className: isNaN(progress) ? '' : 'visible' },
            etch.dom("span", { style: { width: `${progress * 100}%`, height: `${progress * 100}%` } })));
    }
    update(props) {
        if (props && this.progress !== props.progress) {
            this.progress = props.progress;
            etch.update(this);
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    aveProgress() {
        return this.progress.reduce((a, b) => a + b, 0) / this.progress.length;
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFFNUI7SUFFRSxZQUFhLEtBQTJCO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQTtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUNMLHVDQUEwQixTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ25FLG1CQUFNLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUMsR0FDakUsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsS0FBMkI7UUFDeEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFFWSxPQUFPOztZQUNsQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sV0FBVztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUE7SUFDeEUsQ0FBQztDQUNGO0FBL0JELGtDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgcHJpdmF0ZSBwcm9ncmVzczogbnVtYmVyW11cbiAgY29uc3RydWN0b3IgKHByb3BzOiB7cHJvZ3Jlc3M6IG51bWJlcltdfSkge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9wcy5wcm9ncmVzc1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSB0aGlzLmF2ZVByb2dyZXNzKClcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXByb2dyZXNzLWJhciBjbGFzc05hbWU9e2lzTmFOKHByb2dyZXNzKSA/ICcnIDogJ3Zpc2libGUnfT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3t3aWR0aDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWAsIGhlaWdodDogYCR7cHJvZ3Jlc3MgKiAxMDB9JWB9fT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9pZGUtaGFza2VsbC1wcm9ncmVzcy1iYXI+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAocHJvcHM6IHtwcm9ncmVzczogbnVtYmVyW119KSB7XG4gICAgaWYgKHByb3BzICYmIHRoaXMucHJvZ3Jlc3MgIT09IHByb3BzLnByb2dyZXNzKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gcHJvcHMucHJvZ3Jlc3NcbiAgICAgIGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHJpdmF0ZSBhdmVQcm9ncmVzcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCkgLyB0aGlzLnByb2dyZXNzLmxlbmd0aFxuICB9XG59XG4iXX0=