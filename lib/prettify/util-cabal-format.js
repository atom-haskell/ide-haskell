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
function format(text, workingDirectory, scope) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, fd } = yield makeTempFile(text);
        try {
            const { stderr } = yield util_run_filter_1.runFilter({
                command: atom.config.get('ide-haskell.cabalPath', { scope }),
                args: ['format', path],
                cwd: workingDirectory,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTZDO0FBRTdDLHNCQUE0QixRQUFnQjs7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQ1AsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFDM0MsQ0FBQyxHQUFHLEVBQUUsSUFBSTtnQkFDUixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDZixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsY0FBb0IsSUFBWTs7UUFDOUIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtnQkFDbkQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFVixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsZ0JBQTZCLElBQVksRUFBRSxnQkFBd0IsRUFBRSxLQUFnQzs7UUFDbkcsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSwyQkFBUyxDQUFDO2dCQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQztnQkFDMUQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztnQkFDdEIsR0FBRyxFQUFFLGdCQUFnQjthQUN0QixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFDN0MsQ0FBQztnQkFBUyxDQUFDO1lBQ1QsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNaLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsQ0FBQztJQUNILENBQUM7Q0FBQTtBQWJELHdCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRlMgZnJvbSAnZnMnXG5pbXBvcnQgKiBhcyBUZW1wIGZyb20gJ3RlbXAnXG5pbXBvcnQgeyBydW5GaWx0ZXIgfSBmcm9tICcuL3V0aWwtcnVuLWZpbHRlcidcblxuYXN5bmMgZnVuY3Rpb24gbWFrZVRlbXBGaWxlKGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFRlbXAuT3BlbkZpbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBUZW1wLm9wZW4oXG4gICAgICB7IHByZWZpeDogJ2lkZS1oYXNrZWxsJywgc3VmZml4OiAnLmNhYmFsJyB9LFxuICAgICAgKGVyciwgaW5mbykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgfVxuICAgICAgICBGUy53cml0ZVN5bmMoaW5mby5mZCwgY29udGVudHMpXG4gICAgICAgIHJlc29sdmUoaW5mbylcbiAgICAgIH0pXG4gIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIEZTLnJlYWRGaWxlKHBhdGgsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSBlbHNlIHsgcmVzb2x2ZSh0ZXh0KSB9XG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHdvcmtpbmdEaXJlY3Rvcnk6IHN0cmluZywgc2NvcGU6IEF0b21UeXBlcy5TY29wZURlc2NyaXB0b3IpIHtcbiAgY29uc3QgeyBwYXRoLCBmZCB9ID0gYXdhaXQgbWFrZVRlbXBGaWxlKHRleHQpXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGRlcnIgfSA9IGF3YWl0IHJ1bkZpbHRlcih7XG4gICAgICBjb21tYW5kOiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmNhYmFsUGF0aCcsIHtzY29wZX0pLFxuICAgICAgYXJnczogWydmb3JtYXQnLCBwYXRoXSxcbiAgICAgIGN3ZDogd29ya2luZ0RpcmVjdG9yeSxcbiAgICB9KVxuICAgIHJldHVybiB7IHN0ZG91dDogYXdhaXQgcmVhZChwYXRoKSwgc3RkZXJyIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBGUy5jbG9zZShmZClcbiAgICBGUy51bmxpbmsocGF0aClcbiAgfVxufVxuIl19