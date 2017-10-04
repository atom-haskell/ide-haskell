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
class TooltipMessage {
    constructor(message) {
        if (Array.isArray(message)) {
            this.message = message.map((m) => etch.dom("div", { key: m, innerHTML: m.toHtml() }));
        }
        else {
            this.message = [etch.dom("div", { key: message, innerHTML: message.toHtml() })];
        }
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-tooltip", null, this.message));
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            return etch.update(this);
        });
    }
    writeAfterUpdate() {
        this.element.parentElement && this.element.parentElement.classList.add('ide-haskell');
    }
}
exports.TooltipMessage = TooltipMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QjtJQUlFLFlBQVksT0FBa0Q7UUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUksQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxrQkFBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUksQ0FBQyxDQUFBO1FBQ3JFLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsc0NBQ0csSUFBSSxDQUFDLE9BQU8sQ0FDTyxDQUN2QixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU07O1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLGdCQUFnQjtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7Q0FDRjtBQTVCRCx3Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwTWVzc2FnZSB7XG4gIHByaXZhdGUgbWVzc2FnZTogSlNYLkVsZW1lbnRbXVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZFxuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IFVQSS5JTWVzc2FnZU9iamVjdCB8IFVQSS5JTWVzc2FnZU9iamVjdFtdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UubWFwKChtKSA9PiA8ZGl2IGtleT17bX0gaW5uZXJIVE1MPXttLnRvSHRtbCgpfSAvPilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlID0gWzxkaXYga2V5PXttZXNzYWdlfSBpbm5lckhUTUw9e21lc3NhZ2UudG9IdG1sKCl9IC8+XVxuICAgIH1cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC10b29sdGlwPlxuICAgICAgICB7dGhpcy5tZXNzYWdlfVxuICAgICAgPC9pZGUtaGFza2VsbC10b29sdGlwPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgd3JpdGVBZnRlclVwZGF0ZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudCAmJiB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG4gIH1cbn1cbiJdfQ==