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
            stdin: text
        });
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zdHlsaXNoLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1zdHlsaXNoLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVEQUEyQztBQUUzQyxnQkFBOEIsSUFBWSxFQUFFLGdCQUF3Qjs7UUFDbEUsTUFBTSxDQUFDLDJCQUFTLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDO1lBQzVELEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFQRCx3QkFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cnVuRmlsdGVyfSBmcm9tICcuL3V0aWwtcnVuLWZpbHRlcidcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdCAodGV4dDogc3RyaW5nLCB3b3JraW5nRGlyZWN0b3J5OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHJ1bkZpbHRlcih7XG4gICAgY29tbWFuZDogYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdHlsaXNoSGFza2VsbFBhdGgnKSxcbiAgICBhcmdzOiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLnN0eWxpc2hIYXNrZWxsQXJndW1lbnRzJyksXG4gICAgY3dkOiB3b3JraW5nRGlyZWN0b3J5LFxuICAgIHN0ZGluOiB0ZXh0XG4gIH0pXG59XG4iXX0=