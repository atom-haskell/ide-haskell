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
                    if (!enabled)
                        throw new Error("Couldn't get 'ide-haskell.onSavePrettifyFormats'");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBS3RDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUF1QnpCLGFBQVEsR0FBRyxHQUFTLEVBQUU7WUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQTtnQkFBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDcEIsSUFBSSxDQUFDO29CQUNILE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7b0JBQ3JFLE1BQU0sT0FBTyxHQUFvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDOUQsbUNBQW1DLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUNoRCxDQUFBO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUUsT0FBTyxDQUFDO3dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQTtvQkFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQTtvQkFBQyxDQUFDO29CQUNqQyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMvQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3RDLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUEsQ0FBQTtRQXZDQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDakMsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFFLE9BQWU7UUFDNUMsTUFBTSxDQUFDO1lBQ0wsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixhQUFhO1NBQ2QsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FxQkY7QUE1Q0QsNERBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vaW5kZXgnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5cbnR5cGUgU2F2ZVByZXR0aWZ5Rm9ybWF0cyA9IHtbSyBpbiBrZXlvZiB0eXBlb2YgY29uZmlnLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cy5wcm9wZXJ0aWVzXTogYm9vbGVhbn1cblxuZXhwb3J0IGNsYXNzIFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgaXNQcmV0dHk6IGJvb2xlYW4gPSBmYWxzZVxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBlZGl0b3I6IFRleHRFZGl0b3IsIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYnVmZmVyLm9uV2lsbFNhdmUodGhpcy5wcmV0dGlmeSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdXBwb3J0c0dyYW1tYXIgKGdyYW1tYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbXG4gICAgICAnc291cmNlLmMyaHMnLFxuICAgICAgJ3NvdXJjZS5jYWJhbCcsIC8vIE5PVEU6IHNwZWNpYWwgY2FzZVxuICAgICAgJ3NvdXJjZS5oc2MyaHMnLFxuICAgICAgJ3NvdXJjZS5oYXNrZWxsJyxcbiAgICAgICd0ZXh0LnRleC5sYXRleC5oYXNrZWxsJyxcbiAgICAgICdzb3VyY2UuaHNpZycsXG4gICAgXS5pbmNsdWRlcyhncmFtbWFyKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHByZXR0aWZ5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5JywgeyBzY29wZTogdGhpcy5lZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpIH0pKSB7XG4gICAgICBpZiAodGhpcy5pc1ByZXR0eSkgeyByZXR1cm4gfVxuICAgICAgdGhpcy5pc1ByZXR0eSA9IHRydWVcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWUucmVwbGFjZSgvXFwuL2csICcqJylcbiAgICAgICAgY29uc3QgZW5hYmxlZDogU2F2ZVByZXR0aWZ5Rm9ybWF0cyB8IHVuZGVmaW5lZCA9IGF0b20uY29uZmlnLmdldChcbiAgICAgICAgICAnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnlGb3JtYXRzJyxcbiAgICAgICAgICB7IHNjb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCkgfSxcbiAgICAgICAgKVxuICAgICAgICBpZiAoISBlbmFibGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBnZXQgJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cydcIilcbiAgICAgICAgaWYgKCEgZW5hYmxlZFtmb3JtYXRdKSB7IHJldHVybiB9XG4gICAgICAgIGF3YWl0IHByZXR0aWZ5RmlsZSh0aGlzLmVkaXRvcilcbiAgICAgICAgYXdhaXQgdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKCkuc2F2ZSgpXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLmlzUHJldHR5ID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==