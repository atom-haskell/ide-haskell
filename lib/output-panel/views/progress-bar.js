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
    constructor({ orientation = 'horizontal' } = {}) {
        this.direction = orientation;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-progress-bar", { className: isNaN(this.progress) ? '' : 'visible' },
            etch.dom("span", { style: `${this.direction === 'horizontal' ? 'width' : 'height'}: ${this.progress * 100}%` })));
    }
    update({ orientation = 'horizontal' } = {}) {
        this.direction = orientation;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFJNUI7SUFHRSxZQUFhLEVBQUMsV0FBVyxHQUFHLFlBQVksS0FBZ0MsRUFBRTtRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsdUNBQTBCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ3hFLG1CQUFNLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxHQUFHLE9BQU8sR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FDeEYsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsRUFBQyxXQUFXLEdBQUcsWUFBWSxLQUFnQyxFQUFFO1FBQzFFLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxXQUFXLENBQUUsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQTlCRCxrQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbnR5cGUgVERpcmVjdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCdcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgcHJpdmF0ZSBkaXJlY3Rpb246IFREaXJlY3Rpb25cbiAgcHJpdmF0ZSBwcm9ncmVzczogbnVtYmVyXG4gIGNvbnN0cnVjdG9yICh7b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCd9OiB7b3JpZW50YXRpb24/OiBURGlyZWN0aW9ufSA9IHt9KSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBvcmllbnRhdGlvblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wcm9ncmVzcy1iYXIgY2xhc3NOYW1lPXtpc05hTih0aGlzLnByb2dyZXNzKSA/ICcnIDogJ3Zpc2libGUnfT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e2Ake3RoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnd2lkdGgnIDogJ2hlaWdodCd9OiAke3RoaXMucHJvZ3Jlc3MgKiAxMDB9JWB9PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2lkZS1oYXNrZWxsLXByb2dyZXNzLWJhcj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlICh7b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCd9OiB7b3JpZW50YXRpb24/OiBURGlyZWN0aW9ufSA9IHt9KSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBvcmllbnRhdGlvblxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNldFByb2dyZXNzIChwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG59XG4iXX0=