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
                    excerpt: result.message.toHtml(true),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFJakQ7SUFFRSxZQUFvQixNQUE0QixFQUFVLFFBQW1CO1FBQXpELFdBQU0sR0FBTixNQUFNLENBQXNCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQVd0RSxXQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pELENBQUMsQ0FBQTtRQWJDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQU9PLENBQUUsUUFBUTtRQUNoQixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLFFBQXNDLENBQUE7Z0JBQzFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4QixLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLFNBQVM7d0JBQ1osUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7d0JBQzFCLEtBQUssQ0FBQTtvQkFDUDt3QkFDRSxRQUFRLEdBQUcsTUFBTSxDQUFBO3dCQUNqQixLQUFLLENBQUE7Z0JBQ1QsQ0FBQztnQkFDRCxNQUFNO29CQUNKLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDcEMsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRzt3QkFDaEIsUUFBUSxFQUFFLElBQUksWUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEU7aUJBQ0YsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBMUNELHNDQTBDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFJhbmdlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFJlc3VsdHNEQiB9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQgKiBhcyBMaW50ZXIgZnJvbSAnYXRvbS9saW50ZXInXG5cbmV4cG9ydCBjbGFzcyBMaW50ZXJTdXBwb3J0IHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbnRlcjogTGludGVyLkluZGllRGVsZWdhdGUsIHByaXZhdGUgcmVzdWx0RGI6IFJlc3VsdHNEQikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChyZXN1bHREYi5vbkRpZFVwZGF0ZSh0aGlzLnVwZGF0ZSkpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMubGludGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLmxpbnRlci5jbGVhck1lc3NhZ2VzKClcbiAgICB0aGlzLmxpbnRlci5zZXRBbGxNZXNzYWdlcyhBcnJheS5mcm9tKHRoaXMubWVzc2FnZXMoKSkpXG4gIH1cblxuICBwcml2YXRlICogbWVzc2FnZXMoKTogSXRlcmFibGVJdGVyYXRvcjxMaW50ZXIuTWVzc2FnZT4ge1xuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHRoaXMucmVzdWx0RGIucmVzdWx0cygpKSB7XG4gICAgICBpZiAocmVzdWx0LnVyaSAmJiByZXN1bHQucG9zaXRpb24pIHtcbiAgICAgICAgbGV0IHNldmVyaXR5OiAnZXJyb3InIHwgJ3dhcm5pbmcnIHwgJ2luZm8nXG4gICAgICAgIHN3aXRjaCAocmVzdWx0LnNldmVyaXR5KSB7XG4gICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICAgICAgc2V2ZXJpdHkgPSByZXN1bHQuc2V2ZXJpdHlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNldmVyaXR5ID0gJ2luZm8nXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHlpZWxkIHtcbiAgICAgICAgICBzZXZlcml0eSxcbiAgICAgICAgICBleGNlcnB0OiByZXN1bHQubWVzc2FnZS50b0h0bWwodHJ1ZSksXG4gICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIGZpbGU6IHJlc3VsdC51cmksXG4gICAgICAgICAgICBwb3NpdGlvbjogbmV3IFJhbmdlKHJlc3VsdC5wb3NpdGlvbiwgcmVzdWx0LnBvc2l0aW9uLnRyYW5zbGF0ZShbMCwgMV0pKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=