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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFzQztBQWF0QztJQUVFLFlBQXFCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBRSxVQUFrQixFQUFFLFFBQTZCO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2xGLE1BQU0sVUFBVSxHQUEwQixzQkFBMEQsQ0FBQTtRQUNwRyxNQUFNLE1BQU0sR0FBRztZQUNiLFVBQVU7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVO1lBQzdDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDMUIsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElB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T0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7b0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsUUFBUSxDQUFBO29CQUNWLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQyxDQUFBO2dCQUNsQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUE7b0JBQ2pGLFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBbkdELDBDQW1HQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2V9IGZyb20gJ2F0b20nXG5pbXBvcnQge01lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcblxuZXhwb3J0IGludGVyZmFjZSBUVG9vbHRpcEhhbmRsZXJTcGVjIHtcbiAgcHJpb3JpdHk6IG51bWJlclxuICBoYW5kbGVyOiBVUEkuVFRvb2x0aXBIYW5kbGVyXG4gIGV2ZW50VHlwZXM/OiBVUEkuVEV2ZW50UmFuZ2VUeXBlW11cbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRvb2x0aXBTcGVjIHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIHRvb2x0aXA6IFVQSS5UVG9vbHRpcEZ1bmN0aW9uIHwgVVBJLklUb29sdGlwRGF0YVxufVxuXG5leHBvcnQgY2xhc3MgVG9vbHRpcFJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBwcm92aWRlcnM6IEFycmF5PFRUb29sdGlwSGFuZGxlclNwZWMgJiB7cGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW119PlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlciAocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoe3ByaW9yaXR5fSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCBkZWZhdWx0RXZUOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gPSBbVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2VdXG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgcGx1Z2luTmFtZSxcbiAgICAgIGV2ZW50VHlwZXM6IHByb3ZpZGVyLmV2ZW50VHlwZXMgfHwgZGVmYXVsdEV2VCxcbiAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgIGhhbmRsZXI6IHByb3ZpZGVyLmhhbmRsZXJcbiAgICB9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgc3BlYz86IElUb29sdGlwU3BlY1xuICApIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGxldCBwbHVnaW5OYW1lLCB0b29sdGlwRGF0YTogVVBJLlRUb29sdGlwRnVuY3Rpb24gfCBVUEkuSVRvb2x0aXBEYXRhXG4gICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdG9vbHRpcERhdGEgPSBzcGVjLnRvb2x0aXBcbiAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFldmVudFJhbmdlKSB7IHJldHVybiB9XG4gICAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShzcGVjLnRvb2x0aXAoZXZlbnRSYW5nZS5jcmFuZ2UpKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLmJhY2tlbmRTdGF0dXMoc3BlYy5wbHVnaW5OYW1lLCB7XG4gICAgICAgICAgICBzdGF0dXM6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgIGRldGFpbDogZS50b1N0cmluZygpLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBhd2FpdCB0aGlzLmRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yLCB0eXBlLCBldmVudFJhbmdlLmNyYW5nZSlcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgICAgLy8gaWYgbm9ib2R5IHdhbnRzIHRvIHNob3cgYW55dGhpbmcsIG1pZ2h0IGFzIHdlbGwgaGlkZS4uLlxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgZG9lc24ndCBzZWVtIGxpa2UgYSBwYXJ0aWN1bGFybHkgYnJpZ2h0IGlkZWE/XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHVuZGVmaW5lZCwge3BlcnNpc3RlbnQ6IGZhbHNlfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAoe3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfSA9IHRvb2x0aXApXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdFdmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIW5ld0V2ZW50UmFuZ2UgfHwgIWV2ZW50UmFuZ2UuY3JhbmdlLmlzRXF1YWwobmV3RXZlbnRSYW5nZS5jcmFuZ2UpKSB7IHJldHVybiB9XG4gICAgfVxuICAgIGNvbnN0IHtwZXJzaXN0ZW50ID0gZmFsc2V9ID0gdG9vbHRpcERhdGFcbiAgICBsZXQgbXNnXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbHRpcERhdGEudGV4dCkpIHtcbiAgICAgIG1zZyA9IHRvb2x0aXBEYXRhLnRleHQubWFwKE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdC5iaW5kKE1lc3NhZ2VPYmplY3QpKVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodG9vbHRpcERhdGEudGV4dClcbiAgICB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5zaG93KFxuICAgICAgUmFuZ2UuZnJvbU9iamVjdCh0b29sdGlwRGF0YS5yYW5nZSksIG1zZywgdHlwZSwgcGx1Z2luTmFtZSwge3BlcnNpc3RlbnR9XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGhpZGVUb29sdGlwIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU/OiBVUEkuVEV2ZW50UmFuZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlLCBzb3VyY2UpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRlZmF1bHRUb29sdGlwRnVuY3Rpb24gKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgY3JhbmdlOiBSYW5nZSkge1xuICAgIGZvciAoY29uc3Qge3BsdWdpbk5hbWUsIGhhbmRsZXIsIGV2ZW50VHlwZXN9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZXMuaW5jbHVkZXModHlwZSkpIHsgY29udGludWUgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoaGFuZGxlcihlZGl0b3IsIGNyYW5nZSwgdHlwZSkpXG4gICAgICAgIGlmICghdG9vbHRpcERhdGEpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cGx1Z2luTmFtZSwgdG9vbHRpcERhdGF9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMucGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHtzdGF0dXM6ICd3YXJuaW5nJywgZGV0YWlsOiBgJHtlfWB9KVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19