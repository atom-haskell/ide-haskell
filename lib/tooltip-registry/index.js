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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQXFFO0FBQ3JFLG9DQUF3QztBQXlCeEM7SUFFRSxZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUMsVUFBa0IsRUFBRSxRQUE2QjtRQUMvRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEYsTUFBTSxVQUFVLEdBQXNCLHNCQUFrRCxDQUFBO1FBQ3hGLE1BQU0sTUFBTSxHQUFHO1lBQ2IsVUFBVTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLFVBQVU7WUFDN0MsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztTQUMxQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsR0FBRyxFQUFFO1lB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Q0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7b0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsUUFBUSxDQUFBO29CQUNWLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFBO2dCQUNwQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQ25GLFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBckdELDBDQXFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IsIERpc3Bvc2FibGUsIFJhbmdlLCBSYW5nZUNvbXBhdGlibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTWVzc2FnZU9iamVjdCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgVEV2ZW50UmFuZ2VUeXBlID0gVVBJLlRFdmVudFJhbmdlVHlwZVxuXG5leHBvcnQgaW50ZXJmYWNlIFRUb29sdGlwSGFuZGxlclNwZWMge1xuICBwcmlvcml0eTogbnVtYmVyXG4gIGhhbmRsZXI6IFRUb29sdGlwSGFuZGxlckV4dFxuICBldmVudFR5cGVzPzogVEV2ZW50UmFuZ2VUeXBlW11cbn1cbmV4cG9ydCB0eXBlIFRUb29sdGlwSGFuZGxlckV4dCA9XG4gICAgKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlKSA9PiBJVG9vbHRpcERhdGFFeHRcbiAgfCB1bmRlZmluZWRcbiAgfCBQcm9taXNlPElUb29sdGlwRGF0YUV4dCB8IHVuZGVmaW5lZD5cbmV4cG9ydCBpbnRlcmZhY2UgSVRvb2x0aXBTcGVjIHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIHRvb2x0aXA6IFRUb29sdGlwRnVuY3Rpb25FeHQgfCBJVG9vbHRpcERhdGFFeHRcbn1cbmV4cG9ydCB0eXBlIFRUb29sdGlwRnVuY3Rpb25FeHQgPSAoY3JhbmdlOiBSYW5nZSkgPT4gSVRvb2x0aXBEYXRhRXh0IHwgUHJvbWlzZTxJVG9vbHRpcERhdGFFeHQ+XG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwRGF0YUV4dCB7XG4gIHJhbmdlOiBSYW5nZUNvbXBhdGlibGVcbiAgdGV4dDogVVBJLlRTaW5nbGVPckFycmF5PFVQSS5UTWVzc2FnZSB8IE1lc3NhZ2VPYmplY3Q+XG4gIHBlcnNpc3RlbnQ/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHsgcGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBURXZlbnRSYW5nZVR5cGVbXSB9PlxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoeyBwcmlvcml0eSB9KSA9PiBwcmlvcml0eSA8IHByb3ZpZGVyLnByaW9yaXR5KVxuICAgIGNvbnN0IGRlZmF1bHRFdlQ6IFRFdmVudFJhbmdlVHlwZVtdID0gW1RFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sIFRFdmVudFJhbmdlVHlwZS5tb3VzZV1cbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICBwbHVnaW5OYW1lLFxuICAgICAgZXZlbnRUeXBlczogcHJvdmlkZXIuZXZlbnRUeXBlcyB8fCBkZWZhdWx0RXZULFxuICAgICAgcHJpb3JpdHk6IHByb3ZpZGVyLnByaW9yaXR5LFxuICAgICAgaGFuZGxlcjogcHJvdmlkZXIuaGFuZGxlcixcbiAgICB9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAoXG4gICAgZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUsIHNwZWM/OiBJVG9vbHRpcFNwZWMsXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgbGV0IHBsdWdpbk5hbWU6IHN0cmluZ1xuICAgIGxldCB0b29sdGlwRGF0YTogVFRvb2x0aXBGdW5jdGlvbkV4dCB8IElUb29sdGlwRGF0YUV4dFxuICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRvb2x0aXBEYXRhID0gc3BlYy50b29sdGlwXG4gICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoc3BlYy50b29sdGlwKGV2ZW50UmFuZ2UuY3JhbmdlKSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMucGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHNwZWMucGx1Z2luTmFtZSwge1xuICAgICAgICAgICAgc3RhdHVzOiAnd2FybmluZycsXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICAgICAgICAgICAgZGV0YWlsOiBlLnRvU3RyaW5nKCksXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGF3YWl0IHRoaXMuZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3IsIHR5cGUsIGV2ZW50UmFuZ2UuY3JhbmdlKVxuICAgICAgICBpZiAoIXRvb2x0aXApIHtcbiAgICAgICAgICAvLyBpZiBub2JvZHkgd2FudHMgdG8gc2hvdyBhbnl0aGluZywgbWlnaHQgYXMgd2VsbCBoaWRlLi4uXG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBkb2Vzbid0IHNlZW0gbGlrZSBhIHBhcnRpY3VsYXJseSBicmlnaHQgaWRlYT9cbiAgICAgICAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgdW5kZWZpbmVkLCB7IHBlcnNpc3RlbnQ6IGZhbHNlIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgKHsgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGEgfSA9IHRvb2x0aXApXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdFdmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIW5ld0V2ZW50UmFuZ2UgfHwgIWV2ZW50UmFuZ2UuY3JhbmdlLmlzRXF1YWwobmV3RXZlbnRSYW5nZS5jcmFuZ2UpKSB7IHJldHVybiB9XG4gICAgfVxuICAgIGNvbnN0IHsgcGVyc2lzdGVudCA9IGZhbHNlIH0gPSB0b29sdGlwRGF0YVxuICAgIGxldCBtc2dcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sdGlwRGF0YS50ZXh0KSkge1xuICAgICAgbXNnID0gdG9vbHRpcERhdGEudGV4dC5tYXAoTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0LmJpbmQoTWVzc2FnZU9iamVjdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZyA9IE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdCh0b29sdGlwRGF0YS50ZXh0KVxuICAgIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLnNob3coXG4gICAgICBSYW5nZS5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnJhbmdlKSwgbXNnLCB0eXBlLCBwbHVnaW5OYW1lLCB7IHBlcnNpc3RlbnQgfSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgaGlkZVRvb2x0aXAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlPzogVEV2ZW50UmFuZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlLCBzb3VyY2UpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUsIGNyYW5nZTogUmFuZ2UpIHtcbiAgICBmb3IgKGNvbnN0IHsgcGx1Z2luTmFtZSwgaGFuZGxlciwgZXZlbnRUeXBlcyB9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZXMuaW5jbHVkZXModHlwZSkpIHsgY29udGludWUgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoaGFuZGxlcihlZGl0b3IsIGNyYW5nZSwgdHlwZSkpXG4gICAgICAgIGlmICghdG9vbHRpcERhdGEpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwgeyBzdGF0dXM6ICd3YXJuaW5nJywgZGV0YWlsOiBgJHtlfWAgfSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==