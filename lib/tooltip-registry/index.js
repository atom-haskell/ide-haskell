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
                    this.pluginManager.outputPanel.backendStatus(pluginName, e);
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQXVCaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLFVBQVUsR0FBc0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDNUQsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVO1lBQ1YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLElBQUksVUFBVTtZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1NBQzFCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztZQUNw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Q0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzNELFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBM0ZELDBDQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2V9IGZyb20gJ2F0b20nXG5pbXBvcnQge1RNZXNzYWdlLCBNZXNzYWdlT2JqZWN0fSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuaW1wb3J0IHtUUG9zaXRpb259IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5cbmV4cG9ydCB0eXBlIFRUb29sdGlwRnVuY3Rpb24gPSAoY3JhbmdlOiBSYW5nZSkgPT4gSVRvb2x0aXBEYXRhIHwgUHJvbWlzZTxJVG9vbHRpcERhdGE+XG5leHBvcnQgdHlwZSBUUmFuZ2UgPSBSYW5nZSB8IFtUUG9zaXRpb24sIFRQb3NpdGlvbl1cbmV4cG9ydCBpbnRlcmZhY2UgSVRvb2x0aXBEYXRhIHtcbiAgcmFuZ2U6IFRSYW5nZVxuICB0ZXh0OiBUTWVzc2FnZSB8IFRNZXNzYWdlW11cbiAgcGVyc2lzdE9uQ3Vyc29yTW92ZT86IGJvb2xlYW5cbn1cbmV4cG9ydCB0eXBlIFRUb29sdGlwSGFuZGxlciA9XG4gIChlZGl0b3I6IFRleHRFZGl0b3IsIGNyYW5nZTogUmFuZ2UsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSlcbiAgPT4gSVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkIHwgUHJvbWlzZTxJVG9vbHRpcERhdGEgfCB1bmRlZmluZWQ+XG5cbmV4cG9ydCBpbnRlcmZhY2UgVFRvb2x0aXBIYW5kbGVyU3BlYyB7XG4gIHByaW9yaXR5OiBudW1iZXJcbiAgaGFuZGxlcjogVFRvb2x0aXBIYW5kbGVyXG4gIGV2ZW50VHlwZXM/OiBURXZlbnRSYW5nZVR5cGVbXVxufVxuZXhwb3J0IHR5cGUgVFRvb2x0aXBTcGVjID0ge3BsdWdpbk5hbWU6IHN0cmluZywgdG9vbHRpcDogVFRvb2x0aXBGdW5jdGlvbiB8IElUb29sdGlwRGF0YX1cblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBSZWdpc3RyeSB7XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBBcnJheTxUVG9vbHRpcEhhbmRsZXJTcGVjICYge3BsdWdpbk5hbWU6IHN0cmluZywgZXZlbnRUeXBlczogVEV2ZW50UmFuZ2VUeXBlW119PlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlciAocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoe3ByaW9yaXR5fSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCBkZWZhdWx0RXZUOiBURXZlbnRSYW5nZVR5cGVbXSA9IFsnc2VsZWN0aW9uJywgJ21vdXNlJ11cbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICBwbHVnaW5OYW1lLFxuICAgICAgZXZlbnRUeXBlczogcHJvdmlkZXIuZXZlbnRUeXBlcyB8fCBkZWZhdWx0RXZULFxuICAgICAgcHJpb3JpdHk6IHByb3ZpZGVyLnByaW9yaXR5LFxuICAgICAgaGFuZGxlcjogcHJvdmlkZXIuaGFuZGxlclxuICAgIH1cbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgdGhpcy5wcm92aWRlcnMucHVzaChyZWNvcmQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnNwbGljZShpZHgsIDAsIHJlY29yZClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIGNvbnN0IGl4ID0gdGhpcy5wcm92aWRlcnMuaW5kZXhPZihyZWNvcmQpXG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaXgsIDEpXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93VG9vbHRpcCAoXG4gICAgZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUsIHNwZWM/OiBUVG9vbHRpcFNwZWNcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGFcbiAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0b29sdGlwRGF0YSA9IHNwZWMudG9vbHRpcFxuICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBldmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIWV2ZW50UmFuZ2UpIHsgcmV0dXJuIH1cbiAgICAgIGlmIChzcGVjICYmIHR5cGVvZiBzcGVjLnRvb2x0aXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcGx1Z2luTmFtZSA9IHNwZWMucGx1Z2luTmFtZVxuICAgICAgICB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShzcGVjLnRvb2x0aXAoZXZlbnRSYW5nZS5jcmFuZ2UpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdG9vbHRpcCA9IGF3YWl0IHRoaXMuZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3IsIHR5cGUsIGV2ZW50UmFuZ2UuY3JhbmdlKVxuICAgICAgICBpZiAoIXRvb2x0aXApIHtcbiAgICAgICAgICAvLyBpZiBub2JvZHkgd2FudHMgdG8gc2hvdyBhbnl0aGluZywgbWlnaHQgYXMgd2VsbCBoaWRlLi4uXG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBkb2Vzbid0IHNlZW0gbGlrZSBhIHBhcnRpY3VsYXJseSBicmlnaHQgaWRlYT9cbiAgICAgICAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUodHlwZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAoe3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfSA9IHRvb2x0aXApXG4gICAgICB9XG4gICAgICBjb25zdCBuZXdFdmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgICBpZiAoIW5ld0V2ZW50UmFuZ2UgfHwgIWV2ZW50UmFuZ2UuY3JhbmdlLmlzRXF1YWwobmV3RXZlbnRSYW5nZS5jcmFuZ2UpKSB7IHJldHVybiB9XG4gICAgfVxuICAgIGNvbnN0IHtwZXJzaXN0T25DdXJzb3JNb3ZlID0gZmFsc2V9ID0gdG9vbHRpcERhdGFcbiAgICBsZXQgbXNnXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbHRpcERhdGEudGV4dCkpIHtcbiAgICAgIG1zZyA9IHRvb2x0aXBEYXRhLnRleHQubWFwKE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdC5iaW5kKE1lc3NhZ2VPYmplY3QpKVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodG9vbHRpcERhdGEudGV4dClcbiAgICB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5zaG93KFxuICAgICAgUmFuZ2UuZnJvbU9iamVjdCh0b29sdGlwRGF0YS5yYW5nZSksIG1zZywgdHlwZSwgcGx1Z2luTmFtZSwge3BlcnNpc3RPbkN1cnNvck1vdmV9XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGhpZGVUb29sdGlwIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU/OiBURXZlbnRSYW5nZVR5cGUsIHNvdXJjZT86IHN0cmluZykge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUsIHNvdXJjZSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVmYXVsdFRvb2x0aXBGdW5jdGlvbiAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUsIGNyYW5nZTogUmFuZ2UpIHtcbiAgICBmb3IgKGNvbnN0IHtwbHVnaW5OYW1lLCBoYW5kbGVyLCBldmVudFR5cGVzfSBvZiB0aGlzLnByb3ZpZGVycykge1xuICAgICAgaWYgKCFldmVudFR5cGVzLmluY2x1ZGVzKHR5cGUpKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIoZWRpdG9yLCBjcmFuZ2UsIHR5cGUpKVxuICAgICAgICBpZiAoIXRvb2x0aXBEYXRhKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBlKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19