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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUU1QjtJQUlFLFlBQVksT0FBa0Q7UUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLGtCQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBSSxDQUFDLENBQUE7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLGtCQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBSSxDQUFDLENBQUE7UUFDckUsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxzQ0FDRyxJQUFJLENBQUMsT0FBTyxDQUNPLENBQ3ZCLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTTs7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU0sZ0JBQWdCO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdkYsQ0FBQztDQUNGO0FBNUJELHdDQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBNZXNzYWdlIHtcbiAgcHJpdmF0ZSBtZXNzYWdlOiBKU1guRWxlbWVudFtdXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bmluaXRpYWxpemVkXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgY29uc3RydWN0b3IobWVzc2FnZTogVVBJLklNZXNzYWdlT2JqZWN0IHwgVVBJLklNZXNzYWdlT2JqZWN0W10pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZS5tYXAoKG0pID0+IDxkaXYga2V5PXttfSBpbm5lckhUTUw9e20udG9IdG1sKCl9IC8+KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBbPGRpdiBrZXk9e21lc3NhZ2V9IGlubmVySFRNTD17bWVzc2FnZS50b0h0bWwoKX0gLz5dXG4gICAgfVxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXRvb2x0aXA+XG4gICAgICAgIHt0aGlzLm1lc3NhZ2V9XG4gICAgICA8L2lkZS1oYXNrZWxsLXRvb2x0aXA+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZUFmdGVyVXBkYXRlKCkge1xuICAgIHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgfVxufVxuIl19