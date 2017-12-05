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
            if (result.uri && result.position) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFJakQ7SUFFRSxZQUFvQixNQUE0QixFQUFVLFFBQW1CO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVd0RSxXQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUMsQ0FBQTtRQWJDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQU9PLENBQUUsUUFBUTtRQUNoQixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLFFBQXNDLENBQUE7Z0JBQzFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4QixLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLFNBQVM7d0JBQ1osUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7d0JBQzFCLEtBQUssQ0FBQTtvQkFDUDt3QkFDRSxRQUFRLEdBQUcsTUFBTSxDQUFBO3dCQUNqQixLQUFLLENBQUE7Z0JBQ1QsQ0FBQztnQkFDRCxNQUFNO29CQUNKLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNqQyxRQUFRLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO3dCQUNoQixRQUFRLEVBQUUsSUFBSSxZQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4RTtpQkFDRixDQUFBO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUExQ0Qsc0NBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgUmVzdWx0c0RCIH0gZnJvbSAnLi4vcmVzdWx0cy1kYidcbmltcG9ydCAqIGFzIExpbnRlciBmcm9tICdhdG9tL2xpbnRlcidcblxuZXhwb3J0IGNsYXNzIExpbnRlclN1cHBvcnQge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGludGVyOiBMaW50ZXIuSW5kaWVEZWxlZ2F0ZSwgcHJpdmF0ZSByZXN1bHREYjogUmVzdWx0c0RCKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHJlc3VsdERiLm9uRGlkVXBkYXRlKHRoaXMudXBkYXRlKSlcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgdGhpcy5saW50ZXIuZGlzcG9zZSgpXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlID0gKCkgPT4ge1xuICAgIHRoaXMubGludGVyLmNsZWFyTWVzc2FnZXMoKVxuICAgIHRoaXMubGludGVyLnNldEFsbE1lc3NhZ2VzKEFycmF5LmZyb20odGhpcy5tZXNzYWdlcygpKSlcbiAgfVxuXG4gIHByaXZhdGUgKiBtZXNzYWdlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPExpbnRlci5NZXNzYWdlPiB7XG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgdGhpcy5yZXN1bHREYi5yZXN1bHRzKCkpIHtcbiAgICAgIGlmIChyZXN1bHQudXJpICYmIHJlc3VsdC5wb3NpdGlvbikge1xuICAgICAgICBsZXQgc2V2ZXJpdHk6ICdlcnJvcicgfCAnd2FybmluZycgfCAnaW5mbydcbiAgICAgICAgc3dpdGNoIChyZXN1bHQuc2V2ZXJpdHkpIHtcbiAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgICBzZXZlcml0eSA9IHJlc3VsdC5zZXZlcml0eVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc2V2ZXJpdHkgPSAnaW5mbydcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgeWllbGQge1xuICAgICAgICAgIHNldmVyaXR5LFxuICAgICAgICAgIGV4Y2VycHQ6IHJlc3VsdC5tZXNzYWdlLnRvUGxhaW4oKSxcbiAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgZmlsZTogcmVzdWx0LnVyaSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgUmFuZ2UocmVzdWx0LnBvc2l0aW9uLCByZXN1bHQucG9zaXRpb24udHJhbnNsYXRlKFswLCAxXSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==