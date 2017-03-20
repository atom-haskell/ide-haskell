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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2QkFBNEI7QUFJNUI7SUFHRSxZQUFhLEVBQUMsV0FBVyxHQUFHLFlBQVksS0FBZ0MsRUFBRTtRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQTtRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsdUNBQTBCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ3hFLG1CQUFNLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxHQUFHLE9BQU8sR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FDeEYsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUUsRUFBQyxXQUFXLEdBQUcsWUFBWSxLQUFnQyxFQUFFO1FBQzFFLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxXQUFXLENBQUUsUUFBZ0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCB0eXBlIFREaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnXG5cbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG4gIHByaXZhdGUgZGlyZWN0aW9uOiBURGlyZWN0aW9uXG4gIHByaXZhdGUgcHJvZ3Jlc3M6IG51bWJlclxuICBjb25zdHJ1Y3RvciAoe29yaWVudGF0aW9uID0gJ2hvcml6b250YWwnfToge29yaWVudGF0aW9uPzogVERpcmVjdGlvbn0gPSB7fSkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gb3JpZW50YXRpb25cbiAgICB0aGlzLnByb2dyZXNzID0gTmFOXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXByb2dyZXNzLWJhciBjbGFzc05hbWU9e2lzTmFOKHRoaXMucHJvZ3Jlc3MpID8gJycgOiAndmlzaWJsZSd9PlxuICAgICAgICA8c3BhbiBzdHlsZT17YCR7dGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICd3aWR0aCcgOiAnaGVpZ2h0J306ICR7dGhpcy5wcm9ncmVzcyAqIDEwMH0lYH0+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcHJvZ3Jlc3MtYmFyPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKHtvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJ306IHtvcmllbnRhdGlvbj86IFREaXJlY3Rpb259ID0ge30pIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IG9yaWVudGF0aW9uXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgc2V0UHJvZ3Jlc3MgKHByb2dyZXNzOiBudW1iZXIpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3NcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cbn1cbiJdfQ==