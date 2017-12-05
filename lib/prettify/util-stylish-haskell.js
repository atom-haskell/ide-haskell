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
        const command = atom.config.get('ide-haskell.stylishHaskellPath', { scope });
        const args = atom.config.get('ide-haskell.stylishHaskellArguments', { scope });
        if (command === undefined)
            throw new Error("Couldn't get 'ide-haskell.stylishHaskellPath'");
        if (args === undefined)
            throw new Error("Couldn't get 'ide-haskell.stylishHaskellArguments'");
        return util_run_filter_1.runFilter({
            command,
            args,
            cwd: workingDirectory,
            stdin: text,
        });
    });
}
exports.format = format;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zdHlsaXNoLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJldHRpZnkvdXRpbC1zdHlsaXNoLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVEQUE2QztBQUc3QyxnQkFBNkIsSUFBWSxFQUFFLGdCQUF3QixFQUFFLEtBQWdDOztRQUNuRyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDNUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQzlFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7UUFDM0YsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtRQUM3RixNQUFNLENBQUMsMkJBQVMsQ0FBQztZQUNmLE9BQU87WUFDUCxJQUFJO1lBQ0osR0FBRyxFQUFFLGdCQUFnQjtZQUNyQixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQVhELHdCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuRmlsdGVyIH0gZnJvbSAnLi91dGlsLXJ1bi1maWx0ZXInXG5pbXBvcnQgKiBhcyBBdG9tVHlwZXMgZnJvbSAnYXRvbSdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcm1hdCh0ZXh0OiBzdHJpbmcsIHdvcmtpbmdEaXJlY3Rvcnk6IHN0cmluZywgc2NvcGU6IEF0b21UeXBlcy5TY29wZURlc2NyaXB0b3IpIHtcbiAgY29uc3QgY29tbWFuZCA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuc3R5bGlzaEhhc2tlbGxQYXRoJywgeyBzY29wZSB9KVxuICBjb25zdCBhcmdzID0gYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdHlsaXNoSGFza2VsbEFyZ3VtZW50cycsIHsgc2NvcGUgfSlcbiAgaWYgKGNvbW1hbmQgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZ2V0ICdpZGUtaGFza2VsbC5zdHlsaXNoSGFza2VsbFBhdGgnXCIpXG4gIGlmIChhcmdzID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGdldCAnaWRlLWhhc2tlbGwuc3R5bGlzaEhhc2tlbGxBcmd1bWVudHMnXCIpXG4gIHJldHVybiBydW5GaWx0ZXIoe1xuICAgIGNvbW1hbmQsXG4gICAgYXJncyxcbiAgICBjd2Q6IHdvcmtpbmdEaXJlY3RvcnksXG4gICAgc3RkaW46IHRleHQsXG4gIH0pXG59XG4iXX0=