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
            const { stdout, stderr } = yield prettify(editor.getText(), workDir);
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
                    dismissable: true
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
                dismissable: true
            });
        }
    });
}
exports.prettifyFile = prettifyFile;
var editor_controller_1 = require("./editor-controller");
exports.PrettifyEditorController = editor_controller_1.PrettifyEditorController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUE2QztBQUM3QywyREFBeUQ7QUFDekQsaUVBQTZEO0FBRTdELHNCQUFvQyxNQUFrQixFQUFFLFNBQThCLFNBQVM7O1FBQzdGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7UUFDakcsTUFBTSxNQUFNLEdBQUc7WUFDYixPQUFPLEVBQUUsNkJBQVk7WUFDckIsS0FBSyxFQUFFLDBCQUFXO1NBQ25CLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLCtCQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoRSxJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNsRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtZQUM1RSxDQUFDO1lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07Z0JBQ3JCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtZQUMvRCxDQUFDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsNkNBQTZDLEVBQUU7b0JBQzNFLE1BQU0sRUFBRSxNQUFNO29CQUNkLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsR0FBVSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQTtZQUMvQixJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNiLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDaEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hELEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FBQTtBQXBDRCxvQ0FvQ0M7QUFFRCx5REFBNEQ7QUFBcEQsdURBQUEsd0JBQXdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3J9IGZyb20gJ2F0b20nXG5pbXBvcnQge2dldFJvb3REaXJ9IGZyb20gJ2F0b20taGFza2VsbC11dGlscydcbmltcG9ydCB7Zm9ybWF0IGFzIGNhYmFsRm9ybWF0fSBmcm9tICcuL3V0aWwtY2FiYWwtZm9ybWF0J1xuaW1wb3J0IHtmb3JtYXQgYXMgZmlsdGVyRm9ybWF0fSBmcm9tICcuL3V0aWwtc3R5bGlzaC1oYXNrZWxsJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJldHRpZnlGaWxlIChlZGl0b3I6IFRleHRFZGl0b3IsIGZvcm1hdDogJ2hhc2tlbGwnIHwgJ2NhYmFsJyA9ICdoYXNrZWxsJykge1xuICBjb25zdCBbZmlyc3RDdXJzb3IsIC4uLmN1cnNvcnNdID0gZWRpdG9yLmdldEN1cnNvcnMoKS5tYXAoKGN1cnNvcikgPT4gY3Vyc29yLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGNvbnN0IG1vZE1hcCA9IHtcbiAgICBoYXNrZWxsOiBmaWx0ZXJGb3JtYXQsXG4gICAgY2FiYWw6IGNhYmFsRm9ybWF0XG4gIH1cbiAgaWYgKCFtb2RNYXBbZm9ybWF0XSkgeyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZm9ybWF0ICR7Zm9ybWF0fWApIH1cbiAgY29uc3QgcHJldHRpZnkgPSBtb2RNYXBbZm9ybWF0XVxuICBjb25zdCB3b3JrRGlyID0gKGF3YWl0IGdldFJvb3REaXIoZWRpdG9yLmdldEJ1ZmZlcigpKSkuZ2V0UGF0aCgpXG4gIHRyeSB7XG4gICAgY29uc3Qge3N0ZG91dCwgc3RkZXJyfSA9IGF3YWl0IHByZXR0aWZ5KGVkaXRvci5nZXRUZXh0KCksIHdvcmtEaXIpXG4gICAgZWRpdG9yLnNldFRleHQoc3Rkb3V0KVxuICAgIGlmIChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpKSB7XG4gICAgICBlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLnNldEJ1ZmZlclBvc2l0aW9uKGZpcnN0Q3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH1cbiAgICBjdXJzb3JzLmZvckVhY2goKGN1cnNvcikgPT4ge1xuICAgICAgZWRpdG9yLmFkZEN1cnNvckF0QnVmZmVyUG9zaXRpb24oY3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH0pXG4gICAgaWYgKHN0ZGVyci5sZW5ndGggPiAwKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZygnUHJldHRpZmllciByZXBvcnRlZCB0aGUgZm9sbG93aW5nIHByb2JsZW1zOicsIHtcbiAgICAgICAgZGV0YWlsOiBzdGRlcnIsXG4gICAgICAgIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGVycjogRXJyb3IgPSBlLmVycm9yIHx8IGVcbiAgICBsZXQgc3RkZXJyOiBzdHJpbmcgPSBlLnN0ZGVyciA/IGUuc3RkZXJyLnRyaW0oKSA6ICcnXG4gICAgaWYgKGVyci5tZXNzYWdlLmluY2x1ZGVzKHN0ZGVycikpIHtcbiAgICAgIHN0ZGVyciA9ICcnXG4gICAgfVxuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignRmFpbGVkIHRvIHByZXR0aWZ5Jywge1xuICAgICAgZGV0YWlsOiBgJHtzdGRlcnIgPyBgJHtzdGRlcnJ9XFxuXFxuYCA6ICcnfSR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgICBkaXNtaXNzYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IHtQcmV0dGlmeUVkaXRvckNvbnRyb2xsZXJ9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2xsZXInXG4iXX0=