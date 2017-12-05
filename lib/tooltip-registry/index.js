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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQW9EO0FBQ3BELG9DQUF3QztBQWV4QztJQUVFLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxVQUFrQixFQUFFLFFBQTZCO1FBQy9ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRixNQUFNLFVBQVUsR0FBc0Isc0JBQWtELENBQUE7UUFDeEYsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzFCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQyxHQUFHLEVBQUU7WUFD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SCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixRQUFRLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLENBQUE7Z0JBQ3BDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtvQkFDbkYsUUFBUSxDQUFBO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFyR0QsMENBcUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2UgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTWVzc2FnZU9iamVjdCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJ2F0b20taGFza2VsbC11cGknXG5pbXBvcnQgVEV2ZW50UmFuZ2VUeXBlID0gVVBJLlRFdmVudFJhbmdlVHlwZVxuXG5leHBvcnQgaW50ZXJmYWNlIFRUb29sdGlwSGFuZGxlclNwZWMge1xuICBwcmlvcml0eTogbnVtYmVyXG4gIGhhbmRsZXI6IFVQSS5UVG9vbHRpcEhhbmRsZXJcbiAgZXZlbnRUeXBlcz86IFRFdmVudFJhbmdlVHlwZVtdXG59XG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwU3BlYyB7XG4gIHBsdWdpbk5hbWU6IHN0cmluZ1xuICB0b29sdGlwOiBVUEkuVFRvb2x0aXBGdW5jdGlvbiB8IFVQSS5JVG9vbHRpcERhdGFcbn1cblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBSZWdpc3RyeSB7XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBBcnJheTxUVG9vbHRpcEhhbmRsZXJTcGVjICYgeyBwbHVnaW5OYW1lOiBzdHJpbmcsIGV2ZW50VHlwZXM6IFRFdmVudFJhbmdlVHlwZVtdIH0+XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcikge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlcihwbHVnaW5OYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBUVG9vbHRpcEhhbmRsZXJTcGVjKTogRGlzcG9zYWJsZSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5wcm92aWRlcnMuZmluZEluZGV4KCh7IHByaW9yaXR5IH0pID0+IHByaW9yaXR5IDwgcHJvdmlkZXIucHJpb3JpdHkpXG4gICAgY29uc3QgZGVmYXVsdEV2VDogVEV2ZW50UmFuZ2VUeXBlW10gPSBbVEV2ZW50UmFuZ2VUeXBlLnNlbGVjdGlvbiwgVEV2ZW50UmFuZ2VUeXBlLm1vdXNlXVxuICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgIHBsdWdpbk5hbWUsXG4gICAgICBldmVudFR5cGVzOiBwcm92aWRlci5ldmVudFR5cGVzIHx8IGRlZmF1bHRFdlQsXG4gICAgICBwcmlvcml0eTogcHJvdmlkZXIucHJpb3JpdHksXG4gICAgICBoYW5kbGVyOiBwcm92aWRlci5oYW5kbGVyLFxuICAgIH1cbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgdGhpcy5wcm92aWRlcnMucHVzaChyZWNvcmQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpZHgsIDAsIHJlY29yZClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIGNvbnN0IGl4ID0gdGhpcy5wcm92aWRlcnMuaW5kZXhPZihyZWNvcmQpXG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaXgsIDEpXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93VG9vbHRpcChcbiAgICBlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSwgc3BlYz86IElUb29sdGlwU3BlYyxcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZTogc3RyaW5nXG4gICAgbGV0IHRvb2x0aXBEYXRhOiBVUEkuVFRvb2x0aXBGdW5jdGlvbiB8IFVQSS5JVG9vbHRpcERhdGFcbiAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0b29sdGlwRGF0YSA9IHNwZWMudG9vbHRpcFxuICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIWV2ZW50UmFuZ2UpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhzcGVjLnBsdWdpbk5hbWUsIHtcbiAgICAgICAgICAgIHN0YXR1czogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgICAgIGRldGFpbDogZS50b1N0cmluZygpLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBhd2FpdCB0aGlzLmRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yLCB0eXBlLCBldmVudFJhbmdlLmNyYW5nZSlcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgICAgLy8gaWYgbm9ib2R5IHdhbnRzIHRvIHNob3cgYW55dGhpbmcsIG1pZ2h0IGFzIHdlbGwgaGlkZS4uLlxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgZG9lc24ndCBzZWVtIGxpa2UgYSBwYXJ0aWN1bGFybHkgYnJpZ2h0IGlkZWE/XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHVuZGVmaW5lZCwgeyBwZXJzaXN0ZW50OiBmYWxzZSB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICh7IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhIH0gPSB0b29sdGlwKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIH1cbiAgICBjb25zdCB7IHBlcnNpc3RlbnQgPSBmYWxzZSB9ID0gdG9vbHRpcERhdGFcbiAgICBsZXQgbXNnXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbHRpcERhdGEudGV4dCkpIHtcbiAgICAgIG1zZyA9IHRvb2x0aXBEYXRhLnRleHQubWFwKE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdC5iaW5kKE1lc3NhZ2VPYmplY3QpKVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodG9vbHRpcERhdGEudGV4dClcbiAgICB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5zaG93KFxuICAgICAgUmFuZ2UuZnJvbU9iamVjdCh0b29sdGlwRGF0YS5yYW5nZSksIG1zZywgdHlwZSwgcGx1Z2luTmFtZSwgeyBwZXJzaXN0ZW50IH0sXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGhpZGVUb29sdGlwKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZT86IFRFdmVudFJhbmdlVHlwZSwgc291cmNlPzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSwgc291cmNlKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBjcmFuZ2U6IFJhbmdlKSB7XG4gICAgZm9yIChjb25zdCB7IHBsdWdpbk5hbWUsIGhhbmRsZXIsIGV2ZW50VHlwZXMgfSBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgaWYgKCFldmVudFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIoZWRpdG9yLCBjcmFuZ2UsIHR5cGUpKVxuICAgICAgICBpZiAoIXRvb2x0aXBEYXRhKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwbHVnaW5OYW1lLCB0b29sdGlwRGF0YSB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMucGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHsgc3RhdHVzOiAnd2FybmluZycsIGRldGFpbDogYCR7ZX1gIH0pXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=