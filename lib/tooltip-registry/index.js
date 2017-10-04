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
        const defaultEvT = ["selection", "mouse"];
        const record = {
            pluginName,
            eventTypes: provider.eventTypes || defaultEvT,
            priority: provider.priority,
            handler: provider.handler,
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
            let pluginName;
            let tooltipData;
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
                    try {
                        tooltipData = yield Promise.resolve(spec.tooltip(eventRange.crange));
                    }
                    catch (e) {
                        this.pluginManager.backendStatus(spec.pluginName, {
                            status: 'warning',
                            detail: e.toString(),
                        });
                        return;
                    }
                }
                else {
                    const tooltip = yield this.defaultTooltipFunction(editor, type, eventRange.crange);
                    if (!tooltip) {
                        controller.tooltips.hide(type, undefined, { persistent: false });
                        return;
                    }
                    ({ pluginName, tooltipData } = tooltip);
                }
                const newEventRange = controller.getEventRange(type);
                if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) {
                    return;
                }
            }
            const { persistent = false } = tooltipData;
            let msg;
            if (Array.isArray(tooltipData.text)) {
                msg = tooltipData.text.map(utils_1.MessageObject.fromObject.bind(utils_1.MessageObject));
            }
            else {
                msg = utils_1.MessageObject.fromObject(tooltipData.text);
            }
            controller.tooltips.show(atom_1.Range.fromObject(tooltipData.range), msg, type, pluginName, { persistent });
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
                    this.pluginManager.backendStatus(pluginName, { status: 'warning', detail: `${e}` });
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQW9EO0FBQ3BELG9DQUF3QztBQWF4QztJQUVFLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxVQUFrQixFQUFFLFFBQTZCO1FBQy9ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRixNQUFNLFVBQVUsR0FBMEIsc0JBQTBELENBQUE7UUFDcEcsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzFCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7WUFD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SCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixRQUFRLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUE7Z0JBQ3BDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDbkYsUUFBUSxDQUFBO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFwR0QsMENBb0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTWVzc2FnZU9iamVjdCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFRUb29sdGlwSGFuZGxlclNwZWMge1xuICBwcmlvcml0eTogbnVtYmVyXG4gIGhhbmRsZXI6IFVQSS5UVG9vbHRpcEhhbmRsZXJcbiAgZXZlbnRUeXBlcz86IFVQSS5URXZlbnRSYW5nZVR5cGVbXVxufVxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcFNwZWMge1xuICBwbHVnaW5OYW1lOiBzdHJpbmdcbiAgdG9vbHRpcDogVVBJLlRUb29sdGlwRnVuY3Rpb24gfCBVUEkuSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHsgcGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gfT5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyKHBsdWdpbk5hbWU6IHN0cmluZywgcHJvdmlkZXI6IFRUb29sdGlwSGFuZGxlclNwZWMpOiBEaXNwb3NhYmxlIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnByb3ZpZGVycy5maW5kSW5kZXgoKHsgcHJpb3JpdHkgfSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCBkZWZhdWx0RXZUOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gPSBbVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2VdXG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgcGx1Z2luTmFtZSxcbiAgICAgIGV2ZW50VHlwZXM6IHByb3ZpZGVyLmV2ZW50VHlwZXMgfHwgZGVmYXVsdEV2VCxcbiAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgIGhhbmRsZXI6IHByb3ZpZGVyLmhhbmRsZXIsXG4gICAgfVxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHJlY29yZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGlkeCwgMCwgcmVjb3JkKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgY29uc3QgaXggPSB0aGlzLnByb3ZpZGVycy5pbmRleE9mKHJlY29yZClcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpeCwgMSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNob3dUb29sdGlwKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgc3BlYz86IElUb29sdGlwU3BlYyxcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZTogc3RyaW5nXG4gICAgbGV0IHRvb2x0aXBEYXRhOiBVUEkuVFRvb2x0aXBGdW5jdGlvbiB8IFVQSS5JVG9vbHRpcERhdGFcbiAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0b29sdGlwRGF0YSA9IHNwZWMudG9vbHRpcFxuICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIWV2ZW50UmFuZ2UpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhzcGVjLnBsdWdpbk5hbWUsIHtcbiAgICAgICAgICAgIHN0YXR1czogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgZGV0YWlsOiBlLnRvU3RyaW5nKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGF3YWl0IHRoaXMuZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3IsIHR5cGUsIGV2ZW50UmFuZ2UuY3JhbmdlKVxuICAgICAgICBpZiAoIXRvb2x0aXApIHtcbiAgICAgICAgICAvLyBpZiBub2JvZHkgd2FudHMgdG8gc2hvdyBhbnl0aGluZywgbWlnaHQgYXMgd2VsbCBoaWRlLi4uXG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBkb2Vzbid0IHNlZW0gbGlrZSBhIHBhcnRpY3VsYXJseSBicmlnaHQgaWRlYT9cbiAgICAgICAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgdW5kZWZpbmVkLCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgKHsgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGEgfSA9IHRvb2x0aXApXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdFdmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIW5ld0V2ZW50UmFuZ2UgfHwgIWV2ZW50UmFuZ2UuY3JhbmdlLmlzRXF1YWwobmV3RXZlbnRSYW5nZS5jcmFuZ2UpKSB7IHJldHVybiB9XG4gICAgfVxuICAgIGNvbnN0IHsgcGVyc2lzdGVudCA9IGZhbHNlIH0gPSB0b29sdGlwRGF0YVxuICAgIGxldCBtc2dcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sdGlwRGF0YS50ZXh0KSkge1xuICAgICAgbXNnID0gdG9vbHRpcERhdGEudGV4dC5tYXAoTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0LmJpbmQoTWVzc2FnZU9iamVjdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZyA9IE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdCh0b29sdGlwRGF0YS50ZXh0KVxuICAgIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLnNob3coXG4gICAgICBSYW5nZS5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnJhbmdlKSwgbXNnLCB0eXBlLCBwbHVnaW5OYW1lLCB7IHBlcnNpc3RlbnQgfSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgaGlkZVRvb2x0aXAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlPzogVVBJLlRFdmVudFJhbmdlVHlwZSwgc291cmNlPzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgc291cmNlKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgY3JhbmdlOiBSYW5nZSkge1xuICAgIGZvciAoY29uc3QgeyBwbHVnaW5OYW1lLCBoYW5kbGVyLCBldmVudFR5cGVzIH0gb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgIGlmICghZXZlbnRUeXBlcy5pbmNsdWRlcyh0eXBlKSkgeyBjb250aW51ZSB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShoYW5kbGVyKGVkaXRvciwgY3JhbmdlLCB0eXBlKSlcbiAgICAgICAgaWYgKCF0b29sdGlwRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGEgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCB7IHN0YXR1czogJ3dhcm5pbmcnLCBkZXRhaWw6IGAke2V9YCB9KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19