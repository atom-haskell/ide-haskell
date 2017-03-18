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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1ydW4tZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXR0aWZ5L3V0aWwtcnVuLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0NBQW1DO0FBU25DLG1CQUFpQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBaUI7O1FBQzFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksQ0FBQztnQkFDSCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTTtvQkFDbkUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTs0QkFDakQsT0FBTyxFQUFFLG1DQUFtQzs0QkFDNUMsTUFBTSxFQUFFLE1BQU07NEJBQ2QsV0FBVyxFQUFFLElBQUk7eUJBQ2xCLENBQUMsQ0FBQTtvQkFDSixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ2pCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNmLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsQ0FBQztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDZCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUExQkQsOEJBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ1AgZnJvbSAnY2hpbGRfcHJvY2VzcydcblxuaW50ZXJmYWNlIElSdW5GaWx0ZXJBcmdzIHtcbiAgICBjb21tYW5kOiBzdHJpbmdcbiAgICBhcmdzOiBzdHJpbmdbXVxuICAgIGN3ZDogc3RyaW5nXG4gICAgc3RkaW4/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkZpbHRlciAoe2NvbW1hbmQsIGFyZ3MsIGN3ZCwgc3RkaW59OiBJUnVuRmlsdGVyQXJncykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9jID0gQ1AuZXhlY0ZpbGUoY29tbWFuZCwgYXJncywge2N3ZH0sIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKHN0ZGVyci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdQcmV0dGlmaWVyIHByb2JsZW1zJywge1xuICAgICAgICAgICAgbWVzc2FnZTogJ1ByZXR0aWZpZXIgcmVwb3J0ZWQgc29tZSBwcm9ibGVtcycsXG4gICAgICAgICAgICBkZXRhaWw6IHN0ZGVycixcbiAgICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgcmVzb2x2ZShzdGRvdXQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKHN0ZGluKSB7XG4gICAgICAgIHByb2Muc3RkaW4ud3JpdGUoc3RkaW4pXG4gICAgICAgIHByb2Muc3RkaW4uZW5kKClcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICByZWplY3QoZXJyb3IpXG4gICAgfVxuICB9KVxufVxuIl19