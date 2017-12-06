"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditorMarkControl {
    constructor(editor) {
        this.editor = editor;
        this.editorElement = atom.views.getView(this.editor);
        this.editorElement.classList.add('ide-haskell');
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
        this.editorElement.classList.remove('ide-haskell');
    }
}
exports.EditorMarkControl = EditorMarkControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLW1hcmstY29udHJvbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBRUUsWUFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVEsQ0FBQTtRQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZTtRQUMzQyxNQUFNLENBQUM7WUFDTCxhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsd0JBQXdCO1lBQ3hCLGFBQWE7U0FDZCxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0Y7QUFyQkQsOENBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5cbmltcG9ydCB7IElFZGl0b3JDb250cm9sbGVyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5cbmV4cG9ydCBjbGFzcyBFZGl0b3JNYXJrQ29udHJvbCBpbXBsZW1lbnRzIElFZGl0b3JDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBlZGl0b3JFbGVtZW50OiBIVE1MRWxlbWVudFxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvcikge1xuICAgIHRoaXMuZWRpdG9yRWxlbWVudCA9IGF0b20udmlld3MuZ2V0Vmlldyh0aGlzLmVkaXRvcikgYXMgYW55XG4gICAgdGhpcy5lZGl0b3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc3VwcG9ydHNHcmFtbWFyKGdyYW1tYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBbXG4gICAgICAnc291cmNlLmMyaHMnLFxuICAgICAgJ3NvdXJjZS5jYWJhbCcsXG4gICAgICAnc291cmNlLmhzYzJocycsXG4gICAgICAnc291cmNlLmhhc2tlbGwnLFxuICAgICAgJ3RleHQudGV4LmxhdGV4Lmhhc2tlbGwnLFxuICAgICAgJ3NvdXJjZS5oc2lnJyxcbiAgICBdLmluY2x1ZGVzKGdyYW1tYXIpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVkaXRvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaWRlLWhhc2tlbGwnKVxuICB9XG59XG4iXX0=