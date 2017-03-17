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
const utils_1 = require("../../utils");
class OutputPanelItem {
    constructor({ model } = {}) {
        this.model = model;
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-panel-item", null,
            this.renderPosition(),
            etch_1.default.dom("ide-haskell-item-description", { innerHTML: utils_1.MessageObject.fromObject(this.model.message).toHtml() })));
    }
    renderPosition() {
        if (this.model.uri && this.model.position) {
            return (etch_1.default.dom("ide-haskell-item-position", { on: { click: this.didClickPosition } },
                this.model.uri,
                ": ",
                this.model.position.row + 1,
                ", ",
                this.model.position.column + 1));
        }
        else
            return null;
    }
    update({ model } = {}) {
        if (model)
            this.model = model;
        return etch_1.default.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
        });
    }
    didClickPosition() {
        atom.workspace.open(this.model.uri).then((editor) => editor.setCursorBufferPosition(this.model.position));
    }
}
exports.OutputPanelItem = OutputPanelItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb3V0cHV0LXBhbmVsL3ZpZXdzL291dHB1dC1wYW5lbC1pdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7Ozs7OztBQUdYLCtCQUF1QjtBQUN2Qix1Q0FBeUM7QUFFekM7SUFDRSxZQUFhLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLENBQ0w7WUFDRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLHFEQUE4QixTQUFTLEVBQUUscUJBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUMxRSxDQUMxQixDQUFBO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLENBQ0wsa0RBQTJCLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7Z0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7Z0JBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7O2dCQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQ3RELENBQzdCLENBQUE7UUFDSCxDQUFDO1FBQUMsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUU7UUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDN0IsTUFBTSxDQUFDLGNBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVLLE9BQU87O1lBQ1gsTUFBTSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUM5QyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUM7Q0FDRjtBQXRDRCwwQ0FzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7TWVzc2FnZU9iamVjdH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5cbmV4cG9ydCBjbGFzcyBPdXRwdXRQYW5lbEl0ZW0ge1xuICBjb25zdHJ1Y3RvciAoe21vZGVsfSA9IHt9KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFuZWwtaXRlbT5cbiAgICAgICAge3RoaXMucmVuZGVyUG9zaXRpb24oKX1cbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tZGVzY3JpcHRpb24gaW5uZXJIVE1MPXtNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodGhpcy5tb2RlbC5tZXNzYWdlKS50b0h0bWwoKX0vPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYW5lbC1pdGVtPlxuICAgIClcbiAgfVxuXG4gIHJlbmRlclBvc2l0aW9uICgpIHtcbiAgICBpZiAodGhpcy5tb2RlbC51cmkgJiYgdGhpcy5tb2RlbC5wb3NpdGlvbikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGlkZS1oYXNrZWxsLWl0ZW0tcG9zaXRpb24gb249e3tjbGljazogdGhpcy5kaWRDbGlja1Bvc2l0aW9ufX0+XG4gICAgICAgICAge3RoaXMubW9kZWwudXJpfToge3RoaXMubW9kZWwucG9zaXRpb24ucm93ICsgMX0sIHt0aGlzLm1vZGVsLnBvc2l0aW9uLmNvbHVtbiArIDF9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtaXRlbS1wb3NpdGlvbj5cbiAgICAgIClcbiAgICB9IGVsc2UgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHVwZGF0ZSAoe21vZGVsfSA9IHt9KSB7XG4gICAgaWYgKG1vZGVsKSB0aGlzLm1vZGVsID0gbW9kZWxcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgZGlkQ2xpY2tQb3NpdGlvbiAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLm1vZGVsLnVyaSkudGhlbigoZWRpdG9yKSA9PlxuICAgICAgZWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uKHRoaXMubW9kZWwucG9zaXRpb24pKVxuICB9XG59XG4iXX0=