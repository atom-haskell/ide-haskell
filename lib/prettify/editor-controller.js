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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBS3RDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUF1QnpCLGFBQVEsR0FBRztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFBO2dCQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNwQixJQUFJLENBQUM7b0JBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtvQkFDckUsTUFBTSxPQUFPLEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNsRCxtQ0FBbUMsRUFDbkMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLENBQzlDLENBQUE7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQTtvQkFBQyxDQUFDO29CQUNqQyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUMvQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3RDLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUEsQ0FBQTtRQXRDQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDakMsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFFLE9BQWU7UUFDNUMsTUFBTSxDQUFDO1lBQ0wsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixhQUFhO1NBQ2QsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FvQkY7QUEzQ0QsNERBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vaW5kZXgnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnXG5cbnR5cGUgU2F2ZVByZXR0aWZ5Rm9ybWF0cyA9IHtbSyBpbiBrZXlvZiB0eXBlb2YgY29uZmlnLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cy5wcm9wZXJ0aWVzXTogYm9vbGVhbn1cblxuZXhwb3J0IGNsYXNzIFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgaXNQcmV0dHk6IGJvb2xlYW4gPSBmYWxzZVxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBlZGl0b3I6IFRleHRFZGl0b3IsIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYnVmZmVyLm9uV2lsbFNhdmUodGhpcy5wcmV0dGlmeSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdXBwb3J0c0dyYW1tYXIgKGdyYW1tYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbXG4gICAgICAnc291cmNlLmMyaHMnLFxuICAgICAgJ3NvdXJjZS5jYWJhbCcsIC8vIE5PVEU6IHNwZWNpYWwgY2FzZVxuICAgICAgJ3NvdXJjZS5oc2MyaHMnLFxuICAgICAgJ3NvdXJjZS5oYXNrZWxsJyxcbiAgICAgICd0ZXh0LnRleC5sYXRleC5oYXNrZWxsJyxcbiAgICAgICdzb3VyY2UuaHNpZycsXG4gICAgXS5pbmNsdWRlcyhncmFtbWFyKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHByZXR0aWZ5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5Jywge3Njb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCl9KSkge1xuICAgICAgaWYgKHRoaXMuaXNQcmV0dHkpIHsgcmV0dXJuIH1cbiAgICAgIHRoaXMuaXNQcmV0dHkgPSB0cnVlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lLnJlcGxhY2UoL1xcLi9nLCAnKicpXG4gICAgICAgIGNvbnN0IGVuYWJsZWQ6IFNhdmVQcmV0dGlmeUZvcm1hdHMgPSBhdG9tLmNvbmZpZy5nZXQoXG4gICAgICAgICAgJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cycsXG4gICAgICAgICAge3Njb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCl9LFxuICAgICAgICApXG4gICAgICAgIGlmICghIGVuYWJsZWRbZm9ybWF0XSkgeyByZXR1cm4gfVxuICAgICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IpXG4gICAgICAgIGF3YWl0IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpLnNhdmUoKVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5pc1ByZXR0eSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=