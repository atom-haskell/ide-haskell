'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function prettifyFile(editor, format = 'haskell') {
    return __awaiter(this, void 0, void 0, function* () {
        let [firstCursor, ...cursors] = editor.getCursors().map((cursor) => cursor.getBufferPosition());
        let modMap = {
            haskell: './util-stylish-haskell',
            cabal: './util-cabal-format'
        };
        if (!modMap[format]) {
            throw new Error(`Unknown format ${format}`);
        }
        let prettify = require(modMap[format]);
        let { getRootDir } = require('atom-haskell-utils');
        let workDir = getRootDir(editor.getBuffer()).getPath();
        try {
            let text = yield prettify(editor.getText(), workDir);
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
