"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const UPI = require("atom-haskell-upi");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBQ2Isd0NBQXVDO0FBR3ZDLHFEQUFrRDtBQUVsRDtJQUVFLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBa0J4QyxvQkFBZSxHQUFHLENBQUMsTUFBa0IsRUFBRSxNQUFhLEVBQUUsSUFBeUIsRUFBZ0MsRUFBRTtZQUN2SCxNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FDakMsZ0NBQWUsRUFBRSxNQUFNLENBQ3hCLENBQUE7WUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxlQUFpQzttQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hILE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN2RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ3JDLENBQUM7UUFDSCxDQUFDLENBQUE7UUEvQkMsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQTtRQUVyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoRCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtZQUM3QixVQUFVLEVBQUUscUJBQXlEO1NBQ3RFLENBQUMsRUFDRixhQUFhLENBQUMsbUJBQW1CLENBQUMsZ0NBQWUsQ0FBQyxDQUNuRCxDQUFBO0lBQ0gsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FpQkY7QUFuQ0Qsb0RBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmFuZ2UsIFRleHRFZGl0b3IsIENvbXBvc2l0ZURpc3Bvc2FibGUsXG59IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgQ1JFZGl0b3JDb250cm9sIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcblxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdWx0c1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCB0b29sdGlwUmVnaXN0cnkgPSBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIHRvb2x0aXBSZWdpc3RyeS5yZWdpc3RlcignYnVpbHRpbjpjaGVjay1yZXN1bHRzJywge1xuICAgICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgICAgaGFuZGxlcjogdGhpcy50b29sdGlwUHJvdmlkZXIsXG4gICAgICAgIGV2ZW50VHlwZXM6IFtVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLCBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXSxcbiAgICAgIH0pLFxuICAgICAgcGx1Z2luTWFuYWdlci5hZGRFZGl0b3JDb250cm9sbGVyKENSRWRpdG9yQ29udHJvbCksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFByb3ZpZGVyID0gKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSk6IFVQSS5JVG9vbHRpcERhdGEgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXJcbiAgICAgID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXJUeXBlPENSRWRpdG9yQ29udHJvbCwgdHlwZW9mIENSRWRpdG9yQ29udHJvbD4oXG4gICAgICAgIENSRWRpdG9yQ29udHJvbCwgZWRpdG9yLFxuICAgICAgKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgICBpZiAodHlwZSA9PT0gVVBJLlRFdmVudFJhbmdlVHlwZS5rZXlib2FyZFxuICAgICAgJiYgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vbkN1cnNvck1vdmUnLCB7IHNjb3BlOiBlZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpIH0pICE9PSAnU2hvdyBUb29sdGlwJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBjb25zdCBtc2cgPSBjb250cm9sbGVyLmdldE1lc3NhZ2VBdChjcmFuZ2Uuc3RhcnQsIHR5cGUpXG4gICAgaWYgKG1zZy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4geyByYW5nZTogY3JhbmdlLCB0ZXh0OiBtc2cgfVxuICAgIH1cbiAgfVxufVxuIl19