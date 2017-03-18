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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsdURBQTJDO0FBRTNDLHNCQUE2QixRQUFnQjs7UUFDM0MsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQ1AsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsRUFDekMsQ0FBQyxHQUFHLEVBQUUsSUFBSTtnQkFDUixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDZixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsY0FBcUIsSUFBWTs7UUFDL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtnQkFDakQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUFBO0FBRUQsZ0JBQThCLElBQVksRUFBRSxnQkFBd0I7O1FBQ2xFLE1BQU0sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDO1lBQ0gsTUFBTSwyQkFBUyxDQUFDO2dCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDakQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztnQkFDdEIsR0FBRyxFQUFFLGdCQUFnQjthQUN0QixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUM7Z0JBQVMsQ0FBQztZQUNULEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDWixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFiRCx3QkFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZTIGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgVGVtcCBmcm9tICd0ZW1wJ1xuaW1wb3J0IHtydW5GaWx0ZXJ9IGZyb20gJy4vdXRpbC1ydW4tZmlsdGVyJ1xuXG5hc3luYyBmdW5jdGlvbiBtYWtlVGVtcEZpbGUgKGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFRlbXAuT3BlbkZpbGU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBUZW1wLm9wZW4oXG4gICAgICB7cHJlZml4OiAnaWRlLWhhc2tlbGwnLCBzdWZmaXg6ICcuY2FiYWwnfSxcbiAgICAgIChlcnIsIGluZm8pID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICAgIEZTLndyaXRlU3luYyhpbmZvLmZkLCBjb250ZW50cylcbiAgICAgICAgcmVzb2x2ZShpbmZvKVxuICAgICAgfSlcbiAgfSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVhZCAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIEZTLnJlYWRGaWxlKHBhdGgsIHtlbmNvZGluZzogJ3V0Zi04J30sIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUodGV4dCkgfVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmb3JtYXQgKHRleHQ6IHN0cmluZywgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qge3BhdGgsIGZkfSA9IGF3YWl0IG1ha2VUZW1wRmlsZSh0ZXh0KVxuICB0cnkge1xuICAgIGF3YWl0IHJ1bkZpbHRlcih7XG4gICAgICBjb21tYW5kOiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLmNhYmFsUGF0aCcpLFxuICAgICAgYXJnczogWydmb3JtYXQnLCBwYXRoXSxcbiAgICAgIGN3ZDogd29ya2luZ0RpcmVjdG9yeVxuICAgIH0pXG4gICAgcmV0dXJuIHJlYWQocGF0aClcbiAgfSBmaW5hbGx5IHtcbiAgICBGUy5jbG9zZShmZClcbiAgICBGUy51bmxpbmsocGF0aClcbiAgfVxufVxuIl19