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
    constructor() {
        this.progress = NaN;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-progress-bar", { className: isNaN(this.progress) ? '' : 'visible' },
            etch.dom("span", { style: { width: `${this.progress * 100}%`, height: `${this.progress * 100}%` } })));
    }
    update() {
        return etch.update(this);
    }
    setProgress(progress) {
        this.progress = progress;
        this.update();
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFFNUI7SUFFRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFBO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCx1Q0FBMEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVM7WUFDeEUsbUJBQU0sS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFDLEdBQzNFLENBQ2tCLENBQzVCLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxXQUFXLENBQUUsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQTVCRCxrQ0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIHByaXZhdGUgcHJvZ3Jlc3M6IG51bWJlclxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IE5hTlxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wcm9ncmVzcy1iYXIgY2xhc3NOYW1lPXtpc05hTih0aGlzLnByb2dyZXNzKSA/ICcnIDogJ3Zpc2libGUnfT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3t3aWR0aDogYCR7dGhpcy5wcm9ncmVzcyAqIDEwMH0lYCwgaGVpZ2h0OiBgJHt0aGlzLnByb2dyZXNzICogMTAwfSVgfX0+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNldFByb2dyZXNzIChwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG59XG4iXX0=