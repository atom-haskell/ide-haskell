"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditorMarkControl {
    constructor(editor, pluginManager) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZWRpdG9yLW1hcmstY29udHJvbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBRUUsWUFBb0IsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBUSxDQUFBO1FBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFlO1FBQzNDLE1BQU0sQ0FBQztZQUNMLGFBQWE7WUFDYixjQUFjO1lBQ2QsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQix3QkFBd0I7WUFDeEIsYUFBYTtTQUNkLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3BELENBQUM7Q0FDRjtBQXJCRCw4Q0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yIH0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciwgSUVkaXRvckNvbnRyb2xsZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcblxuZXhwb3J0IGNsYXNzIEVkaXRvck1hcmtDb250cm9sIGltcGxlbWVudHMgSUVkaXRvckNvbnRyb2xsZXIge1xuICBwcml2YXRlIGVkaXRvckVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWRpdG9yOiBUZXh0RWRpdG9yLCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5lZGl0b3JFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KHRoaXMuZWRpdG9yKSBhcyBhbnlcbiAgICB0aGlzLmVkaXRvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdXBwb3J0c0dyYW1tYXIoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzb3VyY2UuYzJocycsXG4gICAgICAnc291cmNlLmNhYmFsJyxcbiAgICAgICdzb3VyY2UuaHNjMmhzJyxcbiAgICAgICdzb3VyY2UuaGFza2VsbCcsXG4gICAgICAndGV4dC50ZXgubGF0ZXguaGFza2VsbCcsXG4gICAgICAnc291cmNlLmhzaWcnLFxuICAgIF0uaW5jbHVkZXMoZ3JhbW1hcilcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZWRpdG9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpZGUtaGFza2VsbCcpXG4gIH1cbn1cbiJdfQ==