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
const atom_haskell_utils_1 = require("atom-haskell-utils");
const util_cabal_format_1 = require("./util-cabal-format");
const util_stylish_haskell_1 = require("./util-stylish-haskell");
function prettifyFile(editor, format = 'haskell') {
    return __awaiter(this, void 0, void 0, function* () {
        const [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition());
        const modMap = {
            haskell: util_stylish_haskell_1.format,
            cabal: util_cabal_format_1.format
        };
        if (!modMap[format]) {
            throw new Error(`Unknown format ${format}`);
        }
        const prettify = modMap[format];
        const workDir = (yield atom_haskell_utils_1.getRootDir(editor.getBuffer())).getPath();
        try {
            const text = yield prettify(editor.getText(), workDir);
            editor.setText(text);
            if (editor.getLastCursor()) {
                editor.getLastCursor().setBufferPosition(firstCursor, { autoscroll: false });
            }
            cursors.forEach((cursor) => {
                editor.addCursorAtBufferPosition(cursor, { autoscroll: false });
            });
        }
        catch (e) {
            atom.notifications.addError('Failed to prettify', {
                detail: e.message, stack: e.stack, dismissable: true
            });
        }
    });
}
exports.prettifyFile = prettifyFile;
var editor_controller_1 = require("./editor-controller");
exports.PrettifyEditorController = editor_controller_1.PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUE2QztBQUM3QywyREFBeUQ7QUFDekQsaUVBQTZEO0FBRTdELHNCQUFvQyxNQUFrQixFQUFFLFNBQThCLFNBQVM7O1FBQzdGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7UUFDakcsTUFBTSxNQUFNLEdBQUc7WUFDYixPQUFPLEVBQUUsNkJBQVk7WUFDckIsS0FBSyxFQUFFLDBCQUFXO1NBQ25CLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLCtCQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoRSxJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7WUFDNUUsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNO2dCQUNyQixNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7WUFDL0QsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO2dCQUNoRCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSTthQUNyRCxDQUFDLENBQUE7UUFDSixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBdkJELG9DQXVCQztBQUVELHlEQUE0RDtBQUFwRCx1REFBQSx3QkFBd0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvcn0gZnJvbSAnYXRvbSdcbmltcG9ydCB7Z2V0Um9vdERpcn0gZnJvbSAnYXRvbS1oYXNrZWxsLXV0aWxzJ1xuaW1wb3J0IHtmb3JtYXQgYXMgY2FiYWxGb3JtYXR9IGZyb20gJy4vdXRpbC1jYWJhbC1mb3JtYXQnXG5pbXBvcnQge2Zvcm1hdCBhcyBmaWx0ZXJGb3JtYXR9IGZyb20gJy4vdXRpbC1zdHlsaXNoLWhhc2tlbGwnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmV0dGlmeUZpbGUgKGVkaXRvcjogVGV4dEVkaXRvciwgZm9ybWF0OiAnaGFza2VsbCcgfCAnY2FiYWwnID0gJ2hhc2tlbGwnKSB7XG4gIGNvbnN0IFtmaXJzdEN1cnNvciwgLi4uY3Vyc29yc10gPSBlZGl0b3IuZ2V0Q3Vyc29ycygpLm1hcCgoY3Vyc29yKSA9PiBjdXJzb3IuZ2V0QnVmZmVyUG9zaXRpb24oKSlcbiAgY29uc3QgbW9kTWFwID0ge1xuICAgIGhhc2tlbGw6IGZpbHRlckZvcm1hdCxcbiAgICBjYWJhbDogY2FiYWxGb3JtYXRcbiAgfVxuICBpZiAoIW1vZE1hcFtmb3JtYXRdKSB7IHRocm93IG5ldyBFcnJvcihgVW5rbm93biBmb3JtYXQgJHtmb3JtYXR9YCkgfVxuICBjb25zdCBwcmV0dGlmeSA9IG1vZE1hcFtmb3JtYXRdXG4gIGNvbnN0IHdvcmtEaXIgPSAoYXdhaXQgZ2V0Um9vdERpcihlZGl0b3IuZ2V0QnVmZmVyKCkpKS5nZXRQYXRoKClcbiAgdHJ5IHtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcHJldHRpZnkoZWRpdG9yLmdldFRleHQoKSwgd29ya0RpcilcbiAgICBlZGl0b3Iuc2V0VGV4dCh0ZXh0KVxuICAgIGlmIChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpKSB7XG4gICAgICBlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLnNldEJ1ZmZlclBvc2l0aW9uKGZpcnN0Q3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH1cbiAgICBjdXJzb3JzLmZvckVhY2goKGN1cnNvcikgPT4ge1xuICAgICAgZWRpdG9yLmFkZEN1cnNvckF0QnVmZmVyUG9zaXRpb24oY3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ0ZhaWxlZCB0byBwcmV0dGlmeScsIHtcbiAgICAgIGRldGFpbDogZS5tZXNzYWdlLCBzdGFjazogZS5zdGFjaywgZGlzbWlzc2FibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCB7UHJldHRpZnlFZGl0b3JDb250cm9sbGVyfSBmcm9tICcuL2VkaXRvci1jb250cm9sbGVyJ1xuIl19