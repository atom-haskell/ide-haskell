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
                    if (!error) {
                        resolve({ stdout, stderr });
                    }
                    else {
                        reject({ error, stderr });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1ydW4tZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXR0aWZ5L3V0aWwtcnVuLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0NBQW1DO0FBU25DLG1CQUFnQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBa0I7O1FBQzNFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdkUsSUFBSSxDQUFDO2dCQUNILE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUM3QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUMzQixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ2xCLENBQUM7WUFDSCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDZixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQUE7QUFwQkQsOEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQ1AgZnJvbSAnY2hpbGRfcHJvY2VzcydcblxuZXhwb3J0IGludGVyZmFjZSBJUnVuRmlsdGVyQXJncyB7XG4gIGNvbW1hbmQ6IHN0cmluZ1xuICBhcmdzOiBzdHJpbmdbXVxuICBjd2Q6IHN0cmluZ1xuICBzdGRpbj86IHN0cmluZ1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuRmlsdGVyKHsgY29tbWFuZCwgYXJncywgY3dkLCBzdGRpbiB9OiBJUnVuRmlsdGVyQXJncykge1xuICByZXR1cm4gbmV3IFByb21pc2U8e3N0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZ30+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvYyA9IENQLmV4ZWNGaWxlKGNvbW1hbmQsIGFyZ3MsIHsgY3dkIH0sIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgIHJlc29sdmUoeyBzdGRvdXQsIHN0ZGVyciB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCh7IGVycm9yLCBzdGRlcnIgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChzdGRpbikge1xuICAgICAgICBwcm9jLnN0ZGluLndyaXRlKHN0ZGluKVxuICAgICAgICBwcm9jLnN0ZGluLmVuZCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICByZWplY3QoZXJyb3IpXG4gICAgfVxuICB9KVxufVxuIl19