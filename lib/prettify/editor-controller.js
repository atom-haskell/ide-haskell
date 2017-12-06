"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const index_1 = require("./index");
class PrettifyEditorController {
    constructor(editor) {
        this.editor = editor;
        this.disposables = new atom_1.CompositeDisposable();
        this.isPretty = false;
        this.prettify = async () => {
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
                    await index_1.prettifyFile(this.editor);
                    await this.editor.getBuffer().save();
                }
                finally {
                    this.isPretty = false;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUNiLG1DQUFzQztBQUt0QztJQUdFLFlBQXFCLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFGL0IsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdkMsYUFBUSxHQUFZLEtBQUssQ0FBQTtRQXVCekIsYUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUE7Z0JBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQ3BCLElBQUksQ0FBQztvQkFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO29CQUNyRSxNQUFNLE9BQU8sR0FBb0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQzlELG1DQUFtQyxFQUNuQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FDaEQsQ0FBQTtvQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFFLE9BQU8sQ0FBQzt3QkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7b0JBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUE7b0JBQUMsQ0FBQztvQkFDakMsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN0QyxDQUFDO3dCQUFTLENBQUM7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7Z0JBQ3ZCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBdkNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNqQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUUsT0FBZTtRQUM1QyxNQUFNLENBQUM7WUFDTCxhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsd0JBQXdCO1lBQ3hCLGFBQWE7U0FDZCxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQXFCRjtBQTVDRCw0REE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgcHJldHRpZnlGaWxlIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZydcblxudHlwZSBTYXZlUHJldHRpZnlGb3JtYXRzID0ge1tLIGluIGtleW9mIHR5cGVvZiBjb25maWcub25TYXZlUHJldHRpZnlGb3JtYXRzLnByb3BlcnRpZXNdOiBib29sZWFufVxuXG5leHBvcnQgY2xhc3MgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSBpc1ByZXR0eTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBidWZmZXIub25XaWxsU2F2ZSh0aGlzLnByZXR0aWZ5KSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hciAoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzb3VyY2UuYzJocycsXG4gICAgICAnc291cmNlLmNhYmFsJywgLy8gTk9URTogc3BlY2lhbCBjYXNlXG4gICAgICAnc291cmNlLmhzYzJocycsXG4gICAgICAnc291cmNlLmhhc2tlbGwnLFxuICAgICAgJ3RleHQudGV4LmxhdGV4Lmhhc2tlbGwnLFxuICAgICAgJ3NvdXJjZS5oc2lnJyxcbiAgICBdLmluY2x1ZGVzKGdyYW1tYXIpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgcHJldHRpZnkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknLCB7IHNjb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCkgfSkpIHtcbiAgICAgIGlmICh0aGlzLmlzUHJldHR5KSB7IHJldHVybiB9XG4gICAgICB0aGlzLmlzUHJldHR5ID0gdHJ1ZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gdGhpcy5lZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5yZXBsYWNlKC9cXC4vZywgJyonKVxuICAgICAgICBjb25zdCBlbmFibGVkOiBTYXZlUHJldHRpZnlGb3JtYXRzIHwgdW5kZWZpbmVkID0gYXRvbS5jb25maWcuZ2V0KFxuICAgICAgICAgICdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeUZvcm1hdHMnLFxuICAgICAgICAgIHsgc2NvcGU6IHRoaXMuZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSB9LFxuICAgICAgICApXG4gICAgICAgIGlmICghIGVuYWJsZWQpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGdldCAnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnlGb3JtYXRzJ1wiKVxuICAgICAgICBpZiAoISBlbmFibGVkW2Zvcm1hdF0pIHsgcmV0dXJuIH1cbiAgICAgICAgYXdhaXQgcHJldHRpZnlGaWxlKHRoaXMuZWRpdG9yKVxuICAgICAgICBhd2FpdCB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKS5zYXZlKClcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNQcmV0dHkgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19