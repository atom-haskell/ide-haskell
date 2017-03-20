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
        return (etch.dom("ide-haskell-param", { class: classList.join(' '), on: { click: this.setValue.bind(this) } },
            etch.dom("ide-haskell-param-value", null, this.spec.displayTemplate(this.value))));
    }
    update(props) {
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
    }
    setValue(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.setValue(this.pluginName, this.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBb0Q7QUFDcEQsNkJBQTRCO0FBVzVCO0lBV0UsWUFBYSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBWTtRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNQLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJ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QUFNLEVBQUUsQ0FBQTtnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRU8sUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRU8sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtRQUM3RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXhHRCxvQ0F3R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmltcG9ydCB7SVBhcmFtU3BlYywgQ29uZmlnUGFyYW1TdG9yZX0gZnJvbSAnLi9wYXJhbS1zdG9yZSdcblxuaW50ZXJmYWNlIElQcm9wczxUPiB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3BlYzogSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sPFQ+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkLWNsYXNzLXByb3BlcnRpZXNcbiAgcHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgcGx1Z2luTmFtZTogc3RyaW5nXG4gIHByaXZhdGUgbmFtZTogc3RyaW5nXG4gIHByaXZhdGUgc3BlYzogSVBhcmFtU3BlYzxhbnk+XG4gIHByaXZhdGUgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGhpZGRlblZhbHVlPzogYm9vbGVhblxuICBwcml2YXRlIHZhbHVlPzogVFxuICBwcml2YXRlIHN0b3JlRGlzcG9zYWJsZT86IERpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IgKHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX06IElQcm9wczxUPikge1xuICAgIHRoaXMucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWVcbiAgICB0aGlzLnNwZWMgPSBzcGVjXG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKFxuICAgICAgICAgICdpZGUtaGFza2VsbC5oaWRlUGFyYW1ldGVyVmFsdWVzJyxcbiAgICAgICAgICAodmFsOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbHVlID0gdmFsXG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7IHRoaXMudXBkYXRlKCkgfVxuICAgICAgICAgIH0pXG4gICAgKVxuXG4gICAgdGhpcy5pbml0U3RvcmUoKVxuXG4gICAgdGhpcy5pbml0U3BlYygpXG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7IHRpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZS5iaW5kKHRoaXMpIH0pXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gW2BpZGUtaGFza2VsbC0tJHt0aGlzLnBsdWdpbk5hbWV9YCwgYGlkZS1oYXNrZWxsLXBhcmFtLS0ke3RoaXMubmFtZX1gXVxuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7IGNsYXNzTGlzdC5wdXNoKCdoaWRkZW4tdmFsdWUnKSB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxpZGUtaGFza2VsbC1wYXJhbSBjbGFzcz17Y2xhc3NMaXN0LmpvaW4oJyAnKX0gb249e3tjbGljazogdGhpcy5zZXRWYWx1ZS5iaW5kKHRoaXMpfX0+XG4gICAgICAgIDxpZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgICAgICB7dGhpcy5zcGVjLmRpc3BsYXlUZW1wbGF0ZSh0aGlzLnZhbHVlKX1cbiAgICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbS12YWx1ZT5cbiAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0+XG4gICAgKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSAocHJvcHM/OiBJUHJvcHM8VD4pIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnN0IHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX0gPSBwcm9wc1xuICAgICAgaWYgKHBsdWdpbk5hbWUpIHsgdGhpcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZSB9XG4gICAgICBpZiAobmFtZSkgeyB0aGlzLm5hbWUgPSBuYW1lIH1cbiAgICAgIGlmIChzcGVjICYmIHRoaXMuc3BlYyAhPT0gc3BlYykge1xuICAgICAgICB0aGlzLnNwZWMgPSBzcGVjXG4gICAgICAgIHRoaXMuaW5pdFNwZWMoKVxuICAgICAgfVxuICAgICAgaWYgKHN0b3JlICYmIHRoaXMuc3RvcmUgIT09IHN0b3JlKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZVxuICAgICAgICB0aGlzLmluaXRTdG9yZSgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFZhbHVlIChlOiBUKSB7XG4gICAgYXdhaXQgdGhpcy5zdG9yZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbk5hbWUsIHRoaXMubmFtZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFN0b3JlICgpIHtcbiAgICBpZiAodGhpcy5zdG9yZURpc3Bvc2FibGUpIHsgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpIH1cbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9XG4gICAgICB0aGlzLnN0b3JlLm9uRGlkVXBkYXRlKCh7cGx1Z2luTmFtZSwgcGFyYW1OYW1lLCB2YWx1ZX0pID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGx1Z2luTmFtZSA9PT0gcGx1Z2luTmFtZSAmJiB0aGlzLm5hbWUgPT09IHBhcmFtTmFtZSkge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0aGlzLnN0b3JlRGlzcG9zYWJsZSlcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zdG9yZS5nZXRWYWx1ZVJhdyh0aGlzLnBsdWdpbk5hbWUsIHRoaXMubmFtZSlcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNwZWMgKCkge1xuICAgIGlmICghdGhpcy5zcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICB0aGlzLnNwZWMuZGlzcGxheU5hbWUgPSB0aGlzLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLm5hbWUuc2xpY2UoMSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBUaXRsZSAoKSB7XG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnNwZWMuZGlzcGxheU5hbWV9OiAke3RoaXMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGVjLmRpc3BsYXlOYW1lXG4gICAgfVxuICB9XG59XG4iXX0=