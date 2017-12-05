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
const UPI = require("atom-haskell-upi");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQW9EO0FBQ3BELG9DQUF3QztBQUV4Qyx3Q0FBdUM7QUFZdkM7SUFFRSxZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUMsVUFBa0IsRUFBRSxRQUE2QjtRQUMvRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEYsTUFBTSxVQUFVLEdBQTBCLHNCQUEwRCxDQUFBO1FBQ3BHLE1BQU0sTUFBTSxHQUFHO1lBQ2IsVUFBVTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxJQUFJLFVBQVU7WUFDN0MsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1lBQzNCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTztTQUMxQixDQUFBO1FBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMs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QUFJLENBQUM7b0JBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7b0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsUUFBUSxDQUFBO29CQUNWLENBQUM7b0JBQ0QsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFBO2dCQUNwQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQ25GLFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBckdELDBDQXFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IsIERpc3Bvc2FibGUsIFJhbmdlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IE1lc3NhZ2VPYmplY3QgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFRUb29sdGlwSGFuZGxlclNwZWMge1xuICBwcmlvcml0eTogbnVtYmVyXG4gIGhhbmRsZXI6IFVQSS5UVG9vbHRpcEhhbmRsZXJcbiAgZXZlbnRUeXBlcz86IFVQSS5URXZlbnRSYW5nZVR5cGVbXVxufVxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcFNwZWMge1xuICBwbHVnaW5OYW1lOiBzdHJpbmdcbiAgdG9vbHRpcDogVVBJLlRUb29sdGlwRnVuY3Rpb24gfCBVUEkuSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHsgcGx1Z2luTmFtZTogc3RyaW5nLCBldmVudFR5cGVzOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gfT5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyKHBsdWdpbk5hbWU6IHN0cmluZywgcHJvdmlkZXI6IFRUb29sdGlwSGFuZGxlclNwZWMpOiBEaXNwb3NhYmxlIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLnByb3ZpZGVycy5maW5kSW5kZXgoKHsgcHJpb3JpdHkgfSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCBkZWZhdWx0RXZUOiBVUEkuVEV2ZW50UmFuZ2VUeXBlW10gPSBbVVBJLlRFdmVudFJhbmdlVHlwZS5zZWxlY3Rpb24sIFVQSS5URXZlbnRSYW5nZVR5cGUubW91c2VdXG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgcGx1Z2luTmFtZSxcbiAgICAgIGV2ZW50VHlwZXM6IHByb3ZpZGVyLmV2ZW50VHlwZXMgfHwgZGVmYXVsdEV2VCxcbiAgICAgIHByaW9yaXR5OiBwcm92aWRlci5wcmlvcml0eSxcbiAgICAgIGhhbmRsZXI6IHByb3ZpZGVyLmhhbmRsZXIsXG4gICAgfVxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHJlY29yZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGlkeCwgMCwgcmVjb3JkKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgY29uc3QgaXggPSB0aGlzLnByb3ZpZGVycy5pbmRleE9mKHJlY29yZClcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpeCwgMSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNob3dUb29sdGlwKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZSwgc3BlYz86IElUb29sdGlwU3BlYyxcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZTogc3RyaW5nXG4gICAgbGV0IHRvb2x0aXBEYXRhOiBVUEkuVFRvb2x0aXBGdW5jdGlvbiB8IFVQSS5JVG9vbHRpcERhdGFcbiAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0b29sdGlwRGF0YSA9IHNwZWMudG9vbHRpcFxuICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIWV2ZW50UmFuZ2UpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHNwZWMudG9vbHRpcChldmVudFJhbmdlLmNyYW5nZSkpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhzcGVjLnBsdWdpbk5hbWUsIHtcbiAgICAgICAgICAgIHN0YXR1czogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgICAgIGRldGFpbDogZS50b1N0cmluZygpLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBhd2FpdCB0aGlzLmRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yLCB0eXBlLCBldmVudFJhbmdlLmNyYW5nZSlcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgICAgLy8gaWYgbm9ib2R5IHdhbnRzIHRvIHNob3cgYW55dGhpbmcsIG1pZ2h0IGFzIHdlbGwgaGlkZS4uLlxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgZG9lc24ndCBzZWVtIGxpa2UgYSBwYXJ0aWN1bGFybHkgYnJpZ2h0IGlkZWE/XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHVuZGVmaW5lZCwgeyBwZXJzaXN0ZW50OiBmYWxzZSB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICh7IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhIH0gPSB0b29sdGlwKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIH1cbiAgICBjb25zdCB7IHBlcnNpc3RlbnQgPSBmYWxzZSB9ID0gdG9vbHRpcERhdGFcbiAgICBsZXQgbXNnXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbHRpcERhdGEudGV4dCkpIHtcbiAgICAgIG1zZyA9IHRvb2x0aXBEYXRhLnRleHQubWFwKE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdC5iaW5kKE1lc3NhZ2VPYmplY3QpKVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodG9vbHRpcERhdGEudGV4dClcbiAgICB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5zaG93KFxuICAgICAgUmFuZ2UuZnJvbU9iamVjdCh0b29sdGlwRGF0YS5yYW5nZSksIG1zZywgdHlwZSwgcGx1Z2luTmFtZSwgeyBwZXJzaXN0ZW50IH0sXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGhpZGVUb29sdGlwKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZT86IFVQSS5URXZlbnRSYW5nZVR5cGUsIHNvdXJjZT86IHN0cmluZykge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHNvdXJjZSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGUsIGNyYW5nZTogUmFuZ2UpIHtcbiAgICBmb3IgKGNvbnN0IHsgcGx1Z2luTmFtZSwgaGFuZGxlciwgZXZlbnRUeXBlcyB9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZXMuaW5jbHVkZXModHlwZSkpIHsgY29udGludWUgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoaGFuZGxlcihlZGl0b3IsIGNyYW5nZSwgdHlwZSkpXG4gICAgICAgIGlmICghdG9vbHRpcERhdGEpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwgeyBzdGF0dXM6ICd3YXJuaW5nJywgZGV0YWlsOiBgJHtlfWAgfSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==