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
function prettifyFile(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        const [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition());
        const format = editor.getGrammar().scopeName;
        const prettify = format === 'source.cabal' ? util_cabal_format_1.format : util_stylish_haskell_1.format;
        const workDir = (yield atom_haskell_utils_1.getRootDir(editor.getBuffer())).getPath();
        try {
            const { stdout, stderr } = yield prettify(editor.getText(), workDir, editor.getRootScopeDescriptor());
            editor.setText(stdout);
            if (editor.getLastCursor()) {
                editor.getLastCursor().setBufferPosition(firstCursor, { autoscroll: false });
            }
            cursors.forEach((cursor) => {
                editor.addCursorAtBufferPosition(cursor, { autoscroll: false });
            });
            if (stderr.length > 0) {
                atom.notifications.addWarning('Prettifier reported the following problems:', {
                    detail: stderr,
                    dismissable: true,
                });
            }
        }
        catch (e) {
            const err = e.error || e;
            let stderr = e.stderr ? e.stderr.trim() : '';
            if (err.message.includes(stderr)) {
                stderr = '';
            }
            atom.notifications.addError('Failed to prettify', {
                detail: `${stderr ? `${stderr}\n\n` : ''}${err.message}`,
                stack: err.stack,
                dismissable: true,
            });
        }
    });
}
exports.prettifyFile = prettifyFile;
var editor_controller_1 = require("./editor-controller");
exports.PrettifyEditorController = editor_controller_1.PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUErQztBQUMvQywyREFBMkQ7QUFDM0QsaUVBQStEO0FBRS9ELHNCQUFtQyxNQUFrQjs7UUFDbkQsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7UUFDakcsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQTtRQUM1QyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQywwQkFBVyxDQUFDLENBQUMsQ0FBQyw2QkFBWSxDQUFBO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSwrQkFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEUsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUE7WUFDckcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDOUUsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDekIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ2pFLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyw2Q0FBNkMsRUFBRTtvQkFDM0UsTUFBTSxFQUFFLE1BQU07b0JBQ2QsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQTtZQUNKLENBQUM7UUFDSCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLE1BQU0sR0FBRyxHQUFVLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO1lBQy9CLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDYixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2hELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hELEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FBQTtBQWhDRCxvQ0FnQ0M7QUFFRCx5REFBOEQ7QUFBckQsdURBQUEsd0JBQXdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IGdldFJvb3REaXIgfSBmcm9tICdhdG9tLWhhc2tlbGwtdXRpbHMnXG5pbXBvcnQgeyBmb3JtYXQgYXMgY2FiYWxGb3JtYXQgfSBmcm9tICcuL3V0aWwtY2FiYWwtZm9ybWF0J1xuaW1wb3J0IHsgZm9ybWF0IGFzIGZpbHRlckZvcm1hdCB9IGZyb20gJy4vdXRpbC1zdHlsaXNoLWhhc2tlbGwnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmV0dGlmeUZpbGUoZWRpdG9yOiBUZXh0RWRpdG9yKSB7XG4gIGNvbnN0IFtmaXJzdEN1cnNvciwgLi4uY3Vyc29yc10gPSBlZGl0b3IuZ2V0Q3Vyc29ycygpLm1hcCgoY3Vyc29yKSA9PiBjdXJzb3IuZ2V0QnVmZmVyUG9zaXRpb24oKSlcbiAgY29uc3QgZm9ybWF0ID0gZWRpdG9yLmdldEdyYW1tYXIoKS5zY29wZU5hbWVcbiAgY29uc3QgcHJldHRpZnkgPSBmb3JtYXQgPT09ICdzb3VyY2UuY2FiYWwnID8gY2FiYWxGb3JtYXQgOiBmaWx0ZXJGb3JtYXRcbiAgY29uc3Qgd29ya0RpciA9IChhd2FpdCBnZXRSb290RGlyKGVkaXRvci5nZXRCdWZmZXIoKSkpLmdldFBhdGgoKVxuICB0cnkge1xuICAgIGNvbnN0IHsgc3Rkb3V0LCBzdGRlcnIgfSA9IGF3YWl0IHByZXR0aWZ5KGVkaXRvci5nZXRUZXh0KCksIHdvcmtEaXIsIGVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCkpXG4gICAgZWRpdG9yLnNldFRleHQoc3Rkb3V0KVxuICAgIGlmIChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpKSB7XG4gICAgICBlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLnNldEJ1ZmZlclBvc2l0aW9uKGZpcnN0Q3Vyc29yLCB7IGF1dG9zY3JvbGw6IGZhbHNlIH0pXG4gICAgfVxuICAgIGN1cnNvcnMuZm9yRWFjaCgoY3Vyc29yKSA9PiB7XG4gICAgICBlZGl0b3IuYWRkQ3Vyc29yQXRCdWZmZXJQb3NpdGlvbihjdXJzb3IsIHsgYXV0b3Njcm9sbDogZmFsc2UgfSlcbiAgICB9KVxuICAgIGlmIChzdGRlcnIubGVuZ3RoID4gMCkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoJ1ByZXR0aWZpZXIgcmVwb3J0ZWQgdGhlIGZvbGxvd2luZyBwcm9ibGVtczonLCB7XG4gICAgICAgIGRldGFpbDogc3RkZXJyLFxuICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc3QgZXJyOiBFcnJvciA9IGUuZXJyb3IgfHwgZVxuICAgIGxldCBzdGRlcnI6IHN0cmluZyA9IGUuc3RkZXJyID8gZS5zdGRlcnIudHJpbSgpIDogJydcbiAgICBpZiAoZXJyLm1lc3NhZ2UuaW5jbHVkZXMoc3RkZXJyKSkge1xuICAgICAgc3RkZXJyID0gJydcbiAgICB9XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdGYWlsZWQgdG8gcHJldHRpZnknLCB7XG4gICAgICBkZXRhaWw6IGAke3N0ZGVyciA/IGAke3N0ZGVycn1cXG5cXG5gIDogJyd9JHtlcnIubWVzc2FnZX1gLFxuICAgICAgc3RhY2s6IGVyci5zdGFjayxcbiAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IHsgUHJldHRpZnlFZGl0b3JDb250cm9sbGVyIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbGxlcidcbiJdfQ==