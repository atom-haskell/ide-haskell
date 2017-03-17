'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const etch_1 = require("etch");
class ProgressBar {
    constructor({ orientation = 'horizontal' } = {}, children) {
        this.direction = orientation;
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-progress-bar", { className: isNaN(this.progress) ? '' : 'visible' },
            etch_1.default.dom("span", { style: `${this.direction === 'horizontal' ? 'width' : 'height'}: ${this.progress * 100}%` })));
    }
    update({ orientation = 'horizontal' } = {}) {
        this.direction = orientation;
        return etch_1.default.update(this);
    }
    setProgress(progress) {
        this.progress = progress;
        this.update();
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
        });
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9wcm9ncmVzcy1iYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBR1gsK0JBQXVCO0FBRXZCO0lBQ0UsWUFBYSxFQUFDLFdBQVcsR0FBRyxZQUFZLEVBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUTtRQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtRQUM1QixjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLENBQ0wsaURBQTBCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTO1lBQ3hFLDZCQUFNLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssWUFBWSxHQUFHLE9BQU8sR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FDeEYsQ0FDa0IsQ0FDNUIsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUUsRUFBQyxXQUFXLEdBQUcsWUFBWSxFQUFDLEdBQUcsRUFBRTtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQTtRQUM1QixNQUFNLENBQUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsV0FBVyxDQUFFLFFBQVE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVLLE9BQU87O1lBQ1gsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBNUJELGtDQTRCQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG4vKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIge1xuICBjb25zdHJ1Y3RvciAoe29yaWVudGF0aW9uID0gJ2hvcml6b250YWwnfSA9IHt9LCBjaGlsZHJlbikge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gb3JpZW50YXRpb25cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wcm9ncmVzcy1iYXIgY2xhc3NOYW1lPXtpc05hTih0aGlzLnByb2dyZXNzKSA/ICcnIDogJ3Zpc2libGUnfT5cbiAgICAgICAgPHNwYW4gc3R5bGU9e2Ake3RoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnd2lkdGgnIDogJ2hlaWdodCd9OiAke3RoaXMucHJvZ3Jlc3MgKiAxMDB9JWB9PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2lkZS1oYXNrZWxsLXByb2dyZXNzLWJhcj5cbiAgICApXG4gIH1cblxuICB1cGRhdGUgKHtvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJ30gPSB7fSkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gb3JpZW50YXRpb25cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHNldFByb2dyZXNzIChwcm9ncmVzcykge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG59XG4iXX0=