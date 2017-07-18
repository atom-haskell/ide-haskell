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
                    this.pluginManager.backendStatus(pluginName, { status: 'warning', detail: `${e}` });
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFzQztBQWF0QztJQUVFLFlBQXFCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBRSxVQUFrQixFQUFFLFFBQTZCO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2xGLE1BQU0sVUFBVSxHQUEwQixzQkFBMEQsQ0FBQTtRQUNwRyxNQUFNLE1BQU0sR0FBRztZQUNiLFVBQVU7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsSUFBSSxVQUFVO1lBQzdDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87U0FDMUIsQ0FBQTtRQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElB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LENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUE7b0JBQ2pGLFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBM0ZELDBDQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2V9IGZyb20gJ2F0b20nXG5pbXBvcnQge01lc3NhZ2VPYmplY3R9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcblxuZXhwb3J0IGludGVyZmFjZSBUVG9vbHRpcEhhbmRsZXJTcGVjIHtcbiAgcHJpb3JpdHk6IG51bWJlclxuICBoYW5kbGVyOiBVUEkuVFRvb2x0aXBIYW5kbGVyXG4gIGV2ZW50VHlwZXM/OiBVUEkuVEV2ZW50UmFuZ2VUeXBlW11cbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRvb2x0aXBTcGVjIHtcbiAgcGx1Z2luTmFtZTogc3RyaW5nXG4gIHRvb2x0aXA6IFVQSS5UVG9vbHRpcEZ1bmN0aW9uIHwgVVBJLklUb29sdGlwRGF0YVxufVxuXG5leHBvcnQgY2xhc3MgVG9vbHRpcFJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBwcm92aWRlcnM6IEFycmF5PFRUb29sdGlwSGFuZGxlclNwZWMgJiB7cGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW119PlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlciAocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoe3ByaW9yaXR5fSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCBkZWZhdWx0RXZUOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gPSBbVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2VdXG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgcGx1Z2luTmFtZSxcbiAgICAgIGV2ZW50VHlwZXM6IHByb3ZpZGVyLmV2ZW50VHlwZXMgfHwgZGVmYXVsdEV2VCxcbiAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgIGhhbmRsZXI6IHByb3ZpZGVyLmhhbmRsZXJcbiAgICB9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgc3BlYz86IElUb29sdGlwU3BlY1xuICApIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGxldCBwbHVnaW5OYW1lLCB0b29sdGlwRGF0YVxuICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRvb2x0aXBEYXRhID0gc3BlYy50b29sdGlwXG4gICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwbHVnaW5OYW1lID0gc3BlYy5wbHVnaW5OYW1lXG4gICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b29sdGlwID0gYXdhaXQgdGhpcy5kZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvciwgdHlwZSwgZXZlbnRSYW5nZS5jcmFuZ2UpXG4gICAgICAgIGlmICghdG9vbHRpcCkge1xuICAgICAgICAgIC8vIGlmIG5vYm9keSB3YW50cyB0byBzaG93IGFueXRoaW5nLCBtaWdodCBhcyB3ZWxsIGhpZGUuLi5cbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGRvZXNuJ3Qgc2VlbSBsaWtlIGEgcGFydGljdWxhcmx5IGJyaWdodCBpZGVhP1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICh7cGx1Z2luTmFtZSwgdG9vbHRpcERhdGF9ID0gdG9vbHRpcClcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0V2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICAgIGlmICghbmV3RXZlbnRSYW5nZSB8fCAhZXZlbnRSYW5nZS5jcmFuZ2UuaXNFcXVhbChuZXdFdmVudFJhbmdlLmNyYW5nZSkpIHsgcmV0dXJuIH1cbiAgICB9XG4gICAgY29uc3Qge3BlcnNpc3RPbkN1cnNvck1vdmUgPSBmYWxzZX0gPSB0b29sdGlwRGF0YVxuICAgIGxldCBtc2dcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sdGlwRGF0YS50ZXh0KSkge1xuICAgICAgbXNnID0gdG9vbHRpcERhdGEudGV4dC5tYXAoTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0LmJpbmQoTWVzc2FnZU9iamVjdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZyA9IE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdCh0b29sdGlwRGF0YS50ZXh0KVxuICAgIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLnNob3coXG4gICAgICBSYW5nZS5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnJhbmdlKSwgbXNnLCB0eXBlLCBwbHVnaW5OYW1lLCB7cGVyc2lzdE9uQ3Vyc29yTW92ZX1cbiAgICApXG4gIH1cblxuICBwdWJsaWMgaGlkZVRvb2x0aXAgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZT86IFVQSS5URXZlbnRSYW5nZVR5cGUsIHNvdXJjZT86IHN0cmluZykge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHNvdXJjZSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVmYXVsdFRvb2x0aXBGdW5jdGlvbiAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBVUEkuVEV2ZW50UmFuZ2VUeXBlLCBjcmFuZ2U6IFJhbmdlKSB7XG4gICAgZm9yIChjb25zdCB7cGx1Z2luTmFtZSwgaGFuZGxlciwgZXZlbnRUeXBlc30gb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgIGlmICghZXZlbnRUeXBlcy5pbmNsdWRlcyh0eXBlKSkgeyBjb250aW51ZSB9XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShoYW5kbGVyKGVkaXRvciwgY3JhbmdlLCB0eXBlKSlcbiAgICAgICAgaWYgKCF0b29sdGlwRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwge3N0YXR1czogJ3dhcm5pbmcnLCBkZXRhaWw6IGAke2V9YH0pXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=