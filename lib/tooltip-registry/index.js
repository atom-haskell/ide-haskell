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
                    controller.tooltips.hide(type);
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
            controller.tooltips.show(atom_1.Range.fromObject(tooltipData.range), msg, type, pluginName, { persistOnCursorMove });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtEO0FBQ2xELG9DQUFnRDtBQW1CaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLE1BQU0sbUJBQUksVUFBVSxJQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNK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QTtvQkFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixRQUFRLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFDLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUMzRCxRQUFRLENBQUE7Z0JBQ1YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQTFFRCwwQ0EwRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3IsIERpc3Bvc2FibGUsIFJhbmdlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtUTWVzc2FnZSwgTWVzc2FnZU9iamVjdH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtbWFuYWdlcidcbmltcG9ydCB7VFBvc2l0aW9ufSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEZ1bmN0aW9uID0gKGNyYW5nZTogUmFuZ2UpID0+IElUb29sdGlwRGF0YSB8IFByb21pc2U8SVRvb2x0aXBEYXRhPlxuZXhwb3J0IHR5cGUgVFJhbmdlID0gUmFuZ2UgfCBbVFBvc2l0aW9uLCBUUG9zaXRpb25dXG5leHBvcnQgaW50ZXJmYWNlIElUb29sdGlwRGF0YSB7XG4gIHJhbmdlOiBUUmFuZ2VcbiAgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdXG4gIHBlcnNpc3RPbkN1cnNvck1vdmU/OiBib29sZWFuXG59XG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXIgPVxuICAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUpXG4gID0+IElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCB8IFByb21pc2U8SVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPlxuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXJTcGVjID0ge3ByaW9yaXR5OiBudW1iZXIsIGhhbmRsZXI6IFRUb29sdGlwSGFuZGxlcn1cbmV4cG9ydCB0eXBlIFRUb29sdGlwU3BlYyA9IHtwbHVnaW5OYW1lOiBzdHJpbmcsIHRvb2x0aXA6IFRUb29sdGlwRnVuY3Rpb259XG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVnaXN0cnkge1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VFRvb2x0aXBIYW5kbGVyU3BlYyAmIHtwbHVnaW5OYW1lOiBzdHJpbmd9PlxuICBjb25zdHJ1Y3RvciAocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMucHJvdmlkZXJzID0gW11cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlciAocGx1Z2luTmFtZTogc3RyaW5nLCBwcm92aWRlcjogVFRvb2x0aXBIYW5kbGVyU3BlYyk6IERpc3Bvc2FibGUge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvdmlkZXJzLmZpbmRJbmRleCgoe3ByaW9yaXR5fSkgPT4gcHJpb3JpdHkgPCBwcm92aWRlci5wcmlvcml0eSlcbiAgICBjb25zdCByZWNvcmQgPSB7cGx1Z2luTmFtZSwgLi4ucHJvdmlkZXJ9XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocmVjb3JkKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICBjb25zdCBpeCA9IHRoaXMucHJvdmlkZXJzLmluZGV4T2YocmVjb3JkKVxuICAgICAgdGhpcy5wcm92aWRlcnMuc3BsaWNlKGl4LCAxKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2hvd1Rvb2x0aXAgKFxuICAgIGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZTogVEV2ZW50UmFuZ2VUeXBlLCBzcGVjPzogVFRvb2x0aXBTcGVjXG4gICkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSB0aGlzLnBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgbGV0IHBsdWdpbk5hbWUsIHRvb2x0aXBEYXRhXG4gICAgY29uc3QgZXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIGlmICghZXZlbnRSYW5nZSkgeyByZXR1cm4gfVxuICAgIGlmIChzcGVjKSB7XG4gICAgICBsZXQgdG9vbHRpcFxuICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwfSA9IHNwZWMpXG4gICAgICB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0b29sdGlwKGV2ZW50UmFuZ2UuY3JhbmdlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9vbHRpcCA9IGF3YWl0IHRoaXMuZGVmYXVsdFRvb2x0aXBGdW5jdGlvbihlZGl0b3IsIHR5cGUsIGV2ZW50UmFuZ2UuY3JhbmdlKVxuICAgICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICAgIC8vIGlmIG5vYm9keSB3YW50cyB0byBzaG93IGFueXRoaW5nLCBtaWdodCBhcyB3ZWxsIGhpZGUuLi5cbiAgICAgICAgLy8gVE9ETzogdGhpcyBkb2Vzbid0IHNlZW0gbGlrZSBhIHBhcnRpY3VsYXJseSBicmlnaHQgaWRlYT9cbiAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKHR5cGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgKHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX0gPSB0b29sdGlwKVxuICAgIH1cbiAgICBjb25zdCBuZXdFdmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgaWYgKCFuZXdFdmVudFJhbmdlIHx8ICFldmVudFJhbmdlLmNyYW5nZS5pc0VxdWFsKG5ld0V2ZW50UmFuZ2UuY3JhbmdlKSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IHtwZXJzaXN0T25DdXJzb3JNb3ZlID0gZmFsc2V9ID0gdG9vbHRpcERhdGFcbiAgICBsZXQgbXNnXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodG9vbHRpcERhdGEudGV4dCkpIHtcbiAgICAgIG1zZyA9IHRvb2x0aXBEYXRhLnRleHQubWFwKE1lc3NhZ2VPYmplY3QuZnJvbU9iamVjdC5iaW5kKE1lc3NhZ2VPYmplY3QpKVxuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QodG9vbHRpcERhdGEudGV4dClcbiAgICB9XG4gICAgY29udHJvbGxlci50b29sdGlwcy5zaG93KFxuICAgICAgUmFuZ2UuZnJvbU9iamVjdCh0b29sdGlwRGF0YS5yYW5nZSksIG1zZywgdHlwZSwgcGx1Z2luTmFtZSwge3BlcnNpc3RPbkN1cnNvck1vdmV9XG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWZhdWx0VG9vbHRpcEZ1bmN0aW9uIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGU6IFRFdmVudFJhbmdlVHlwZSwgY3JhbmdlOiBSYW5nZSkge1xuICAgIGZvciAoY29uc3Qge3BsdWdpbk5hbWUsIGhhbmRsZXJ9IG9mIHRoaXMucHJvdmlkZXJzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b29sdGlwRGF0YSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShoYW5kbGVyKGVkaXRvciwgY3JhbmdlLCB0eXBlKSlcbiAgICAgICAgaWYgKCF0b29sdGlwRGF0YSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtwbHVnaW5OYW1lLCB0b29sdGlwRGF0YX1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwgZSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==