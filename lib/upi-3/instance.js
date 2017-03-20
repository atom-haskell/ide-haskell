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
const event_table_1 = require("../editor-control/event-table");
function instance(pluginManager, pluginName) {
    const disposables = new atom_1.CompositeDisposable();
    const messageProvider = pluginManager.resultsDB.registerProvider(pluginName);
    disposables.add(messageProvider);
    return {
        setMenu(name, menu) {
            const menuDisp = atom.menu.add([{
                    label: utils_1.MAIN_MENU_LABEL,
                    submenu: [{ label: name, submenu: menu }]
                }
            ]);
            disposables.add(menuDisp);
            return menuDisp;
        },
        setStatus(status) {
            return pluginManager.outputPanel.backendStatus(pluginName, status);
        },
        setMessages(messages) {
            messageProvider.setMessages(messages);
        },
        addMessageTab(name, opts) {
            pluginManager.outputPanel.createTab(name, opts);
        },
        showTooltip({ editor, eventType, detail, tooltip }) {
            if (!eventType) {
                eventType = utils_1.getEventType(detail);
            }
            if (typeof tooltip !== 'function') {
                const tt = tooltip;
                tooltip = () => tt;
            }
            pluginManager.tooltipRegistry.showTooltip(editor, eventType, { pluginName, tooltip });
        },
        addPanelControl(element, opts) {
            if (typeof element === 'string') {
                return pluginManager.outputPanel.addPanelControl(element, opts);
            }
            else {
                return pluginManager.outputPanel.addPanelControl(element, opts);
            }
        },
        addConfigParam(paramName, spec) {
            return pluginManager.configParamManager.add(pluginName, paramName, spec);
        },
        getConfigParam(name) {
            return __awaiter(this, void 0, void 0, function* () {
                return pluginManager.configParamManager.get(pluginName, name);
            });
        },
        getOthersConfigParam(plugin, name) {
            return __awaiter(this, void 0, void 0, function* () {
                return pluginManager.configParamManager.get(plugin, name);
            });
        },
        setConfigParam(name, value) {
            return __awaiter(this, void 0, void 0, function* () {
                return pluginManager.configParamManager.set(pluginName, name, value);
            });
        },
        getEventRange(editor, typeOrDetail) {
            let type;
            if (event_table_1.isTEventRangeType(typeOrDetail)) {
                type = typeOrDetail;
            }
            else {
                type = utils_1.getEventType(typeOrDetail);
            }
            const controller = pluginManager.controller(editor);
            if (!controller) {
                return;
            }
            return controller.getEventRange(type);
        }
    };
}
exports.instance = instance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBUy9ELGtCQUEwQixhQUE0QixFQUFFLFVBQWtCO0lBQ3hFLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVFLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFaEMsTUFBTSxDQUFDO1FBQ0wsT0FBTyxDQUFFLElBQVksRUFBRSxJQUFXO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSx1QkFBZTtvQkFDdEIsT0FBTyxFQUFFLENBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBRTtpQkFDMUM7YUFDQSxDQUFDLENBQUE7WUFDRixXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDakIsQ0FBQztRQUNELFNBQVMsQ0FBRSxNQUFlO1lBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEUsQ0FBQztRQUNELFdBQVcsQ0FBRSxRQUF1QjtZQUNsQyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxhQUFhLENBQUUsSUFBWSxFQUFFLElBQTRCO1lBQ3ZELGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQ0QsV0FBVyxDQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFxQjtZQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQTtnQkFDbEIsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFBO1lBQ3BCLENBQUM7WUFDRCxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDdkMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsQ0FDekMsQ0FBQTtRQUNILENBQUM7UUFDRCxlQUFlLENBQUssT0FBc0QsRUFBRSxJQUFzQjtZQUNoRyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ2pFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ2pFLENBQUM7UUFDSCxDQUFDO1FBQ0QsY0FBYyxDQUFFLFNBQWlCLEVBQUUsSUFBcUI7WUFDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0ssY0FBYyxDQUFFLElBQVk7O2dCQUNoQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDL0QsQ0FBQztTQUFBO1FBQ0ssb0JBQW9CLENBQUUsTUFBYyxFQUFFLElBQVk7O2dCQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDM0QsQ0FBQztTQUFBO1FBQ0ssY0FBYyxDQUFFLElBQVksRUFBRSxLQUFVOztnQkFDNUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN0RSxDQUFDO1NBQUE7UUFDRCxhQUFhLENBQUUsTUFBa0IsRUFBRSxZQUFzQztZQUN2RSxJQUFJLElBQXFCLENBQUE7WUFDekIsRUFBRSxDQUFDLENBQUMsK0JBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFBO1lBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFuRUQsNEJBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6IG1heC1jbGFzc2VzLXBlci1maWxlIG1lbWJlci1hY2Nlc3MgKi9cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge0lTdGF0dXMsIElTZXZlcml0eVRhYkRlZmluaXRpb24sIElDb250cm9sT3B0cywgSUVsZW1lbnRPYmplY3R9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7SVJlc3VsdEl0ZW19IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuaW1wb3J0IHtJUGFyYW1TcGVjfSBmcm9tICcuLi9jb25maWctcGFyYW1zJ1xuaW1wb3J0IHtUVG9vbHRpcEZ1bmN0aW9uLCBJVG9vbHRpcERhdGF9IGZyb20gJy4uL3Rvb2x0aXAtcmVnaXN0cnknXG5pbXBvcnQge2lzVEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC9ldmVudC10YWJsZSdcblxuaW50ZXJmYWNlIElTaG93VG9vbHRpcFBhcmFtcyB7XG4gIGVkaXRvcjogVGV4dEVkaXRvclxuICBldmVudFR5cGU/OiBURXZlbnRSYW5nZVR5cGVcbiAgZGV0YWlsPzogYW55XG4gIHRvb2x0aXA6IFRUb29sdGlwRnVuY3Rpb24gfCBJVG9vbHRpcERhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlIChwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyLCBwbHVnaW5OYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0IG1lc3NhZ2VQcm92aWRlciA9IHBsdWdpbk1hbmFnZXIucmVzdWx0c0RCLnJlZ2lzdGVyUHJvdmlkZXIocGx1Z2luTmFtZSlcbiAgZGlzcG9zYWJsZXMuYWRkKG1lc3NhZ2VQcm92aWRlcilcblxuICByZXR1cm4ge1xuICAgIHNldE1lbnUgKG5hbWU6IHN0cmluZywgbWVudTogYW55W10pIHtcbiAgICAgIGNvbnN0IG1lbnVEaXNwID0gYXRvbS5tZW51LmFkZChbe1xuICAgICAgICBsYWJlbDogTUFJTl9NRU5VX0xBQkVMLFxuICAgICAgICBzdWJtZW51OiBbIHtsYWJlbDogbmFtZSwgc3VibWVudTogbWVudX0gXVxuICAgICAgfVxuICAgICAgXSlcbiAgICAgIGRpc3Bvc2FibGVzLmFkZChtZW51RGlzcClcbiAgICAgIHJldHVybiBtZW51RGlzcFxuICAgIH0sXG4gICAgc2V0U3RhdHVzIChzdGF0dXM6IElTdGF0dXMpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmJhY2tlbmRTdGF0dXMocGx1Z2luTmFtZSwgc3RhdHVzKVxuICAgIH0sXG4gICAgc2V0TWVzc2FnZXMgKG1lc3NhZ2VzOiBJUmVzdWx0SXRlbVtdKSB7XG4gICAgICBtZXNzYWdlUHJvdmlkZXIuc2V0TWVzc2FnZXMobWVzc2FnZXMpXG4gICAgfSxcbiAgICBhZGRNZXNzYWdlVGFiIChuYW1lOiBzdHJpbmcsIG9wdHM6IElTZXZlcml0eVRhYkRlZmluaXRpb24pIHtcbiAgICAgIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuY3JlYXRlVGFiKG5hbWUsIG9wdHMpXG4gICAgfSxcbiAgICBzaG93VG9vbHRpcCAoe2VkaXRvciwgZXZlbnRUeXBlLCBkZXRhaWwsIHRvb2x0aXB9OiBJU2hvd1Rvb2x0aXBQYXJhbXMpIHtcbiAgICAgIGlmICghZXZlbnRUeXBlKSB7XG4gICAgICAgIGV2ZW50VHlwZSA9IGdldEV2ZW50VHlwZShkZXRhaWwpXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRvb2x0aXAgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgdHQgPSB0b29sdGlwXG4gICAgICAgIHRvb2x0aXAgPSAoKSA9PiB0dFxuICAgICAgfVxuICAgICAgcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnkuc2hvd1Rvb2x0aXAoXG4gICAgICAgIGVkaXRvciwgZXZlbnRUeXBlLCB7cGx1Z2luTmFtZSwgdG9vbHRpcH1cbiAgICAgIClcbiAgICB9LFxuICAgIGFkZFBhbmVsQ29udHJvbDxUPiAoZWxlbWVudDogc3RyaW5nIHwgeyBuZXcgKG9wdHM6IFQpOiBJRWxlbWVudE9iamVjdDxUPiB9LCBvcHRzOiBJQ29udHJvbE9wdHMgfCBUKSB7XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChlbGVtZW50LCBvcHRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKGVsZW1lbnQsIG9wdHMpXG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRDb25maWdQYXJhbSAocGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IElQYXJhbVNwZWM8YW55Pikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmFkZChwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpXG4gICAgfSxcbiAgICBhc3luYyBnZXRDb25maWdQYXJhbSAobmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0KHBsdWdpbk5hbWUsIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBnZXRPdGhlcnNDb25maWdQYXJhbSAocGx1Z2luOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW4sIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBzZXRDb25maWdQYXJhbSAobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuc2V0KHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICAgIH0sXG4gICAgZ2V0RXZlbnRSYW5nZSAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlT3JEZXRhaWw6IFRFdmVudFJhbmdlVHlwZSB8IE9iamVjdCkge1xuICAgICAgbGV0IHR5cGU6IFRFdmVudFJhbmdlVHlwZVxuICAgICAgaWYgKGlzVEV2ZW50UmFuZ2VUeXBlKHR5cGVPckRldGFpbCkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGVPckRldGFpbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGdldEV2ZW50VHlwZSh0eXBlT3JEZXRhaWwpXG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIH1cbiAgfVxufVxuIl19