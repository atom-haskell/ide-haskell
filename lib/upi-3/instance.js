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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFFeEQsK0RBQStEO0FBQy9ELHlCQUEwQjtBQUUxQixrQkFDRSxhQUE0QixFQUFFLE9BQWlDO0lBRS9ELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBcUI7WUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQW1CO1lBQzVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBQ0QsV0FBVyxDQUFFLFFBQTJCO1lBQ3RDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELGFBQWEsQ0FBRSxJQUFZLEVBQUUsSUFBZ0M7WUFDM0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFDRCxXQUFXLENBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQXlCO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFBO2dCQUNsQixPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUE7WUFDcEIsQ0FBQztZQUNELGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUN2QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUN6QyxDQUFBO1FBQ0gsQ0FBQztRQUNELGVBQWUsQ0FBSyxHQUE4QjtZQUNoRCxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkQsQ0FBQztRQUNELGNBQWMsQ0FBRSxTQUFpQixFQUFFLElBQTRCO1lBQzdELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUUsQ0FBQztRQUNLLGNBQWMsQ0FBRSxJQUFZOztnQkFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQy9ELENBQUM7U0FBQTtRQUNLLG9CQUFvQixDQUFFLE1BQWMsRUFBRSxJQUFZOztnQkFDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQzNELENBQUM7U0FBQTtRQUNLLGNBQWMsQ0FBRSxJQUFZLEVBQUUsS0FBYTs7Z0JBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEUsQ0FBQztTQUFBO1FBQ0QsYUFBYSxDQUFFLE1BQWtCLEVBQUUsWUFBMEM7WUFDM0UsSUFBSSxJQUF5QixDQUFBO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLCtCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLFlBQVksQ0FBQTtZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUNELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQTtZQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE9BQU87WUFDTCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBdEVELDRCQXNFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge2lzVEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC9ldmVudC10YWJsZSdcbmltcG9ydCB7Y29uc3VtZX0gZnJvbSAnLi8nXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSAoXG4gIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIsIG9wdGlvbnM6IFVQSS5JUmVnaXN0cmF0aW9uT3B0aW9uc1xuKSB7XG4gIGNvbnN0IHBsdWdpbk5hbWUgPSBvcHRpb25zLm5hbWVcbiAgY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0IG1lc3NhZ2VQcm92aWRlciA9IHBsdWdpbk1hbmFnZXIucmVzdWx0c0RCLnJlZ2lzdGVyUHJvdmlkZXIoKVxuICBkaXNwb3NhYmxlcy5hZGQobWVzc2FnZVByb3ZpZGVyKVxuICBkaXNwb3NhYmxlcy5hZGQoY29uc3VtZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKSlcblxuICByZXR1cm4ge1xuICAgIHNldE1lbnUgKG5hbWU6IHN0cmluZywgbWVudTogVVBJLlRBdG9tTWVudVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF1cbiAgICAgIH1cbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBVUEkuSVN0YXR1cykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBzdGF0dXMpXG4gICAgfSxcbiAgICBzZXRNZXNzYWdlcyAobWVzc2FnZXM6IFVQSS5JUmVzdWx0SXRlbVtdKSB7XG4gICAgICBtZXNzYWdlUHJvdmlkZXIuc2V0TWVzc2FnZXMobWVzc2FnZXMpXG4gICAgfSxcbiAgICBhZGRNZXNzYWdlVGFiIChuYW1lOiBzdHJpbmcsIG9wdHM6IFVQSS5JU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogVVBJLklTaG93VG9vbHRpcFBhcmFtcykge1xuICAgICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgICAgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGRldGFpbClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdG9vbHRpcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCB0dCA9IHRvb2x0aXBcbiAgICAgICAgdG9vbHRpcCA9ICgpID0+IHR0XG4gICAgICB9XG4gICAgICBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeS5zaG93VG9vbHRpcChcbiAgICAgICAgZWRpdG9yLCBldmVudFR5cGUsIHtwbHVnaW5OYW1lLCB0b29sdGlwfVxuICAgICAgKVxuICAgIH0sXG4gICAgYWRkUGFuZWxDb250cm9sPFQ+IChkZWY6IFVQSS5UQ29udHJvbERlZmluaXRpb248VD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChkZWYpXG4gICAgfSxcbiAgICBhZGRDb25maWdQYXJhbSAocGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IFVQSS5JUGFyYW1TcGVjPE9iamVjdD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW0gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZywgdmFsdWU6IE9iamVjdCkge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldChwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgICB9LFxuICAgIGdldEV2ZW50UmFuZ2UgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZU9yRGV0YWlsOiBVUEkuVEV2ZW50UmFuZ2VUeXBlIHwgT2JqZWN0KSB7XG4gICAgICBsZXQgdHlwZTogVVBJLlRFdmVudFJhbmdlVHlwZVxuICAgICAgaWYgKGlzVEV2ZW50UmFuZ2VUeXBlKHR5cGVPckRldGFpbCkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGVPckRldGFpbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGdldEV2ZW50VHlwZSh0eXBlT3JEZXRhaWwpXG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIH0sXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==