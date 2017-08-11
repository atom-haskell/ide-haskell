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
            const { stderr } = yield util_run_filter_1.runFilter({
                command: atom.config.get('ide-haskell.cabalPath'),
                args: ['format', path],
                cwd: workingDirectory
            });
            return { stdout: yield read(path), stderr };
        }
        finally {
            FS.close(fd);
            FS.unlink(path);
        }
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTJDO0FBRTNDLHNCQUE2QixRQUFnQjs7UUFDM0MsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQ1AsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsRUFDekMsQ0FBQyxHQUFHLEVBQUUsSUFBSTtnQkFDUixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDZixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsY0FBcUIsSUFBWTs7UUFDL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtnQkFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFVixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsZ0JBQThCLElBQVksRUFBRSxnQkFBd0I7O1FBQ2xFLE1BQU0sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLE1BQU0sMkJBQVMsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNqRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2dCQUN0QixHQUFHLEVBQUUsZ0JBQWdCO2FBQ3RCLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUMsQ0FBQTtRQUMzQyxDQUFDO2dCQUFTLENBQUM7WUFDVCxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ1osRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBYkQsd0JBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBGUyBmcm9tICdmcydcbmltcG9ydCAqIGFzIFRlbXAgZnJvbSAndGVtcCdcbmltcG9ydCB7cnVuRmlsdGVyfSBmcm9tICcuL3V0aWwtcnVuLWZpbHRlcidcblxuYXN5bmMgZnVuY3Rpb24gbWFrZVRlbXBGaWxlIChjb250ZW50czogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxUZW1wLk9wZW5GaWxlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgVGVtcC5vcGVuKFxuICAgICAge3ByZWZpeDogJ2lkZS1oYXNrZWxsJywgc3VmZml4OiAnLmNhYmFsJ30sXG4gICAgICAoZXJyLCBpbmZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICAgIEZTLndyaXRlU3luYyhpbmZvLmZkLCBjb250ZW50cylcbiAgICAgICAgcmVzb2x2ZShpbmZvKVxuICAgICAgfSlcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVhZCAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIEZTLnJlYWRGaWxlKHBhdGgsIHtlbmNvZGluZzogJ3V0Zi04J30sIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUodGV4dCkgfVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmb3JtYXQgKHRleHQ6IHN0cmluZywgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nKSB7XG4gIGNvbnN0IHtwYXRoLCBmZH0gPSBhd2FpdCBtYWtlVGVtcEZpbGUodGV4dClcbiAgdHJ5IHtcbiAgICBjb25zdCB7c3RkZXJyfSA9IGF3YWl0IHJ1bkZpbHRlcih7XG4gICAgICBjb21tYW5kOiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmNhYmFsUGF0aCcpLFxuICAgICAgYXJnczogWydmb3JtYXQnLCBwYXRoXSxcbiAgICAgIGN3ZDogd29ya2luZ0RpcmVjdG9yeVxuICAgIH0pXG4gICAgcmV0dXJuIHtzdGRvdXQ6IGF3YWl0IHJlYWQocGF0aCksIHN0ZGVycn1cbiAgfSBmaW5hbGx5IHtcbiAgICBGUy5jbG9zZShmZClcbiAgICBGUy51bmxpbmsocGF0aClcbiAgfVxufVxuIl19