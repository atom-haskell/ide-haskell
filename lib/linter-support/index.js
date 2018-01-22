"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
class LinterSupport {
    constructor(linter, resultDb) {
        this.linter = linter;
        this.resultDb = resultDb;
        this.update = () => {
            this.linter.clearMessages();
            this.linter.setAllMessages(Array.from(this.messages()));
        };
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(resultDb.onDidUpdate(this.update));
    }
    destroy() {
        this.disposables.dispose();
        this.linter.dispose();
    }
    *messages() {
        for (const result of this.resultDb.results()) {
            if (result.uri !== undefined && result.position) {
                let severity;
                switch (result.severity) {
                    case 'error':
                    case 'warning':
                        severity = result.severity;
                        break;
                    default:
                        severity = 'info';
                        break;
                }
                yield {
                    severity,
                    excerpt: result.message.toPlain(),
                    location: {
                        file: result.uri,
                        position: new atom_1.Range(result.position, result.position.translate([0, 1])),
                    },
                };
            }
        }
    }
}
exports.LinterSupport = LinterSupport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFJakQ7SUFFRSxZQUNVLE1BQTRCLEVBQzVCLFFBQW1CO1FBRG5CLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFZdEIsV0FBTSxHQUFHLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6RCxDQUFDLENBQUM7UUFiQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFPTyxDQUFDLFFBQVE7UUFDZixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxRQUFzQyxDQUFBO2dCQUMxQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxPQUFPLENBQUM7b0JBQ2IsS0FBSyxTQUFTO3dCQUNaLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO3dCQUMxQixLQUFLLENBQUE7b0JBQ1A7d0JBQ0UsUUFBUSxHQUFHLE1BQU0sQ0FBQTt3QkFDakIsS0FBSyxDQUFBO2dCQUNULENBQUM7Z0JBQ0QsTUFBTTtvQkFDSixRQUFRO29CQUNSLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDakMsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRzt3QkFDaEIsUUFBUSxFQUFFLElBQUksWUFBSyxDQUNqQixNQUFNLENBQUMsUUFBUSxFQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2xDO3FCQUNGO2lCQUNGLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWhERCxzQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBSYW5nZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBSZXN1bHRzREIgfSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuaW1wb3J0ICogYXMgTGludGVyIGZyb20gJ2F0b20vbGludGVyJ1xuXG5leHBvcnQgY2xhc3MgTGludGVyU3VwcG9ydCB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsaW50ZXI6IExpbnRlci5JbmRpZURlbGVnYXRlLFxuICAgIHByaXZhdGUgcmVzdWx0RGI6IFJlc3VsdHNEQixcbiAgKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHJlc3VsdERiLm9uRGlkVXBkYXRlKHRoaXMudXBkYXRlKSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5saW50ZXIuZGlzcG9zZSgpXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlID0gKCkgPT4ge1xuICAgIHRoaXMubGludGVyLmNsZWFyTWVzc2FnZXMoKVxuICAgIHRoaXMubGludGVyLnNldEFsbE1lc3NhZ2VzKEFycmF5LmZyb20odGhpcy5tZXNzYWdlcygpKSlcbiAgfTtcblxuICBwcml2YXRlICptZXNzYWdlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPExpbnRlci5NZXNzYWdlPiB7XG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgdGhpcy5yZXN1bHREYi5yZXN1bHRzKCkpIHtcbiAgICAgIGlmIChyZXN1bHQudXJpICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBzZXZlcml0eTogJ2Vycm9yJyB8ICd3YXJuaW5nJyB8ICdpbmZvJ1xuICAgICAgICBzd2l0Y2ggKHJlc3VsdC5zZXZlcml0eSkge1xuICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgIHNldmVyaXR5ID0gcmVzdWx0LnNldmVyaXR5XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXZlcml0eSA9ICdpbmZvJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgc2V2ZXJpdHksXG4gICAgICAgICAgZXhjZXJwdDogcmVzdWx0Lm1lc3NhZ2UudG9QbGFpbigpLFxuICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBmaWxlOiByZXN1bHQudXJpLFxuICAgICAgICAgICAgcG9zaXRpb246IG5ldyBSYW5nZShcbiAgICAgICAgICAgICAgcmVzdWx0LnBvc2l0aW9uLFxuICAgICAgICAgICAgICByZXN1bHQucG9zaXRpb24udHJhbnNsYXRlKFswLCAxXSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==