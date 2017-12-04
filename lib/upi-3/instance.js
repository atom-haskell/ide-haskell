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
const _1 = require("./");
function instance(pluginManager, options) {
    const pluginName = options.name;
    const disposables = new atom_1.CompositeDisposable();
    const messageProvider = pluginManager.resultsDB.registerProvider();
    disposables.add(messageProvider);
    disposables.add(_1.consume(pluginManager, options));
    return {
        setMenu(name, menu) {
            const menuDisp = atom.menu.add([{
                    label: utils_1.MAIN_MENU_LABEL,
                    submenu: [{ label: name, submenu: menu }],
                },
            ]);
            disposables.add(menuDisp);
            return menuDisp;
        },
        setStatus(status) {
            return pluginManager.backendStatus(pluginName, status);
        },
        setMessages(messages) {
            messageProvider.setMessages(messages);
        },
        addMessageTab(name, opts) {
            return __awaiter(this, void 0, void 0, function* () {
                return pluginManager.outputPanel.createTab(name, opts);
            });
        },
        showTooltip({ editor, eventType, detail, tooltip }) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!eventType) {
                    eventType = utils_1.getEventType(detail);
                }
                return pluginManager.tooltipRegistry.showTooltip(editor, eventType, { pluginName, tooltip });
            });
        },
        addPanelControl(def) {
            return pluginManager.outputPanel.addPanelControl(def);
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
            if (utils_1.isTEventRangeType(typeOrDetail)) {
                type = typeOrDetail;
            }
            else {
                type = utils_1.getEventType(typeOrDetail);
            }
            const controller = pluginManager.controller(editor);
            if (!controller) {
                return undefined;
            }
            return controller.getEventRange(type);
        },
        dispose() {
            disposables.dispose();
        },
    };
}
exports.instance = instance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBMkU7QUFFM0UseUJBQTRCO0FBRTVCLGtCQUNFLGFBQTRCLEVBQUUsT0FBaUM7SUFFL0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUMvQixNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFDN0MsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2xFLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDaEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFaEQsTUFBTSxDQUFDO1FBQ0wsT0FBTyxDQUFFLElBQVksRUFBRSxJQUE4QjtZQUNuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixLQUFLLEVBQUUsdUJBQWU7b0JBQ3RCLE9BQU8sRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUU7aUJBQzVDO2FBQ0EsQ0FBQyxDQUFBO1lBQ0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ2pCLENBQUM7UUFDRCxTQUFTLENBQUUsTUFBbUI7WUFDNUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxXQUFXLENBQUUsUUFBMkI7WUFDdEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0ssYUFBYSxDQUFFLElBQVksRUFBRSxJQUFnQzs7Z0JBQ2pFLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDeEQsQ0FBQztTQUFBO1FBQ0ssV0FBVyxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUEwQjs7Z0JBQy9FLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQzlDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQzNDLENBQUE7WUFDSCxDQUFDO1NBQUE7UUFDRCxlQUFlLENBQUssR0FBOEI7WUFDaEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFDRCxjQUFjLENBQUssU0FBaUIsRUFBRSxJQUF1QjtZQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzFFLENBQUM7UUFDSyxjQUFjLENBQUssSUFBWTs7Z0JBQ25DLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFJLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNsRSxDQUFDO1NBQUE7UUFDSyxvQkFBb0IsQ0FBSyxNQUFjLEVBQUUsSUFBWTs7Z0JBQ3pELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFJLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1NBQUE7UUFDSyxjQUFjLENBQUssSUFBWSxFQUFFLEtBQVM7O2dCQUM5QyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3pFLENBQUM7U0FBQTtRQUNELGFBQWEsQ0FBRSxNQUFrQixFQUFFLFlBQTBDO1lBQzNFLElBQUksSUFBeUIsQ0FBQTtZQUM3QixFQUFFLENBQUMsQ0FBQyx5QkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxZQUFZLENBQUE7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFDRCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsT0FBTztZQUNMLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2QixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFsRUQsNEJBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwsIGdldEV2ZW50VHlwZSwgaXNURXZlbnRSYW5nZVR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IGNvbnN1bWUgfSBmcm9tICcuLydcblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlKFxuICBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyLCBvcHRpb25zOiBVUEkuSVJlZ2lzdHJhdGlvbk9wdGlvbnMsXG4pOiBVUEkuSVVQSUluc3RhbmNlIHtcbiAgY29uc3QgcGx1Z2luTmFtZSA9IG9wdGlvbnMubmFtZVxuICBjb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgY29uc3QgbWVzc2FnZVByb3ZpZGVyID0gcGx1Z2luTWFuYWdlci5yZXN1bHRzREIucmVnaXN0ZXJQcm92aWRlcigpXG4gIGRpc3Bvc2FibGVzLmFkZChtZXNzYWdlUHJvdmlkZXIpXG4gIGRpc3Bvc2FibGVzLmFkZChjb25zdW1lKHBsdWdpbk1hbmFnZXIsIG9wdGlvbnMpKVxuXG4gIHJldHVybiB7XG4gICAgc2V0TWVudSAobmFtZTogc3RyaW5nLCBtZW51OiBBdG9tVHlwZXMuQXRvbU1lbnVJdGVtW10pIHtcbiAgICAgIGNvbnN0IG1lbnVEaXNwID0gYXRvbS5tZW51LmFkZChbe1xuICAgICAgICBsYWJlbDogTUFJTl9NRU5VX0xBQkVMLFxuICAgICAgICBzdWJtZW51OiBbIHsgbGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnUgfSBdLFxuICAgICAgfSxcbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBVUEkuSVN0YXR1cykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBzdGF0dXMpXG4gICAgfSxcbiAgICBzZXRNZXNzYWdlcyAobWVzc2FnZXM6IFVQSS5JUmVzdWx0SXRlbVtdKSB7XG4gICAgICBtZXNzYWdlUHJvdmlkZXIuc2V0TWVzc2FnZXMobWVzc2FnZXMpXG4gICAgfSxcbiAgICBhc3luYyBhZGRNZXNzYWdlVGFiIChuYW1lOiBzdHJpbmcsIG9wdHM6IFVQSS5JU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5jcmVhdGVUYWIobmFtZSwgb3B0cylcbiAgICB9LFxuICAgIGFzeW5jIHNob3dUb29sdGlwICh7IGVkaXRvciwgZXZlbnRUeXBlLCBkZXRhaWwsIHRvb2x0aXAgfTogVVBJLklTaG93VG9vbHRpcFBhcmFtcykge1xuICAgICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgICAgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGRldGFpbClcbiAgICAgIH1cbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeS5zaG93VG9vbHRpcChcbiAgICAgICAgZWRpdG9yLCBldmVudFR5cGUsIHsgcGx1Z2luTmFtZSwgdG9vbHRpcCB9LFxuICAgICAgKVxuICAgIH0sXG4gICAgYWRkUGFuZWxDb250cm9sPFQ+IChkZWY6IFVQSS5UQ29udHJvbERlZmluaXRpb248VD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChkZWYpXG4gICAgfSxcbiAgICBhZGRDb25maWdQYXJhbTxUPiAocGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IFVQSS5JUGFyYW1TcGVjPFQ+KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuYWRkKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgc3BlYylcbiAgICB9LFxuICAgIGFzeW5jIGdldENvbmZpZ1BhcmFtPFQ+IChuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQ8VD4ocGx1Z2luTmFtZSwgbmFtZSlcbiAgICB9LFxuICAgIGFzeW5jIGdldE90aGVyc0NvbmZpZ1BhcmFtPFQ+IChwbHVnaW46IHN0cmluZywgbmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0PFQ+KHBsdWdpbiwgbmFtZSlcbiAgICB9LFxuICAgIGFzeW5jIHNldENvbmZpZ1BhcmFtPFQ+IChuYW1lOiBzdHJpbmcsIHZhbHVlPzogVCk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldDxUPihwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgICB9LFxuICAgIGdldEV2ZW50UmFuZ2UgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZU9yRGV0YWlsOiBVUEkuVEV2ZW50UmFuZ2VUeXBlIHwgT2JqZWN0KSB7XG4gICAgICBsZXQgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZVxuICAgICAgaWYgKGlzVEV2ZW50UmFuZ2VUeXBlKHR5cGVPckRldGFpbCkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGVPckRldGFpbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGdldEV2ZW50VHlwZSh0eXBlT3JEZXRhaWwpXG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgICAgIHJldHVybiBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICB9LFxuICAgIGRpc3Bvc2UgKCkge1xuICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgfSxcbiAgfVxufVxuIl19