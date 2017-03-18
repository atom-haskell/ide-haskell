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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDJEQUE2QztBQUM3QywyREFBeUQ7QUFDekQsaUVBQTZEO0FBRTdELHNCQUFvQyxNQUFrQixFQUFFLE1BQU0sR0FBRyxTQUFTOztRQUN4RSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQ2pHLE1BQU0sTUFBTSxHQUFHO1lBQ2IsT0FBTyxFQUFFLDZCQUFZO1lBQ3JCLEtBQUssRUFBRSwwQkFBVztTQUNuQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDcEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSwrQkFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEUsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQzVFLENBQUM7WUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtnQkFDckIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQy9ELENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDaEQsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUk7YUFDckQsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FBQTtBQXZCRCxvQ0F1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3J9IGZyb20gJ2F0b20nXG5pbXBvcnQge2dldFJvb3REaXJ9IGZyb20gJ2F0b20taGFza2VsbC11dGlscydcbmltcG9ydCB7Zm9ybWF0IGFzIGNhYmFsRm9ybWF0fSBmcm9tICcuL3V0aWwtY2FiYWwtZm9ybWF0J1xuaW1wb3J0IHtmb3JtYXQgYXMgZmlsdGVyRm9ybWF0fSBmcm9tICcuL3V0aWwtc3R5bGlzaC1oYXNrZWxsJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJldHRpZnlGaWxlIChlZGl0b3I6IFRleHRFZGl0b3IsIGZvcm1hdCA9ICdoYXNrZWxsJykge1xuICBjb25zdCBbZmlyc3RDdXJzb3IsIC4uLmN1cnNvcnNdID0gZWRpdG9yLmdldEN1cnNvcnMoKS5tYXAoKGN1cnNvcikgPT4gY3Vyc29yLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGNvbnN0IG1vZE1hcCA9IHtcbiAgICBoYXNrZWxsOiBmaWx0ZXJGb3JtYXQsXG4gICAgY2FiYWw6IGNhYmFsRm9ybWF0XG4gIH1cbiAgaWYgKCFtb2RNYXBbZm9ybWF0XSkgeyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZm9ybWF0ICR7Zm9ybWF0fWApIH1cbiAgY29uc3QgcHJldHRpZnkgPSBtb2RNYXBbZm9ybWF0XVxuICBjb25zdCB3b3JrRGlyID0gKGF3YWl0IGdldFJvb3REaXIoZWRpdG9yLmdldEJ1ZmZlcigpKSkuZ2V0UGF0aCgpXG4gIHRyeSB7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHByZXR0aWZ5KGVkaXRvci5nZXRUZXh0KCksIHdvcmtEaXIpXG4gICAgZWRpdG9yLnNldFRleHQodGV4dClcbiAgICBpZiAoZWRpdG9yLmdldExhc3RDdXJzb3IoKSkge1xuICAgICAgZWRpdG9yLmdldExhc3RDdXJzb3IoKS5zZXRCdWZmZXJQb3NpdGlvbihmaXJzdEN1cnNvciwge2F1dG9zY3JvbGw6IGZhbHNlfSlcbiAgICB9XG4gICAgY3Vyc29ycy5mb3JFYWNoKChjdXJzb3IpID0+IHtcbiAgICAgIGVkaXRvci5hZGRDdXJzb3JBdEJ1ZmZlclBvc2l0aW9uKGN1cnNvciwge2F1dG9zY3JvbGw6IGZhbHNlfSlcbiAgICB9KVxuICB9IGNhdGNoIChlKSB7XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdGYWlsZWQgdG8gcHJldHRpZnknLCB7XG4gICAgICBkZXRhaWw6IGUubWVzc2FnZSwgc3RhY2s6IGUuc3RhY2ssIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuIl19