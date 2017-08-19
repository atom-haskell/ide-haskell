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
const utils_2 = require("../utils");
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
            pluginManager.outputPanel.createTab(name, opts);
        },
        showTooltip({ editor, eventType, detail, tooltip }) {
            if (!eventType) {
                eventType = utils_1.getEventType(detail);
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
            if (utils_2.isTEventRangeType(typeOrDetail)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFFeEQsb0NBQTRDO0FBQzVDLHlCQUE0QjtBQUU1QixrQkFDRSxhQUE0QixFQUFFLE9BQWlDO0lBRS9ELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBOEI7WUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQW1CO1lBQzVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBQ0QsV0FBVyxDQUFFLFFBQTJCO1lBQ3RDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELGFBQWEsQ0FBRSxJQUFZLEVBQUUsSUFBZ0M7WUFDM0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFDRCxXQUFXLENBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQXlCO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyxDQUFDO1lBQ0QsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQ3ZDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQ3pDLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZSxDQUFLLEdBQThCO1lBQ2hELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0QsY0FBYyxDQUFLLFNBQWlCLEVBQUUsSUFBdUI7WUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0ssY0FBYyxDQUFLLElBQVk7O2dCQUNuQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbEUsQ0FBQztTQUFBO1FBQ0ssb0JBQW9CLENBQUssTUFBYyxFQUFFLElBQVk7O2dCQUN6RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUQsQ0FBQztTQUFBO1FBQ0ssY0FBYyxDQUFLLElBQVksRUFBRSxLQUFTOztnQkFDOUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUksVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN6RSxDQUFDO1NBQUE7UUFDRCxhQUFhLENBQUUsTUFBa0IsRUFBRSxZQUEwQztZQUMzRSxJQUFJLElBQXlCLENBQUE7WUFDN0IsRUFBRSxDQUFDLENBQUMseUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE9BQU87WUFDTCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBbEVELDRCQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IGlzVEV2ZW50UmFuZ2VUeXBlIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBjb25zdW1lIH0gZnJvbSAnLi8nXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZShcbiAgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgb3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zLFxuKTogVVBJLklVUElJbnN0YW5jZSB7XG4gIGNvbnN0IHBsdWdpbk5hbWUgPSBvcHRpb25zLm5hbWVcbiAgY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0IG1lc3NhZ2VQcm92aWRlciA9IHBsdWdpbk1hbmFnZXIucmVzdWx0c0RCLnJlZ2lzdGVyUHJvdmlkZXIoKVxuICBkaXNwb3NhYmxlcy5hZGQobWVzc2FnZVByb3ZpZGVyKVxuICBkaXNwb3NhYmxlcy5hZGQoY29uc3VtZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKSlcblxuICByZXR1cm4ge1xuICAgIHNldE1lbnUgKG5hbWU6IHN0cmluZywgbWVudTogQXRvbVR5cGVzLkF0b21NZW51SXRlbVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF0sXG4gICAgICB9LFxuICAgICAgXSlcbiAgICAgIGRpc3Bvc2FibGVzLmFkZChtZW51RGlzcClcbiAgICAgIHJldHVybiBtZW51RGlzcFxuICAgIH0sXG4gICAgc2V0U3RhdHVzIChzdGF0dXM6IFVQSS5JU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogVVBJLklSZXN1bHRJdGVtW10pIHtcbiAgICAgIG1lc3NhZ2VQcm92aWRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2VUYWIgKG5hbWU6IHN0cmluZywgb3B0czogVVBJLklTZXZlcml0eVRhYkRlZmluaXRpb24pIHtcbiAgICAgIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuY3JlYXRlVGFiKG5hbWUsIG9wdHMpXG4gICAgfSxcbiAgICBzaG93VG9vbHRpcCAoe2VkaXRvciwgZXZlbnRUeXBlLCBkZXRhaWwsIHRvb2x0aXB9OiBVUEkuSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnkuc2hvd1Rvb2x0aXAoXG4gICAgICAgIGVkaXRvciwgZXZlbnRUeXBlLCB7cGx1Z2luTmFtZSwgdG9vbHRpcH0sXG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2w8VD4gKGRlZjogVVBJLlRDb250cm9sRGVmaW5pdGlvbjxUPikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKGRlZilcbiAgICB9LFxuICAgIGFkZENvbmZpZ1BhcmFtPFQ+IChwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogVVBJLklQYXJhbVNwZWM8VD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW08VD4gKG5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldDxUPihwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW08VD4gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQ8VD4ocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW08VD4gKG5hbWU6IHN0cmluZywgdmFsdWU/OiBUKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuc2V0PFQ+KHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICAgIH0sXG4gICAgZ2V0RXZlbnRSYW5nZSAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlT3JEZXRhaWw6IFVQSS5URXZlbnRSYW5nZVR5cGUgfCBPYmplY3QpIHtcbiAgICAgIGxldCB0eXBlOiBVUEkuVEV2ZW50UmFuZ2VUeXBlXG4gICAgICBpZiAoaXNURXZlbnRSYW5nZVR5cGUodHlwZU9yRGV0YWlsKSkge1xuICAgICAgICB0eXBlID0gdHlwZU9yRGV0YWlsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gZ2V0RXZlbnRUeXBlKHR5cGVPckRldGFpbClcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIH0sXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB9LFxuICB9XG59XG4iXX0=