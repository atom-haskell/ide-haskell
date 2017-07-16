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
                    submenu: [{ label: name, submenu: menu }]
                }
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
        },
        dispose() {
            disposables.dispose();
        }
    };
}
exports.instance = instance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBQy9ELHlCQUEyRDtBQVMzRCxrQkFDRSxhQUE0QixFQUFFLE9BQTZCO0lBRTNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBaUI7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQWU7WUFDeEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxXQUFXLENBQUUsUUFBdUI7WUFDbEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsYUFBYSxDQUFFLElBQVksRUFBRSxJQUE0QjtZQUN2RCxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDakQsQ0FBQztRQUNELFdBQVcsQ0FBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBcUI7WUFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFNBQVMsR0FBRyxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2xDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUE7Z0JBQ2xCLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQTtZQUNwQixDQUFDO1lBQ0QsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQ3ZDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQ3pDLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZSxDQUFLLEdBQTBCO1lBQzVDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0QsY0FBYyxDQUFFLFNBQWlCLEVBQUUsSUFBd0I7WUFDekQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0ssY0FBYyxDQUFFLElBQVk7O2dCQUNoQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDL0QsQ0FBQztTQUFBO1FBQ0ssb0JBQW9CLENBQUUsTUFBYyxFQUFFLElBQVk7O2dCQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDM0QsQ0FBQztTQUFBO1FBQ0ssY0FBYyxDQUFFLElBQVksRUFBRSxLQUFhOztnQkFDL0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN0RSxDQUFDO1NBQUE7UUFDRCxhQUFhLENBQUUsTUFBa0IsRUFBRSxZQUFzQztZQUN2RSxJQUFJLElBQXFCLENBQUE7WUFDekIsRUFBRSxDQUFDLENBQUMsK0JBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFBO1lBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsT0FBTztZQUNMLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2QixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUF0RUQsNEJBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwsIGdldEV2ZW50VHlwZSB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7SVN0YXR1cywgSVNldmVyaXR5VGFiRGVmaW5pdGlvbiwgVENvbnRyb2xEZWZpbml0aW9ufSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQge0lSZXN1bHRJdGVtfSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHtURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtbWFuYWdlcidcbmltcG9ydCB7SVBhcmFtU3BlY30gZnJvbSAnLi4vY29uZmlnLXBhcmFtcydcbmltcG9ydCB7VFRvb2x0aXBGdW5jdGlvbiwgSVRvb2x0aXBEYXRhfSBmcm9tICcuLi90b29sdGlwLXJlZ2lzdHJ5J1xuaW1wb3J0IHtpc1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvZXZlbnQtdGFibGUnXG5pbXBvcnQge1RBdG9tTWVudSwgY29uc3VtZSwgSVJlZ2lzdHJhdGlvbk9wdGlvbnN9IGZyb20gJy4vJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaG93VG9vbHRpcFBhcmFtcyB7XG4gIGVkaXRvcjogVGV4dEVkaXRvclxuICBldmVudFR5cGU/OiBURXZlbnRSYW5nZVR5cGVcbiAgZGV0YWlsPzogT2JqZWN0XG4gIHRvb2x0aXA6IFRUb29sdGlwRnVuY3Rpb24gfCBJVG9vbHRpcERhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlIChcbiAgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgb3B0aW9uczogSVJlZ2lzdHJhdGlvbk9wdGlvbnNcbikge1xuICBjb25zdCBwbHVnaW5OYW1lID0gb3B0aW9ucy5uYW1lXG4gIGNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdCBtZXNzYWdlUHJvdmlkZXIgPSBwbHVnaW5NYW5hZ2VyLnJlc3VsdHNEQi5yZWdpc3RlclByb3ZpZGVyKClcbiAgZGlzcG9zYWJsZXMuYWRkKG1lc3NhZ2VQcm92aWRlcilcbiAgZGlzcG9zYWJsZXMuYWRkKGNvbnN1bWUocGx1Z2luTWFuYWdlciwgb3B0aW9ucykpXG5cbiAgcmV0dXJuIHtcbiAgICBzZXRNZW51IChuYW1lOiBzdHJpbmcsIG1lbnU6IFRBdG9tTWVudVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF1cbiAgICAgIH1cbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogSVJlc3VsdEl0ZW1bXSkge1xuICAgICAgbWVzc2FnZVByb3ZpZGVyLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKVxuICAgIH0sXG4gICAgYWRkTWVzc2FnZVRhYiAobmFtZTogc3RyaW5nLCBvcHRzOiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHR0ID0gdG9vbHRpcFxuICAgICAgICB0b29sdGlwID0gKCkgPT4gdHRcbiAgICAgIH1cbiAgICAgIHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5LnNob3dUb29sdGlwKFxuICAgICAgICBlZGl0b3IsIGV2ZW50VHlwZSwge3BsdWdpbk5hbWUsIHRvb2x0aXB9XG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2w8VD4gKGRlZjogVENvbnRyb2xEZWZpbml0aW9uPFQ+KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woZGVmKVxuICAgIH0sXG4gICAgYWRkQ29uZmlnUGFyYW0gKHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBJUGFyYW1TcGVjPE9iamVjdD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW0gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZywgdmFsdWU6IE9iamVjdCkge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldChwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgICB9LFxuICAgIGdldEV2ZW50UmFuZ2UgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZU9yRGV0YWlsOiBURXZlbnRSYW5nZVR5cGUgfCBPYmplY3QpIHtcbiAgICAgIGxldCB0eXBlOiBURXZlbnRSYW5nZVR5cGVcbiAgICAgIGlmIChpc1RFdmVudFJhbmdlVHlwZSh0eXBlT3JEZXRhaWwpKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlT3JEZXRhaWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBnZXRFdmVudFR5cGUodHlwZU9yRGV0YWlsKVxuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICAgIHJldHVybiBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICB9LFxuICAgIGRpc3Bvc2UgKCkge1xuICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgfVxuICB9XG59XG4iXX0=