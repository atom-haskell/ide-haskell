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
            if (type === "keyboard" &&
                atom.config.get('ide-haskell.onCursorMove', {
                    scope: editor.getRootScopeDescriptor(),
                }) !== 'Show Tooltip') {
                return undefined;
            }
            const msg = controller.getMessageAt(crange.start, type);
            if (msg.length > 0) {
                return { range: crange, text: msg };
            }
            return undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE2RDtBQUs3RCxxREFBa0Q7QUFHbEQsTUFBYSxvQkFBb0I7SUFFL0IsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FDeEIsTUFBa0IsRUFDbEIsTUFBYSxFQUNiLElBQXFCLEVBQ1EsRUFBRTtZQUMvQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FHbEQsZ0NBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUMxQixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU8sU0FBUyxDQUFBO2FBQ2pCO1lBQ0QsSUFDRSxJQUFJLGVBQTZCO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRTtvQkFDMUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTtpQkFDdkMsQ0FBQyxLQUFLLGNBQWMsRUFDckI7Z0JBQ0EsT0FBTyxTQUFTLENBQUE7YUFDakI7WUFDRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDdkQsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO2FBQ3BDO1lBQ0QsT0FBTyxTQUFTLENBQUE7UUFDbEIsQ0FBQyxDQUFBO1FBMUNDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUE7UUFFckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLGVBQWUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEQsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDN0IsVUFBVSxFQUFFLHFCQUFpRDtTQUM5RCxDQUFDLEVBQ0YsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGdDQUFlLENBQUMsQ0FDbkQsQ0FBQTtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBNEJGO0FBOUNELG9EQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhbmdlLCBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IFRFdmVudFJhbmdlVHlwZSA9IFVQSS5URXZlbnRSYW5nZVR5cGVcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgQ1JFZGl0b3JDb250cm9sIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcbmltcG9ydCB7IElUb29sdGlwRGF0YUV4dCB9IGZyb20gJy4uL3Rvb2x0aXAtcmVnaXN0cnknXG5cbmV4cG9ydCBjbGFzcyBDaGVja1Jlc3VsdHNQcm92aWRlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgY29uc3QgdG9vbHRpcFJlZ2lzdHJ5ID0gcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICB0b29sdGlwUmVnaXN0cnkucmVnaXN0ZXIoJ2J1aWx0aW46Y2hlY2stcmVzdWx0cycsIHtcbiAgICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICAgIGhhbmRsZXI6IHRoaXMudG9vbHRpcFByb3ZpZGVyLFxuICAgICAgICBldmVudFR5cGVzOiBbVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLCBURXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRdLFxuICAgICAgfSksXG4gICAgICBwbHVnaW5NYW5hZ2VyLmFkZEVkaXRvckNvbnRyb2xsZXIoQ1JFZGl0b3JDb250cm9sKSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwUHJvdmlkZXIgPSAoXG4gICAgZWRpdG9yOiBUZXh0RWRpdG9yLFxuICAgIGNyYW5nZTogUmFuZ2UsXG4gICAgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLFxuICApOiBJVG9vbHRpcERhdGFFeHQgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlclR5cGU8XG4gICAgICBDUkVkaXRvckNvbnRyb2wsXG4gICAgICB0eXBlb2YgQ1JFZGl0b3JDb250cm9sXG4gICAgPihDUkVkaXRvckNvbnRyb2wsIGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdHlwZSA9PT0gVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkICYmXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScsIHtcbiAgICAgICAgc2NvcGU6IGVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCksXG4gICAgICB9KSAhPT0gJ1Nob3cgVG9vbHRpcCdcbiAgICApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgY29uc3QgbXNnID0gY29udHJvbGxlci5nZXRNZXNzYWdlQXQoY3JhbmdlLnN0YXJ0LCB0eXBlKVxuICAgIGlmIChtc2cubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHsgcmFuZ2U6IGNyYW5nZSwgdGV4dDogbXNnIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG4iXX0=