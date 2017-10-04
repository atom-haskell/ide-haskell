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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUErQztBQUMvQywyREFBMkQ7QUFDM0QsaUVBQStEO0FBRS9ELHNCQUFtQyxNQUFrQjs7UUFDbkQsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUNqRyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFBO1FBQzVDLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxjQUFjLEdBQUcsMEJBQVcsR0FBRyw2QkFBWSxDQUFBO1FBQ3ZFLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSwrQkFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEUsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUE7WUFDckcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDOUUsQ0FBQztZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNO2dCQUNyQixNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDakUsQ0FBQyxDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLDZDQUE2QyxFQUFFO29CQUMzRSxNQUFNLEVBQUUsTUFBTTtvQkFDZCxXQUFXLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFBO1lBQ0osQ0FBQztRQUNILENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLEdBQVUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUE7WUFDL0IsSUFBSSxNQUFNLEdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtZQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDYixDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2hELE1BQU0sRUFBRSxHQUFHLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUN4RCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7Z0JBQ2hCLFdBQVcsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFoQ0Qsb0NBZ0NDO0FBRUQseURBQThEO0FBQXJELHVEQUFBLHdCQUF3QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBnZXRSb290RGlyIH0gZnJvbSAnYXRvbS1oYXNrZWxsLXV0aWxzJ1xuaW1wb3J0IHsgZm9ybWF0IGFzIGNhYmFsRm9ybWF0IH0gZnJvbSAnLi91dGlsLWNhYmFsLWZvcm1hdCdcbmltcG9ydCB7IGZvcm1hdCBhcyBmaWx0ZXJGb3JtYXQgfSBmcm9tICcuL3V0aWwtc3R5bGlzaC1oYXNrZWxsJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJldHRpZnlGaWxlKGVkaXRvcjogVGV4dEVkaXRvcikge1xuICBjb25zdCBbZmlyc3RDdXJzb3IsIC4uLmN1cnNvcnNdID0gZWRpdG9yLmdldEN1cnNvcnMoKS5tYXAoKGN1cnNvcikgPT4gY3Vyc29yLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGNvbnN0IGZvcm1hdCA9IGVkaXRvci5nZXRHcmFtbWFyKCkuc2NvcGVOYW1lXG4gIGNvbnN0IHByZXR0aWZ5ID0gZm9ybWF0ID09PSAnc291cmNlLmNhYmFsJyA/IGNhYmFsRm9ybWF0IDogZmlsdGVyRm9ybWF0XG4gIGNvbnN0IHdvcmtEaXIgPSAoYXdhaXQgZ2V0Um9vdERpcihlZGl0b3IuZ2V0QnVmZmVyKCkpKS5nZXRQYXRoKClcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHN0ZG91dCwgc3RkZXJyIH0gPSBhd2FpdCBwcmV0dGlmeShlZGl0b3IuZ2V0VGV4dCgpLCB3b3JrRGlyLCBlZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpKVxuICAgIGVkaXRvci5zZXRUZXh0KHN0ZG91dClcbiAgICBpZiAoZWRpdG9yLmdldExhc3RDdXJzb3IoKSkge1xuICAgICAgZWRpdG9yLmdldExhc3RDdXJzb3IoKS5zZXRCdWZmZXJQb3NpdGlvbihmaXJzdEN1cnNvciwgeyBhdXRvc2Nyb2xsOiBmYWxzZSB9KVxuICAgIH1cbiAgICBjdXJzb3JzLmZvckVhY2goKGN1cnNvcikgPT4ge1xuICAgICAgZWRpdG9yLmFkZEN1cnNvckF0QnVmZmVyUG9zaXRpb24oY3Vyc29yLCB7IGF1dG9zY3JvbGw6IGZhbHNlIH0pXG4gICAgfSlcbiAgICBpZiAoc3RkZXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKCdQcmV0dGlmaWVyIHJlcG9ydGVkIHRoZSBmb2xsb3dpbmcgcHJvYmxlbXM6Jywge1xuICAgICAgICBkZXRhaWw6IHN0ZGVycixcbiAgICAgICAgZGlzbWlzc2FibGU6IHRydWUsXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGVycjogRXJyb3IgPSBlLmVycm9yIHx8IGVcbiAgICBsZXQgc3RkZXJyOiBzdHJpbmcgPSBlLnN0ZGVyciA/IGUuc3RkZXJyLnRyaW0oKSA6ICcnXG4gICAgaWYgKGVyci5tZXNzYWdlLmluY2x1ZGVzKHN0ZGVycikpIHtcbiAgICAgIHN0ZGVyciA9ICcnXG4gICAgfVxuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignRmFpbGVkIHRvIHByZXR0aWZ5Jywge1xuICAgICAgZGV0YWlsOiBgJHtzdGRlcnIgPyBgJHtzdGRlcnJ9XFxuXFxuYCA6ICcnfSR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCB7IFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2xsZXInXG4iXX0=