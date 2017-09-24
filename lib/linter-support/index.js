"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
class LinterSupport {
    constructor(linter, resultDb) {
        this.linter = linter;
        this.resultDb = resultDb;
        this.update = () => {
            this.linter.deleteMessages();
            this.linter.setMessages(Array.from(this.messages()));
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
                yield {
                    type: result.severity === 'lint' ? 'info' : result.severity,
                    html: result.message.toHtml(true),
                    filePath: result.uri,
                    range: new atom_1.Range(result.position, result.position.translate([0, 1])),
                };
            }
        }
    }
}
exports.LinterSupport = LinterSupport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFHakQ7SUFFRSxZQUFvQixNQUFvQixFQUFVLFFBQW1CO1FBQWpELFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBVzlELFdBQU0sR0FBRztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQTtRQWJDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQU9ELENBQVUsUUFBUTtRQUNoQixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO29CQUNKLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7b0JBQzNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRztvQkFDcEIsS0FBSyxFQUFFLElBQUksWUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckUsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBOUJELHNDQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFJhbmdlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFJlc3VsdHNEQiB9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5cbmV4cG9ydCBjbGFzcyBMaW50ZXJTdXBwb3J0IHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbnRlcjogTGludGVyLkluZGllLCBwcml2YXRlIHJlc3VsdERiOiBSZXN1bHRzREIpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocmVzdWx0RGIub25EaWRVcGRhdGUodGhpcy51cGRhdGUpKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB0aGlzLmxpbnRlci5kaXNwb3NlKClcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgPSAoKSA9PiB7XG4gICAgdGhpcy5saW50ZXIuZGVsZXRlTWVzc2FnZXMoKVxuICAgIHRoaXMubGludGVyLnNldE1lc3NhZ2VzKEFycmF5LmZyb20odGhpcy5tZXNzYWdlcygpKSlcbiAgfVxuXG4gIHByaXZhdGUgKiBtZXNzYWdlcygpIHtcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiB0aGlzLnJlc3VsdERiLnJlc3VsdHMoKSkge1xuICAgICAgaWYgKHJlc3VsdC51cmkgJiYgcmVzdWx0LnBvc2l0aW9uKSB7XG4gICAgICAgIHlpZWxkIHtcbiAgICAgICAgICB0eXBlOiByZXN1bHQuc2V2ZXJpdHkgPT09ICdsaW50JyA/ICdpbmZvJyA6IHJlc3VsdC5zZXZlcml0eSxcbiAgICAgICAgICBodG1sOiByZXN1bHQubWVzc2FnZS50b0h0bWwodHJ1ZSksXG4gICAgICAgICAgZmlsZVBhdGg6IHJlc3VsdC51cmksXG4gICAgICAgICAgcmFuZ2U6IG5ldyBSYW5nZShyZXN1bHQucG9zaXRpb24sIHJlc3VsdC5wb3NpdGlvbi50cmFuc2xhdGUoWzAsIDFdKSksXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==