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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFJakQ7SUFFRSxZQUNVLE1BQTRCLEVBQzVCLFFBQW1CO1FBRG5CLFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFZdEIsV0FBTSxHQUFHLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6RCxDQUFDLENBQUM7UUFiQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUU1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFPTyxDQUFDLFFBQVE7UUFDZixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLFFBQXNDLENBQUE7Z0JBQzFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4QixLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLFNBQVM7d0JBQ1osUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7d0JBQzFCLEtBQUssQ0FBQTtvQkFDUDt3QkFDRSxRQUFRLEdBQUcsTUFBTSxDQUFBO3dCQUNqQixLQUFLLENBQUE7Z0JBQ1QsQ0FBQztnQkFDRCxNQUFNO29CQUNKLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNqQyxRQUFRLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO3dCQUNoQixRQUFRLEVBQUUsSUFBSSxZQUFLLENBQ2pCLE1BQU0sQ0FBQyxRQUFRLEVBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDbEM7cUJBQ0Y7aUJBQ0YsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBaERELHNDQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFJhbmdlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFJlc3VsdHNEQiB9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQgKiBhcyBMaW50ZXIgZnJvbSAnYXRvbS9saW50ZXInXG5cbmV4cG9ydCBjbGFzcyBMaW50ZXJTdXBwb3J0IHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxpbnRlcjogTGludGVyLkluZGllRGVsZWdhdGUsXG4gICAgcHJpdmF0ZSByZXN1bHREYjogUmVzdWx0c0RCLFxuICApIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocmVzdWx0RGIub25EaWRVcGRhdGUodGhpcy51cGRhdGUpKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB0aGlzLmxpbnRlci5kaXNwb3NlKClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5saW50ZXIuY2xlYXJNZXNzYWdlcygpXG4gICAgdGhpcy5saW50ZXIuc2V0QWxsTWVzc2FnZXMoQXJyYXkuZnJvbSh0aGlzLm1lc3NhZ2VzKCkpKVxuICB9O1xuXG4gIHByaXZhdGUgKm1lc3NhZ2VzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8TGludGVyLk1lc3NhZ2U+IHtcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiB0aGlzLnJlc3VsdERiLnJlc3VsdHMoKSkge1xuICAgICAgaWYgKHJlc3VsdC51cmkgJiYgcmVzdWx0LnBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBzZXZlcml0eTogJ2Vycm9yJyB8ICd3YXJuaW5nJyB8ICdpbmZvJ1xuICAgICAgICBzd2l0Y2ggKHJlc3VsdC5zZXZlcml0eSkge1xuICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgIHNldmVyaXR5ID0gcmVzdWx0LnNldmVyaXR5XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZXZlcml0eSA9ICdpbmZvJ1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgc2V2ZXJpdHksXG4gICAgICAgICAgZXhjZXJwdDogcmVzdWx0Lm1lc3NhZ2UudG9QbGFpbigpLFxuICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICBmaWxlOiByZXN1bHQudXJpLFxuICAgICAgICAgICAgcG9zaXRpb246IG5ldyBSYW5nZShcbiAgICAgICAgICAgICAgcmVzdWx0LnBvc2l0aW9uLFxuICAgICAgICAgICAgICByZXN1bHQucG9zaXRpb24udHJhbnNsYXRlKFswLCAxXSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==