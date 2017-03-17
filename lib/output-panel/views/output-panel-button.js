'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import etch from 'etch';
export class Button {
    constructor(props) {
        this.props = props;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-button", { class: this.props.active ? 'active' : '', dataset: { caption: this.props.ref, count: this.props.count }, on: { click: this.didClick } }));
    }
    update(props) {
        if (props)
            this.props = props;
        return etch.update(this);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
    didClick() {
        this.toggleActive();
        this.props.emitter.emit('button-clicked', this.props.ref);
    }
    toggleActive() {
        this.props.active = !this.props.active;
        this.update();
    }
    deactivate() {
        this.props.active = false;
        this.update();
    }
    activate() {
        this.props.active = true;
        this.update();
    }
    setCount(count) {
        this.props.count = count;
        this.update();
    }
}
