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
        this.setValueInitial();
    }
    setValueInitial() {
        return __awaiter(this, void 0, void 0, function* () {
            this.value = yield this.props.store.getValueRaw(this.props.pluginName, this.props.name);
            this.update();
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0Q7QUFDdEQsNkJBQTRCO0FBVzVCO0lBT0UsWUFBbUIsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNMLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ3pFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsc0JBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENB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b3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmltcG9ydCB7IENvbmZpZ1BhcmFtU3RvcmUgfSBmcm9tICcuL3BhcmFtLXN0b3JlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wczxUPiB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3BlYzogVVBJLklQYXJhbVNwZWM8VD5cbiAgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbn1cblxuZXhwb3J0IGNsYXNzIFBhcmFtQ29udHJvbDxUPiBpbXBsZW1lbnRzIFVQSS5JRWxlbWVudE9iamVjdDxJUHJvcHM8VD4+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgaGlkZGVuVmFsdWU/OiBib29sZWFuXG4gIHByaXZhdGUgdmFsdWU/OiBUXG4gIHByaXZhdGUgc3RvcmVEaXNwb3NhYmxlPzogRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wczxUPikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgKHZhbDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICB9KSxcbiAgICApXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLmJpbmQodGhpcykgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbYGlkZS1oYXNrZWxsLS0ke3RoaXMucHJvcHMucGx1Z2luTmFtZX1gLCBgaWRlLWhhc2tlbGwtcGFyYW0tLSR7dGhpcy5wcm9wcy5uYW1lfWBdXG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHsgY2xhc3NMaXN0LnB1c2goJ2hpZGRlbi12YWx1ZScpIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtIGNsYXNzPXtjbGFzc0xpc3Quam9pbignICcpfSBvbj17eyBjbGljazogYXN5bmMgKCkgPT4gdGhpcy5zZXRWYWx1ZSgpIH19PlxuICAgICAgICA8aWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICAgICAge3RoaXMucHJvcHMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgcGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmUgfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSkgeyB0aGlzLnByb3BzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lIH1cbiAgICAgIGlmIChuYW1lKSB7IHRoaXMucHJvcHMubmFtZSA9IG5hbWUgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5wcm9wcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5wcm9wcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUoZT86IFQpIHtcbiAgICBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLnNldFZhbHVlKHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCBlKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9XG4gICAgICB0aGlzLnByb3BzLnN0b3JlLm9uRGlkVXBkYXRlPFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICB9KVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuc3RvcmVEaXNwb3NhYmxlKVxuICAgIHRoaXMuc2V0VmFsdWVJbml0aWFsKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0VmFsdWVJbml0aWFsKCkge1xuICAgIHRoaXMudmFsdWUgPSBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLmdldFZhbHVlUmF3PFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNwZWMoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSA9IHRoaXMucHJvcHMubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMucHJvcHMubmFtZS5zbGljZSgxKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFRpdGxlKCkge1xuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lfTogJHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZVxuICAgIH1cbiAgfVxufVxuIl19