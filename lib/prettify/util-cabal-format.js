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
const FS = require("fs");
const Temp = require("temp");
const util_run_filter_1 = require("./util-run-filter");
function makeTempFile(contents) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Temp.open({ prefix: 'ide-haskell', suffix: '.cabal' }, (err, info) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                FS.writeSync(info.fd, contents);
                resolve(info);
            });
        });
    });
}
function read(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            FS.readFile(path, { encoding: 'utf-8' }, (error, text) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    resolve(text);
                }
            });
        });
    });
}
function format(text, workingDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, fd } = yield makeTempFile(text);
        try {
            yield util_run_filter_1.runFilter({
                command: atom.config.get('ide-haskell.cabalPath'),
                args: ['format', path],
                cwd: workingDirectory
            });
            return read(path);
        }
        finally {
            FS.close(fd);
            FS.unlink(path);
        }
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTJDO0FBRTNDLHNCQUE2QixRQUFnQjs7UUFDM0MsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQ1AsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsRUFDekMsQ0FBQyxHQUFHLEVBQUUsSUFBSTtnQkFDUixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDZixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsY0FBcUIsSUFBWTs7UUFDL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtnQkFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFVixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsZ0JBQThCLElBQVksRUFBRSxnQkFBd0I7O1FBQ2xFLE1BQU0sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSwyQkFBUyxDQUFDO2dCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDakQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztnQkFDdEIsR0FBRyxFQUFFLGdCQUFnQjthQUN0QixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUM7Z0JBQVMsQ0FBQztZQUNULEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDWixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFiRCx3QkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZTIGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgVGVtcCBmcm9tICd0ZW1wJ1xuaW1wb3J0IHtydW5GaWx0ZXJ9IGZyb20gJy4vdXRpbC1ydW4tZmlsdGVyJ1xuXG5hc3luYyBmdW5jdGlvbiBtYWtlVGVtcEZpbGUgKGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFRlbXAuT3BlbkZpbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBUZW1wLm9wZW4oXG4gICAgICB7cHJlZml4OiAnaWRlLWhhc2tlbGwnLCBzdWZmaXg6ICcuY2FiYWwnfSxcbiAgICAgIChlcnIsIGluZm8pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgIH1cbiAgICAgICAgRlMud3JpdGVTeW5jKGluZm8uZmQsIGNvbnRlbnRzKVxuICAgICAgICByZXNvbHZlKGluZm8pXG4gICAgICB9KVxuICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFkIChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgRlMucmVhZEZpbGUocGF0aCwge2VuY29kaW5nOiAndXRmLTgnfSwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSBlbHNlIHsgcmVzb2x2ZSh0ZXh0KSB9XG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdCAodGV4dDogc3RyaW5nLCB3b3JraW5nRGlyZWN0b3J5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB7cGF0aCwgZmR9ID0gYXdhaXQgbWFrZVRlbXBGaWxlKHRleHQpXG4gIHRyeSB7XG4gICAgYXdhaXQgcnVuRmlsdGVyKHtcbiAgICAgIGNvbW1hbmQ6IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuY2FiYWxQYXRoJyksXG4gICAgICBhcmdzOiBbJ2Zvcm1hdCcsIHBhdGhdLFxuICAgICAgY3dkOiB3b3JraW5nRGlyZWN0b3J5XG4gICAgfSlcbiAgICByZXR1cm4gcmVhZChwYXRoKVxuICB9IGZpbmFsbHkge1xuICAgIEZTLmNsb3NlKGZkKVxuICAgIEZTLnVubGluayhwYXRoKVxuICB9XG59XG4iXX0=