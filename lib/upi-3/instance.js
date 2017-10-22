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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFFeEQsb0NBQTRDO0FBQzVDLHlCQUE0QjtBQUU1QixrQkFDRSxhQUE0QixFQUFFLE9BQWlDO0lBRS9ELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBOEI7WUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQW1CO1lBQzVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBQ0QsV0FBVyxDQUFFLFFBQTJCO1lBQ3RDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNLLGFBQWEsQ0FBRSxJQUFZLEVBQUUsSUFBZ0M7O2dCQUNqRSxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hELENBQUM7U0FBQTtRQUNLLFdBQVcsQ0FBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBeUI7O2dCQUM3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsU0FBUyxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUM5QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUN6QyxDQUFBO1lBQ0gsQ0FBQztTQUFBO1FBQ0QsZUFBZSxDQUFLLEdBQThCO1lBQ2hELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0QsY0FBYyxDQUFLLFNBQWlCLEVBQUUsSUFBdUI7WUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0ssY0FBYyxDQUFLLElBQVk7O2dCQUNuQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbEUsQ0FBQztTQUFBO1FBQ0ssb0JBQW9CLENBQUssTUFBYyxFQUFFLElBQVk7O2dCQUN6RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUQsQ0FBQztTQUFBO1FBQ0ssY0FBYyxDQUFLLElBQVksRUFBRSxLQUFTOztnQkFDOUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUksVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN6RSxDQUFDO1NBQUE7UUFDRCxhQUFhLENBQUUsTUFBa0IsRUFBRSxZQUEwQztZQUMzRSxJQUFJLElBQXlCLENBQUE7WUFDN0IsRUFBRSxDQUFDLENBQUMseUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE9BQU87WUFDTCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBbEVELDRCQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IGlzVEV2ZW50UmFuZ2VUeXBlIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBjb25zdW1lIH0gZnJvbSAnLi8nXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZShcbiAgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgb3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zLFxuKTogVVBJLklVUElJbnN0YW5jZSB7XG4gIGNvbnN0IHBsdWdpbk5hbWUgPSBvcHRpb25zLm5hbWVcbiAgY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0IG1lc3NhZ2VQcm92aWRlciA9IHBsdWdpbk1hbmFnZXIucmVzdWx0c0RCLnJlZ2lzdGVyUHJvdmlkZXIoKVxuICBkaXNwb3NhYmxlcy5hZGQobWVzc2FnZVByb3ZpZGVyKVxuICBkaXNwb3NhYmxlcy5hZGQoY29uc3VtZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKSlcblxuICByZXR1cm4ge1xuICAgIHNldE1lbnUgKG5hbWU6IHN0cmluZywgbWVudTogQXRvbVR5cGVzLkF0b21NZW51SXRlbVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF0sXG4gICAgICB9LFxuICAgICAgXSlcbiAgICAgIGRpc3Bvc2FibGVzLmFkZChtZW51RGlzcClcbiAgICAgIHJldHVybiBtZW51RGlzcFxuICAgIH0sXG4gICAgc2V0U3RhdHVzIChzdGF0dXM6IFVQSS5JU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogVVBJLklSZXN1bHRJdGVtW10pIHtcbiAgICAgIG1lc3NhZ2VQcm92aWRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LFxuICAgIGFzeW5jIGFkZE1lc3NhZ2VUYWIgKG5hbWU6IHN0cmluZywgb3B0czogVVBJLklTZXZlcml0eVRhYkRlZmluaXRpb24pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgYXN5bmMgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogVVBJLklTaG93VG9vbHRpcFBhcmFtcykge1xuICAgICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgICAgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGRldGFpbClcbiAgICAgIH1cbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeS5zaG93VG9vbHRpcChcbiAgICAgICAgZWRpdG9yLCBldmVudFR5cGUsIHtwbHVnaW5OYW1lLCB0b29sdGlwfSxcbiAgICAgIClcbiAgICB9LFxuICAgIGFkZFBhbmVsQ29udHJvbDxUPiAoZGVmOiBVUEkuVENvbnRyb2xEZWZpbml0aW9uPFQ+KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woZGVmKVxuICAgIH0sXG4gICAgYWRkQ29uZmlnUGFyYW08VD4gKHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmFkZChwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpXG4gICAgfSxcbiAgICBhc3luYyBnZXRDb25maWdQYXJhbTxUPiAobmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0PFQ+KHBsdWdpbk5hbWUsIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBnZXRPdGhlcnNDb25maWdQYXJhbTxUPiAocGx1Z2luOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldDxUPihwbHVnaW4sIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBzZXRDb25maWdQYXJhbTxUPiAobmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5zZXQ8VD4ocGx1Z2luTmFtZSwgbmFtZSwgdmFsdWUpXG4gICAgfSxcbiAgICBnZXRFdmVudFJhbmdlIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGVPckRldGFpbDogVVBJLlRFdmVudFJhbmdlVHlwZSB8IE9iamVjdCkge1xuICAgICAgbGV0IHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGVcbiAgICAgIGlmIChpc1RFdmVudFJhbmdlVHlwZSh0eXBlT3JEZXRhaWwpKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlT3JEZXRhaWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBnZXRFdmVudFR5cGUodHlwZU9yRGV0YWlsKVxuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gICAgICByZXR1cm4gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgfSxcbiAgICBkaXNwb3NlICgpIHtcbiAgICAgIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIH0sXG4gIH1cbn1cbiJdfQ==