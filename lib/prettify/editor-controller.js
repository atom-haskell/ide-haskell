"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const index_1 = require("./index");
class PrettifyEditorController {
    constructor(editor) {
        this.editor = editor;
        this.disposables = new atom_1.CompositeDisposable();
        this.prettify = async () => {
            if (atom.config.get('ide-haskell.onSavePrettify', {
                scope: this.editor.getRootScopeDescriptor(),
            })) {
                const format = this.editor.getGrammar().scopeName.replace(/\./g, '*');
                const enabled = atom.config.get('ide-haskell.onSavePrettifyFormats', {
                    scope: this.editor.getRootScopeDescriptor(),
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBc0Q7QUFDdEQsbUNBQXNDO0FBR3RDLE1BQWEsd0JBQXdCO0lBRW5DLFlBQW9CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFEOUIsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFxQnZDLGFBQVEsR0FBRyxLQUFLLElBQUksRUFBRTtZQUM1QixJQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFO2dCQUM1QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTthQUM1QyxDQUFDLEVBQ0Y7Z0JBQ0EsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUU7b0JBQ25FLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFO2lCQUM1QyxDQUFDLENBQUE7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDcEIsT0FBTTtpQkFDUDtnQkFDRCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFBO1FBbENDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFlO1FBQzNDLE9BQU87WUFDTCxhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsd0JBQXdCO1lBQ3hCLGFBQWE7U0FDZCxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQWtCRjtBQXRDRCw0REFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vaW5kZXgnXG5pbXBvcnQgeyBJRWRpdG9yQ29udHJvbGxlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuXG5leHBvcnQgY2xhc3MgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIGltcGxlbWVudHMgSUVkaXRvckNvbnRyb2xsZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoYnVmZmVyLm9uV2lsbFNhdmUodGhpcy5wcmV0dGlmeSkpXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hcihncmFtbWFyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3NvdXJjZS5jMmhzJyxcbiAgICAgICdzb3VyY2UuY2FiYWwnLCAvLyBOT1RFOiBzcGVjaWFsIGNhc2VcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHByZXR0aWZ5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknLCB7XG4gICAgICAgIHNjb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCksXG4gICAgICB9KVxuICAgICkge1xuICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgY29uc3QgZW5hYmxlZCA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnlGb3JtYXRzJywge1xuICAgICAgICBzY29wZTogdGhpcy5lZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpLFxuICAgICAgfSlcbiAgICAgIGlmICghZW5hYmxlZFtmb3JtYXRdKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgYXdhaXQgcHJldHRpZnlGaWxlKHRoaXMuZWRpdG9yKVxuICAgIH1cbiAgfVxufVxuIl19