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
const CP = require("child_process");
function runFilter({ command, args, cwd, stdin }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const proc = CP.execFile(command, args, { cwd }, (error, stdout, stderr) => {
                    if (stderr.length > 0) {
                        atom.notifications.addError('Prettifier problems', {
                            message: 'Prettifier reported some problems',
                            detail: stderr,
                            dismissable: true
                        });
                    }
                    if (!error) {
                        resolve(stdout);
                    }
                    else {
                        reject(error);
                    }
                });
                if (stdin) {
                    proc.stdin.write(stdin);
                    proc.stdin.end();
                }
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    });
}
exports.runFilter = runFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1ydW4tZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXR0aWZ5L3V0aWwtcnVuLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0NBQW1DO0FBU25DLG1CQUFpQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBaUI7O1FBQzFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtvQkFDbkUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTs0QkFDakQsT0FBTyxFQUFFLG1DQUFtQzs0QkFDNUMsTUFBTSxFQUFFLE1BQU07NEJBQ2QsV0FBVyxFQUFFLElBQUk7eUJBQ2xCLENBQUMsQ0FBQTtvQkFDSixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ2pCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNmLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsQ0FBQztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDZCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUExQkQsOEJBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ1AgZnJvbSAnY2hpbGRfcHJvY2VzcydcblxuZXhwb3J0IGludGVyZmFjZSBJUnVuRmlsdGVyQXJncyB7XG4gICAgY29tbWFuZDogc3RyaW5nXG4gICAgYXJnczogc3RyaW5nW11cbiAgICBjd2Q6IHN0cmluZ1xuICAgIHN0ZGluPzogc3RyaW5nXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5GaWx0ZXIgKHtjb21tYW5kLCBhcmdzLCBjd2QsIHN0ZGlufTogSVJ1bkZpbHRlckFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvYyA9IENQLmV4ZWNGaWxlKGNvbW1hbmQsIGFyZ3MsIHtjd2R9LCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGlmIChzdGRlcnIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignUHJldHRpZmllciBwcm9ibGVtcycsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdQcmV0dGlmaWVyIHJlcG9ydGVkIHNvbWUgcHJvYmxlbXMnLFxuICAgICAgICAgICAgZGV0YWlsOiBzdGRlcnIsXG4gICAgICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgIHJlc29sdmUoc3Rkb3V0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChzdGRpbikge1xuICAgICAgICBwcm9jLnN0ZGluLndyaXRlKHN0ZGluKVxuICAgICAgICBwcm9jLnN0ZGluLmVuZCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgcmVqZWN0KGVycm9yKVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==