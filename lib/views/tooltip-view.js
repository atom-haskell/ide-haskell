'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const etch_1 = require("etch");
const utils_1 = require("../utils");
class TooltipMessage {
    constructor(message) {
        if (Array.isArray(message)) {
            this.message = message.map((m) => etch_1.default.dom("div", { innerHTML: utils_1.MessageObject.fromObject(m).toHtml() }));
        }
        else {
            this.message = [etch_1.default.dom("div", { innerHTML: utils_1.MessageObject.fromObject(message).toHtml() })];
        }
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-tooltip", null, this.message));
    }
    update() {
        return etch_1.default.update(this);
    }
    writeAfterUpdate() {
        this.element.parentElement.classList.add('ide-haskell');
    }
}
exports.TooltipMessage = TooltipMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXdzL3Rvb2x0aXAtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7O0FBR1gsK0JBQXVCO0FBQ3ZCLG9DQUFzQztBQUV0QztJQUNFLFlBQWEsT0FBTztRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyw0QkFBSyxTQUFTLEVBQUUscUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLDRCQUFLLFNBQVMsRUFBRSxxQkFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFBQyxDQUFDO1FBQ2xOLGNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsQ0FDTCxnREFDRyxJQUFJLENBQUMsT0FBTyxDQUNPLENBQ3ZCLENBQUE7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxjQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3pELENBQUM7Q0FDRjtBQXJCRCx3Q0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7TWVzc2FnZU9iamVjdH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yIChtZXNzYWdlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHsgdGhpcy5tZXNzYWdlID0gbWVzc2FnZS5tYXAoKG0pID0+IDxkaXYgaW5uZXJIVE1MPXtNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QobSkudG9IdG1sKCl9Lz4pIH0gZWxzZSB7IHRoaXMubWVzc2FnZSA9IFs8ZGl2IGlubmVySFRNTD17TWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0KG1lc3NhZ2UpLnRvSHRtbCgpfS8+XSB9XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtdG9vbHRpcD5cbiAgICAgICAge3RoaXMubWVzc2FnZX1cbiAgICAgIDwvaWRlLWhhc2tlbGwtdG9vbHRpcD5cbiAgICApXG4gIH1cblxuICB1cGRhdGUgKCkge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgd3JpdGVBZnRlclVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICB9XG59XG4iXX0=