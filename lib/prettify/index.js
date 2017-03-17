'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function prettifyFile(editor, format = 'haskell') {
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
exports.prettifyFile = prettifyFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBRVgsc0JBQW9DLE1BQU0sRUFBRSxNQUFNLEdBQUcsU0FBUzs7UUFDNUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUMvRixJQUFJLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsS0FBSyxFQUFFLHFCQUFxQjtTQUM3QixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDcEUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3RDLElBQUksRUFBQyxVQUFVLEVBQUMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNoRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdEQsSUFBSSxDQUFDO1lBQ0gsSUFBSSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3BELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQzVFLENBQUM7WUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtnQkFDckIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQy9ELENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDaEQsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUk7YUFDckQsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FBQTtBQXhCRCxvQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJldHRpZnlGaWxlIChlZGl0b3IsIGZvcm1hdCA9ICdoYXNrZWxsJykge1xuICBsZXQgW2ZpcnN0Q3Vyc29yLCAuLi5jdXJzb3JzXSA9IGVkaXRvci5nZXRDdXJzb3JzKCkubWFwKChjdXJzb3IpID0+IGN1cnNvci5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICBsZXQgbW9kTWFwID0ge1xuICAgIGhhc2tlbGw6ICcuL3V0aWwtc3R5bGlzaC1oYXNrZWxsJyxcbiAgICBjYWJhbDogJy4vdXRpbC1jYWJhbC1mb3JtYXQnXG4gIH1cbiAgaWYgKCFtb2RNYXBbZm9ybWF0XSkgeyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZm9ybWF0ICR7Zm9ybWF0fWApIH1cbiAgbGV0IHByZXR0aWZ5ID0gcmVxdWlyZShtb2RNYXBbZm9ybWF0XSlcbiAgbGV0IHtnZXRSb290RGlyfSA9IHJlcXVpcmUoJ2F0b20taGFza2VsbC11dGlscycpXG4gIGxldCB3b3JrRGlyID0gZ2V0Um9vdERpcihlZGl0b3IuZ2V0QnVmZmVyKCkpLmdldFBhdGgoKVxuICB0cnkge1xuICAgIGxldCB0ZXh0ID0gYXdhaXQgcHJldHRpZnkoZWRpdG9yLmdldFRleHQoKSwgd29ya0RpcilcbiAgICBlZGl0b3Iuc2V0VGV4dCh0ZXh0KVxuICAgIGlmIChlZGl0b3IuZ2V0TGFzdEN1cnNvcigpKSB7XG4gICAgICBlZGl0b3IuZ2V0TGFzdEN1cnNvcigpLnNldEJ1ZmZlclBvc2l0aW9uKGZpcnN0Q3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH1cbiAgICBjdXJzb3JzLmZvckVhY2goKGN1cnNvcikgPT4ge1xuICAgICAgZWRpdG9yLmFkZEN1cnNvckF0QnVmZmVyUG9zaXRpb24oY3Vyc29yLCB7YXV0b3Njcm9sbDogZmFsc2V9KVxuICAgIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ0ZhaWxlZCB0byBwcmV0dGlmeScsIHtcbiAgICAgIGRldGFpbDogZS5tZXNzYWdlLCBzdGFjazogZS5zdGFjaywgZGlzbWlzc2FibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG4iXX0=