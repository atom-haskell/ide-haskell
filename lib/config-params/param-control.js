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
            const displayName = this.props.spec.displayName || 'Undefined name';
            if (this.hiddenValue) {
                return `${displayName}: ${this.props.spec.displayTemplate(this.value)}`;
            }
            else {
                return displayName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0Q7QUFDdEQsNkJBQTRCO0FBYTVCO0lBT0UsWUFBbUIsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQTBGM0IsaUJBQVksR0FBRyxHQUFXLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLGdCQUFnQixDQUFBO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFBO1lBQ3pFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsV0FBVyxDQUFBO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFoR0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFFNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNqQixpQ0FBaUMsRUFDakMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQ0wsQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENB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QUM7SUFDSCxDQUFDO0NBVUY7QUF6R0Qsb0NBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuaW1wb3J0IHsgQ29uZmlnUGFyYW1TdG9yZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuZXhwb3J0IGNsYXNzIFBhcmFtQ29udHJvbDxUPiBpbXBsZW1lbnRzIFVQSS5JRWxlbWVudE9iamVjdDxJUHJvcHM8VD4+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgaGlkZGVuVmFsdWU/OiBib29sZWFuXG4gIHByaXZhdGUgdmFsdWU/OiBUXG4gIHByaXZhdGUgc3RvcmVEaXNwb3NhYmxlPzogRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wczxUPikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgKHZhbDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICB9KSxcbiAgICApXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlIH0pLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnByb3BzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMucHJvcHMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3sgY2xpY2s6IGFzeW5jICgpID0+IHRoaXMuc2V0VmFsdWUoKSB9fT5cbiAgICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbT5cbiAgICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgcGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmUgfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSkgeyB0aGlzLnByb3BzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lIH1cbiAgICAgIGlmIChuYW1lKSB7IHRoaXMucHJvcHMubmFtZSA9IG5hbWUgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5wcm9wcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5wcm9wcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUoZT86IFQpIHtcbiAgICBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLnNldFZhbHVlKHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCBlKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9XG4gICAgICB0aGlzLnByb3BzLnN0b3JlLm9uRGlkVXBkYXRlPFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLnN0b3JlRGlzcG9zYWJsZSlcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICB0aGlzLnNldFZhbHVlSW5pdGlhbCgpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldFZhbHVlSW5pdGlhbCgpIHtcbiAgICB0aGlzLnZhbHVlID0gYXdhaXQgdGhpcy5wcm9wcy5zdG9yZS5nZXRWYWx1ZVJhdzxUPih0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSlcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3BlYygpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lID0gdGhpcy5wcm9wcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5wcm9wcy5uYW1lLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgPSAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSB8fCAnVW5kZWZpbmVkIG5hbWUnXG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHtcbiAgICAgIHJldHVybiBgJHtkaXNwbGF5TmFtZX06ICR7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkaXNwbGF5TmFtZVxuICAgIH1cbiAgfVxufVxuIl19