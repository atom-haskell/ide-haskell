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
    constructor({ pluginName, name, spec, store }) {
        this.pluginName = pluginName;
        this.spec = spec;
        this.name = name;
        this.store = store;
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
        const classList = [`ide-haskell--${this.pluginName}`, `ide-haskell-param--${this.name}`];
        if (this.hiddenValue) {
            classList.push('hidden-value');
        }
        return (etch.dom("ide-haskell-param", { class: classList.join(' '), on: { click: () => __awaiter(this, void 0, void 0, function* () { return this.setValue(); }) } },
            etch.dom("ide-haskell-param-value", null, this.spec.displayTemplate(this.value))));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (props) {
                const { pluginName, name, spec, store } = props;
                if (pluginName) {
                    this.pluginName = pluginName;
                }
                if (name) {
                    this.name = name;
                }
                if (spec && this.spec !== spec) {
                    this.spec = spec;
                    this.initSpec();
                }
                if (store && this.store !== store) {
                    this.store = store;
                    this.initStore();
                }
            }
            return etch.update(this);
        });
    }
    setValue(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.setValue(this.pluginName, this.name, e);
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
            this.store.onDidUpdate(({ pluginName, paramName, value }) => {
                if (this.pluginName === pluginName && this.name === paramName) {
                    this.value = value;
                    this.update();
                }
            });
        this.disposables.add(this.storeDisposable);
        this.value = this.store.getValueRaw(this.pluginName, this.name);
    }
    initSpec() {
        if (!this.spec.displayName) {
            this.spec.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        }
    }
    tooltipTitle() {
        if (this.hiddenValue) {
            return `${this.spec.displayName}: ${this.spec.displayTemplate(this.value)}`;
        }
        else {
            return this.spec.displayName;
        }
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBb0Q7QUFDcEQsNkJBQTRCO0FBWTVCO0lBYUUsWUFBYSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBWTtRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNQLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJ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QUcsS0FBVSxDQUFBO29CQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBQ2YsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFNLENBQUE7SUFDdEUsQ0FBQztJQUVPLFFBQVE7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoRixDQUFDO0lBQ0gsQ0FBQztJQUVPLFlBQVk7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUE7UUFDN0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQzlCLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUExR0Qsb0NBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5pbXBvcnQge0lQYXJhbVNwZWMsIENvbmZpZ1BhcmFtU3RvcmV9IGZyb20gJy4vcGFyYW0tc3RvcmUnXG5pbXBvcnQge0lFbGVtZW50T2JqZWN0fSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzPFQ+IHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBzcGVjOiBJUGFyYW1TcGVjPFQ+XG4gIHN0b3JlOiBDb25maWdQYXJhbVN0b3JlXG59XG5cbmV4cG9ydCBjbGFzcyBQYXJhbUNvbnRyb2w8VD4gaW1wbGVtZW50cyBJRWxlbWVudE9iamVjdDxJUHJvcHM8VD4+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgcGx1Z2luTmFtZTogc3RyaW5nXG4gIHByaXZhdGUgbmFtZTogc3RyaW5nXG4gIHByaXZhdGUgc3BlYzogSVBhcmFtU3BlYzxUPlxuICBwcml2YXRlIHN0b3JlOiBDb25maWdQYXJhbVN0b3JlXG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgcHJpdmF0ZSBoaWRkZW5WYWx1ZT86IGJvb2xlYW5cbiAgLy8gVE9ETzogaW5pdGlhbGl6ZWQgaW4gaW5pdFN0b3JlLiBGaXggdGhpcyBpbiBsaW50ZXJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHJpdmF0ZSB2YWx1ZTogVFxuICBwcml2YXRlIHN0b3JlRGlzcG9zYWJsZT86IERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IgKHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX06IElQcm9wczxUPikge1xuICAgIHRoaXMucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWVcbiAgICB0aGlzLnNwZWMgPSBzcGVjXG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKFxuICAgICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgICAodmFsOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbHVlID0gdmFsXG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICAgIH0pXG4gICAgKVxuXG4gICAgdGhpcy5pbml0U3RvcmUoKVxuXG4gICAgdGhpcy5pbml0U3BlYygpXG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7IHRpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZS5iaW5kKHRoaXMpIH0pXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3tjbGljazogYXN5bmMgKCkgPT4gdGhpcy5zZXRWYWx1ZSgpfX0+XG4gICAgICAgIDxpZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgICAgICB7dGhpcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSAocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX0gPSBwcm9wc1xuICAgICAgaWYgKHBsdWdpbk5hbWUpIHsgdGhpcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZSB9XG4gICAgICBpZiAobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lIH1cbiAgICAgIGlmIChzcGVjICYmIHRoaXMuc3BlYyAhPT0gc3BlYykge1xuICAgICAgICB0aGlzLnNwZWMgPSBzcGVjXG4gICAgICAgIHRoaXMuaW5pdFNwZWMoKVxuICAgICAgfVxuICAgICAgaWYgKHN0b3JlICYmIHRoaXMuc3RvcmUgIT09IHN0b3JlKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZVxuICAgICAgICB0aGlzLmluaXRTdG9yZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlIChlPzogVCkge1xuICAgIGF3YWl0IHRoaXMuc3RvcmUuc2V0VmFsdWUodGhpcy5wbHVnaW5OYW1lLCB0aGlzLm5hbWUsIGUpXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB7IHRoaXMuZGlzcG9zYWJsZXMucmVtb3ZlKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB9XG4gICAgdGhpcy5zdG9yZURpc3Bvc2FibGUgPVxuICAgICAgdGhpcy5zdG9yZS5vbkRpZFVwZGF0ZSgoe3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdGhpcy5uYW1lID09PSBwYXJhbU5hbWUpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWUgYXMgVFxuICAgICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLnN0b3JlRGlzcG9zYWJsZSlcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zdG9yZS5nZXRWYWx1ZVJhdyh0aGlzLnBsdWdpbk5hbWUsIHRoaXMubmFtZSkgYXMgVFxuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3BlYyAoKSB7XG4gICAgaWYgKCF0aGlzLnNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgIHRoaXMuc3BlYy5kaXNwbGF5TmFtZSA9IHRoaXMubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMubmFtZS5zbGljZSgxKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFRpdGxlICgpIHtcbiAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGAke3RoaXMuc3BlYy5kaXNwbGF5TmFtZX06ICR7dGhpcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNwZWMuZGlzcGxheU5hbWVcbiAgICB9XG4gIH1cbn1cbiJdfQ==