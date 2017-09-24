"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const editor_control_1 = require("./editor-control");
class CheckResultsProvider {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.tooltipProvider = (editor, crange, type) => {
            const controller = this.pluginManager.controllerType(editor_control_1.CREditorControl, editor);
            if (!controller) {
                return undefined;
            }
            if (type === "keyboard"
                && atom.config.get('ide-haskell.onCursorMove') !== 'Show Tooltip') {
                return undefined;
            }
            const msg = controller.getMessageAt(crange.start, type);
            if (msg.length > 0) {
                return { range: crange, text: msg };
            }
        };
        const tooltipRegistry = pluginManager.tooltipRegistry;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(tooltipRegistry.register('builtin:check-results', {
            priority: 1000,
            handler: this.tooltipProvider,
            eventTypes: ["mouse", "keyboard"],
        }), pluginManager.addEditorController(editor_control_1.CREditorControl));
    }
    destroy() {
        this.disposables.dispose();
    }
}
exports.CheckResultsProvider = CheckResultsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBR2IscURBQWtEO0FBRWxEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FBQyxNQUFrQixFQUFFLE1BQWEsRUFBRSxJQUF5QjtZQUNyRixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FDakMsZ0NBQWUsRUFBRSxNQUFNLENBQ3hCLENBQUE7WUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxlQUFpQzttQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQ2xCLENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDdkQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtZQUNyQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBL0JDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUE7UUFFckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLGVBQWUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEQsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDN0IsVUFBVSxFQUFFLHFCQUF5RDtTQUN0RSxDQUFDLEVBQ0YsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGdDQUFlLENBQUMsQ0FDbkQsQ0FBQTtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBaUJGO0FBbkNELG9EQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJhbmdlLCBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBDUkVkaXRvckNvbnRyb2wgfSBmcm9tICcuL2VkaXRvci1jb250cm9sJ1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tSZXN1bHRzUHJvdmlkZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIGNvbnN0IHRvb2x0aXBSZWdpc3RyeSA9IHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgdG9vbHRpcFJlZ2lzdHJ5LnJlZ2lzdGVyKCdidWlsdGluOmNoZWNrLXJlc3VsdHMnLCB7XG4gICAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgICBoYW5kbGVyOiB0aGlzLnRvb2x0aXBQcm92aWRlcixcbiAgICAgICAgZXZlbnRUeXBlczogW1VQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsIFVQSS5URXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRdLFxuICAgICAgfSksXG4gICAgICBwbHVnaW5NYW5hZ2VyLmFkZEVkaXRvckNvbnRyb2xsZXIoQ1JFZGl0b3JDb250cm9sKSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwUHJvdmlkZXIgPSAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBVUEkuVEV2ZW50UmFuZ2VUeXBlKTogVVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgY29udHJvbGxlclxuICAgICAgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlclR5cGU8Q1JFZGl0b3JDb250cm9sLCB0eXBlb2YgQ1JFZGl0b3JDb250cm9sPihcbiAgICAgICAgQ1JFZGl0b3JDb250cm9sLCBlZGl0b3IsXG4gICAgICApXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgIGlmICh0eXBlID09PSBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXG4gICAgICAmJiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScpICE9PSAnU2hvdyBUb29sdGlwJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBjb25zdCBtc2cgPSBjb250cm9sbGVyLmdldE1lc3NhZ2VBdChjcmFuZ2Uuc3RhcnQsIHR5cGUpXG4gICAgaWYgKG1zZy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4geyByYW5nZTogY3JhbmdlLCB0ZXh0OiBtc2cgfVxuICAgIH1cbiAgfVxufVxuIl19