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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1ydW4tZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXR0aWZ5L3V0aWwtcnVuLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0NBQW1DO0FBU25DLG1CQUFpQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBaUI7O1FBQzFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUNuRSxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU07b0JBQ25FLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtvQkFDM0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtvQkFDekIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWhCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNkLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FBQTtBQXBCRCw4QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDUCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElSdW5GaWx0ZXJBcmdzIHtcbiAgICBjb21tYW5kOiBzdHJpbmdcbiAgICBhcmdzOiBzdHJpbmdbXVxuICAgIGN3ZDogc3RyaW5nXG4gICAgc3RkaW4/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkZpbHRlciAoe2NvbW1hbmQsIGFyZ3MsIGN3ZCwgc3RkaW59OiBJUnVuRmlsdGVyQXJncykge1xuICByZXR1cm4gbmV3IFByb21pc2U8e3N0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZ30+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvYyA9IENQLmV4ZWNGaWxlKGNvbW1hbmQsIGFyZ3MsIHtjd2R9LCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICByZXNvbHZlKHtzdGRvdXQsIHN0ZGVycn0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KHtlcnJvciwgc3RkZXJyfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChzdGRpbikge1xuICAgICAgICBwcm9jLnN0ZGluLndyaXRlKHN0ZGluKVxuICAgICAgICBwcm9jLnN0ZGluLmVuZCgpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgcmVqZWN0KGVycm9yKVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==