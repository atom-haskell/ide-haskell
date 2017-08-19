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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvZWRpdG9yLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUVhO0FBRWIsbUNBQXNDO0FBRXRDO0lBR0UsWUFBcUIsTUFBa0IsRUFBRSxhQUE0QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRi9CLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGFBQVEsR0FBWSxLQUFLLENBQUE7UUFFL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUM1QyxDQUFBO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUUsT0FBZTtRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRWEsUUFBUTs7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sQ0FBQTtnQkFBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTtnQkFDcEIsSUFBSSxDQUFDO29CQUNILE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFBO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxvQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7b0JBQzVDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxNQUFNLG9CQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtvQkFDMUMsQ0FBQztvQkFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3RDLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtnQkFDdkIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQW5DRCw0REFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgcHJldHRpZnlGaWxlIH0gZnJvbSAnLi9pbmRleCdcblxuZXhwb3J0IGNsYXNzIFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgaXNQcmV0dHk6IGJvb2xlYW4gPSBmYWxzZVxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBlZGl0b3I6IFRleHRFZGl0b3IsIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmVkaXRvci5nZXRCdWZmZXIoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYnVmZmVyLm9uV2lsbFNhdmUodGhpcy5wcmV0dGlmeS5iaW5kKHRoaXMpKSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN1cHBvcnRzR3JhbW1hciAoZ3JhbW1hcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyYW1tYXIuaW5jbHVkZXMoJ2hhc2tlbGwnKSB8fCBncmFtbWFyLmluY2x1ZGVzKCdjYWJhbCcpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJldHRpZnkgKCkge1xuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uU2F2ZVByZXR0aWZ5JykpIHtcbiAgICAgIGlmICh0aGlzLmlzUHJldHR5KSB7IHJldHVybiB9XG4gICAgICB0aGlzLmlzUHJldHR5ID0gdHJ1ZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLmVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lXG4gICAgICAgIGlmIChzY29wZS5pbmNsdWRlcygnaGFza2VsbCcpKSB7XG4gICAgICAgICAgYXdhaXQgcHJldHRpZnlGaWxlKHRoaXMuZWRpdG9yLCAnaGFza2VsbCcpXG4gICAgICAgIH0gZWxzZSBpZiAoc2NvcGUuaW5jbHVkZXMoJ2NhYmFsJykpIHtcbiAgICAgICAgICBhd2FpdCBwcmV0dGlmeUZpbGUodGhpcy5lZGl0b3IsICdjYWJhbCcpXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKCkuc2F2ZSgpXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLmlzUHJldHR5ID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==