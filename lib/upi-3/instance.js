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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBVS9ELGtCQUEwQixhQUE0QixFQUFFLFVBQWtCO0lBQ3hFLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVFLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFaEMsTUFBTSxDQUFDO1FBQ0wsT0FBTyxDQUFFLElBQVksRUFBRSxJQUFpQjtZQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixLQUFLLEVBQUUsdUJBQWU7b0JBQ3RCLE9BQU8sRUFBRSxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUU7aUJBQzFDO2FBQ0EsQ0FBQyxDQUFBO1lBQ0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ2pCLENBQUM7UUFDRCxTQUFTLENBQUUsTUFBZTtZQUN4QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3BFLENBQUM7UUFDRCxXQUFXLENBQUUsUUFBdUI7WUFDbEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsYUFBYSxDQUFFLElBQVksRUFBRSxJQUE0QjtZQUN2RCxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDakQsQ0FBQztRQUNELFdBQVcsQ0FBRSxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBcUI7WUFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFNBQVMsR0FBRyxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2xDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUE7Z0JBQ2xCLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQTtZQUNwQixDQUFDO1lBQ0QsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQ3ZDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQ3pDLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZSxDQUFLLE9BQXNELEVBQUUsSUFBc0I7WUFDaEcsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNqRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNqRSxDQUFDO1FBQ0gsQ0FBQztRQUNELGNBQWMsQ0FBRSxTQUFpQixFQUFFLElBQXdCO1lBQ3pELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUUsQ0FBQztRQUNLLGNBQWMsQ0FBRSxJQUFZOztnQkFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQy9ELENBQUM7U0FBQTtRQUNLLG9CQUFvQixDQUFFLE1BQWMsRUFBRSxJQUFZOztnQkFDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQzNELENBQUM7U0FBQTtRQUNLLGNBQWMsQ0FBRSxJQUFZLEVBQUUsS0FBYTs7Z0JBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEUsQ0FBQztTQUFBO1FBQ0QsYUFBYSxDQUFFLE1BQWtCLEVBQUUsWUFBc0M7WUFDdkUsSUFBSSxJQUFxQixDQUFBO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLCtCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLFlBQVksQ0FBQTtZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUNELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQTtZQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBbkVELDRCQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge0lTdGF0dXMsIElTZXZlcml0eVRhYkRlZmluaXRpb24sIElDb250cm9sT3B0cywgSUVsZW1lbnRPYmplY3R9IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7SVJlc3VsdEl0ZW19IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuaW1wb3J0IHtJUGFyYW1TcGVjfSBmcm9tICcuLi9jb25maWctcGFyYW1zJ1xuaW1wb3J0IHtUVG9vbHRpcEZ1bmN0aW9uLCBJVG9vbHRpcERhdGF9IGZyb20gJy4uL3Rvb2x0aXAtcmVnaXN0cnknXG5pbXBvcnQge2lzVEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC9ldmVudC10YWJsZSdcbmltcG9ydCB7VEF0b21NZW51fSBmcm9tICcuLydcblxuZXhwb3J0IGludGVyZmFjZSBJU2hvd1Rvb2x0aXBQYXJhbXMge1xuICBlZGl0b3I6IFRleHRFZGl0b3JcbiAgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlXG4gIGRldGFpbD86IE9iamVjdFxuICB0b29sdGlwOiBUVG9vbHRpcEZ1bmN0aW9uIHwgSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSAocGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgcGx1Z2luTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdCBtZXNzYWdlUHJvdmlkZXIgPSBwbHVnaW5NYW5hZ2VyLnJlc3VsdHNEQi5yZWdpc3RlclByb3ZpZGVyKHBsdWdpbk5hbWUpXG4gIGRpc3Bvc2FibGVzLmFkZChtZXNzYWdlUHJvdmlkZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBzZXRNZW51IChuYW1lOiBzdHJpbmcsIG1lbnU6IFRBdG9tTWVudVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF1cbiAgICAgIH1cbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogSVJlc3VsdEl0ZW1bXSkge1xuICAgICAgbWVzc2FnZVByb3ZpZGVyLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKVxuICAgIH0sXG4gICAgYWRkTWVzc2FnZVRhYiAobmFtZTogc3RyaW5nLCBvcHRzOiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHR0ID0gdG9vbHRpcFxuICAgICAgICB0b29sdGlwID0gKCkgPT4gdHRcbiAgICAgIH1cbiAgICAgIHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5LnNob3dUb29sdGlwKFxuICAgICAgICBlZGl0b3IsIGV2ZW50VHlwZSwge3BsdWdpbk5hbWUsIHRvb2x0aXB9XG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2w8VD4gKGVsZW1lbnQ6IHN0cmluZyB8IHsgbmV3IChvcHRzOiBUKTogSUVsZW1lbnRPYmplY3Q8VD4gfSwgb3B0czogSUNvbnRyb2xPcHRzIHwgVCkge1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woZWxlbWVudCwgb3B0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChlbGVtZW50LCBvcHRzKVxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkQ29uZmlnUGFyYW0gKHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBJUGFyYW1TcGVjPE9iamVjdD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW0gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZywgdmFsdWU6IE9iamVjdCkge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldChwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgICB9LFxuICAgIGdldEV2ZW50UmFuZ2UgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZU9yRGV0YWlsOiBURXZlbnRSYW5nZVR5cGUgfCBPYmplY3QpIHtcbiAgICAgIGxldCB0eXBlOiBURXZlbnRSYW5nZVR5cGVcbiAgICAgIGlmIChpc1RFdmVudFJhbmdlVHlwZSh0eXBlT3JEZXRhaWwpKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlT3JEZXRhaWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBnZXRFdmVudFR5cGUodHlwZU9yRGV0YWlsKVxuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICAgIHJldHVybiBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==