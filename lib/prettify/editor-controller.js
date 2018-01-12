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
                const enabled = atom.config.get('ide-haskell.onSavePrettifyFormats', { scope: this.editor.getRootScopeDescriptor() });
                if (!enabled) {
                    throw new Error("Couldn't get 'ide-haskell.onSavePrettifyFormats'");
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBc0Q7QUFDdEQsbUNBQXNDO0FBUXRDO0lBRUUsWUFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUQ5QixnQkFBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQXFCdkMsYUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFO2dCQUM1QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTthQUM1QyxDQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3JFLE1BQU0sT0FBTyxHQUFvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDOUQsbUNBQW1DLEVBQ25DLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUNoRCxDQUFBO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7Z0JBQ3JFLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUE7Z0JBQ1IsQ0FBQztnQkFDRCxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pDLENBQUM7UUFDSCxDQUFDLENBQUE7UUF0Q0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQWU7UUFDM0MsTUFBTSxDQUFDO1lBQ0wsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixhQUFhO1NBQ2QsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FzQkY7QUExQ0QsNERBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBwcmV0dGlmeUZpbGUgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0IHsgSUVkaXRvckNvbnRyb2xsZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcblxudHlwZSBTYXZlUHJldHRpZnlGb3JtYXRzID0ge1xuICBbSyBpbiBrZXlvZiB0eXBlb2YgY29uZmlnLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cy5wcm9wZXJ0aWVzXTogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIGltcGxlbWVudHMgSUVkaXRvckNvbnRyb2xsZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoYnVmZmVyLm9uV2lsbFNhdmUodGhpcy5wcmV0dGlmeSkpXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hcihncmFtbWFyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3NvdXJjZS5jMmhzJyxcbiAgICAgICdzb3VyY2UuY2FiYWwnLCAvLyBOT1RFOiBzcGVjaWFsIGNhc2VcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHByZXR0aWZ5ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknLCB7XG4gICAgICAgIHNjb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCksXG4gICAgICB9KVxuICAgICkge1xuICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgY29uc3QgZW5hYmxlZDogU2F2ZVByZXR0aWZ5Rm9ybWF0cyB8IHVuZGVmaW5lZCA9IGF0b20uY29uZmlnLmdldChcbiAgICAgICAgJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5Rm9ybWF0cycsXG4gICAgICAgIHsgc2NvcGU6IHRoaXMuZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSB9LFxuICAgICAgKVxuICAgICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGdldCAnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnlGb3JtYXRzJ1wiKVxuICAgICAgfVxuICAgICAgaWYgKCFlbmFibGVkW2Zvcm1hdF0pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IpXG4gICAgfVxuICB9XG59XG4iXX0=