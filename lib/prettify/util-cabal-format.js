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
const fs_1 = require("fs");
const temp_1 = require("temp");
const util_run_filter_1 = require("./util-run-filter");
function makeTempFile(contents) {
    return new Promise((resolve, reject) => {
        temp_1.default.open({ prefix: 'ide-haskell', suffix: '.cabal' }, (err, info) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            fs_1.default.writeSync(info.fd, contents);
            resolve(info);
        });
    });
}
function read(path) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path, { encoding: 'utf-8' }, (error, text) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                resolve(text);
            }
        });
    });
}
function default_1(text, workingDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        let { path, fd } = yield makeTempFile(text);
        try {
            yield util_run_filter_1.default({
                command: atom.config.get('ide-haskell.cabalPath'),
                args: ['format', path],
                cwd: workingDirectory
            });
            let contents = yield read(path);
            return contents;
        }
        finally {
            fs_1.default.close(fd);
            fs_1.default.unlink(path);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1jYWJhbC1mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1jYWJhbC1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7Ozs7O0FBRVgsMkJBQW1CO0FBQ25CLCtCQUF1QjtBQUN2Qix1REFBeUM7QUFFekMsc0JBQXVCLFFBQVE7SUFDN0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxFQUNqRCxDQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ1IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLENBQUM7WUFDRCxZQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRCxjQUFlLElBQUk7SUFDakIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDakMsWUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtZQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsbUJBQStCLElBQUksRUFBRSxnQkFBZ0I7O1FBQ25ELElBQUksRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDO1lBQ0gsTUFBTSx5QkFBUyxDQUFDO2dCQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDakQsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztnQkFDdEIsR0FBRyxFQUFFLGdCQUFnQjthQUN0QixDQUFDLENBQUE7WUFDRixJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQixNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ2pCLENBQUM7Z0JBQVMsQ0FBQztZQUNULFlBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDWixZQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFkRCw0QkFjQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmltcG9ydCBGUyBmcm9tICdmcydcbmltcG9ydCBUZW1wIGZyb20gJ3RlbXAnXG5pbXBvcnQgcnVuRmlsdGVyIGZyb20gJy4vdXRpbC1ydW4tZmlsdGVyJ1xuXG5mdW5jdGlvbiBtYWtlVGVtcEZpbGUgKGNvbnRlbnRzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgVGVtcC5vcGVuKHtwcmVmaXg6ICdpZGUtaGFza2VsbCcsIHN1ZmZpeDogJy5jYWJhbCd9LFxuICAgICAgKGVyciwgaW5mbykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICAgIEZTLndyaXRlU3luYyhpbmZvLmZkLCBjb250ZW50cylcbiAgICAgICAgcmVzb2x2ZShpbmZvKVxuICAgICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhZCAocGF0aCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIEZTLnJlYWRGaWxlKHBhdGgsIHtlbmNvZGluZzogJ3V0Zi04J30sIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0gZWxzZSB7IHJlc29sdmUodGV4dCkgfVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICh0ZXh0LCB3b3JraW5nRGlyZWN0b3J5KSB7XG4gIGxldCB7cGF0aCwgZmR9ID0gYXdhaXQgbWFrZVRlbXBGaWxlKHRleHQpXG4gIHRyeSB7XG4gICAgYXdhaXQgcnVuRmlsdGVyKHtcbiAgICAgIGNvbW1hbmQ6IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuY2FiYWxQYXRoJyksXG4gICAgICBhcmdzOiBbJ2Zvcm1hdCcsIHBhdGhdLFxuICAgICAgY3dkOiB3b3JraW5nRGlyZWN0b3J5XG4gICAgfSlcbiAgICBsZXQgY29udGVudHMgPSBhd2FpdCByZWFkKHBhdGgpXG4gICAgcmV0dXJuIGNvbnRlbnRzXG4gIH0gZmluYWxseSB7XG4gICAgRlMuY2xvc2UoZmQpXG4gICAgRlMudW5saW5rKHBhdGgpXG4gIH1cbn1cbiJdfQ==