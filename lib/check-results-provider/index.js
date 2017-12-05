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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBS2IscURBQWtEO0FBR2xEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FBQyxNQUFrQixFQUFFLE1BQWEsRUFBRSxJQUFxQixFQUErQixFQUFFO1lBQ2xILE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUNqQyxnQ0FBZSxFQUFFLE1BQU0sQ0FDeEIsQ0FBQTtZQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQTZCO21CQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUNsQixDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDckMsQ0FBQztRQUNILENBQUMsQ0FBQTtRQS9CQyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFBO1FBRXJELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixlQUFlLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hELFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzdCLFVBQVUsRUFBRSxxQkFBaUQ7U0FDOUQsQ0FBQyxFQUNGLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZSxDQUFDLENBQ25ELENBQUE7SUFDSCxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQWlCRjtBQW5DRCxvREFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSYW5nZSwgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0IFRFdmVudFJhbmdlVHlwZSA9IFVQSS5URXZlbnRSYW5nZVR5cGVcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgQ1JFZGl0b3JDb250cm9sIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcbmltcG9ydCB7IElUb29sdGlwRGF0YUV4dCB9IGZyb20gJy4uL3Rvb2x0aXAtcmVnaXN0cnknXG5cbmV4cG9ydCBjbGFzcyBDaGVja1Jlc3VsdHNQcm92aWRlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgY29uc3QgdG9vbHRpcFJlZ2lzdHJ5ID0gcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICB0b29sdGlwUmVnaXN0cnkucmVnaXN0ZXIoJ2J1aWx0aW46Y2hlY2stcmVzdWx0cycsIHtcbiAgICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICAgIGhhbmRsZXI6IHRoaXMudG9vbHRpcFByb3ZpZGVyLFxuICAgICAgICBldmVudFR5cGVzOiBbVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLCBURXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRdLFxuICAgICAgfSksXG4gICAgICBwbHVnaW5NYW5hZ2VyLmFkZEVkaXRvckNvbnRyb2xsZXIoQ1JFZGl0b3JDb250cm9sKSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwUHJvdmlkZXIgPSAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUpOiBJVG9vbHRpcERhdGFFeHQgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXJcbiAgICAgID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXJUeXBlPENSRWRpdG9yQ29udHJvbCwgdHlwZW9mIENSRWRpdG9yQ29udHJvbD4oXG4gICAgICAgIENSRWRpdG9yQ29udHJvbCwgZWRpdG9yLFxuICAgICAgKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgICBpZiAodHlwZSA9PT0gVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXG4gICAgICAmJiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScsIHsgc2NvcGU6IGVkaXRvci5nZXRSb290U2NvcGVEZXNjcmlwdG9yKCkgfSkgIT09ICdTaG93IFRvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIGNvbnN0IG1zZyA9IGNvbnRyb2xsZXIuZ2V0TWVzc2FnZUF0KGNyYW5nZS5zdGFydCwgdHlwZSlcbiAgICBpZiAobXNnLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB7IHJhbmdlOiBjcmFuZ2UsIHRleHQ6IG1zZyB9XG4gICAgfVxuICB9XG59XG4iXX0=