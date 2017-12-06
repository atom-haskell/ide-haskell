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
                && atom.config.get('ide-haskell.onCursorMove', { scope: editor.getRootScopeDescriptor() }) !== 'Show Tooltip') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBS2IscURBQWtEO0FBR2xEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FBQyxNQUFrQixFQUFFLE1BQWEsRUFBRSxJQUFxQixFQUErQixFQUFFO1lBQ2xILE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUNqQyxnQ0FBZSxFQUFFLE1BQU0sQ0FDeEIsQ0FBQTtZQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQTZCO21CQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUNsQixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDckMsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDbEIsQ0FBQyxDQUFBO1FBaENDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUE7UUFFckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLGVBQWUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEQsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDN0IsVUFBVSxFQUFFLHFCQUFpRDtTQUM5RCxDQUFDLEVBQ0YsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGdDQUFlLENBQUMsQ0FDbkQsQ0FBQTtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0NBa0JGO0FBcENELG9EQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJhbmdlLCBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgVEV2ZW50UmFuZ2VUeXBlID0gVVBJLlRFdmVudFJhbmdlVHlwZVxuXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBDUkVkaXRvckNvbnRyb2wgfSBmcm9tICcuL2VkaXRvci1jb250cm9sJ1xuaW1wb3J0IHsgSVRvb2x0aXBEYXRhRXh0IH0gZnJvbSAnLi4vdG9vbHRpcC1yZWdpc3RyeSdcblxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdWx0c1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCB0b29sdGlwUmVnaXN0cnkgPSBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIHRvb2x0aXBSZWdpc3RyeS5yZWdpc3RlcignYnVpbHRpbjpjaGVjay1yZXN1bHRzJywge1xuICAgICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgICAgaGFuZGxlcjogdGhpcy50b29sdGlwUHJvdmlkZXIsXG4gICAgICAgIGV2ZW50VHlwZXM6IFtURXZlbnRSYW5nZVR5cGUubW91c2UsIFRFdmVudFJhbmdlVHlwZS5rZXlib2FyZF0sXG4gICAgICB9KSxcbiAgICAgIHBsdWdpbk1hbmFnZXIuYWRkRWRpdG9yQ29udHJvbGxlcihDUkVkaXRvckNvbnRyb2wpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBQcm92aWRlciA9IChlZGl0b3I6IFRleHRFZGl0b3IsIGNyYW5nZTogUmFuZ2UsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSk6IElUb29sdGlwRGF0YUV4dCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgY29udHJvbGxlclxuICAgICAgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlclR5cGU8Q1JFZGl0b3JDb250cm9sLCB0eXBlb2YgQ1JFZGl0b3JDb250cm9sPihcbiAgICAgICAgQ1JFZGl0b3JDb250cm9sLCBlZGl0b3IsXG4gICAgICApXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgIGlmICh0eXBlID09PSBURXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRcbiAgICAgICYmIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25DdXJzb3JNb3ZlJywgeyBzY29wZTogZWRpdG9yLmdldFJvb3RTY29wZURlc2NyaXB0b3IoKSB9KSAhPT0gJ1Nob3cgVG9vbHRpcCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgY29uc3QgbXNnID0gY29udHJvbGxlci5nZXRNZXNzYWdlQXQoY3JhbmdlLnN0YXJ0LCB0eXBlKVxuICAgIGlmIChtc2cubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHsgcmFuZ2U6IGNyYW5nZSwgdGV4dDogbXNnIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG59XG4iXX0=