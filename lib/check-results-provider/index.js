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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE2RDtBQUs3RCxxREFBa0Q7QUFHbEQ7SUFFRSxZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWtCeEMsb0JBQWUsR0FBRyxDQUN4QixNQUFrQixFQUNsQixNQUFhLEVBQ2IsSUFBcUIsRUFDUSxFQUFFO1lBQy9CLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUdsRCxnQ0FBZSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQ0QsSUFBSSxlQUE2QjtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUU7b0JBQzFDLEtBQUssRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUU7aUJBQ3ZDLENBQUMsS0FBSyxjQUNULENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN2RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ3JDLENBQUM7WUFDRCxNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ2xCLENBQUMsQ0FBQTtRQTFDQyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsZUFBZSxDQUFBO1FBRXJELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixlQUFlLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hELFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQzdCLFVBQVUsRUFBRSxxQkFBaUQ7U0FDOUQsQ0FBQyxFQUNGLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZSxDQUFDLENBQ25ELENBQUE7SUFDSCxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztDQTRCRjtBQTlDRCxvREE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5nZSwgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCBURXZlbnRSYW5nZVR5cGUgPSBVUEkuVEV2ZW50UmFuZ2VUeXBlXG5cbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IENSRWRpdG9yQ29udHJvbCB9IGZyb20gJy4vZWRpdG9yLWNvbnRyb2wnXG5pbXBvcnQgeyBJVG9vbHRpcERhdGFFeHQgfSBmcm9tICcuLi90b29sdGlwLXJlZ2lzdHJ5J1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tSZXN1bHRzUHJvdmlkZXIge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIGNvbnN0IHRvb2x0aXBSZWdpc3RyeSA9IHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgdG9vbHRpcFJlZ2lzdHJ5LnJlZ2lzdGVyKCdidWlsdGluOmNoZWNrLXJlc3VsdHMnLCB7XG4gICAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgICBoYW5kbGVyOiB0aGlzLnRvb2x0aXBQcm92aWRlcixcbiAgICAgICAgZXZlbnRUeXBlczogW1RFdmVudFJhbmdlVHlwZS5tb3VzZSwgVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXSxcbiAgICAgIH0pLFxuICAgICAgcGx1Z2luTWFuYWdlci5hZGRFZGl0b3JDb250cm9sbGVyKENSRWRpdG9yQ29udHJvbCksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHByaXZhdGUgdG9vbHRpcFByb3ZpZGVyID0gKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvcixcbiAgICBjcmFuZ2U6IFJhbmdlLFxuICAgIHR5cGU6IFRFdmVudFJhbmdlVHlwZSxcbiAgKTogSVRvb2x0aXBEYXRhRXh0IHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXJUeXBlPFxuICAgICAgQ1JFZGl0b3JDb250cm9sLFxuICAgICAgdHlwZW9mIENSRWRpdG9yQ29udHJvbFxuICAgID4oQ1JFZGl0b3JDb250cm9sLCBlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIGlmIChcbiAgICAgIHR5cGUgPT09IFRFdmVudFJhbmdlVHlwZS5rZXlib2FyZCAmJlxuICAgICAgYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5vbkN1cnNvck1vdmUnLCB7XG4gICAgICAgIHNjb3BlOiBlZGl0b3IuZ2V0Um9vdFNjb3BlRGVzY3JpcHRvcigpLFxuICAgICAgfSkgIT09ICdTaG93IFRvb2x0aXAnXG4gICAgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIGNvbnN0IG1zZyA9IGNvbnRyb2xsZXIuZ2V0TWVzc2FnZUF0KGNyYW5nZS5zdGFydCwgdHlwZSlcbiAgICBpZiAobXNnLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB7IHJhbmdlOiBjcmFuZ2UsIHRleHQ6IG1zZyB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuIl19