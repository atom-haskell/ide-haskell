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
            if (atom.config.get('ide-haskell.onSavePrettify')) {
                if (this.isPretty) {
                    return;
                }
                this.isPretty = true;
                try {
                    const scope = this.editor.getGrammar().scopeName;
                    if (scope.includes('haskell')) {
                        yield index_1.prettifyFile(this.editor, 'haskell');
                    }
                    else if (scope.includes('cabal')) {
                        yield index_1.prettifyFile(this.editor, 'cabal');
                    }
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
        return grammar.includes('haskell') || grammar.includes('cabal');
    }
    destroy() {
        this.disposables.dispose();
    }
}
exports.PrettifyEditorController = PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBRXRDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUFnQnpCLGFBQVEsR0FBRztZQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQUMsTUFBTSxDQUFBO2dCQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUNwQixJQUFJLENBQUM7b0JBQ0gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUE7b0JBQ2hELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtvQkFDNUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25DLE1BQU0sb0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO29CQUMxQyxDQUFDO29CQUNELE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDdEMsQ0FBQzt3QkFBUyxDQUFDO29CQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQSxDQUFBO1FBOUJDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNqQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUUsT0FBZTtRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBbUJGO0FBbkNELDREQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFRleHRFZGl0b3IsIENvbXBvc2l0ZURpc3Bvc2FibGUsXG59IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBwcmV0dGlmeUZpbGUgfSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgY2xhc3MgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSBpc1ByZXR0eTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvciwgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBidWZmZXIub25XaWxsU2F2ZSh0aGlzLnByZXR0aWZ5KSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hciAoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyYW1tYXIuaW5jbHVkZXMoJ2hhc2tlbGwnKSB8fCBncmFtbWFyLmluY2x1ZGVzKCdjYWJhbCcpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgcHJldHRpZnkgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknKSkge1xuICAgICAgaWYgKHRoaXMuaXNQcmV0dHkpIHsgcmV0dXJuIH1cbiAgICAgIHRoaXMuaXNQcmV0dHkgPSB0cnVlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWVcbiAgICAgICAgaWYgKHNjb3BlLmluY2x1ZGVzKCdoYXNrZWxsJykpIHtcbiAgICAgICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IsICdoYXNrZWxsJylcbiAgICAgICAgfSBlbHNlIGlmIChzY29wZS5pbmNsdWRlcygnY2FiYWwnKSkge1xuICAgICAgICAgIGF3YWl0IHByZXR0aWZ5RmlsZSh0aGlzLmVkaXRvciwgJ2NhYmFsJylcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKS5zYXZlKClcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNQcmV0dHkgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19