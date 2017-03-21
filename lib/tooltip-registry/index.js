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
            for (const { pluginName, handler } of this.providers) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQW1CaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLE1BQU0sbUJBQUksVUFBVSxJQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNK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TUFBZTtRQUM3RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUE7UUFBQyxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRWEsc0JBQXNCLENBQUUsTUFBa0IsRUFBRSxJQUFxQixFQUFFLE1BQWE7O1lBQzVGLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQztvQkFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtvQkFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixRQUFRLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFDLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUMzRCxRQUFRLENBQUE7Z0JBQ1YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXBGRCwwQ0FvRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3IsIERpc3Bvc2FibGUsIFJhbmdlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtUTWVzc2FnZSwgTWVzc2FnZU9iamVjdH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtbWFuYWdlcidcbmltcG9ydCB7VFBvc2l0aW9ufSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEZ1bmN0aW9uID0gKGNyYW5nZTogUmFuZ2UpID0+IElUb29sdGlwRGF0YSB8IFByb21pc2U8SVRvb2x0aXBEYXRhPlxuZXhwb3J0IHR5cGUgVFJhbmdlID0gUmFuZ2UgfCBbVFBvc2l0aW9uLCBUUG9zaXRpb25dXG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwRGF0YSB7XG4gIHJhbmdlOiBUUmFuZ2VcbiAgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdXG4gIHBlcnNpc3RPbkN1cnNvck1vdmU/OiBib29sZWFuXG59XG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXIgPVxuICAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUpXG4gID0+IElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCB8IFByb21pc2U8SVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPlxuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXJTcGVjID0ge3ByaW9yaXR5OiBudW1iZXIsIGhhbmRsZXI6IFRUb29sdGlwSGFuZGxlcn1cbmV4cG9ydCB0eXBlIFRUb29sdGlwU3BlYyA9IHtwbHVnaW5OYW1lOiBzdHJpbmcsIHRvb2x0aXA6IFRUb29sdGlwRnVuY3Rpb24gfCBJVG9vbHRpcERhdGF9XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHtwbHVnaW5OYW1lOiBzdHJpbmd9PlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlciAocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoe3ByaW9yaXR5fSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCByZWNvcmQgPSB7cGx1Z2luTmFtZSwgLi4ucHJvdmlkZXJ9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBzcGVjPzogVFRvb2x0aXBTcGVjXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgbGV0IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhXG4gICAgaWYgKHNwZWMgJiYgdHlwZW9mIHNwZWMudG9vbHRpcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdG9vbHRpcERhdGEgPSBzcGVjLnRvb2x0aXBcbiAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFldmVudFJhbmdlKSB7IHJldHVybiB9XG4gICAgICBpZiAoc3BlYyAmJiB0eXBlb2Ygc3BlYy50b29sdGlwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBsdWdpbk5hbWUgPSBzcGVjLnBsdWdpbk5hbWVcbiAgICAgICAgdG9vbHRpcERhdGEgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoc3BlYy50b29sdGlwKGV2ZW50UmFuZ2UuY3JhbmdlKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSBhd2FpdCB0aGlzLmRlZmF1bHRUb29sdGlwRnVuY3Rpb24oZWRpdG9yLCB0eXBlLCBldmVudFJhbmdlLmNyYW5nZSlcbiAgICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgICAgLy8gaWYgbm9ib2R5IHdhbnRzIHRvIHNob3cgYW55dGhpbmcsIG1pZ2h0IGFzIHdlbGwgaGlkZS4uLlxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgZG9lc24ndCBzZWVtIGxpa2UgYSBwYXJ0aWN1bGFybHkgYnJpZ2h0IGlkZWE/XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX0gPSB0b29sdGlwKVxuICAgICAgfVxuICAgICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIH1cbiAgICBjb25zdCB7cGVyc2lzdE9uQ3Vyc29yTW92ZSA9IGZhbHNlfSA9IHRvb2x0aXBEYXRhXG4gICAgbGV0IG1zZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2x0aXBEYXRhLnRleHQpKSB7XG4gICAgICBtc2cgPSB0b29sdGlwRGF0YS50ZXh0Lm1hcChNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QuYmluZChNZXNzYWdlT2JqZWN0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnRleHQpXG4gICAgfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuc2hvdyhcbiAgICAgIFJhbmdlLmZyb21PYmplY3QodG9vbHRpcERhdGEucmFuZ2UpLCBtc2csIHR5cGUsIHBsdWdpbk5hbWUsIHtwZXJzaXN0T25DdXJzb3JNb3ZlfVxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBoaWRlVG9vbHRpcCAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlPzogVEV2ZW50UmFuZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSh0eXBlLCBzb3VyY2UpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRlZmF1bHRUb29sdGlwRnVuY3Rpb24gKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBjcmFuZ2U6IFJhbmdlKSB7XG4gICAgZm9yIChjb25zdCB7cGx1Z2luTmFtZSwgaGFuZGxlcn0gb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIoZWRpdG9yLCBjcmFuZ2UsIHR5cGUpKVxuICAgICAgICBpZiAoIXRvb2x0aXBEYXRhKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBlKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19