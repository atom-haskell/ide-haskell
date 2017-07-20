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
        this.disposables.add(atom.tooltips.add(this.element, { title: this.tooltipTitle.bind(this) }));
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
        this.value = this.props.store.getValueRaw(this.props.pluginName, this.props.name);
    }
    initSpec() {
        if (!this.props.spec.displayName) {
            this.props.spec.displayName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
        }
    }
    tooltipTitle() {
        if (this.hiddenValue) {
            return `${this.props.spec.displayName}: ${this.props.spec.displayTemplate(this.value)}`;
        }
        else {
            return this.props.spec.displayName;
        }
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBb0Q7QUFDcEQsNkJBQTRCO0FBVzVCO0lBT0UsWUFBb0IsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNQLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ3pFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsc0JBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENB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QUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RixDQUFDO0lBRU8sUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsRyxDQUFDO0lBQ0gsQ0FBQztJQUVPLFlBQVk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtRQUN6RixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUE3RkQsb0NBNkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5pbXBvcnQge0NvbmZpZ1BhcmFtU3RvcmV9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sPFQ+IGltcGxlbWVudHMgVVBJLklFbGVtZW50T2JqZWN0PElQcm9wczxUPj4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGhpZGRlblZhbHVlPzogYm9vbGVhblxuICBwcml2YXRlIHZhbHVlPzogVFxuICBwcml2YXRlIHN0b3JlRGlzcG9zYWJsZT86IERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzPFQ+KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKFxuICAgICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgICAodmFsOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbHVlID0gdmFsXG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICAgIH0pXG4gICAgKVxuXG4gICAgdGhpcy5pbml0U3RvcmUoKVxuXG4gICAgdGhpcy5pbml0U3BlYygpXG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7IHRpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZS5iaW5kKHRoaXMpIH0pXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnByb3BzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMucHJvcHMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3tjbGljazogYXN5bmMgKCkgPT4gdGhpcy5zZXRWYWx1ZSgpfX0+XG4gICAgICAgIDxpZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX0gPSBwcm9wc1xuICAgICAgaWYgKHBsdWdpbk5hbWUpIHsgdGhpcy5wcm9wcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZSB9XG4gICAgICBpZiAobmFtZSkgeyB0aGlzLnByb3BzLm5hbWUgPSBuYW1lIH1cbiAgICAgIGlmIChzcGVjICYmIHRoaXMucHJvcHMuc3BlYyAhPT0gc3BlYykge1xuICAgICAgICB0aGlzLnByb3BzLnNwZWMgPSBzcGVjXG4gICAgICAgIHRoaXMuaW5pdFNwZWMoKVxuICAgICAgfVxuICAgICAgaWYgKHN0b3JlICYmIHRoaXMucHJvcHMuc3RvcmUgIT09IHN0b3JlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUgPSBzdG9yZVxuICAgICAgICB0aGlzLmluaXRTdG9yZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlIChlPzogVCkge1xuICAgIGF3YWl0IHRoaXMucHJvcHMuc3RvcmUuc2V0VmFsdWUodGhpcy5wcm9wcy5wbHVnaW5OYW1lLCB0aGlzLnByb3BzLm5hbWUsIGUpXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB7IHRoaXMuZGlzcG9zYWJsZXMucmVtb3ZlKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB9XG4gICAgdGhpcy5zdG9yZURpc3Bvc2FibGUgPVxuICAgICAgdGhpcy5wcm9wcy5zdG9yZS5vbkRpZFVwZGF0ZTxUPih0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSwgKHt2YWx1ZX0pID0+IHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgIH0pXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucHJvcHMuc3RvcmUuZ2V0VmFsdWVSYXc8VD4odGhpcy5wcm9wcy5wbHVnaW5OYW1lLCB0aGlzLnByb3BzLm5hbWUpXG4gIH1cblxuICBwcml2YXRlIGluaXRTcGVjICgpIHtcbiAgICBpZiAoIXRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lID0gdGhpcy5wcm9wcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5wcm9wcy5uYW1lLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgKCkge1xuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lfTogJHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZVxuICAgIH1cbiAgfVxufVxuIl19