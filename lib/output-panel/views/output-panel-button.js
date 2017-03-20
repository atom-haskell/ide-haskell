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
class Button {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-button", { class: this.props.active ? 'active' : '', dataset: { caption: this.props.ref, count: this.props.count }, on: { click: this.didClick.bind(this) } }));
    }
    update(props) {
        if (props) {
            this.props = props;
        }
        return etch.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
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
    getCount() {
        return this.props.count;
    }
    didClick() {
        this.toggleActive();
        this.props.emitter.emit('button-clicked', this.props.ref);
    }
}
exports.Button = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vdXRwdXQtcGFuZWwvdmlld3Mvb3V0cHV0LXBhbmVsLWJ1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQVU1QjtJQUNFLFlBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxpQ0FDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEVBQUUsRUFDeEMsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxFQUMzRCxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUMzQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUE7UUFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFFBQVEsQ0FBRSxLQUFhO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUN6QixDQUFDO0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0NBQ0Y7QUFuREQsd0JBbURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHtFbWl0dGVyfSBmcm9tICdhdG9tJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XG4gIGFjdGl2ZTogYm9vbGVhblxuICByZWY6IHN0cmluZ1xuICBjb3VudDogbnVtYmVyXG4gIGVtaXR0ZXI6IEVtaXR0ZXJcbn1cblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1idXR0b25cbiAgICAgICAgY2xhc3M9e3RoaXMucHJvcHMuYWN0aXZlID8gJ2FjdGl2ZScgOiAnJ31cbiAgICAgICAgZGF0YXNldD17e2NhcHRpb246IHRoaXMucHJvcHMucmVmLCBjb3VudDogdGhpcy5wcm9wcy5jb3VudH19XG4gICAgICAgIG9uPXt7Y2xpY2s6IHRoaXMuZGlkQ2xpY2suYmluZCh0aGlzKX19Lz5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wcz86IElQcm9wcykge1xuICAgIGlmIChwcm9wcykgeyB0aGlzLnByb3BzID0gcHJvcHMgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZUFjdGl2ZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5hY3RpdmUgPSAhdGhpcy5wcm9wcy5hY3RpdmVcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5hY3RpdmUgPSB0cnVlXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIHNldENvdW50IChjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9wcy5jb3VudCA9IGNvdW50XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGdldENvdW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jb3VudFxuICB9XG5cbiAgcHJpdmF0ZSBkaWRDbGljayAoKSB7XG4gICAgdGhpcy50b2dnbGVBY3RpdmUoKVxuICAgIHRoaXMucHJvcHMuZW1pdHRlci5lbWl0KCdidXR0b24tY2xpY2tlZCcsIHRoaXMucHJvcHMucmVmKVxuICB9XG59XG4iXX0=