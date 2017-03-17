'use babel';
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
const etch_1 = require("etch");
class ParamControl {
    constructor({ pluginName, name, spec, store }, children) {
        this.pluginName = pluginName;
        this.spec = spec;
        this.name = name;
        this.store = store;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(atom.config.observe('ide-haskell.hideParameterValues', (val) => {
            this.hiddenValue = val;
            if (this.element)
                this.update();
        }));
        this.initStore();
        this.initSpec();
        etch_1.default.initialize(this);
        this.disposables.add(atom.tooltips.add(this.element, {
            title: () => {
                if (this.hiddenValue) {
                    return `${this.spec.displayName}: ${this.spec.displayTemplate(this.value)}`;
                }
                else {
                    return this.spec.displayName;
                }
            }
        }));
    }
    initStore() {
        if (this.storeDisposable)
            this.disposables.remove(this.storeDisposable);
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
    render() {
        let classList = [`ide-haskell--${this.pluginName}`, `ide-haskell-param--${this.name}`];
        if (this.hiddenValue) {
            classList.push('hidden-value');
        }
        return (etch_1.default.dom("ide-haskell-param", { class: classList.join(' '), on: { click: this.setValue } },
            etch_1.default.dom("ide-haskell-param-value", null, this.spec.displayTemplate(this.value))));
    }
    update({ pluginName, name, spec, store } = {}) {
        if (pluginName)
            this.pluginName = pluginName;
        if (name)
            this.name = name;
        if (spec && this.spec !== spec) {
            this.spec = spec;
            this.initSpec();
        }
        if (store && this.store !== store) {
            this.store = store;
            this.initStore();
        }
        return etch_1.default.update(this);
    }
    setValue(e) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.setValue(this.pluginName, this.name);
            this.update();
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch_1.default.destroy(this);
            this.disposables.dispose();
            this.pluginName = null;
            this.spec = null;
            this.name = null;
            this.store = null;
            this.value = null;
            this.storeDisposable = null;
        });
    }
}
exports.ParamControl = ParamControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0tY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctcGFyYW1zL3BhcmFtLWNvbnRyb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBR1gsK0JBQXdDO0FBQ3hDLCtCQUF1QjtBQUV2QjtJQUNFLFlBQWEsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRSxRQUFRO1FBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBRWxCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFDbkQsQ0FBQyxHQUFHO1lBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDakMsQ0FBQyxDQUFDLENBQ1AsQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFFZixjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXJCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUM1QjtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLENBQUMsQ0FBQyxJQUFJLENB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QUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUssUUFBUSxDQUFFLENBQUM7O1lBQ2YsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDZixDQUFDO0tBQUE7SUFFSyxPQUFPOztZQUNYLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1lBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO1FBQzdCLENBQUM7S0FBQTtDQUNGO0FBbEdELG9DQWtHQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG4vKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgY2xhc3MgUGFyYW1Db250cm9sIHtcbiAgY29uc3RydWN0b3IgKHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX0sIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5wbHVnaW5OYW1lID0gcGx1Z2luTmFtZVxuICAgIHRoaXMuc3BlYyA9IHNwZWNcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy5zdG9yZSA9IHN0b3JlXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2lkZS1oYXNrZWxsLmhpZGVQYXJhbWV0ZXJWYWx1ZXMnLFxuICAgICAgICAgICh2YWwpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuVmFsdWUgPSB2YWxcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQpIHRoaXMudXBkYXRlKClcbiAgICAgICAgICB9KVxuICAgIClcblxuICAgIHRoaXMuaW5pdFN0b3JlKClcblxuICAgIHRoaXMuaW5pdFNwZWMoKVxuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5zcGVjLmRpc3BsYXlOYW1lfTogJHt0aGlzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfWBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwZWMuZGlzcGxheU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApXG4gIH1cblxuICBpbml0U3RvcmUgKCkge1xuICAgIGlmICh0aGlzLnN0b3JlRGlzcG9zYWJsZSkgdGhpcy5kaXNwb3NhYmxlcy5yZW1vdmUodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgdGhpcy5zdG9yZURpc3Bvc2FibGUgPVxuICAgICAgdGhpcy5zdG9yZS5vbkRpZFVwZGF0ZSgoe3BsdWdpbk5hbWUsIHBhcmFtTmFtZSwgdmFsdWV9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbk5hbWUgPT09IHBsdWdpbk5hbWUgJiYgdGhpcy5uYW1lID09PSBwYXJhbU5hbWUpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5zdG9yZURpc3Bvc2FibGUpXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RvcmUuZ2V0VmFsdWVSYXcodGhpcy5wbHVnaW5OYW1lLCB0aGlzLm5hbWUpXG4gIH1cblxuICBpbml0U3BlYyAoKSB7XG4gICAgaWYgKCF0aGlzLnNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgIHRoaXMuc3BlYy5kaXNwbGF5TmFtZSA9IHRoaXMubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMubmFtZS5zbGljZSgxKVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgbGV0IGNsYXNzTGlzdCA9IFtgaWRlLWhhc2tlbGwtLSR7dGhpcy5wbHVnaW5OYW1lfWAsIGBpZGUtaGFza2VsbC1wYXJhbS0tJHt0aGlzLm5hbWV9YF1cbiAgICBpZiAodGhpcy5oaWRkZW5WYWx1ZSkgeyBjbGFzc0xpc3QucHVzaCgnaGlkZGVuLXZhbHVlJykgfVxuICAgIHJldHVybiAoXG4gICAgICA8aWRlLWhhc2tlbGwtcGFyYW0gY2xhc3M9e2NsYXNzTGlzdC5qb2luKCcgJyl9IG9uPXt7Y2xpY2s6IHRoaXMuc2V0VmFsdWV9fT5cbiAgICAgICAgPGlkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgICAgIHt0aGlzLnNwZWMuZGlzcGxheVRlbXBsYXRlKHRoaXMudmFsdWUpfVxuICAgICAgICA8L2lkZS1oYXNrZWxsLXBhcmFtLXZhbHVlPlxuICAgICAgPC9pZGUtaGFza2VsbC1wYXJhbT5cbiAgICApXG4gIH1cblxuICB1cGRhdGUgKHtwbHVnaW5OYW1lLCBuYW1lLCBzcGVjLCBzdG9yZX0gPSB7fSkge1xuICAgIGlmIChwbHVnaW5OYW1lKSB0aGlzLnBsdWdpbk5hbWUgPSBwbHVnaW5OYW1lXG4gICAgaWYgKG5hbWUpIHRoaXMubmFtZSA9IG5hbWVcbiAgICBpZiAoc3BlYyAmJiB0aGlzLnNwZWMgIT09IHNwZWMpIHtcbiAgICAgIHRoaXMuc3BlYyA9IHNwZWNcbiAgICAgIHRoaXMuaW5pdFNwZWMoKVxuICAgIH1cbiAgICBpZiAoc3RvcmUgJiYgdGhpcy5zdG9yZSAhPT0gc3RvcmUpIHtcbiAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZVxuICAgICAgdGhpcy5pbml0U3RvcmUoKVxuICAgIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIGFzeW5jIHNldFZhbHVlIChlKSB7XG4gICAgYXdhaXQgdGhpcy5zdG9yZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbk5hbWUsIHRoaXMubmFtZSlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMucGx1Z2luTmFtZSA9IG51bGxcbiAgICB0aGlzLnNwZWMgPSBudWxsXG4gICAgdGhpcy5uYW1lID0gbnVsbFxuICAgIHRoaXMuc3RvcmUgPSBudWxsXG4gICAgdGhpcy52YWx1ZSA9IG51bGxcbiAgICB0aGlzLnN0b3JlRGlzcG9zYWJsZSA9IG51bGxcbiAgfVxufVxuIl19