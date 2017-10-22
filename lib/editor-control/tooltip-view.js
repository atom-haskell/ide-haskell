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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QjtJQUlFLFlBQVksT0FBa0Q7UUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBSyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUksQ0FBQyxDQUFBO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxrQkFBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUksQ0FBQyxDQUFBO1FBQ3JFLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBRUwsc0NBQ0csSUFBSSxDQUFDLE9BQU8sQ0FDTyxDQUV2QixDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU07O1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLGdCQUFnQjtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7Q0FDRjtBQWhDRCx3Q0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwTWVzc2FnZSB7XG4gIHByaXZhdGUgbWVzc2FnZTogSlNYLkVsZW1lbnRbXVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5pbml0aWFsaXplZFxuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IFVQSS5JTWVzc2FnZU9iamVjdCB8IFVQSS5JTWVzc2FnZU9iamVjdFtdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlLm1hcCgobSkgPT4gPGRpdiBrZXk9e219IGlubmVySFRNTD17bS50b0h0bWwoKX0gLz4pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBbPGRpdiBrZXk9e21lc3NhZ2V9IGlubmVySFRNTD17bWVzc2FnZS50b0h0bWwoKX0gLz5dXG4gICAgfVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgICAgPGlkZS1oYXNrZWxsLXRvb2x0aXA+XG4gICAgICAgIHt0aGlzLm1lc3NhZ2V9XG4gICAgICA8L2lkZS1oYXNrZWxsLXRvb2x0aXA+XG4gICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHdyaXRlQWZ0ZXJVcGRhdGUoKSB7XG4gICAgdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICB9XG59XG4iXX0=