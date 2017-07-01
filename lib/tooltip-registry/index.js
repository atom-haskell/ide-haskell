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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQTBCaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLFVBQVUsR0FBc0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDNUQsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzFCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztZQUNw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Q0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQTtvQkFDN0YsUUFBUSxDQUFBO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUEzRkQsMENBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RWRpdG9yLCBEaXNwb3NhYmxlLCBSYW5nZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7VE1lc3NhZ2UsIE1lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7VEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC90b29sdGlwLW1hbmFnZXInXG5pbXBvcnQge1RQb3NpdGlvbn0gZnJvbSAnLi4vcmVzdWx0cy1kYidcblxuZXhwb3J0IHR5cGUgVFRvb2x0aXBGdW5jdGlvbiA9IChjcmFuZ2U6IFJhbmdlKSA9PiBJVG9vbHRpcERhdGEgfCBQcm9taXNlPElUb29sdGlwRGF0YT5cbmV4cG9ydCB0eXBlIFRSYW5nZSA9IFJhbmdlIHwgW1RQb3NpdGlvbiwgVFBvc2l0aW9uXVxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcERhdGEge1xuICByYW5nZTogVFJhbmdlXG4gIHRleHQ6IFRNZXNzYWdlIHwgVE1lc3NhZ2VbXVxuICBwZXJzaXN0T25DdXJzb3JNb3ZlPzogYm9vbGVhblxufVxuZXhwb3J0IHR5cGUgVFRvb2x0aXBIYW5kbGVyID1cbiAgKGVkaXRvcjogVGV4dEVkaXRvciwgY3JhbmdlOiBSYW5nZSwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlKVxuICA9PiBJVG9vbHRpcERhdGEgfCB1bmRlZmluZWQgfCBQcm9taXNlPElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZD5cblxuZXhwb3J0IGludGVyZmFjZSBUVG9vbHRpcEhhbmRsZXJTcGVjIHtcbiAgcHJpb3JpdHk6IG51bWJlclxuICBoYW5kbGVyOiBUVG9vbHRpcEhhbmRsZXJcbiAgZXZlbnRUeXBlcz86IFRFdmVudFJhbmdlVHlwZVtdXG59XG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwU3BlYyB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICB0b29sdGlwOiBUVG9vbHRpcEZ1bmN0aW9uIHwgSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHtwbHVnaW5OYW1lOiBzdHJpbmcsIGV2ZW50VHlwZXM6IFRFdmVudFJhbmdlVHlwZVtdfT5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlICgpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIgKHBsdWdpbk5hbWU6IHN0cmluZywgcHJvdmlkZXI6IFRUb29sdGlwSGFuZGxlclNwZWMpOiBEaXNwb3NhYmxlIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnByb3ZpZGVycy5maW5kSW5kZXgoKHtwcmlvcml0eX0pID0+IHByaW9yaXR5IDwgcHJvdmlkZXIucHJpb3JpdHkpXG4gICAgY29uc3QgZGVmYXVsdEV2VDogVEV2ZW50UmFuZ2VUeXBlW10gPSBbJ3NlbGVjdGlvbicsICdtb3VzZSddXG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgcGx1Z2luTmFtZSxcbiAgICAgIGV2ZW50VHlwZXM6IHByb3ZpZGVyLmV2ZW50VHlwZXMgfHwgZGVmYXVsdEV2VCxcbiAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgIGhhbmRsZXI6IHByb3ZpZGVyLmhhbmRsZXJcbiAgICB9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBzcGVjPzogSVRvb2x0aXBTcGVjXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgbGV0IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhXG4gICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdG9vbHRpcERhdGEgPSBzcGVjLnRvb2x0aXBcbiAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFldmVudFJhbmdlKSB7IHJldHVybiB9XG4gICAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICAgICAgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoc3BlYy50b29sdGlwKGV2ZW50UmFuZ2UuY3JhbmdlKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBhd2FpdCB0aGlzLmRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yLCB0eXBlLCBldmVudFJhbmdlLmNyYW5nZSlcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgICAgLy8gaWYgbm9ib2R5IHdhbnRzIHRvIHNob3cgYW55dGhpbmcsIG1pZ2h0IGFzIHdlbGwgaGlkZS4uLlxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgZG9lc24ndCBzZWVtIGxpa2UgYSBwYXJ0aWN1bGFybHkgYnJpZ2h0IGlkZWE/XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX0gPSB0b29sdGlwKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIH1cbiAgICBjb25zdCB7cGVyc2lzdE9uQ3Vyc29yTW92ZSA9IGZhbHNlfSA9IHRvb2x0aXBEYXRhXG4gICAgbGV0IG1zZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2x0aXBEYXRhLnRleHQpKSB7XG4gICAgICBtc2cgPSB0b29sdGlwRGF0YS50ZXh0Lm1hcChNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QuYmluZChNZXNzYWdlT2JqZWN0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnRleHQpXG4gICAgfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuc2hvdyhcbiAgICAgIFJhbmdlLmZyb21PYmplY3QodG9vbHRpcERhdGEucmFuZ2UpLCBtc2csIHR5cGUsIHBsdWdpbk5hbWUsIHtwZXJzaXN0T25DdXJzb3JNb3ZlfVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBoaWRlVG9vbHRpcCAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlPzogVEV2ZW50UmFuZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlLCBzb3VyY2UpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRlZmF1bHRUb29sdGlwRnVuY3Rpb24gKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBjcmFuZ2U6IFJhbmdlKSB7XG4gICAgZm9yIChjb25zdCB7cGx1Z2luTmFtZSwgaGFuZGxlciwgZXZlbnRUeXBlc30gb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgIGlmICghZXZlbnRUeXBlcy5pbmNsdWRlcyh0eXBlKSkgeyBjb250aW51ZSB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShoYW5kbGVyKGVkaXRvciwgY3JhbmdlLCB0eXBlKSlcbiAgICAgICAgaWYgKCF0b29sdGlwRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwge3N0YXR1czogJ3dhcm5pbmcnLCBkZXRhaWw6IGAke2V9YH0pXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=