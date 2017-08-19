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
            cabal: util_cabal_format_1.format,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUErQztBQUMvQywyREFBMkQ7QUFDM0QsaUVBQStEO0FBRS9ELHNCQUFtQyxNQUFrQixFQUFFLFNBQThCLFNBQVM7O1FBQzVGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUE7UUFDakcsTUFBTSxNQUFNLEdBQUc7WUFDYixPQUFPLEVBQUUsNkJBQVk7WUFDckIsS0FBSyxFQUFFLDBCQUFXO1NBQ25CLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLCtCQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNoRSxJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUM5RSxDQUFDO1lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07Z0JBQ3JCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNqRSxDQUFDLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsNkNBQTZDLEVBQUU7b0JBQzNFLE1BQU0sRUFBRSxNQUFNO29CQUNkLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsR0FBVSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQTtZQUMvQixJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNiLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDaEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hELEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FBQTtBQXBDRCxvQ0FvQ0M7QUFFRCx5REFBOEQ7QUFBckQsdURBQUEsd0JBQXdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IGdldFJvb3REaXIgfSBmcm9tICdhdG9tLWhhc2tlbGwtdXRpbHMnXG5pbXBvcnQgeyBmb3JtYXQgYXMgY2FiYWxGb3JtYXQgfSBmcm9tICcuL3V0aWwtY2FiYWwtZm9ybWF0J1xuaW1wb3J0IHsgZm9ybWF0IGFzIGZpbHRlckZvcm1hdCB9IGZyb20gJy4vdXRpbC1zdHlsaXNoLWhhc2tlbGwnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmV0dGlmeUZpbGUoZWRpdG9yOiBUZXh0RWRpdG9yLCBmb3JtYXQ6ICdoYXNrZWxsJyB8ICdjYWJhbCcgPSAnaGFza2VsbCcpIHtcbiAgY29uc3QgW2ZpcnN0Q3Vyc29yLCAuLi5jdXJzb3JzXSA9IGVkaXRvci5nZXRDdXJzb3JzKCkubWFwKChjdXJzb3IpID0+IGN1cnNvci5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICBjb25zdCBtb2RNYXAgPSB7XG4gICAgaGFza2VsbDogZmlsdGVyRm9ybWF0LFxuICAgIGNhYmFsOiBjYWJhbEZvcm1hdCxcbiAgfVxuICBpZiAoIW1vZE1hcFtmb3JtYXRdKSB7IHRocm93IG5ldyBFcnJvcihgVW5rbm93biBmb3JtYXQgJHtmb3JtYXR9YCkgfVxuICBjb25zdCBwcmV0dGlmeSA9IG1vZE1hcFtmb3JtYXRdXG4gIGNvbnN0IHdvcmtEaXIgPSAoYXdhaXQgZ2V0Um9vdERpcihlZGl0b3IuZ2V0QnVmZmVyKCkpKS5nZXRQYXRoKClcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHN0ZG91dCwgc3RkZXJyIH0gPSBhd2FpdCBwcmV0dGlmeShlZGl0b3IuZ2V0VGV4dCgpLCB3b3JrRGlyKVxuICAgIGVkaXRvci5zZXRUZXh0KHN0ZG91dClcbiAgICBpZiAoZWRpdG9yLmdldExhc3RDdXJzb3IoKSkge1xuICAgICAgZWRpdG9yLmdldExhc3RDdXJzb3IoKS5zZXRCdWZmZXJQb3NpdGlvbihmaXJzdEN1cnNvciwgeyBhdXRvc2Nyb2xsOiBmYWxzZSB9KVxuICAgIH1cbiAgICBjdXJzb3JzLmZvckVhY2goKGN1cnNvcikgPT4ge1xuICAgICAgZWRpdG9yLmFkZEN1cnNvckF0QnVmZmVyUG9zaXRpb24oY3Vyc29yLCB7IGF1dG9zY3JvbGw6IGZhbHNlIH0pXG4gICAgfSlcbiAgICBpZiAoc3RkZXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKCdQcmV0dGlmaWVyIHJlcG9ydGVkIHRoZSBmb2xsb3dpbmcgcHJvYmxlbXM6Jywge1xuICAgICAgICBkZXRhaWw6IHN0ZGVycixcbiAgICAgICAgZGlzbWlzc2FibGU6IHRydWUsXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGVycjogRXJyb3IgPSBlLmVycm9yIHx8IGVcbiAgICBsZXQgc3RkZXJyOiBzdHJpbmcgPSBlLnN0ZGVyciA/IGUuc3RkZXJyLnRyaW0oKSA6ICcnXG4gICAgaWYgKGVyci5tZXNzYWdlLmluY2x1ZGVzKHN0ZGVycikpIHtcbiAgICAgIHN0ZGVyciA9ICcnXG4gICAgfVxuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignRmFpbGVkIHRvIHByZXR0aWZ5Jywge1xuICAgICAgZGV0YWlsOiBgJHtzdGRlcnIgPyBgJHtzdGRlcnJ9XFxuXFxuYCA6ICcnfSR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgIHN0YWNrOiBlcnIuc3RhY2ssXG4gICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCB7IFByZXR0aWZ5RWRpdG9yQ29udHJvbGxlciB9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2xsZXInXG4iXX0=