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
        const record = Object.assign({ pluginName }, provider);
        console.error(...this.providers);
        if (idx === -1) {
            this.providers.push(record);
        }
        else {
            this.providers.splice(idx, 0, record);
        }
        console.error(...this.providers);
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
            const eventRange = controller.getEventRange(type);
            if (!eventRange) {
                return;
            }
            if (spec) {
                let tooltip;
                ({ pluginName, tooltip } = spec);
                tooltipData = yield Promise.resolve(tooltip(eventRange.crange));
            }
            else {
                const tooltip = yield this.defaultTooltipFunction(editor, type, eventRange.crange);
                if (!tooltip) {
                    return;
                }
                ({ pluginName, tooltipData } = tooltip);
            }
            const newEventRange = controller.getEventRange(type);
            if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) {
                return;
            }
            const { persistOnCursorMove = false } = tooltipData;
            let msg;
            if (Array.isArray(tooltipData.text)) {
                msg = tooltipData.text.map(utils_1.MessageObject.fromObject.bind(utils_1.MessageObject));
            }
            else {
                msg = utils_1.MessageObject.fromObject(tooltipData.text);
            }
            controller.tooltips.show(tooltipData.range, msg, type, pluginName, { persistOnCursorMove });
        });
    }
    defaultTooltipFunction(editor, type = 'mouse', crange) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const { pluginName, handler } of this.providers) {
                try {
                    const tooltipData = yield Promise.resolve(handler(editor, crange, type));
                    if (!tooltipData) {
                        continue;
                    }
                    return { pluginName, tooltipData };
                }
                catch (e) {
                    this.pluginManager.outputView.backendStatus(pluginName, e);
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQWlCaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLE1BQU0sbUJBQUksVUFBVSxJQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEMsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztZQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFD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QUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLFFBQVEsQ0FBQTtvQkFDVixDQUFDO29CQUNELE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsQ0FBQTtnQkFDbEMsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzFELFFBQVEsQ0FBQTtnQkFDVixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBdkVELDBDQXVFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvciwgRGlzcG9zYWJsZSwgUmFuZ2V9IGZyb20gJ2F0b20nXG5pbXBvcnQge1RNZXNzYWdlLCBNZXNzYWdlT2JqZWN0fSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEZ1bmN0aW9uID0gKGNyYW5nZTogUmFuZ2UpID0+IElUb29sdGlwRGF0YSB8IFByb21pc2U8SVRvb2x0aXBEYXRhPlxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcERhdGEge1xuICByYW5nZTogUmFuZ2VcbiAgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdXG4gIHBlcnNpc3RPbkN1cnNvck1vdmU/OiBib29sZWFuXG59XG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXIgPVxuICAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUpXG4gID0+IElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCB8IFByb21pc2U8SVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPlxuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXJTcGVjID0ge3ByaW9yaXR5OiBudW1iZXIsIGhhbmRsZXI6IFRUb29sdGlwSGFuZGxlcn1cbnR5cGUgVFRvb2x0aXBTcGVjID0ge3BsdWdpbk5hbWU6IHN0cmluZywgdG9vbHRpcDogVFRvb2x0aXBGdW5jdGlvbn1cblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBSZWdpc3RyeSB7XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBBcnJheTxUVG9vbHRpcEhhbmRsZXJTcGVjICYge3BsdWdpbk5hbWU6IHN0cmluZ30+XG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSAoKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyIChwbHVnaW5OYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBUVG9vbHRpcEhhbmRsZXJTcGVjKTogRGlzcG9zYWJsZSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5wcm92aWRlcnMuZmluZEluZGV4KCh7cHJpb3JpdHl9KSA9PiBwcmlvcml0eSA8IHByb3ZpZGVyLnByaW9yaXR5KVxuICAgIGNvbnN0IHJlY29yZCA9IHtwbHVnaW5OYW1lLCAuLi5wcm92aWRlcn1cbiAgICBjb25zb2xlLmVycm9yKC4uLnRoaXMucHJvdmlkZXJzKVxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKHJlY29yZClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGlkeCwgMCwgcmVjb3JkKVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKC4uLnRoaXMucHJvdmlkZXJzKVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBzcGVjPzogVFRvb2x0aXBTcGVjXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgbGV0IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhXG4gICAgY29uc3QgZXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgIGlmIChzcGVjKSB7XG4gICAgICBsZXQgdG9vbHRpcFxuICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwfSA9IHNwZWMpXG4gICAgICB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0b29sdGlwKGV2ZW50UmFuZ2UuY3JhbmdlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9vbHRpcCA9IGF3YWl0IHRoaXMuZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3IsIHR5cGUsIGV2ZW50UmFuZ2UuY3JhbmdlKVxuICAgICAgaWYgKCF0b29sdGlwKSB7IHJldHVybiB9XG4gICAgICAoe3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfSA9IHRvb2x0aXApXG4gICAgfVxuICAgIGNvbnN0IG5ld0V2ZW50UmFuZ2UgPSBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICBpZiAoIW5ld0V2ZW50UmFuZ2UgfHwgIWV2ZW50UmFuZ2UuY3JhbmdlLmlzRXF1YWwobmV3RXZlbnRSYW5nZS5jcmFuZ2UpKSB7IHJldHVybiB9XG4gICAgY29uc3Qge3BlcnNpc3RPbkN1cnNvck1vdmUgPSBmYWxzZX0gPSB0b29sdGlwRGF0YVxuICAgIGxldCBtc2dcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sdGlwRGF0YS50ZXh0KSkge1xuICAgICAgbXNnID0gdG9vbHRpcERhdGEudGV4dC5tYXAoTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0LmJpbmQoTWVzc2FnZU9iamVjdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1zZyA9IE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdCh0b29sdGlwRGF0YS50ZXh0KVxuICAgIH1cbiAgICBjb250cm9sbGVyLnRvb2x0aXBzLnNob3coXG4gICAgICB0b29sdGlwRGF0YS5yYW5nZSwgbXNnLCB0eXBlLCBwbHVnaW5OYW1lLCB7cGVyc2lzdE9uQ3Vyc29yTW92ZX1cbiAgICApXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRlZmF1bHRUb29sdGlwRnVuY3Rpb24gKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlID0gJ21vdXNlJywgY3JhbmdlOiBSYW5nZSkge1xuICAgIGZvciAoY29uc3Qge3BsdWdpbk5hbWUsIGhhbmRsZXJ9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShoYW5kbGVyKGVkaXRvciwgY3JhbmdlLCB0eXBlKSlcbiAgICAgICAgaWYgKCF0b29sdGlwRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLm91dHB1dFZpZXcuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBlKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19