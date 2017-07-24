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
                    tooltipData = yield Promise.resolve(spec.tooltip(eventRange.crange));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFzQztBQWF0QztJQUVFLFlBQXFCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBRSxVQUFrQixFQUFFLFFBQTZCO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2xGLE1BQU0sVUFBVSxHQUEwQixzQkFBMEQsQ0FBQTtRQUNwRyxNQUFNLE1BQU0sR0FBRztZQUNiLFVBQVU7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVO1lBQzdDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDMUIsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElB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QyxDQUFDO29CQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFBO29CQUNqRixRQUFRLENBQUE7Z0JBQ1YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQTNGRCwwQ0EyRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3IsIERpc3Bvc2FibGUsIFJhbmdlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtNZXNzYWdlT2JqZWN0fSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgVFRvb2x0aXBIYW5kbGVyU3BlYyB7XG4gIHByaW9yaXR5OiBudW1iZXJcbiAgaGFuZGxlcjogVVBJLlRUb29sdGlwSGFuZGxlclxuICBldmVudFR5cGVzPzogVVBJLlRFdmVudFJhbmdlVHlwZVtdXG59XG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwU3BlYyB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICB0b29sdGlwOiBVUEkuVFRvb2x0aXBGdW5jdGlvbiB8IFVQSS5JVG9vbHRpcERhdGFcbn1cblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBSZWdpc3RyeSB7XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBBcnJheTxUVG9vbHRpcEhhbmRsZXJTcGVjICYge3BsdWdpbk5hbWU6IHN0cmluZywgZXZlbnRUeXBlczogVVBJLlRFdmVudFJhbmdlVHlwZVtdfT5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlICgpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIgKHBsdWdpbk5hbWU6IHN0cmluZywgcHJvdmlkZXI6IFRUb29sdGlwSGFuZGxlclNwZWMpOiBEaXNwb3NhYmxlIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnByb3ZpZGVycy5maW5kSW5kZXgoKHtwcmlvcml0eX0pID0+IHByaW9yaXR5IDwgcHJvdmlkZXIucHJpb3JpdHkpXG4gICAgY29uc3QgZGVmYXVsdEV2VDogVVBJLlRFdmVudFJhbmdlVHlwZVtdID0gW1VQSS5URXZlbnRSYW5nZVR5cGUuc2VsZWN0aW9uLCBVUEkuVEV2ZW50UmFuZ2VUeXBlLm1vdXNlXVxuICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgIHBsdWdpbk5hbWUsXG4gICAgICBldmVudFR5cGVzOiBwcm92aWRlci5ldmVudFR5cGVzIHx8IGRlZmF1bHRFdlQsXG4gICAgICBwcmlvcml0eTogcHJvdmlkZXIucHJpb3JpdHksXG4gICAgICBoYW5kbGVyOiBwcm92aWRlci5oYW5kbGVyXG4gICAgfVxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHJlY29yZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGlkeCwgMCwgcmVjb3JkKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgY29uc3QgaXggPSB0aGlzLnByb3ZpZGVycy5pbmRleE9mKHJlY29yZClcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpeCwgMSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNob3dUb29sdGlwIChcbiAgICBlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGUsIHNwZWM/OiBJVG9vbHRpcFNwZWNcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGE6IFVQSS5UVG9vbHRpcEZ1bmN0aW9uIHwgVVBJLklUb29sdGlwRGF0YVxuICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRvb2x0aXBEYXRhID0gc3BlYy50b29sdGlwXG4gICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b29sdGlwID0gYXdhaXQgdGhpcy5kZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvciwgdHlwZSwgZXZlbnRSYW5nZS5jcmFuZ2UpXG4gICAgICAgIGlmICghdG9vbHRpcCkge1xuICAgICAgICAgIC8vIGlmIG5vYm9keSB3YW50cyB0byBzaG93IGFueXRoaW5nLCBtaWdodCBhcyB3ZWxsIGhpZGUuLi5cbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGRvZXNuJ3Qgc2VlbSBsaWtlIGEgcGFydGljdWxhcmx5IGJyaWdodCBpZGVhP1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlLCB1bmRlZmluZWQsIHtwZXJzaXN0ZW50OiBmYWxzZX0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX0gPSB0b29sdGlwKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIH1cbiAgICBjb25zdCB7cGVyc2lzdGVudCA9IGZhbHNlfSA9IHRvb2x0aXBEYXRhXG4gICAgbGV0IG1zZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2x0aXBEYXRhLnRleHQpKSB7XG4gICAgICBtc2cgPSB0b29sdGlwRGF0YS50ZXh0Lm1hcChNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QuYmluZChNZXNzYWdlT2JqZWN0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnRleHQpXG4gICAgfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuc2hvdyhcbiAgICAgIFJhbmdlLmZyb21PYmplY3QodG9vbHRpcERhdGEucmFuZ2UpLCBtc2csIHR5cGUsIHBsdWdpbk5hbWUsIHtwZXJzaXN0ZW50fVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBoaWRlVG9vbHRpcCAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlPzogVVBJLlRFdmVudFJhbmdlVHlwZSwgc291cmNlPzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgc291cmNlKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWZhdWx0VG9vbHRpcEZ1bmN0aW9uIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGUsIGNyYW5nZTogUmFuZ2UpIHtcbiAgICBmb3IgKGNvbnN0IHtwbHVnaW5OYW1lLCBoYW5kbGVyLCBldmVudFR5cGVzfSBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgaWYgKCFldmVudFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIoZWRpdG9yLCBjcmFuZ2UsIHR5cGUpKVxuICAgICAgICBpZiAoIXRvb2x0aXBEYXRhKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCB7c3RhdHVzOiAnd2FybmluZycsIGRldGFpbDogYCR7ZX1gfSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==