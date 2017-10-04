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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTZDO0FBRTdDLHNCQUE0QixRQUFnQjs7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUNQLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQzNDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQztnQkFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNmLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFFRCxjQUFvQixJQUFZOztRQUM5QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBRVYsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNmLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQUVELGdCQUE2QixJQUFZLEVBQUUsZ0JBQXdCLEVBQUUsS0FBZ0M7O1FBQ25HLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sMkJBQVMsQ0FBQztnQkFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUM7Z0JBQzFELElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7Z0JBQ3RCLEdBQUcsRUFBRSxnQkFBZ0I7YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBQzdDLENBQUM7Z0JBQVMsQ0FBQztZQUNULEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDWixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFiRCx3QkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZTIGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgVGVtcCBmcm9tICd0ZW1wJ1xuaW1wb3J0IHsgcnVuRmlsdGVyIH0gZnJvbSAnLi91dGlsLXJ1bi1maWx0ZXInXG5cbmFzeW5jIGZ1bmN0aW9uIG1ha2VUZW1wRmlsZShjb250ZW50czogc3RyaW5nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxUZW1wLk9wZW5GaWxlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgVGVtcC5vcGVuKFxuICAgICAgeyBwcmVmaXg6ICdpZGUtaGFza2VsbCcsIHN1ZmZpeDogJy5jYWJhbCcgfSxcbiAgICAgIChlcnIsIGluZm8pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgIH1cbiAgICAgICAgRlMud3JpdGVTeW5jKGluZm8uZmQsIGNvbnRlbnRzKVxuICAgICAgICByZXNvbHZlKGluZm8pXG4gICAgICB9KVxuICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBGUy5yZWFkRmlsZShwYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0sIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUodGV4dCkgfVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmb3JtYXQodGV4dDogc3RyaW5nLCB3b3JraW5nRGlyZWN0b3J5OiBzdHJpbmcsIHNjb3BlOiBBdG9tVHlwZXMuU2NvcGVEZXNjcmlwdG9yKSB7XG4gIGNvbnN0IHsgcGF0aCwgZmQgfSA9IGF3YWl0IG1ha2VUZW1wRmlsZSh0ZXh0KVxuICB0cnkge1xuICAgIGNvbnN0IHsgc3RkZXJyIH0gPSBhd2FpdCBydW5GaWx0ZXIoe1xuICAgICAgY29tbWFuZDogYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5jYWJhbFBhdGgnLCB7c2NvcGV9KSxcbiAgICAgIGFyZ3M6IFsnZm9ybWF0JywgcGF0aF0sXG4gICAgICBjd2Q6IHdvcmtpbmdEaXJlY3RvcnksXG4gICAgfSlcbiAgICByZXR1cm4geyBzdGRvdXQ6IGF3YWl0IHJlYWQocGF0aCksIHN0ZGVyciB9XG4gIH0gZmluYWxseSB7XG4gICAgRlMuY2xvc2UoZmQpXG4gICAgRlMudW5saW5rKHBhdGgpXG4gIH1cbn1cbiJdfQ==