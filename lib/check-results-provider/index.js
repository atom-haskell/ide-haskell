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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBR2IscURBQWtEO0FBRWxEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FBQyxNQUFrQixFQUFFLE1BQWEsRUFBRSxJQUF5QixFQUFnQyxFQUFFO1lBQ3ZILE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUNqQyxnQ0FBZSxFQUFFLE1BQU0sQ0FDeEIsQ0FBQTtZQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQWlDO21CQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDOUcsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUNsQixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDckMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQS9CQyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFBO1FBRXJELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixlQUFlLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hELFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzdCLFVBQVUsRUFBRSxxQkFBeUQ7U0FDdEUsQ0FBQyxFQUNGLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZSxDQUFDLENBQ25ELENBQUE7SUFDSCxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQWlCRjtBQW5DRCxvREFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSYW5nZSwgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgQ1JFZGl0b3JDb250cm9sIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcblxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdWx0c1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCB0b29sdGlwUmVnaXN0cnkgPSBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIHRvb2x0aXBSZWdpc3RyeS5yZWdpc3RlcignYnVpbHRpbjpjaGVjay1yZXN1bHRzJywge1xuICAgICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgICAgaGFuZGxlcjogdGhpcy50b29sdGlwUHJvdmlkZXIsXG4gICAgICAgIGV2ZW50VHlwZXM6IFtVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLCBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXSxcbiAgICAgIH0pLFxuICAgICAgcGx1Z2luTWFuYWdlci5hZGRFZGl0b3JDb250cm9sbGVyKENSRWRpdG9yQ29udHJvbCksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFByb3ZpZGVyID0gKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSk6IFVQSS5JVG9vbHRpcERhdGEgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXJcbiAgICAgID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXJUeXBlPENSRWRpdG9yQ29udHJvbCwgdHlwZW9mIENSRWRpdG9yQ29udHJvbD4oXG4gICAgICAgIENSRWRpdG9yQ29udHJvbCwgZWRpdG9yLFxuICAgICAgKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZFxuICAgICAgJiYgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vbkN1cnNvck1vdmUnLCB7c2NvcGU6IGVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCl9KSAhPT0gJ1Nob3cgVG9vbHRpcCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgY29uc3QgbXNnID0gY29udHJvbGxlci5nZXRNZXNzYWdlQXQoY3JhbmdlLnN0YXJ0LCB0eXBlKVxuICAgIGlmIChtc2cubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHsgcmFuZ2U6IGNyYW5nZSwgdGV4dDogbXNnIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==