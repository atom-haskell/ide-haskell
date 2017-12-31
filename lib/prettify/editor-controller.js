"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const index_1 = require("./index");
class PrettifyEditorController {
    constructor(editor) {
        this.editor = editor;
        this.disposables = new atom_1.CompositeDisposable();
        this.prettify = async () => {
            if (atom.config.get('ide-haskell.onSavePrettify', { scope: this.editor.getRootScopeDescriptor() })) {
                const format = this.editor.getGrammar().scopeName.replace(/\./g, '*');
                const enabled = atom.config.get('ide-haskell.onSavePrettifyFormats', { scope: this.editor.getRootScopeDescriptor() });
                if (!enabled)
                    throw new Error("Couldn't get 'ide-haskell.onSavePrettifyFormats'");
                if (!enabled[format]) {
                    return;
                }
                await index_1.prettifyFile(this.editor);
            }
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUNiLG1DQUFzQztBQU10QztJQUVFLFlBQXFCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFEL0IsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUF1QnZDLGFBQVEsR0FBRyxLQUFLLElBQUksRUFBRTtZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkcsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDckUsTUFBTSxPQUFPLEdBQW9DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUM5RCxtQ0FBbUMsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQ2hELENBQUE7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBRSxPQUFPLENBQUM7b0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO2dCQUNsRixFQUFFLENBQUMsQ0FBQyxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFBO2dCQUFDLENBQUM7Z0JBQ2pDLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDakMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQWhDQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDakMsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFFLE9BQWU7UUFDNUMsTUFBTSxDQUFDO1lBQ0wsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixhQUFhO1NBQ2QsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FjRjtBQXBDRCw0REFvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgcHJldHRpZnlGaWxlIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IElFZGl0b3JDb250cm9sbGVyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5cbnR5cGUgU2F2ZVByZXR0aWZ5Rm9ybWF0cyA9IHtbSyBpbiBrZXlvZiB0eXBlb2YgY29uZmlnLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cy5wcm9wZXJ0aWVzXTogYm9vbGVhbn1cblxuZXhwb3J0IGNsYXNzIFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciBpbXBsZW1lbnRzIElFZGl0b3JDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGJ1ZmZlci5vbldpbGxTYXZlKHRoaXMucHJldHRpZnkpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNHcmFtbWFyIChncmFtbWFyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3NvdXJjZS5jMmhzJyxcbiAgICAgICdzb3VyY2UuY2FiYWwnLCAvLyBOT1RFOiBzcGVjaWFsIGNhc2VcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcmV0dGlmeSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeScsIHsgc2NvcGU6IHRoaXMuZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSB9KSkge1xuICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgY29uc3QgZW5hYmxlZDogU2F2ZVByZXR0aWZ5Rm9ybWF0cyB8IHVuZGVmaW5lZCA9IGF0b20uY29uZmlnLmdldChcbiAgICAgICAgJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cycsXG4gICAgICAgIHsgc2NvcGU6IHRoaXMuZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSB9LFxuICAgICAgKVxuICAgICAgaWYgKCEgZW5hYmxlZCkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZ2V0ICdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeUZvcm1hdHMnXCIpXG4gICAgICBpZiAoISBlbmFibGVkW2Zvcm1hdF0pIHsgcmV0dXJuIH1cbiAgICAgIGF3YWl0IHByZXR0aWZ5RmlsZSh0aGlzLmVkaXRvcilcbiAgICB9XG4gIH1cbn1cbiJdfQ==