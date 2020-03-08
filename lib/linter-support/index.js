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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFJakQsTUFBYSxhQUFhO0lBRXhCLFlBQ1UsTUFBNEIsRUFDNUIsUUFBbUI7UUFEbkIsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVl0QixXQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUMsQ0FBQTtRQWJDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQU9PLENBQUMsUUFBUTtRQUNmLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQy9DLElBQUksUUFBc0MsQ0FBQTtnQkFDMUMsUUFBUSxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUN2QixLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLFNBQVM7d0JBQ1osUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7d0JBQzFCLE1BQUs7b0JBQ1A7d0JBQ0UsUUFBUSxHQUFHLE1BQU0sQ0FBQTt3QkFDakIsTUFBSztpQkFDUjtnQkFDRCxNQUFNO29CQUNKLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNqQyxRQUFRLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO3dCQUNoQixRQUFRLEVBQUUsSUFBSSxZQUFLLENBQ2pCLE1BQU0sQ0FBQyxRQUFRLEVBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDbEM7cUJBQ0Y7aUJBQ0YsQ0FBQTthQUNGO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFoREQsc0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgUmVzdWx0c0RCIH0gZnJvbSAnLi4vcmVzdWx0cy1kYidcbmltcG9ydCAqIGFzIExpbnRlciBmcm9tICdhdG9tL2xpbnRlcidcblxuZXhwb3J0IGNsYXNzIExpbnRlclN1cHBvcnQge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbGludGVyOiBMaW50ZXIuSW5kaWVEZWxlZ2F0ZSxcbiAgICBwcml2YXRlIHJlc3VsdERiOiBSZXN1bHRzREIsXG4gICkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChyZXN1bHREYi5vbkRpZFVwZGF0ZSh0aGlzLnVwZGF0ZSkpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMubGludGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLmxpbnRlci5jbGVhck1lc3NhZ2VzKClcbiAgICB0aGlzLmxpbnRlci5zZXRBbGxNZXNzYWdlcyhBcnJheS5mcm9tKHRoaXMubWVzc2FnZXMoKSkpXG4gIH1cblxuICBwcml2YXRlICptZXNzYWdlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPExpbnRlci5NZXNzYWdlPiB7XG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgdGhpcy5yZXN1bHREYi5yZXN1bHRzKCkpIHtcbiAgICAgIGlmIChyZXN1bHQudXJpICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0LnBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBzZXZlcml0eTogJ2Vycm9yJyB8ICd3YXJuaW5nJyB8ICdpbmZvJ1xuICAgICAgICBzd2l0Y2ggKHJlc3VsdC5zZXZlcml0eSkge1xuICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgIHNldmVyaXR5ID0gcmVzdWx0LnNldmVyaXR5XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXZlcml0eSA9ICdpbmZvJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgc2V2ZXJpdHksXG4gICAgICAgICAgZXhjZXJwdDogcmVzdWx0Lm1lc3NhZ2UudG9QbGFpbigpLFxuICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBmaWxlOiByZXN1bHQudXJpLFxuICAgICAgICAgICAgcG9zaXRpb246IG5ldyBSYW5nZShcbiAgICAgICAgICAgICAgcmVzdWx0LnBvc2l0aW9uLFxuICAgICAgICAgICAgICByZXN1bHQucG9zaXRpb24udHJhbnNsYXRlKFswLCAxXSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==