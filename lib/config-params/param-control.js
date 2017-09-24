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
            this.update();
        });
    }
    initSpec() {
        if (!this.props.spec.displayName) {
            this.props.spec.displayName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
        }
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0Q7QUFDdEQsNkJBQTRCO0FBVzVCO0lBT0UsWUFBbUIsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQW9GM0IsaUJBQVksR0FBRztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtZQUN6RixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUNwQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBekZDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDakIsaUNBQWlDLEVBQ2pDLENBQUMsR0FBWTtZQUNYLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQ0wsQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFZixJQUFJLENBQUMs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b3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuaW1wb3J0IHsgQ29uZmlnUGFyYW1TdG9yZSB9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sPFQ+IGltcGxlbWVudHMgVVBJLklFbGVtZW50T2JqZWN0PElQcm9wczxUPj4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWRcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBoaWRkZW5WYWx1ZT86IGJvb2xlYW5cbiAgcHJpdmF0ZSB2YWx1ZT86IFRcbiAgcHJpdmF0ZSBzdG9yZURpc3Bvc2FibGU/OiBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzPFQ+KSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZShcbiAgICAgICAgJ2lkZS1oYXNrZWxsLmhpZGVQYXJhbWV0ZXJWYWx1ZXMnLFxuICAgICAgICAodmFsOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgdGhpcy5oaWRkZW5WYWx1ZSA9IHZhbFxuICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHsgdGhpcy51cGRhdGUoKSB9XG4gICAgICAgIH0pLFxuICAgIClcblxuICAgIHRoaXMuaW5pdFN0b3JlKClcblxuICAgIHRoaXMuaW5pdFNwZWMoKVxuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwgeyB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbYGlkZS1oYXNrZWxsLS0ke3RoaXMucHJvcHMucGx1Z2luTmFtZX1gLCBgaWRlLWhhc2tlbGwtcGFyYW0tLSR7dGhpcy5wcm9wcy5uYW1lfWBdXG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHsgY2xhc3NMaXN0LnB1c2goJ2hpZGRlbi12YWx1ZScpIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtIGNsYXNzPXtjbGFzc0xpc3Quam9pbignICcpfSBvbj17eyBjbGljazogYXN5bmMgKCkgPT4gdGhpcy5zZXRWYWx1ZSgpIH19PlxuICAgICAgICA8aWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICAgICAge3RoaXMucHJvcHMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHsgcGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmUgfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSkgeyB0aGlzLnByb3BzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lIH1cbiAgICAgIGlmIChuYW1lKSB7IHRoaXMucHJvcHMubmFtZSA9IG5hbWUgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5wcm9wcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5wcm9wcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUoZT86IFQpIHtcbiAgICBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLnNldFZhbHVlKHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCBlKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9XG4gICAgICB0aGlzLnByb3BzLnN0b3JlLm9uRGlkVXBkYXRlPFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lLCAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICB9KVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuc3RvcmVEaXNwb3NhYmxlKVxuICAgIHRoaXMuc2V0VmFsdWVJbml0aWFsKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0VmFsdWVJbml0aWFsKCkge1xuICAgIHRoaXMudmFsdWUgPSBhd2FpdCB0aGlzLnByb3BzLnN0b3JlLmdldFZhbHVlUmF3PFQ+KHRoaXMucHJvcHMucGx1Z2luTmFtZSwgdGhpcy5wcm9wcy5uYW1lKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNwZWMoKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgIHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZSA9IHRoaXMucHJvcHMubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMucHJvcHMubmFtZS5zbGljZSgxKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFRpdGxlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lfTogJHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZVxuICAgIH1cbiAgfVxufVxuIl19