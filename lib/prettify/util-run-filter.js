"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CP = require("child_process");
async function runFilter({ command, args, cwd, stdin }) {
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
            if (stdin !== undefined) {
                proc.stdin.write(stdin);
                proc.stdin.end();
            }
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    });
}
exports.runFilter = runFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1ydW4tZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ByZXR0aWZ5L3V0aWwtcnVuLWZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFtQztBQVM1QixLQUFLLFVBQVUsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFrQjtJQUMzRSxPQUFPLElBQUksT0FBTyxDQUFxQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6RSxJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDdEIsT0FBTyxFQUNQLElBQUksRUFDSixFQUFFLEdBQUcsRUFBRSxFQUNQLENBQUMsS0FBd0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7aUJBQzVCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO2lCQUMxQjtZQUNILENBQUMsQ0FDRixDQUFBO1lBQ0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTthQUNqQjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFFZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNkO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBekJELDhCQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENQIGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJ1bkZpbHRlckFyZ3Mge1xuICBjb21tYW5kOiBzdHJpbmdcbiAgYXJnczogc3RyaW5nW11cbiAgY3dkOiBzdHJpbmdcbiAgc3RkaW4/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkZpbHRlcih7IGNvbW1hbmQsIGFyZ3MsIGN3ZCwgc3RkaW4gfTogSVJ1bkZpbHRlckFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPHsgc3Rkb3V0OiBzdHJpbmc7IHN0ZGVycjogc3RyaW5nIH0+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvYyA9IENQLmV4ZWNGaWxlKFxuICAgICAgICBjb21tYW5kLFxuICAgICAgICBhcmdzLFxuICAgICAgICB7IGN3ZCB9LFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBzdGRvdXQsIHN0ZGVyciB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoeyBlcnJvciwgc3RkZXJyIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKVxuICAgICAgaWYgKHN0ZGluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvYy5zdGRpbi53cml0ZShzdGRpbilcbiAgICAgICAgcHJvYy5zdGRpbi5lbmQoKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICB9XG4gIH0pXG59XG4iXX0=