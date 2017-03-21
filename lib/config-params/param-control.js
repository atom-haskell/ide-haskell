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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBb0Q7QUFDcEQsNkJBQTRCO0FBWTVCO0lBYUUsWUFBYSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBWTtRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ2pCLGlDQUFpQyxFQUNqQyxDQUFDLEdBQVk7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7WUFBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNQLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ3pFLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxzQkFBc0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDeEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsQ0FDTCxnQ0FBbUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ2xGLDBDQUNHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDZCxDQUNSLENBQ3JCLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFFLEtBQWlCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLEdBQUcsS0FBSyxDQUFBO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7WUFBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7WUFBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO2dCQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDbEIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRVksUUFBUSxDQUFFLENBQUk7O1lBQ3pCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2YsQ0FBQztLQUFBO0lBRVksT0FBTzs7WUFDbEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDNUIsQ0FBQztLQUFBO0lBRU8sU0FBUztRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsZUFBZTtZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUM7Z0JBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFVLENBQUE7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQU0sQ0FBQTtJQUN0RSxDQUFDO0lBRU8sUUFBUTtRQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRU8sWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtRQUM3RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTFHRCxvQ0EwR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmltcG9ydCB7SVBhcmFtU3BlYywgQ29uZmlnUGFyYW1TdG9yZX0gZnJvbSAnLi9wYXJhbS1zdG9yZSdcbmltcG9ydCB7SUVsZW1lbnRPYmplY3R9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHM8VD4ge1xuICBwbHVnaW5OYW1lOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIHNwZWM6IElQYXJhbVNwZWM8VD5cbiAgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbn1cblxuZXhwb3J0IGNsYXNzIFBhcmFtQ29udHJvbDxUPiBpbXBsZW1lbnRzIElFbGVtZW50T2JqZWN0PElQcm9wczxUPj4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBwbHVnaW5OYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmdcbiAgcHJpdmF0ZSBzcGVjOiBJUGFyYW1TcGVjPFQ+XG4gIHByaXZhdGUgc3RvcmU6IENvbmZpZ1BhcmFtU3RvcmVcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGhpZGRlblZhbHVlPzogYm9vbGVhblxuICAvLyBUT0RPOiBpbml0aWFsaXplZCBpbiBpbml0U3RvcmUuIEZpeCB0aGlzIGluIGxpbnRlclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWQtY2xhc3MtcHJvcGVydGllc1xuICBwcml2YXRlIHZhbHVlOiBUXG4gIHByaXZhdGUgc3RvcmVEaXNwb3NhYmxlPzogRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvciAoe3BsdWdpbk5hbWUsIG5hbWUsIHNwZWMsIHN0b3JlfTogSVByb3BzPFQ+KSB7XG4gICAgdGhpcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZVxuICAgIHRoaXMuc3BlYyA9IHNwZWNcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5zdG9yZSA9IHN0b3JlXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICAgJ2lkZS1oYXNrZWxsLmhpZGVQYXJhbWV0ZXJWYWx1ZXMnLFxuICAgICAgICAgICh2YWw6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHsgdGhpcy51cGRhdGUoKSB9XG4gICAgICAgICAgfSlcbiAgICApXG5cbiAgICB0aGlzLmluaXRTdG9yZSgpXG5cbiAgICB0aGlzLmluaXRTcGVjKClcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHsgdGl0bGU6IHRoaXMudG9vbHRpcFRpdGxlLmJpbmQodGhpcykgfSlcbiAgICApXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyICgpIHtcbiAgICBjb25zdCBjbGFzc0xpc3QgPSBbYGlkZS1oYXNrZWxsLS0ke3RoaXMucGx1Z2luTmFtZX1gLCBgaWRlLWhhc2tlbGwtcGFyYW0tLSR7dGhpcy5uYW1lfWBdXG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHsgY2xhc3NMaXN0LnB1c2goJ2hpZGRlbi12YWx1ZScpIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtIGNsYXNzPXtjbGFzc0xpc3Quam9pbignICcpfSBvbj17e2NsaWNrOiB0aGlzLnNldFZhbHVlLmJpbmQodGhpcyl9fT5cbiAgICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgICAgIHt0aGlzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbT5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlIChwcm9wcz86IElQcm9wczxUPikge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgY29uc3Qge3BsdWdpbk5hbWUsIG5hbWUsIHNwZWMsIHN0b3JlfSA9IHByb3BzXG4gICAgICBpZiAocGx1Z2luTmFtZSkgeyB0aGlzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lIH1cbiAgICAgIGlmIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWUgfVxuICAgICAgaWYgKHNwZWMgJiYgdGhpcy5zcGVjICE9PSBzcGVjKSB7XG4gICAgICAgIHRoaXMuc3BlYyA9IHNwZWNcbiAgICAgICAgdGhpcy5pbml0U3BlYygpXG4gICAgICB9XG4gICAgICBpZiAoc3RvcmUgJiYgdGhpcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlXG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VmFsdWUgKGU6IFQpIHtcbiAgICBhd2FpdCB0aGlzLnN0b3JlLnNldFZhbHVlKHRoaXMucGx1Z2luTmFtZSwgdGhpcy5uYW1lKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3RvcmUgKCkge1xuICAgIGlmICh0aGlzLnN0b3JlRGlzcG9zYWJsZSkgeyB0aGlzLmRpc3Bvc2FibGVzLnJlbW92ZSh0aGlzLnN0b3JlRGlzcG9zYWJsZSkgfVxuICAgIHRoaXMuc3RvcmVEaXNwb3NhYmxlID1cbiAgICAgIHRoaXMuc3RvcmUub25EaWRVcGRhdGUoKHtwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHZhbHVlfSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wbHVnaW5OYW1lID09PSBwbHVnaW5OYW1lICYmIHRoaXMubmFtZSA9PT0gcGFyYW1OYW1lKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlIGFzIFRcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RvcmUuZ2V0VmFsdWVSYXcodGhpcy5wbHVnaW5OYW1lLCB0aGlzLm5hbWUpIGFzIFRcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNwZWMgKCkge1xuICAgIGlmICghdGhpcy5zcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICB0aGlzLnNwZWMuZGlzcGxheU5hbWUgPSB0aGlzLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLm5hbWUuc2xpY2UoMSlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBUaXRsZSAoKSB7XG4gICAgaWYgKHRoaXMuaGlkZGVuVmFsdWUpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnNwZWMuZGlzcGxheU5hbWV9OiAke3RoaXMuc3BlYy5kaXNwbGF5VGVtcGxhdGUodGhpcy52YWx1ZSl9YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGVjLmRpc3BsYXlOYW1lXG4gICAgfVxuICB9XG59XG4iXX0=