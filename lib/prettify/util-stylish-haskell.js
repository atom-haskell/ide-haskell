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
function format(text, workingDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        return util_run_filter_1.runFilter({
            command: atom.config.get('ide-haskell.stylishHaskellPath'),
            args: atom.config.get('ide-haskell.stylishHaskellArguments'),
            cwd: workingDirectory,
            stdin: text,
        });
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zdHlsaXNoLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1zdHlsaXNoLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVEQUE2QztBQUU3QyxnQkFBNkIsSUFBWSxFQUFFLGdCQUF3Qjs7UUFDakUsTUFBTSxDQUFDLDJCQUFTLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDO1lBQzVELEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFQRCx3QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJ1bkZpbHRlciB9IGZyb20gJy4vdXRpbC1ydW4tZmlsdGVyJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZm9ybWF0KHRleHQ6IHN0cmluZywgd29ya2luZ0RpcmVjdG9yeTogc3RyaW5nKSB7XG4gIHJldHVybiBydW5GaWx0ZXIoe1xuICAgIGNvbW1hbmQ6IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuc3R5bGlzaEhhc2tlbGxQYXRoJyksXG4gICAgYXJnczogYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdHlsaXNoSGFza2VsbEFyZ3VtZW50cycpLFxuICAgIGN3ZDogd29ya2luZ0RpcmVjdG9yeSxcbiAgICBzdGRpbjogdGV4dCxcbiAgfSlcbn1cbiJdfQ==