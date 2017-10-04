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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBR2IscURBQWtEO0FBRWxEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFrQnhDLG9CQUFlLEdBQUcsQ0FBQyxNQUFrQixFQUFFLE1BQWEsRUFBRSxJQUF5QjtZQUNyRixNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FDakMsZ0NBQWUsRUFBRSxNQUFNLENBQ3hCLENBQUE7WUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxlQUFpQzttQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUMsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlHLE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN2RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ3JDLENBQUM7UUFDSCxDQUFDLENBQUE7UUEvQkMsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQTtRQUVyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoRCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtZQUM3QixVQUFVLEVBQUUscUJBQXlEO1NBQ3RFLENBQUMsRUFDRixhQUFhLENBQUMsbUJBQW1CLENBQUMsZ0NBQWUsQ0FBQyxDQUNuRCxDQUFBO0lBQ0gsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FpQkY7QUFuQ0Qsb0RBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmFuZ2UsIFRleHRFZGl0b3IsIENvbXBvc2l0ZURpc3Bvc2FibGUsXG59IGZyb20gJ2F0b20nXG5cbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IENSRWRpdG9yQ29udHJvbCB9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2wnXG5cbmV4cG9ydCBjbGFzcyBDaGVja1Jlc3VsdHNQcm92aWRlciB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGVcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgY29uc3QgdG9vbHRpcFJlZ2lzdHJ5ID0gcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnlcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICB0b29sdGlwUmVnaXN0cnkucmVnaXN0ZXIoJ2J1aWx0aW46Y2hlY2stcmVzdWx0cycsIHtcbiAgICAgICAgcHJpb3JpdHk6IDEwMDAsXG4gICAgICAgIGhhbmRsZXI6IHRoaXMudG9vbHRpcFByb3ZpZGVyLFxuICAgICAgICBldmVudFR5cGVzOiBbVVBJLlRFdmVudFJhbmdlVHlwZS5tb3VzZSwgVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZF0sXG4gICAgICB9KSxcbiAgICAgIHBsdWdpbk1hbmFnZXIuYWRkRWRpdG9yQ29udHJvbGxlcihDUkVkaXRvckNvbnRyb2wpLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwcml2YXRlIHRvb2x0aXBQcm92aWRlciA9IChlZGl0b3I6IFRleHRFZGl0b3IsIGNyYW5nZTogUmFuZ2UsIHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGUpOiBVUEkuSVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyXG4gICAgICA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyVHlwZTxDUkVkaXRvckNvbnRyb2wsIHR5cGVvZiBDUkVkaXRvckNvbnRyb2w+KFxuICAgICAgICBDUkVkaXRvckNvbnRyb2wsIGVkaXRvcixcbiAgICAgIClcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gICAgaWYgKHR5cGUgPT09IFVQSS5URXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRcbiAgICAgICYmIGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwub25DdXJzb3JNb3ZlJywge3Njb3BlOiBlZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpfSkgIT09ICdTaG93IFRvb2x0aXAnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIGNvbnN0IG1zZyA9IGNvbnRyb2xsZXIuZ2V0TWVzc2FnZUF0KGNyYW5nZS5zdGFydCwgdHlwZSlcbiAgICBpZiAobXNnLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB7IHJhbmdlOiBjcmFuZ2UsIHRleHQ6IG1zZyB9XG4gICAgfVxuICB9XG59XG4iXX0=