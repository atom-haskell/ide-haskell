"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
class LinterSupport {
    constructor(linter, resultDb) {
        this.linter = linter;
        this.resultDb = resultDb;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(resultDb.onDidUpdate(this.update.bind(this)));
    }
    destroy() {
        this.disposables.dispose();
        this.linter.dispose();
    }
    update() {
        this.linter.deleteMessages();
        this.linter.setMessages(Array.from(this.messages()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGludGVyLXN1cHBvcnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUQ7QUFHakQ7SUFFRSxZQUFvQixNQUFvQixFQUFVLFFBQW1CO1FBQWpELFdBQU0sR0FBTixNQUFNLENBQWM7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBRTVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELENBQVUsUUFBUTtRQUNoQixHQUFHLENBQUMsQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO29CQUNKLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVE7b0JBQzNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRztvQkFDcEIsS0FBSyxFQUFFLElBQUksWUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckUsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBOUJELHNDQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFJhbmdlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFJlc3VsdHNEQiB9IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5cbmV4cG9ydCBjbGFzcyBMaW50ZXJTdXBwb3J0IHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxpbnRlcjogTGludGVyLkluZGllLCBwcml2YXRlIHJlc3VsdERiOiBSZXN1bHRzREIpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocmVzdWx0RGIub25EaWRVcGRhdGUodGhpcy51cGRhdGUuYmluZCh0aGlzKSkpXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIHRoaXMubGludGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICB0aGlzLmxpbnRlci5kZWxldGVNZXNzYWdlcygpXG4gICAgdGhpcy5saW50ZXIuc2V0TWVzc2FnZXMoQXJyYXkuZnJvbSh0aGlzLm1lc3NhZ2VzKCkpKVxuICB9XG5cbiAgcHJpdmF0ZSAqIG1lc3NhZ2VzKCkge1xuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHRoaXMucmVzdWx0RGIucmVzdWx0cygpKSB7XG4gICAgICBpZiAocmVzdWx0LnVyaSAmJiByZXN1bHQucG9zaXRpb24pIHtcbiAgICAgICAgeWllbGQge1xuICAgICAgICAgIHR5cGU6IHJlc3VsdC5zZXZlcml0eSA9PT0gJ2xpbnQnID8gJ2luZm8nIDogcmVzdWx0LnNldmVyaXR5LFxuICAgICAgICAgIGh0bWw6IHJlc3VsdC5tZXNzYWdlLnRvSHRtbCh0cnVlKSxcbiAgICAgICAgICBmaWxlUGF0aDogcmVzdWx0LnVyaSxcbiAgICAgICAgICByYW5nZTogbmV3IFJhbmdlKHJlc3VsdC5wb3NpdGlvbiwgcmVzdWx0LnBvc2l0aW9uLnRyYW5zbGF0ZShbMCwgMV0pKSxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19