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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBc0Q7QUFDdEQsbUNBQXNDO0FBR3RDO0lBRUUsWUFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUQ5QixnQkFBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQXFCdkMsYUFBUSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFO2dCQUM1QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTthQUM1QyxDQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFO29CQUNuRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTtpQkFDNUMsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFBO2dCQUNSLENBQUM7Z0JBQ0QsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBbENDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFlO1FBQzNDLE1BQU0sQ0FBQztZQUNMLGFBQWE7WUFDYixjQUFjO1lBQ2QsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQix3QkFBd0I7WUFDeEIsYUFBYTtTQUNkLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBa0JGO0FBdENELDREQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgcHJldHRpZnlGaWxlIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IElFZGl0b3JDb250cm9sbGVyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5cbmV4cG9ydCBjbGFzcyBQcmV0dGlmeUVkaXRvckNvbnRyb2xsZXIgaW1wbGVtZW50cyBJRWRpdG9yQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChidWZmZXIub25XaWxsU2F2ZSh0aGlzLnByZXR0aWZ5KSlcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNHcmFtbWFyKGdyYW1tYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbXG4gICAgICAnc291cmNlLmMyaHMnLFxuICAgICAgJ3NvdXJjZS5jYWJhbCcsIC8vIE5PVEU6IHNwZWNpYWwgY2FzZVxuICAgICAgJ3NvdXJjZS5oc2MyaHMnLFxuICAgICAgJ3NvdXJjZS5oYXNrZWxsJyxcbiAgICAgICd0ZXh0LnRleC5sYXRleC5oYXNrZWxsJyxcbiAgICAgICdzb3VyY2UuaHNpZycsXG4gICAgXS5pbmNsdWRlcyhncmFtbWFyKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgcHJldHRpZnkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeScsIHtcbiAgICAgICAgc2NvcGU6IHRoaXMuZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSxcbiAgICAgIH0pXG4gICAgKSB7XG4gICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lLnJlcGxhY2UoL1xcLi9nLCAnKicpXG4gICAgICBjb25zdCBlbmFibGVkID0gYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vblNhdmVQcmV0dGlmeUZvcm1hdHMnLCB7XG4gICAgICAgIHNjb3BlOiB0aGlzLmVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCksXG4gICAgICB9KVxuICAgICAgaWYgKCFlbmFibGVkW2Zvcm1hdF0pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IpXG4gICAgfVxuICB9XG59XG4iXX0=