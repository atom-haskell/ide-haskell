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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBc0Q7QUFDdEQsNkJBQTRCO0FBVzVCO0lBT0UsWUFBbUIsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQW9GM0IsaUJBQVksR0FBRyxHQUFHLEVBQUU7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUE7WUFDekYsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQXpGQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FDTCxDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBRWhCLElBQUksQ0FBQyxRQUFRLEVBQUUs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b0NBa0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmltcG9ydCB7IENvbmZpZ1BhcmFtU3RvcmUgfSBmcm9tICcuL3BhcmFtLXN0b3JlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wczxUPiB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3BlYzogVVBJLklQYXJhbVNwZWM8VD5cbiAgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbn1cblxuZXhwb3J0IGNsYXNzIFBhcmFtQ29udHJvbDxUPiBpbXBsZW1lbnRzIFVQSS5JRWxlbWVudE9iamVjdDxJUHJvcHM8VD4+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgaGlkZGVuVmFsdWU/OiBib29sZWFuXG4gIHByaXZhdGUgdmFsdWU/OiBUXG4gIHByaXZhdGUgc3RvcmVEaXNwb3NhYmxlPzogRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wczxUPikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgKHZhbDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICB9KSxcbiAgICApXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlIH0pLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnByb3BzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMucHJvcHMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3sgY2xpY2s6IGFzeW5jICgpID0+IHRoaXMuc2V0VmFsdWUoKSB9fT5cbiAgICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgICAgIHt0aGlzLnByb3BzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzPzogSVByb3BzPFQ+KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBjb25zdCB7IHBsdWdpbk5hbWUsIG5hbWUsIHNwZWMsIHN0b3JlIH0gPSBwcm9wc1xuICAgICAgaWYgKHBsdWdpbk5hbWUpIHsgdGhpcy5wcm9wcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZSB9XG4gICAgICBpZiAobmFtZSkgeyB0aGlzLnByb3BzLm5hbWUgPSBuYW1lIH1cbiAgICAgIGlmIChzcGVjICYmIHRoaXMucHJvcHMuc3BlYyAhPT0gc3BlYykge1xuICAgICAgICB0aGlzLnByb3BzLnNwZWMgPSBzcGVjXG4gICAgICAgIHRoaXMuaW5pdFNwZWMoKVxuICAgICAgfVxuICAgICAgaWYgKHN0b3JlICYmIHRoaXMucHJvcHMuc3RvcmUgIT09IHN0b3JlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUgPSBzdG9yZVxuICAgICAgICB0aGlzLmluaXRTdG9yZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlKGU/OiBUKSB7XG4gICAgYXdhaXQgdGhpcy5wcm9wcy5zdG9yZS5zZXRWYWx1ZSh0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSwgZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3RvcmUoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB7IHRoaXMuZGlzcG9zYWJsZXMucmVtb3ZlKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB9XG4gICAgdGhpcy5zdG9yZURpc3Bvc2FibGUgPVxuICAgICAgdGhpcy5wcm9wcy5zdG9yZS5vbkRpZFVwZGF0ZTxUPih0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSwgKHsgdmFsdWUgfSkgPT4ge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLnN0b3JlRGlzcG9zYWJsZSlcbiAgICB0aGlzLnNldFZhbHVlSW5pdGlhbCgpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldFZhbHVlSW5pdGlhbCgpIHtcbiAgICB0aGlzLnZhbHVlID0gYXdhaXQgdGhpcy5wcm9wcy5zdG9yZS5nZXRWYWx1ZVJhdzxUPih0aGlzLnByb3BzLnBsdWdpbk5hbWUsIHRoaXMucHJvcHMubmFtZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTcGVjKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWUgPSB0aGlzLnByb3BzLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnByb3BzLm5hbWUuc2xpY2UoMSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBUaXRsZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGAke3RoaXMucHJvcHMuc3BlYy5kaXNwbGF5TmFtZX06ICR7dGhpcy5wcm9wcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnNwZWMuZGlzcGxheU5hbWVcbiAgICB9XG4gIH1cbn1cbiJdfQ==