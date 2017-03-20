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
class DummyElement {
    constructor(opts) {
        this.opts = opts;
        this.element = opts.element.cloneNode(true);
        this.init();
    }
    update(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.opts = opts;
            this.element.remove();
            this.element = opts.element.cloneNode(true);
            this.init();
        });
    }
    init() {
        const { id, events, classes, style, attrs } = this.opts;
        if (id) {
            this.element.id = id;
        }
        if (events) {
            for (const ev of Object.keys(events)) {
                this.element.addEventListener(ev, events[ev]);
            }
        }
        if (classes) {
            for (const cls of classes) {
                this.element.classList.add(cls);
            }
        }
        if (style) {
            for (const st of Object.keys(style)) {
                this.element.style[st] = style[st];
            }
        }
        if (attrs) {
            for (const at of Object.keys(attrs)) {
                this.element.setAttribute(at, attrs[at]);
            }
        }
    }
}
exports.DummyElement = DummyElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91cGktMi9kdW1teS1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQTtJQUVFLFlBQXFCLElBQTJDO1FBQTNDLFNBQUksR0FBSixJQUFJLENBQXVDO1FBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFnQixDQUFBO1FBQzFELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFWSxNQUFNLENBQUUsSUFBMkM7O1lBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUE7WUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2IsQ0FBQztLQUFBO0lBRU8sSUFBSTtRQUNWLE1BQU0sRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNyRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9DLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF0Q0Qsb0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJQ29udHJvbE9wdHN9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcblxuZXhwb3J0IGNsYXNzIER1bW15RWxlbWVudCB7XG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBvcHRzOiBJQ29udHJvbE9wdHMgJiB7ZWxlbWVudDogSFRNTEVsZW1lbnR9KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gb3B0cy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChvcHRzOiBJQ29udHJvbE9wdHMgJiB7ZWxlbWVudDogSFRNTEVsZW1lbnR9KSB7XG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgIHRoaXMuZWxlbWVudCA9IG9wdHMuZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnRcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0ICgpIHtcbiAgICBjb25zdCB7aWQsIGV2ZW50cywgY2xhc3Nlcywgc3R5bGUsIGF0dHJzfSA9IHRoaXMub3B0c1xuICAgIGlmIChpZCkgeyB0aGlzLmVsZW1lbnQuaWQgPSBpZCB9XG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgZm9yIChjb25zdCBldiBvZiBPYmplY3Qua2V5cyhldmVudHMpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2LCBldmVudHNbZXZdKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgZm9yIChjb25zdCBjbHMgb2YgY2xhc3Nlcykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMpXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdHlsZSkge1xuICAgICAgZm9yIChjb25zdCBzdCBvZiBPYmplY3Qua2V5cyhzdHlsZSkpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3N0XSA9IHN0eWxlW3N0XVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYXR0cnMpIHtcbiAgICAgIGZvciAoY29uc3QgYXQgb2YgT2JqZWN0LmtleXMoYXR0cnMpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXQsIGF0dHJzW2F0XSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==