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
const utils_1 = require("../utils");
const _1 = require("./");
const AtomTypes = require("atom");
var CompositeDisposable = AtomTypes.CompositeDisposable;
function instance(pluginManager, options) {
    const pluginName = options.name;
    const disposables = new CompositeDisposable();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUEyRTtBQUUzRSx5QkFBNEI7QUFFNUIsa0NBQWlDO0FBQ2pDLElBQU8sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixDQUFBO0FBRzFELGtCQUNFLGFBQTRCLEVBQUUsT0FBaUM7SUFFL0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUMvQixNQUFNLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUE7SUFDN0MsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2xFLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDaEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFaEQsTUFBTSxDQUFDO1FBQ0wsT0FBTyxDQUFFLElBQVksRUFBRSxJQUEwQztZQUMvRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixLQUFLLEVBQUUsdUJBQWU7b0JBQ3RCLE9BQU8sRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUU7aUJBQzVDO2FBQ0EsQ0FBQyxDQUFBO1lBQ0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ2pCLENBQUM7UUFDRCxTQUFTLENBQUUsTUFBbUI7WUFDNUIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxXQUFXLENBQUUsUUFBMkI7WUFDdEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0ssYUFBYSxDQUFFLElBQVksRUFBRSxJQUFnQzs7Z0JBQ2pFLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDeEQsQ0FBQztTQUFBO1FBQ0ssV0FBVyxDQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUEwQjs7Z0JBQy9FLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQzlDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQzNDLENBQUE7WUFDSCxDQUFDO1NBQUE7UUFDRCxlQUFlLENBQUssR0FBOEI7WUFDaEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFDRCxjQUFjLENBQUssU0FBaUIsRUFBRSxJQUF1QjtZQUMzRCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzFFLENBQUM7UUFDSyxjQUFjLENBQUssSUFBWTs7Z0JBQ25DLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFJLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNsRSxDQUFDO1NBQUE7UUFDSyxvQkFBb0IsQ0FBSyxNQUFjLEVBQUUsSUFBWTs7Z0JBQ3pELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFJLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1NBQUE7UUFDSyxjQUFjLENBQUssSUFBWSxFQUFFLEtBQVM7O2dCQUM5QyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3pFLENBQUM7U0FBQTtRQUNELGFBQWEsQ0FBRSxNQUFrQixFQUFFLFlBQTBDO1lBQzNFLElBQUksSUFBeUIsQ0FBQTtZQUM3QixFQUFFLENBQUMsQ0FBQyx5QkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxZQUFZLENBQUE7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFDRCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsT0FBTztZQUNMLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2QixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFsRUQsNEJBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUsIGlzVEV2ZW50UmFuZ2VUeXBlIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBjb25zdW1lIH0gZnJvbSAnLi8nXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnYXRvbS1oYXNrZWxsLXVwaSdcbmltcG9ydCAqIGFzIEF0b21UeXBlcyBmcm9tICdhdG9tJ1xuaW1wb3J0IENvbXBvc2l0ZURpc3Bvc2FibGUgPSBBdG9tVHlwZXMuQ29tcG9zaXRlRGlzcG9zYWJsZVxuaW1wb3J0IFRleHRFZGl0b3IgPSBBdG9tVHlwZXMuVGV4dEVkaXRvclxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFuY2UoXG4gIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIsIG9wdGlvbnM6IFVQSS5JUmVnaXN0cmF0aW9uT3B0aW9ucyxcbik6IFVQSS5JVVBJSW5zdGFuY2Uge1xuICBjb25zdCBwbHVnaW5OYW1lID0gb3B0aW9ucy5uYW1lXG4gIGNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdCBtZXNzYWdlUHJvdmlkZXIgPSBwbHVnaW5NYW5hZ2VyLnJlc3VsdHNEQi5yZWdpc3RlclByb3ZpZGVyKClcbiAgZGlzcG9zYWJsZXMuYWRkKG1lc3NhZ2VQcm92aWRlcilcbiAgZGlzcG9zYWJsZXMuYWRkKGNvbnN1bWUocGx1Z2luTWFuYWdlciwgb3B0aW9ucykpXG5cbiAgcmV0dXJuIHtcbiAgICBzZXRNZW51IChuYW1lOiBzdHJpbmcsIG1lbnU6IFJlYWRvbmx5QXJyYXk8QXRvbVR5cGVzLk1lbnVPcHRpb25zPikge1xuICAgICAgY29uc3QgbWVudURpc3AgPSBhdG9tLm1lbnUuYWRkKFt7XG4gICAgICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgICAgIHN1Ym1lbnU6IFsgeyBsYWJlbDogbmFtZSwgc3VibWVudTogbWVudSB9IF0sXG4gICAgICB9LFxuICAgICAgXSlcbiAgICAgIGRpc3Bvc2FibGVzLmFkZChtZW51RGlzcClcbiAgICAgIHJldHVybiBtZW51RGlzcFxuICAgIH0sXG4gICAgc2V0U3RhdHVzIChzdGF0dXM6IFVQSS5JU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogVVBJLklSZXN1bHRJdGVtW10pIHtcbiAgICAgIG1lc3NhZ2VQcm92aWRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LFxuICAgIGFzeW5jIGFkZE1lc3NhZ2VUYWIgKG5hbWU6IHN0cmluZywgb3B0czogVVBJLklTZXZlcml0eVRhYkRlZmluaXRpb24pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgYXN5bmMgc2hvd1Rvb2x0aXAgKHsgZWRpdG9yLCBldmVudFR5cGUsIGRldGFpbCwgdG9vbHRpcCB9OiBVUEkuSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5LnNob3dUb29sdGlwKFxuICAgICAgICBlZGl0b3IsIGV2ZW50VHlwZSwgeyBwbHVnaW5OYW1lLCB0b29sdGlwIH0sXG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2w8VD4gKGRlZjogVVBJLlRDb250cm9sRGVmaW5pdGlvbjxUPikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKGRlZilcbiAgICB9LFxuICAgIGFkZENvbmZpZ1BhcmFtPFQ+IChwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW08VD4gKG5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldDxUPihwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW08VD4gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQ8VD4ocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW08VD4gKG5hbWU6IHN0cmluZywgdmFsdWU/OiBUKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuc2V0PFQ+KHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICAgIH0sXG4gICAgZ2V0RXZlbnRSYW5nZSAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlT3JEZXRhaWw6IFVQSS5URXZlbnRSYW5nZVR5cGUgfCBPYmplY3QpIHtcbiAgICAgIGxldCB0eXBlOiBVUEkuVEV2ZW50UmFuZ2VUeXBlXG4gICAgICBpZiAoaXNURXZlbnRSYW5nZVR5cGUodHlwZU9yRGV0YWlsKSkge1xuICAgICAgICB0eXBlID0gdHlwZU9yRGV0YWlsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gZ2V0RXZlbnRUeXBlKHR5cGVPckRldGFpbClcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIH0sXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB9LFxuICB9XG59XG4iXX0=