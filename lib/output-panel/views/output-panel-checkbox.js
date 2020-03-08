"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const etch = require("etch");
class OutputPanelCheckbox {
    constructor(props) {
        this.props = props;
        this.tooltipTitle = () => {
            if (this.props.state) {
                return this.props.enabledHint;
            }
            else {
                return this.props.disabledHint;
            }
        };
        this.disposables = new atom_1.CompositeDisposable();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle }));
    }
    render() {
        return (etch.dom("ide-haskell-checkbox", { class: `${this.props.class}${this.props.state ? ' enabled' : ''}`, on: { click: this.props.onSwitched } }));
    }
    async update(props = {}) {
        this.props = Object.assign(Object.assign({}, this.props), props);
        return etch.update(this);
    }
    async destroy() {
        await etch.destroy(this);
        this.disposables.dispose();
    }
}
exports.OutputPanelCheckbox = OutputPanelCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LXBhbmVsLWNoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL291dHB1dC1wYW5lbC92aWV3cy9vdXRwdXQtcGFuZWwtY2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTBDO0FBQzFDLDZCQUE0QjtBQVU1QixNQUFhLG1CQUFtQjtJQUc5QixZQUFtQixLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQTJCeEIsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQTthQUM5QjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFBO2FBQy9CO1FBQ0gsQ0FBQyxDQUFBO1FBaENDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQzlELENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sQ0FDTCxtQ0FDRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFDakUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQ3BDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQXlCLEVBQUU7UUFDN0MsSUFBSSxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssR0FBSyxLQUFLLENBQUUsQ0FBQTtRQUN4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FTRjtBQXJDRCxrREFxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICBzdGF0ZTogYm9vbGVhblxuICBjbGFzczogc3RyaW5nXG4gIG9uU3dpdGNoZWQ6ICgpID0+IHZvaWRcbiAgZW5hYmxlZEhpbnQ6IHN0cmluZ1xuICBkaXNhYmxlZEhpbnQ6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgT3V0cHV0UGFuZWxDaGVja2JveCBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgZWxlbWVudCE6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwgeyB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLWNoZWNrYm94XG4gICAgICAgIGNsYXNzPXtgJHt0aGlzLnByb3BzLmNsYXNzfSR7dGhpcy5wcm9wcy5zdGF0ZSA/ICcgZW5hYmxlZCcgOiAnJ31gfVxuICAgICAgICBvbj17eyBjbGljazogdGhpcy5wcm9wcy5vblN3aXRjaGVkIH19XG4gICAgICAvPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IFBhcnRpYWw8SVByb3BzPiA9IHt9KSB7XG4gICAgdGhpcy5wcm9wcyA9IHsgLi4udGhpcy5wcm9wcywgLi4ucHJvcHMgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFRpdGxlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnN0YXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5lbmFibGVkSGludFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNhYmxlZEhpbnRcbiAgICB9XG4gIH1cbn1cbiJdfQ==