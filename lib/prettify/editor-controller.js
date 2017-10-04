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
const index_1 = require("./index");
class PrettifyEditorController {
    constructor(editor, pluginManager) {
        this.editor = editor;
        this.disposables = new atom_1.CompositeDisposable();
        this.isPretty = false;
        this.prettify = () => __awaiter(this, void 0, void 0, function* () {
            if (atom.config.get('ide-haskell.onSavePrettify', { scope: this.editor.getRootScopeDescriptor() })) {
                if (this.isPretty) {
                    return;
                }
                this.isPretty = true;
                try {
                    const format = this.editor.getGrammar().scopeName.replace(/\./g, '*');
                    const enabled = atom.config.get('ide-haskell.onSavePrettifyFormats', { scope: this.editor.getRootScopeDescriptor() });
                    if (!enabled[format]) {
                        return;
                    }
                    yield index_1.prettifyFile(this.editor);
                    yield this.editor.getBuffer().save();
                }
                finally {
                    this.isPretty = false;
                }
            }
        });
        const buffer = this.editor.getBuffer();
        this.disposables.add(buffer.onWillSave(this.prettify));
    }
    static supportsGrammar(grammar) {
        return [
            'source.c2hs',
            'source.cabal',
            'source.hsc2hs',
            'source.haskell',
            'text.tex.latex.haskell',
            'source.hsig',
        ].includes(grammar);
    }
    destroy() {
        this.disposables.dispose();
    }
}
exports.PrettifyEditorController = PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBS3RDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUF1QnpCLGFBQVEsR0FBRyxHQUFTLEVBQUU7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQTtnQkFBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDcEIsSUFBSSxDQUFDO29CQUNILE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7b0JBQ3JFLE1BQU0sT0FBTyxHQUF3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbEQsbUNBQW1DLEVBQ25DLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxDQUM5QyxDQUFBO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUE7b0JBQUMsQ0FBQztvQkFDakMsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN0QyxDQUFDO3dCQUFTLENBQUM7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7Z0JBQ3ZCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFBLENBQUE7UUF0Q0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2pDLENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBRSxPQUFlO1FBQzVDLE1BQU0sQ0FBQztZQUNMLGFBQWE7WUFDYixjQUFjO1lBQ2QsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQix3QkFBd0I7WUFDeEIsYUFBYTtTQUNkLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBb0JGO0FBM0NELDREQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFRleHRFZGl0b3IsIENvbXBvc2l0ZURpc3Bvc2FibGUsXG59IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBwcmV0dGlmeUZpbGUgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuXG50eXBlIFNhdmVQcmV0dGlmeUZvcm1hdHMgPSB7W0sgaW4ga2V5b2YgdHlwZW9mIGNvbmZpZy5vblNhdmVQcmV0dGlmeUZvcm1hdHMucHJvcGVydGllc106IGJvb2xlYW59XG5cbmV4cG9ydCBjbGFzcyBQcmV0dGlmeUVkaXRvckNvbnRyb2xsZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIGlzUHJldHR5OiBib29sZWFuID0gZmFsc2VcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yLCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGJ1ZmZlci5vbldpbGxTYXZlKHRoaXMucHJldHRpZnkpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNHcmFtbWFyIChncmFtbWFyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3NvdXJjZS5jMmhzJyxcbiAgICAgICdzb3VyY2UuY2FiYWwnLCAvLyBOT1RFOiBzcGVjaWFsIGNhc2VcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcmV0dGlmeSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeScsIHtzY29wZTogdGhpcy5lZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpfSkpIHtcbiAgICAgIGlmICh0aGlzLmlzUHJldHR5KSB7IHJldHVybiB9XG4gICAgICB0aGlzLmlzUHJldHR5ID0gdHJ1ZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgICBjb25zdCBlbmFibGVkOiBTYXZlUHJldHRpZnlGb3JtYXRzID0gYXRvbS5jb25maWcuZ2V0KFxuICAgICAgICAgICdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeUZvcm1hdHMnLFxuICAgICAgICAgIHtzY29wZTogdGhpcy5lZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpfSxcbiAgICAgICAgKVxuICAgICAgICBpZiAoISBlbmFibGVkW2Zvcm1hdF0pIHsgcmV0dXJuIH1cbiAgICAgICAgYXdhaXQgcHJldHRpZnlGaWxlKHRoaXMuZWRpdG9yKVxuICAgICAgICBhd2FpdCB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKS5zYXZlKClcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNQcmV0dHkgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19