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
        this.progress = NaN;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFJNUI7SUFHRSxZQUFhLEVBQUMsV0FBVyxHQUFHLFlBQVksS0FBZ0MsRUFBRTtRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQTtRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsdUNBQTBCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ3hFLG1CQUFNLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxHQUFHLE9BQU8sR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FDeEYsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsRUFBQyxXQUFXLEdBQUcsWUFBWSxLQUFnQyxFQUFFO1FBQzFFLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxXQUFXLENBQUUsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbnR5cGUgVERpcmVjdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCdcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcbiAgcHJpdmF0ZSBkaXJlY3Rpb246IFREaXJlY3Rpb25cbiAgcHJpdmF0ZSBwcm9ncmVzczogbnVtYmVyXG4gIGNvbnN0cnVjdG9yICh7b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCd9OiB7b3JpZW50YXRpb24/OiBURGlyZWN0aW9ufSA9IHt9KSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBvcmllbnRhdGlvblxuICAgIHRoaXMucHJvZ3Jlc3MgPSBOYU5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyIGNsYXNzTmFtZT17aXNOYU4odGhpcy5wcm9ncmVzcykgPyAnJyA6ICd2aXNpYmxlJ30+XG4gICAgICAgIDxzcGFuIHN0eWxlPXtgJHt0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ3dpZHRoJyA6ICdoZWlnaHQnfTogJHt0aGlzLnByb2dyZXNzICogMTAwfSVgfT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9pZGUtaGFza2VsbC1wcm9ncmVzcy1iYXI+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAoe29yaWVudGF0aW9uID0gJ2hvcml6b250YWwnfToge29yaWVudGF0aW9uPzogVERpcmVjdGlvbn0gPSB7fSkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gb3JpZW50YXRpb25cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcm9ncmVzcyAocHJvZ3Jlc3M6IG51bWJlcikge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxufVxuIl19