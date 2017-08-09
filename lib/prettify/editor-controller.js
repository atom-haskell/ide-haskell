"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const index_1 = require("./index");
class PrettifyEditorController {
    constructor(editor, pluginManager) {
        this.editor = editor;
        this.disposables = new atom_1.CompositeDisposable();
        const buffer = this.editor.getBuffer();
        this.disposables.add(buffer.onWillSave(this.prettify.bind(this)));
    }
    static supportsGrammar(grammar) {
        return grammar.includes('haskell') || grammar.includes('cabal');
    }
    destroy() {
        this.disposables.dispose();
    }
    prettify() {
        if (atom.config.get('ide-haskell.onSavePrettify')) {
            const scope = this.editor.getGrammar().scopeName;
            if (scope.includes('haskell')) {
                index_1.prettifyFile(this.editor, 'haskell');
            }
            else if (scope.includes('cabal')) {
                index_1.prettifyFile(this.editor, 'cabal');
            }
        }
    }
}
exports.PrettifyEditorController = PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFFYTtBQUViLG1DQUFvQztBQUVwQztJQUtFLFlBQXFCLE1BQWtCLEVBQUUsYUFBNEI7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUQvQixnQkFBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzVDLENBQUE7SUFDSCxDQUFDO0lBVE0sTUFBTSxDQUFDLGVBQWUsQ0FBRSxPQUFlO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQVNNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFTyxRQUFRO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUE7WUFDaEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUExQkQsNERBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgVGV4dEJ1ZmZlclxufSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7cHJldHRpZnlGaWxlfSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgY2xhc3MgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIHtcbiAgcHVibGljIHN0YXRpYyBzdXBwb3J0c0dyYW1tYXIgKGdyYW1tYXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBncmFtbWFyLmluY2x1ZGVzKCdoYXNrZWxsJykgfHwgZ3JhbW1hci5pbmNsdWRlcygnY2FiYWwnKVxuICB9XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvciwgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBidWZmZXIub25XaWxsU2F2ZSh0aGlzLnByZXR0aWZ5LmJpbmQodGhpcykpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBwcmV0dGlmeSAoKSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknKSkge1xuICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLmVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lXG4gICAgICBpZiAoc2NvcGUuaW5jbHVkZXMoJ2hhc2tlbGwnKSkge1xuICAgICAgICBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IsICdoYXNrZWxsJylcbiAgICAgIH0gZWxzZSBpZiAoc2NvcGUuaW5jbHVkZXMoJ2NhYmFsJykpIHtcbiAgICAgICAgcHJldHRpZnlGaWxlKHRoaXMuZWRpdG9yLCAnY2FiYWwnKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19