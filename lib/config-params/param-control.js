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
const atom_1 = require("atom");
const etch = require("etch");
class ParamControl {
    constructor(props) {
        this.props = props;
        this.tooltipTitle = () => {
            if (this.hiddenValue) {
                return `${this.props.spec.displayName}: ${this.props.spec.displayTemplate(this.value)}`;
            }
            else {
                return this.props.spec.displayName;
            }
        };
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(atom.config.observe('ide-haskell.hideParameterValues', (val) => {
            this.hiddenValue = val;
            if (this.element) {
                this.update();
            }
        }));
        this.initStore();
        this.initSpec();
        etch.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle }));
    }
    render() {
        const classList = [`ide-haskell--${this.props.pluginName}`, `ide-haskell-param--${this.props.name}`];
        if (this.hiddenValue) {
            classList.push('hidden-value');
        }
        return (etch.dom("ide-haskell-param", { class: classList.join(' '), on: { click: () => __awaiter(this, void 0, void 0, function* () { return this.setValue(); }) } },
            etch.dom("ide-haskell-param-value", null, this.props.spec.displayTemplate(this.value))));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (props) {
                const { pluginName, name, spec, store } = props;
                if (pluginName) {
                    this.props.pluginName = pluginName;
                }
                if (name) {
                    this.props.name = name;
                }
                if (spec && this.props.spec !== spec) {
                    this.props.spec = spec;
                    this.initSpec();
                }
                if (store && this.props.store !== store) {
                    this.props.store = store;
                    this.initStore();
                }
            }
            return etch.update(this);
        });
    }
    setValue(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.store.setValue(this.props.pluginName, this.props.name, e);
            this.update();
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
            this.disposables.dispose();
        });
    }
    initStore() {
        if (this.storeDisposable) {
            this.disposables.remove(this.storeDisposable);
        }
        this.storeDisposable =
            this.props.store.onDidUpdate(this.props.pluginName, this.props.name, ({ value }) => {
                this.value = value;
                this.update();
            });
        this.disposables.add(this.storeDisposable);
        this.setValueInitial();
    }
    setValueInitial() {
        return __awaiter(this, void 0, void 0, function* () {
            this.value = yield this.props.store.getValueRaw(this.props.pluginName, this.props.name);
            return this.update();
        });
    }
    initSpec() {
        if (!this.props.spec.displayName) {
            this.props.spec.displayName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
        }
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0Q7QUFDdEQsNkJBQTRCO0FBWTVCO0lBT0UsWUFBbUIsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQTBGM0IsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUE7WUFDekYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQS9GQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7WUFFdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FDTCxDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBRWhCLElBQUksQ0FBQyxRQUFRLEVBQUUs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Q0FTRjtBQXhHRCxvQ0F3R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuaW1wb3J0IHsgQ29uZmlnUGFyYW1TdG9yZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuZXhwb3J0IGNsYXNzIFBhcmFtQ29udHJvbDxUPiBpbXBsZW1lbnRzIFVQSS5JRWxlbWVudE9iamVjdDxJUHJvcHM8VD4+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgaGlkZGVuVmFsdWU/OiBib29sZWFuXG4gIHByaXZhdGUgdmFsdWU/OiBUXG4gIHByaXZhdGUgc3RvcmVEaXNwb3NhYmxlPzogRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wczxUPikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgKHZhbDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICB9KSxcbiAgICApXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlIH0pLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnByb3BzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMucHJvcHMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3sgY2xpY2s6IGFzeW5jICgpID0+IHRoaXMuc2V0VmFsdWUoKSB9fT5cbiAgICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbT5cbiAgICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgcGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmUgfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSkgeyB0aGlzLnByb3BzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lIH1cbiAgICAgIGlmIChuYW1lKSB7IHRoaXMucHJvcHMubmFtZSA9IG5hbWUgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5wcm9wcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5wcm9wcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUoZT86IFQpIHtcbiAgICBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLnNldFZhbHVlKHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCBlKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9XG4gICAgICB0aGlzLnByb3BzLnN0b3JlLm9uRGlkVXBkYXRlPFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLnN0b3JlRGlzcG9zYWJsZSlcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICB0aGlzLnNldFZhbHVlSW5pdGlhbCgpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldFZhbHVlSW5pdGlhbCgpIHtcbiAgICB0aGlzLnZhbHVlID0gYXdhaXQgdGhpcy5wcm9wcy5zdG9yZS5nZXRWYWx1ZVJhdzxUPih0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSlcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3BlYygpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lID0gdGhpcy5wcm9wcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5wcm9wcy5uYW1lLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWV9OiAke3RoaXMucHJvcHMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lXG4gICAgfVxuICB9XG59XG4iXX0=