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
class Button {
    constructor(props) {
        this.props = props;
        etch_1.default.initialize(this);
    }
    render() {
        return (etch_1.default.dom("ide-haskell-button", { class: this.props.active ? 'active' : '', dataset: { caption: this.props.ref, count: this.props.count }, on: { click: this.didClick } }));
    }
    update(props) {
        if (props)
            this.props = props;
        return etch_1.default.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
        });
    }
    didClick() {
        this.toggleActive();
        this.props.emitter.emit('button-clicked', this.props.ref);
    }
    toggleActive() {
        this.props.active = !this.props.active;
        this.update();
    }
    deactivate() {
        this.props.active = false;
        this.update();
    }
    activate() {
        this.props.active = true;
        this.update();
    }
    setCount(count) {
        this.props.count = count;
        this.update();
    }
}
exports.Button = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vdXRwdXQtcGFuZWwvdmlld3Mvb3V0cHV0LXBhbmVsLWJ1dHRvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUE7Ozs7Ozs7Ozs7QUFHWCwrQkFBdUI7QUFFdkI7SUFDRSxZQUFhLEtBQUs7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsY0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxDQUNMLDJDQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsRUFBRSxFQUN4QyxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEVBQzNELEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FDaEMsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUUsS0FBSztRQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQzdCLE1BQU0sQ0FBQyxjQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFSyxPQUFPOztZQUNYLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtRQUN0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUFFLEtBQUs7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztDQUNGO0FBaERELHdCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG4vKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtYnV0dG9uXG4gICAgICAgIGNsYXNzPXt0aGlzLnByb3BzLmFjdGl2ZSA/ICdhY3RpdmUnIDogJyd9XG4gICAgICAgIGRhdGFzZXQ9e3tjYXB0aW9uOiB0aGlzLnByb3BzLnJlZiwgY291bnQ6IHRoaXMucHJvcHMuY291bnR9fVxuICAgICAgICBvbj17e2NsaWNrOiB0aGlzLmRpZENsaWNrfX0vPlxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBkaWRDbGljayAoKSB7XG4gICAgdGhpcy50b2dnbGVBY3RpdmUoKVxuICAgIHRoaXMucHJvcHMuZW1pdHRlci5lbWl0KCdidXR0b24tY2xpY2tlZCcsIHRoaXMucHJvcHMucmVmKVxuICB9XG5cbiAgdG9nZ2xlQWN0aXZlICgpIHtcbiAgICB0aGlzLnByb3BzLmFjdGl2ZSA9ICF0aGlzLnByb3BzLmFjdGl2ZVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMucHJvcHMuYWN0aXZlID0gZmFsc2VcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5hY3RpdmUgPSB0cnVlXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgc2V0Q291bnQgKGNvdW50KSB7XG4gICAgdGhpcy5wcm9wcy5jb3VudCA9IGNvdW50XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG59XG4iXX0=