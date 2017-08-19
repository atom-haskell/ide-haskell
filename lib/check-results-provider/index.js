"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const editor_control_1 = require("./editor-control");
class CheckResultsProvider {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        const tooltipRegistry = pluginManager.tooltipRegistry;
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(tooltipRegistry.register('builtin:check-results', {
            priority: 1000,
            handler: this.tooltipProvider.bind(this),
            eventTypes: ["mouse", "keyboard"],
        }), pluginManager.addEditorController(editor_control_1.CREditorControl));
    }
    destroy() {
        this.disposables.dispose();
    }
    tooltipProvider(editor, crange, type) {
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
    }
}
exports.CheckResultsProvider = CheckResultsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBR2IscURBQWtEO0FBRWxEO0lBRUUsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDOUMsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLGVBQWUsQ0FBQTtRQUVyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUNoRCxRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEMsVUFBVSxFQUFFLHFCQUF5RDtTQUN0RSxDQUFDLEVBQ0YsYUFBYSxDQUFDLG1CQUFtQixDQUFDLGdDQUFlLENBQUMsQ0FDbkQsQ0FBQTtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU8sZUFBZSxDQUFDLE1BQWtCLEVBQUUsTUFBYSxFQUFFLElBQXlCO1FBQ2xGLE1BQU0sVUFBVSxHQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUNqQyxnQ0FBZSxFQUFFLE1BQU0sQ0FDeEIsQ0FBQTtRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksZUFBaUM7ZUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sQ0FBQyxTQUFTLENBQUE7UUFDbEIsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDckMsQ0FBQztJQUNILENBQUM7Q0FDRjtBQW5DRCxvREFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSYW5nZSwgVGV4dEVkaXRvciwgQ29tcG9zaXRlRGlzcG9zYWJsZSxcbn0gZnJvbSAnYXRvbSdcblxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgQ1JFZGl0b3JDb250cm9sIH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcblxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdWx0c1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCB0b29sdGlwUmVnaXN0cnkgPSBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeVxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIHRvb2x0aXBSZWdpc3RyeS5yZWdpc3RlcignYnVpbHRpbjpjaGVjay1yZXN1bHRzJywge1xuICAgICAgICBwcmlvcml0eTogMTAwMCxcbiAgICAgICAgaGFuZGxlcjogdGhpcy50b29sdGlwUHJvdmlkZXIuYmluZCh0aGlzKSxcbiAgICAgICAgZXZlbnRUeXBlczogW1VQSS5URXZlbnRSYW5nZVR5cGUubW91c2UsIFVQSS5URXZlbnRSYW5nZVR5cGUua2V5Ym9hcmRdLFxuICAgICAgfSksXG4gICAgICBwbHVnaW5NYW5hZ2VyLmFkZEVkaXRvckNvbnRyb2xsZXIoQ1JFZGl0b3JDb250cm9sKSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwUHJvdmlkZXIoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBVUEkuVEV2ZW50UmFuZ2VUeXBlKTogVVBJLklUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29udHJvbGxlclxuICAgICAgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlclR5cGU8Q1JFZGl0b3JDb250cm9sLCB0eXBlb2YgQ1JFZGl0b3JDb250cm9sPihcbiAgICAgICAgQ1JFZGl0b3JDb250cm9sLCBlZGl0b3IsXG4gICAgICApXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgIGlmICh0eXBlID09PSBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXG4gICAgICAmJiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScpICE9PSAnU2hvdyBUb29sdGlwJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBjb25zdCBtc2cgPSBjb250cm9sbGVyLmdldE1lc3NhZ2VBdChjcmFuZ2Uuc3RhcnQsIHR5cGUpXG4gICAgaWYgKG1zZy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4geyByYW5nZTogY3JhbmdlLCB0ZXh0OiBtc2cgfVxuICAgIH1cbiAgfVxufVxuIl19