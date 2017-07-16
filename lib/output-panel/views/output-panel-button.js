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
        return (etch.dom("ide-haskell-button", { class: this.props.active ? 'active' : '', dataset: { caption: this.props.name, count: this.props.count }, on: { click: this.props.onClick } }));
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
}
exports.Button = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vdXRwdXQtcGFuZWwvdmlld3Mvb3V0cHV0LXBhbmVsLWJ1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQVM1QjtJQUNFLFlBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsQ0FDTCxpQ0FDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEVBQUUsRUFDeEMsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxFQUM1RCxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUNyQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQXRCRCx3QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIHtcbiAgYWN0aXZlOiBib29sZWFuXG4gIG5hbWU6IHN0cmluZ1xuICBjb3VudDogbnVtYmVyXG4gIG9uQ2xpY2s6ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yIChwdWJsaWMgcHJvcHM6IElQcm9wcykge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1idXR0b25cbiAgICAgICAgY2xhc3M9e3RoaXMucHJvcHMuYWN0aXZlID8gJ2FjdGl2ZScgOiAnJ31cbiAgICAgICAgZGF0YXNldD17e2NhcHRpb246IHRoaXMucHJvcHMubmFtZSwgY291bnQ6IHRoaXMucHJvcHMuY291bnR9fVxuICAgICAgICBvbj17e2NsaWNrOiB0aGlzLnByb3BzLm9uQ2xpY2t9fS8+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAocHJvcHM/OiBJUHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHsgdGhpcy5wcm9wcyA9IHByb3BzIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgfVxufVxuIl19