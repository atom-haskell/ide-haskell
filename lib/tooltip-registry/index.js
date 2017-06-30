"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("../utils");
class TooltipRegistry {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.providers = [];
    }
    dispose() {
        this.providers = [];
    }
    register(pluginName, provider) {
        const idx = this.providers.findIndex(({ priority }) => priority < provider.priority);
        const defaultEvT = ['selection', 'mouse'];
        const record = {
            pluginName,
            eventTypes: provider.eventTypes || defaultEvT,
            priority: provider.priority,
            handler: provider.handler
        };
        if (idx === -1) {
            this.providers.push(record);
        }
        else {
            this.providers.splice(idx, 0, record);
        }
        return new atom_1.Disposable(() => {
            const ix = this.providers.indexOf(record);
            this.providers.splice(ix, 1);
        });
    }
    showTooltip(editor, type, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = this.pluginManager.controller(editor);
            if (!controller) {
                return;
            }
            let pluginName, tooltipData;
            if (spec && typeof spec.tooltip !== 'function') {
                tooltipData = spec.tooltip;
                pluginName = spec.pluginName;
            }
            else {
                const eventRange = controller.getEventRange(type);
                if (!eventRange) {
                    return;
                }
                if (spec && typeof spec.tooltip === 'function') {
                    pluginName = spec.pluginName;
                    tooltipData = yield Promise.resolve(spec.tooltip(eventRange.crange));
                }
                else {
                    const tooltip = yield this.defaultTooltipFunction(editor, type, eventRange.crange);
                    if (!tooltip) {
                        controller.tooltips.hide(type);
                        return;
                    }
                    ({ pluginName, tooltipData } = tooltip);
                }
                const newEventRange = controller.getEventRange(type);
                if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) {
                    return;
                }
            }
            const { persistOnCursorMove = false } = tooltipData;
            let msg;
            if (Array.isArray(tooltipData.text)) {
                msg = tooltipData.text.map(utils_1.MessageObject.fromObject.bind(utils_1.MessageObject));
            }
            else {
                msg = utils_1.MessageObject.fromObject(tooltipData.text);
            }
            controller.tooltips.show(atom_1.Range.fromObject(tooltipData.range), msg, type, pluginName, { persistOnCursorMove });
        });
    }
    hideTooltip(editor, type, source) {
        const controller = this.pluginManager.controller(editor);
        if (!controller) {
            return;
        }
        controller.tooltips.hide(type, source);
    }
    defaultTooltipFunction(editor, type, crange) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const { pluginName, handler, eventTypes } of this.providers) {
                if (!eventTypes.includes(type)) {
                    continue;
                }
                try {
                    const tooltipData = yield Promise.resolve(handler(editor, crange, type));
                    if (!tooltipData) {
                        continue;
                    }
                    return { pluginName, tooltipData };
                }
                catch (e) {
                    this.pluginManager.outputPanel.backendStatus(pluginName, { status: 'warning', detail: `${e}` });
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQXVCaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLFVBQVUsR0FBc0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDNUQsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzFCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztZQUNw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Q0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQTtvQkFDN0YsUUFBUSxDQUFBO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUEzRkQsMENBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RWRpdG9yLCBEaXNwb3NhYmxlLCBSYW5nZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7VE1lc3NhZ2UsIE1lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7VEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC90b29sdGlwLW1hbmFnZXInXG5pbXBvcnQge1RQb3NpdGlvbn0gZnJvbSAnLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IHR5cGUgVFRvb2x0aXBGdW5jdGlvbiA9IChjcmFuZ2U6IFJhbmdlKSA9PiBJVG9vbHRpcERhdGEgfCBQcm9taXNlPElUb29sdGlwRGF0YT5cbmV4cG9ydCB0eXBlIFRSYW5nZSA9IFJhbmdlIHwgW1RQb3NpdGlvbiwgVFBvc2l0aW9uXVxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcERhdGEge1xuICByYW5nZTogVFJhbmdlXG4gIHRleHQ6IFRNZXNzYWdlIHwgVE1lc3NhZ2VbXVxuICBwZXJzaXN0T25DdXJzb3JNb3ZlPzogYm9vbGVhblxufVxuZXhwb3J0IHR5cGUgVFRvb2x0aXBIYW5kbGVyID1cbiAgKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlKVxuICA9PiBJVG9vbHRpcERhdGEgfCB1bmRlZmluZWQgfCBQcm9taXNlPElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD5cblxuZXhwb3J0IGludGVyZmFjZSBUVG9vbHRpcEhhbmRsZXJTcGVjIHtcbiAgcHJpb3JpdHk6IG51bWJlclxuICBoYW5kbGVyOiBUVG9vbHRpcEhhbmRsZXJcbiAgZXZlbnRUeXBlcz86IFRFdmVudFJhbmdlVHlwZVtdXG59XG5leHBvcnQgdHlwZSBUVG9vbHRpcFNwZWMgPSB7cGx1Z2luTmFtZTogc3RyaW5nLCB0b29sdGlwOiBUVG9vbHRpcEZ1bmN0aW9uIHwgSVRvb2x0aXBEYXRhfVxuXG5leHBvcnQgY2xhc3MgVG9vbHRpcFJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBwcm92aWRlcnM6IEFycmF5PFRUb29sdGlwSGFuZGxlclNwZWMgJiB7cGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBURXZlbnRSYW5nZVR5cGVbXX0+XG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSAoKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyIChwbHVnaW5OYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBUVG9vbHRpcEhhbmRsZXJTcGVjKTogRGlzcG9zYWJsZSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5wcm92aWRlcnMuZmluZEluZGV4KCh7cHJpb3JpdHl9KSA9PiBwcmlvcml0eSA8IHByb3ZpZGVyLnByaW9yaXR5KVxuICAgIGNvbnN0IGRlZmF1bHRFdlQ6IFRFdmVudFJhbmdlVHlwZVtdID0gWydzZWxlY3Rpb24nLCAnbW91c2UnXVxuICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgIHBsdWdpbk5hbWUsXG4gICAgICBldmVudFR5cGVzOiBwcm92aWRlci5ldmVudFR5cGVzIHx8IGRlZmF1bHRFdlQsXG4gICAgICBwcmlvcml0eTogcHJvdmlkZXIucHJpb3JpdHksXG4gICAgICBoYW5kbGVyOiBwcm92aWRlci5oYW5kbGVyXG4gICAgfVxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHJlY29yZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGlkeCwgMCwgcmVjb3JkKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgY29uc3QgaXggPSB0aGlzLnByb3ZpZGVycy5pbmRleE9mKHJlY29yZClcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpeCwgMSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNob3dUb29sdGlwIChcbiAgICBlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSwgc3BlYz86IFRUb29sdGlwU3BlY1xuICApIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGxldCBwbHVnaW5OYW1lLCB0b29sdGlwRGF0YVxuICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRvb2x0aXBEYXRhID0gc3BlYy50b29sdGlwXG4gICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b29sdGlwID0gYXdhaXQgdGhpcy5kZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvciwgdHlwZSwgZXZlbnRSYW5nZS5jcmFuZ2UpXG4gICAgICAgIGlmICghdG9vbHRpcCkge1xuICAgICAgICAgIC8vIGlmIG5vYm9keSB3YW50cyB0byBzaG93IGFueXRoaW5nLCBtaWdodCBhcyB3ZWxsIGhpZGUuLi5cbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGRvZXNuJ3Qgc2VlbSBsaWtlIGEgcGFydGljdWxhcmx5IGJyaWdodCBpZGVhP1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICh7cGx1Z2luTmFtZSwgdG9vbHRpcERhdGF9ID0gdG9vbHRpcClcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0V2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghbmV3RXZlbnRSYW5nZSB8fCAhZXZlbnRSYW5nZS5jcmFuZ2UuaXNFcXVhbChuZXdFdmVudFJhbmdlLmNyYW5nZSkpIHsgcmV0dXJuIH1cbiAgICB9XG4gICAgY29uc3Qge3BlcnNpc3RPbkN1cnNvck1vdmUgPSBmYWxzZX0gPSB0b29sdGlwRGF0YVxuICAgIGxldCBtc2dcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sdGlwRGF0YS50ZXh0KSkge1xuICAgICAgbXNnID0gdG9vbHRpcERhdGEudGV4dC5tYXAoTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0LmJpbmQoTWVzc2FnZU9iamVjdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZyA9IE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdCh0b29sdGlwRGF0YS50ZXh0KVxuICAgIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLnNob3coXG4gICAgICBSYW5nZS5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnJhbmdlKSwgbXNnLCB0eXBlLCBwbHVnaW5OYW1lLCB7cGVyc2lzdE9uQ3Vyc29yTW92ZX1cbiAgICApXG4gIH1cblxuICBwdWJsaWMgaGlkZVRvb2x0aXAgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZT86IFRFdmVudFJhbmdlVHlwZSwgc291cmNlPzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgc291cmNlKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWZhdWx0VG9vbHRpcEZ1bmN0aW9uIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSwgY3JhbmdlOiBSYW5nZSkge1xuICAgIGZvciAoY29uc3Qge3BsdWdpbk5hbWUsIGhhbmRsZXIsIGV2ZW50VHlwZXN9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZXMuaW5jbHVkZXModHlwZSkpIHsgY29udGludWUgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoaGFuZGxlcihlZGl0b3IsIGNyYW5nZSwgdHlwZSkpXG4gICAgICAgIGlmICghdG9vbHRpcERhdGEpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cGx1Z2luTmFtZSwgdG9vbHRpcERhdGF9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMucGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHtzdGF0dXM6ICd3YXJuaW5nJywgZGV0YWlsOiBgJHtlfWB9KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19