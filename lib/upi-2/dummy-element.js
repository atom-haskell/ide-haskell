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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtbXktZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91cGktMi9kdW1teS1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtJQUVFLFlBQXFCLElBQStDO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQTJDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFnQixDQUFBO1FBQzFELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNiLENBQUM7SUFFWSxNQUFNLENBQUUsSUFBK0M7O1lBQ2xFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUE7WUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2IsQ0FBQztLQUFBO0lBRU8sSUFBSTtRQUNWLE1BQU0sRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNyRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9DLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDMUMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUF0Q0Qsb0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgRHVtbXlFbGVtZW50IHtcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIG9wdHM6IFVQSS5JQ29udHJvbE9wdHMgJiB7ZWxlbWVudDogSFRNTEVsZW1lbnR9KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gb3B0cy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChvcHRzOiBVUEkuSUNvbnRyb2xPcHRzICYge2VsZW1lbnQ6IEhUTUxFbGVtZW50fSkge1xuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICB0aGlzLmVsZW1lbnQgPSBvcHRzLmVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCAoKSB7XG4gICAgY29uc3Qge2lkLCBldmVudHMsIGNsYXNzZXMsIHN0eWxlLCBhdHRyc30gPSB0aGlzLm9wdHNcbiAgICBpZiAoaWQpIHsgdGhpcy5lbGVtZW50LmlkID0gaWQgfVxuICAgIGlmIChldmVudHMpIHtcbiAgICAgIGZvciAoY29uc3QgZXYgb2YgT2JqZWN0LmtleXMoZXZlbnRzKSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldiwgZXZlbnRzW2V2XSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgIGZvciAoY29uc3QgY2xzIG9mIGNsYXNzZXMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIGZvciAoY29uc3Qgc3Qgb2YgT2JqZWN0LmtleXMoc3R5bGUpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZVtzdF0gPSBzdHlsZVtzdF1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF0dHJzKSB7XG4gICAgICBmb3IgKGNvbnN0IGF0IG9mIE9iamVjdC5rZXlzKGF0dHJzKSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKGF0LCBhdHRyc1thdF0pXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=