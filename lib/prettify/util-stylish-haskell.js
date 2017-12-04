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
const util_run_filter_1 = require("./util-run-filter");
function format(text, workingDirectory, scope) {
    return __awaiter(this, void 0, void 0, function* () {
        return util_run_filter_1.runFilter({
            command: atom.config.get('ide-haskell.stylishHaskellPath', { scope }),
            args: atom.config.get('ide-haskell.stylishHaskellArguments', { scope }),
            cwd: workingDirectory,
            stdin: text,
        });
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zdHlsaXNoLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1zdHlsaXNoLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVEQUE2QztBQUU3QyxnQkFBNkIsSUFBWSxFQUFFLGdCQUF3QixFQUFFLEtBQWdDOztRQUNuRyxNQUFNLENBQUMsMkJBQVMsQ0FBQztZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3JFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3ZFLEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFQRCx3QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJ1bkZpbHRlciB9IGZyb20gJy4vdXRpbC1ydW4tZmlsdGVyJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9ybWF0KHRleHQ6IHN0cmluZywgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nLCBzY29wZTogQXRvbVR5cGVzLlNjb3BlRGVzY3JpcHRvcikge1xuICByZXR1cm4gcnVuRmlsdGVyKHtcbiAgICBjb21tYW5kOiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLnN0eWxpc2hIYXNrZWxsUGF0aCcsIHsgc2NvcGUgfSksXG4gICAgYXJnczogYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdHlsaXNoSGFza2VsbEFyZ3VtZW50cycsIHsgc2NvcGUgfSksXG4gICAgY3dkOiB3b3JraW5nRGlyZWN0b3J5LFxuICAgIHN0ZGluOiB0ZXh0LFxuICB9KVxufVxuIl19