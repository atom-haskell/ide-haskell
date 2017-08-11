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
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
exports.PrettifyEditorController = PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQW9DO0FBRXBDO0lBTUUsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUFFL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUM1QyxDQUFBO0lBQ0gsQ0FBQztJQVZNLE1BQU0sQ0FBQyxlQUFlLENBQUUsT0FBZTtRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFVTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRWEsUUFBUTs7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQTtnQkFBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDcEIsSUFBSSxDQUFDO29CQUNILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFBO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7b0JBQzVDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtvQkFDMUMsQ0FBQztvQkFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3RDLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWxDRCw0REFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBUZXh0QnVmZmVyXG59IGZyb20gJ2F0b20nXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtwcmV0dGlmeUZpbGV9IGZyb20gJy4vaW5kZXgnXG5cbmV4cG9ydCBjbGFzcyBQcmV0dGlmeUVkaXRvckNvbnRyb2xsZXIge1xuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hciAoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyYW1tYXIuaW5jbHVkZXMoJ2hhc2tlbGwnKSB8fCBncmFtbWFyLmluY2x1ZGVzKCdjYWJhbCcpXG4gIH1cbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSBpc1ByZXR0eTogYm9vbGVhbiA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGVkaXRvcjogVGV4dEVkaXRvciwgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBidWZmZXIub25XaWxsU2F2ZSh0aGlzLnByZXR0aWZ5LmJpbmQodGhpcykpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcmV0dGlmeSAoKSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25TYXZlUHJldHRpZnknKSkge1xuICAgICAgaWYgKHRoaXMuaXNQcmV0dHkpIHsgcmV0dXJuIH1cbiAgICAgIHRoaXMuaXNQcmV0dHkgPSB0cnVlXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWVcbiAgICAgICAgaWYgKHNjb3BlLmluY2x1ZGVzKCdoYXNrZWxsJykpIHtcbiAgICAgICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IsICdoYXNrZWxsJylcbiAgICAgICAgfSBlbHNlIGlmIChzY29wZS5pbmNsdWRlcygnY2FiYWwnKSkge1xuICAgICAgICAgIGF3YWl0IHByZXR0aWZ5RmlsZSh0aGlzLmVkaXRvciwgJ2NhYmFsJylcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKS5zYXZlKClcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNQcmV0dHkgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19