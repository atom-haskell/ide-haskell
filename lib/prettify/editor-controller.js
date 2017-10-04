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
                const format = this.editor.getGrammar().scopeName.replace(/\./g, '*');
                const enabled = atom.config.get('ide-haskell.onSavePrettifyFormats', { scope: this.editor.getRootScopeDescriptor() });
                if (!enabled[format]) {
                    return;
                }
                try {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBR3RDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUF1QnpCLGFBQVEsR0FBRztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFBO2dCQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNyRSxNQUFNLE9BQU8sR0FDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsQ0FBQyxDQUFBO2dCQUN2RyxFQUFFLENBQUMsQ0FBQyxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFBO2dCQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQztvQkFDSCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMvQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3RDLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUEsQ0FBQTtRQXBDQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDakMsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFFLE9BQWU7UUFDNUMsTUFBTSxDQUFDO1lBQ0wsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixhQUFhO1NBQ2QsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FrQkY7QUF6Q0QsNERBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vaW5kZXgnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5cbmV4cG9ydCBjbGFzcyBQcmV0dGlmeUVkaXRvckNvbnRyb2xsZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIGlzUHJldHR5OiBib29sZWFuID0gZmFsc2VcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yLCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGJ1ZmZlci5vbldpbGxTYXZlKHRoaXMucHJldHRpZnkpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNHcmFtbWFyIChncmFtbWFyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3NvdXJjZS5jMmhzJyxcbiAgICAgICdzb3VyY2UuY2FiYWwnLCAvLyBOT1RFOiBzcGVjaWFsIGNhc2VcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcmV0dGlmeSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeScsIHtzY29wZTogdGhpcy5lZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpfSkpIHtcbiAgICAgIGlmICh0aGlzLmlzUHJldHR5KSB7IHJldHVybiB9XG4gICAgICB0aGlzLmlzUHJldHR5ID0gdHJ1ZVxuICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgY29uc3QgZW5hYmxlZDoge1tLIGluIGtleW9mIHR5cGVvZiBjb25maWcub25TYXZlUHJldHRpZnlGb3JtYXRzLnByb3BlcnRpZXNdOiBib29sZWFufVxuICAgICAgICA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnlGb3JtYXRzJywge3Njb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCl9KVxuICAgICAgaWYgKCEgZW5hYmxlZFtmb3JtYXRdKSB7IHJldHVybiB9XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IpXG4gICAgICAgIGF3YWl0IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpLnNhdmUoKVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5pc1ByZXR0eSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=