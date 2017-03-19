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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBb0Q7QUFDcEQsNkJBQTRCO0FBVzVCO0lBVUUsWUFBYSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBWTtRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNQLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJ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QUFNLEVBQUUsQ0FBQTtnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRU8sUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRU8sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtRQUM3RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQXZHRCxvQ0F1R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmltcG9ydCB7SVBhcmFtU3BlYywgQ29uZmlnUGFyYW1TdG9yZX0gZnJvbSAnLi9wYXJhbS1zdG9yZSdcblxuaW50ZXJmYWNlIElQcm9wczxUPiB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3BlYzogSVBhcmFtU3BlYzxUPlxuICBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxufVxuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sPFQ+IHtcbiAgcHJpdmF0ZSBwbHVnaW5OYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBzcGVjOiBJUGFyYW1TcGVjPGFueT5cbiAgcHJpdmF0ZSBzdG9yZTogQ29uZmlnUGFyYW1TdG9yZVxuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIHByaXZhdGUgaGlkZGVuVmFsdWU/OiBib29sZWFuXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWRcbiAgcHJpdmF0ZSB2YWx1ZT86IFRcbiAgcHJpdmF0ZSBzdG9yZURpc3Bvc2FibGU/OiBEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yICh7cGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmV9OiBJUHJvcHM8VD4pIHtcbiAgICB0aGlzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lXG4gICAgdGhpcy5zcGVjID0gc3BlY1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLnN0b3JlID0gc3RvcmVcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZShcbiAgICAgICAgICAnaWRlLWhhc2tlbGwuaGlkZVBhcmFtZXRlclZhbHVlcycsXG4gICAgICAgICAgKHZhbDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5WYWx1ZSA9IHZhbFxuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkgeyB0aGlzLnVwZGF0ZSgpIH1cbiAgICAgICAgICB9KVxuICAgIClcblxuICAgIHRoaXMuaW5pdFN0b3JlKClcblxuICAgIHRoaXMuaW5pdFNwZWMoKVxuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwgeyB0aXRsZTogdGhpcy50b29sdGlwVGl0bGUuYmluZCh0aGlzKSB9KVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIGNvbnN0IGNsYXNzTGlzdCA9IFtgaWRlLWhhc2tlbGwtLSR7dGhpcy5wbHVnaW5OYW1lfWAsIGBpZGUtaGFza2VsbC1wYXJhbS0tJHt0aGlzLm5hbWV9YF1cbiAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkgeyBjbGFzc0xpc3QucHVzaCgnaGlkZGVuLXZhbHVlJykgfVxuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFyYW0gY2xhc3M9e2NsYXNzTGlzdC5qb2luKCcgJyl9IG9uPXt7Y2xpY2s6IHRoaXMuc2V0VmFsdWUuYmluZCh0aGlzKX19PlxuICAgICAgICA8aWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICAgICAge3RoaXMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9XG4gICAgICAgIDwvaWRlLWhhc2tlbGwtcGFyYW0tdmFsdWU+XG4gICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtPlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgKHByb3BzPzogSVByb3BzPFQ+KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBjb25zdCB7cGx1Z2luTmFtZSwgbmFtZSwgc3BlYywgc3RvcmV9ID0gcHJvcHNcbiAgICAgIGlmIChwbHVnaW5OYW1lKSB7IHRoaXMucGx1Z2luTmFtZSA9IHBsdWdpbk5hbWUgfVxuICAgICAgaWYgKG5hbWUpIHsgdGhpcy5uYW1lID0gbmFtZSB9XG4gICAgICBpZiAoc3BlYyAmJiB0aGlzLnNwZWMgIT09IHNwZWMpIHtcbiAgICAgICAgdGhpcy5zcGVjID0gc3BlY1xuICAgICAgICB0aGlzLmluaXRTcGVjKClcbiAgICAgIH1cbiAgICAgIGlmIChzdG9yZSAmJiB0aGlzLnN0b3JlICE9PSBzdG9yZSkge1xuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmVcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRWYWx1ZSAoZTogVCkge1xuICAgIGF3YWl0IHRoaXMuc3RvcmUuc2V0VmFsdWUodGhpcy5wbHVnaW5OYW1lLCB0aGlzLm5hbWUpXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIGluaXRTdG9yZSAoKSB7XG4gICAgaWYgKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB7IHRoaXMuZGlzcG9zYWJsZXMucmVtb3ZlKHRoaXMuc3RvcmVEaXNwb3NhYmxlKSB9XG4gICAgdGhpcy5zdG9yZURpc3Bvc2FibGUgPVxuICAgICAgdGhpcy5zdG9yZS5vbkRpZFVwZGF0ZSgoe3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdGhpcy5uYW1lID09PSBwYXJhbU5hbWUpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RvcmUuZ2V0VmFsdWVSYXcodGhpcy5wbHVnaW5OYW1lLCB0aGlzLm5hbWUpXG4gIH1cblxuICBwcml2YXRlIGluaXRTcGVjICgpIHtcbiAgICBpZiAoIXRoaXMuc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgdGhpcy5zcGVjLmRpc3BsYXlOYW1lID0gdGhpcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5uYW1lLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwVGl0bGUgKCkge1xuICAgIGlmICh0aGlzLmhpZGRlblZhbHVlKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5zcGVjLmRpc3BsYXlOYW1lfTogJHt0aGlzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3BlYy5kaXNwbGF5TmFtZVxuICAgIH1cbiAgfVxufVxuIl19