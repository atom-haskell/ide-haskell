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
export class ProgressBar {
    constructor({ orientation = 'horizontal' } = {}, children) {
        this.direction = orientation;
        etch.initialize(this);
    }
    render() {
        return (etch.dom("ide-haskell-progress-bar", { className: isNaN(this.progress) ? '' : 'visible' },
            etch.dom("span", { style: `${this.direction === 'horizontal' ? 'width' : 'height'}: ${this.progress * 100}%` })));
    }
    update({ orientation = 'horizontal' } = {}) {
        this.direction = orientation;
        return etch.update(this);
    }
    setProgress(progress) {
        this.progress = progress;
        this.update();
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield etch.destroy(this);
        });
    }
}
