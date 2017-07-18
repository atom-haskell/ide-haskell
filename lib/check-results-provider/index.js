"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const editor_control_1 = require("./editor-control");
class CheckResultsProvider {
    constructor(editor, pluginManager) {
        const tooltipRegistry = pluginManager.tooltipRegistry;
        this.editorMap = new WeakMap();
        this.disposables = new atom_1.CompositeDisposable();
        this.disposables.add(tooltipRegistry.register('builtin:check-results', {
            priority: 1000,
            handler: this.tooltipProvider.bind(this),
            eventTypes: ["mouse", "keyboard"],
        }));
        pluginManager.addEditorController(editor_control_1.CREditorControl, this.editorMap);
    }
    destroy() {
        this.disposables.dispose();
    }
    tooltipProvider(editor, crange, type) {
        const controller = this.editorMap.get(editor);
        if (!controller) {
            return;
        }
        if (type === "keyboard"
            && atom.config.get('ide-haskell.onCursorMove') !== 'Show Tooltip') {
            return;
        }
        const msg = controller.getMessageAt(crange.start, type);
        if (msg.length > 0) {
            return { range: crange, text: msg };
        }
    }
}
exports.CheckResultsProvider = CheckResultsProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2stcmVzdWx0cy1wcm92aWRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUVhO0FBR2IscURBQWdEO0FBRWhEO0lBR0UsWUFBYSxNQUFrQixFQUFFLGFBQTRCO1FBQzNELE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxlQUFlLENBQUE7UUFFckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDckUsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3hDLFVBQVUsRUFBRSxxQkFBeUQ7U0FDdEUsQ0FBQyxDQUFDLENBQUE7UUFDSCxhQUFhLENBQUMsbUJBQW1CLENBQUMsZ0NBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFTyxlQUFlLENBQUUsTUFBa0IsRUFBRSxNQUFhLEVBQUUsSUFBeUI7UUFDbkYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFBO1FBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLGVBQWlDO2VBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUE7UUFDVixDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNyQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBaENELG9EQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFJhbmdlLCBUZXh0RWRpdG9yLCBDb21wb3NpdGVEaXNwb3NhYmxlXG59IGZyb20gJ2F0b20nXG5cbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge0NSRWRpdG9yQ29udHJvbH0gZnJvbSAnLi9lZGl0b3ItY29udHJvbCdcblxuZXhwb3J0IGNsYXNzIENoZWNrUmVzdWx0c1Byb3ZpZGVyIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZVxuICBwcml2YXRlIGVkaXRvck1hcDogV2Vha01hcDxUZXh0RWRpdG9yLCBDUkVkaXRvckNvbnRyb2w+XG4gIGNvbnN0cnVjdG9yIChlZGl0b3I6IFRleHRFZGl0b3IsIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICBjb25zdCB0b29sdGlwUmVnaXN0cnkgPSBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeVxuXG4gICAgdGhpcy5lZGl0b3JNYXAgPSBuZXcgV2Vha01hcCgpXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZCh0b29sdGlwUmVnaXN0cnkucmVnaXN0ZXIoJ2J1aWx0aW46Y2hlY2stcmVzdWx0cycsIHtcbiAgICAgIHByaW9yaXR5OiAxMDAwLFxuICAgICAgaGFuZGxlcjogdGhpcy50b29sdGlwUHJvdmlkZXIuYmluZCh0aGlzKSxcbiAgICAgIGV2ZW50VHlwZXM6IFtVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlLCBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXSxcbiAgICB9KSlcbiAgICBwbHVnaW5NYW5hZ2VyLmFkZEVkaXRvckNvbnRyb2xsZXIoQ1JFZGl0b3JDb250cm9sLCB0aGlzLmVkaXRvck1hcClcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSB0b29sdGlwUHJvdmlkZXIgKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSk6IFVQSS5JVG9vbHRpcERhdGEgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLmVkaXRvck1hcC5nZXQoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGlmICh0eXBlID09PSBVUEkuVEV2ZW50UmFuZ2VUeXBlLmtleWJvYXJkXG4gICAgICAmJiBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLm9uQ3Vyc29yTW92ZScpICE9PSAnU2hvdyBUb29sdGlwJykge1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgbXNnID0gY29udHJvbGxlci5nZXRNZXNzYWdlQXQoY3JhbmdlLnN0YXJ0LCB0eXBlKVxuICAgIGlmIChtc2cubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHsgcmFuZ2U6IGNyYW5nZSwgdGV4dDogbXNnIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==