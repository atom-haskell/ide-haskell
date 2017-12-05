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
            FS.close(fd, handleErr);
            FS.unlink(path, handleErr);
        }
    });
}
exports.format = format;
function handleErr(err) {
    if (err) {
        atom.notifications.addError(err.name, { detail: err.message, dismissable: true });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTZDO0FBRzdDLHNCQUE0QixRQUFnQjs7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUNQLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQzNDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQztnQkFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNmLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFFRCxjQUFvQixJQUFZOztRQUM5QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBRVYsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNmLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQUVELGdCQUE2QixJQUFZLEVBQUUsZ0JBQXdCLEVBQUUsS0FBZ0M7O1FBQ25HLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sMkJBQVMsQ0FBQztnQkFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzVELElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7Z0JBQ3RCLEdBQUcsRUFBRSxnQkFBZ0I7YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQzdDLENBQUM7Z0JBQVMsQ0FBQztZQUNULEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQ3ZCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQzVCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFiRCx3QkFhQztBQUVELG1CQUFtQixHQUEwQjtJQUMzQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ25GLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRlMgZnJvbSAnZnMnXG5pbXBvcnQgKiBhcyBUZW1wIGZyb20gJ3RlbXAnXG5pbXBvcnQgeyBydW5GaWx0ZXIgfSBmcm9tICcuL3V0aWwtcnVuLWZpbHRlcidcbmltcG9ydCAqIGFzIEF0b21UeXBlcyBmcm9tICdhdG9tJ1xuXG5hc3luYyBmdW5jdGlvbiBtYWtlVGVtcEZpbGUoY29udGVudHM6IHN0cmluZykge1xuICByZXR1cm4gbmV3IFByb21pc2U8VGVtcC5PcGVuRmlsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIFRlbXAub3BlbihcbiAgICAgIHsgcHJlZml4OiAnaWRlLWhhc2tlbGwnLCBzdWZmaXg6ICcuY2FiYWwnIH0sXG4gICAgICAoZXJyLCBpbmZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICAgIEZTLndyaXRlU3luYyhpbmZvLmZkLCBjb250ZW50cylcbiAgICAgICAgcmVzb2x2ZShpbmZvKVxuICAgICAgfSlcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVhZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgRlMucmVhZEZpbGUocGF0aCwgeyBlbmNvZGluZzogJ3V0Zi04JyB9LCAoZXJyb3IsIHRleHQpID0+IHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICB9IGVsc2UgeyByZXNvbHZlKHRleHQpIH1cbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9ybWF0KHRleHQ6IHN0cmluZywgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nLCBzY29wZTogQXRvbVR5cGVzLlNjb3BlRGVzY3JpcHRvcikge1xuICBjb25zdCB7IHBhdGgsIGZkIH0gPSBhd2FpdCBtYWtlVGVtcEZpbGUodGV4dClcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHN0ZGVyciB9ID0gYXdhaXQgcnVuRmlsdGVyKHtcbiAgICAgIGNvbW1hbmQ6IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuY2FiYWxQYXRoJywgeyBzY29wZSB9KSxcbiAgICAgIGFyZ3M6IFsnZm9ybWF0JywgcGF0aF0sXG4gICAgICBjd2Q6IHdvcmtpbmdEaXJlY3RvcnksXG4gICAgfSlcbiAgICByZXR1cm4geyBzdGRvdXQ6IGF3YWl0IHJlYWQocGF0aCksIHN0ZGVyciB9XG4gIH0gZmluYWxseSB7XG4gICAgRlMuY2xvc2UoZmQsIGhhbmRsZUVycilcbiAgICBGUy51bmxpbmsocGF0aCwgaGFuZGxlRXJyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycihlcnI6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbik6IHZvaWQge1xuICBpZiAoZXJyKSB7XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGVyci5uYW1lLCB7IGRldGFpbDogZXJyLm1lc3NhZ2UsIGRpc21pc3NhYmxlOiB0cnVlIH0pXG4gIH1cbn1cbiJdfQ==