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
            return pluginManager.outputPanel.addPanelControl(element, opts);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBUy9ELGtCQUEwQixhQUE0QixFQUFFLFVBQWtCO0lBQ3hFLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVFLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFaEMsTUFBTSxDQUFDO1FBQ0wsT0FBTyxDQUFFLElBQVksRUFBRSxJQUFXO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSx1QkFBZTtvQkFDdEIsT0FBTyxFQUFFLENBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBRTtpQkFDMUM7YUFDQSxDQUFDLENBQUE7WUFDRixXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDakIsQ0FBQztRQUNELFNBQVMsQ0FBRSxNQUFlO1lBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEUsQ0FBQztRQUNELFdBQVcsQ0FBRSxRQUF1QjtZQUNsQyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxhQUFhLENBQUUsSUFBWSxFQUFFLElBQTRCO1lBQ3ZELGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQ0QsV0FBVyxDQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFxQjtZQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQTtnQkFDbEIsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFBO1lBQ3BCLENBQUM7WUFDRCxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDdkMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsQ0FDekMsQ0FBQTtRQUNILENBQUM7UUFDRCxlQUFlLENBQUUsT0FBMEIsRUFBRSxJQUEyQjtZQUN0RSxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pFLENBQUM7UUFDRCxjQUFjLENBQUUsU0FBaUIsRUFBRSxJQUFxQjtZQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzFFLENBQUM7UUFDSyxjQUFjLENBQUUsSUFBWTs7Z0JBQ2hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMvRCxDQUFDO1NBQUE7UUFDSyxvQkFBb0IsQ0FBRSxNQUFjLEVBQUUsSUFBWTs7Z0JBQ3RELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMzRCxDQUFDO1NBQUE7UUFDSyxjQUFjLENBQUUsSUFBWSxFQUFFLEtBQVU7O2dCQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3RFLENBQUM7U0FBQTtRQUNELGFBQWEsQ0FBRSxNQUFrQixFQUFFLFlBQXNDO1lBQ3ZFLElBQUksSUFBcUIsQ0FBQTtZQUN6QixFQUFFLENBQUMsQ0FBQywrQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxZQUFZLENBQUE7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFDRCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUE7WUFBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQS9ERCw0QkErREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWNsYXNzZXMtcGVyLWZpbGUgbWVtYmVyLWFjY2VzcyAqL1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwsIGdldEV2ZW50VHlwZSB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7SVN0YXR1cywgSVNldmVyaXR5VGFiRGVmaW5pdGlvbiwgSUNvbnRyb2xPcHRzfSBmcm9tICcuLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQge0lSZXN1bHRJdGVtfSBmcm9tICcuLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHtURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL2VkaXRvci1jb250cm9sL3Rvb2x0aXAtbWFuYWdlcidcbmltcG9ydCB7SVBhcmFtU3BlY30gZnJvbSAnLi4vY29uZmlnLXBhcmFtcydcbmltcG9ydCB7VFRvb2x0aXBGdW5jdGlvbiwgSVRvb2x0aXBEYXRhfSBmcm9tICcuLi90b29sdGlwLXJlZ2lzdHJ5J1xuaW1wb3J0IHtpc1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvZXZlbnQtdGFibGUnXG5cbmludGVyZmFjZSBJU2hvd1Rvb2x0aXBQYXJhbXMge1xuICBlZGl0b3I6IFRleHRFZGl0b3JcbiAgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlXG4gIGRldGFpbD86IGFueVxuICB0b29sdGlwOiBUVG9vbHRpcEZ1bmN0aW9uIHwgSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSAocGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgcGx1Z2luTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBjb25zdCBtZXNzYWdlUHJvdmlkZXIgPSBwbHVnaW5NYW5hZ2VyLnJlc3VsdHNEQi5yZWdpc3RlclByb3ZpZGVyKHBsdWdpbk5hbWUpXG4gIGRpc3Bvc2FibGVzLmFkZChtZXNzYWdlUHJvdmlkZXIpXG5cbiAgcmV0dXJuIHtcbiAgICBzZXRNZW51IChuYW1lOiBzdHJpbmcsIG1lbnU6IGFueVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF1cbiAgICAgIH1cbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogSVJlc3VsdEl0ZW1bXSkge1xuICAgICAgbWVzc2FnZVByb3ZpZGVyLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKVxuICAgIH0sXG4gICAgYWRkTWVzc2FnZVRhYiAobmFtZTogc3RyaW5nLCBvcHRzOiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHR0ID0gdG9vbHRpcFxuICAgICAgICB0b29sdGlwID0gKCkgPT4gdHRcbiAgICAgIH1cbiAgICAgIHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5LnNob3dUb29sdGlwKFxuICAgICAgICBlZGl0b3IsIGV2ZW50VHlwZSwge3BsdWdpbk5hbWUsIHRvb2x0aXB9XG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2wgKGVsZW1lbnQ6IHN0cmluZyB8IEZ1bmN0aW9uLCBvcHRzOiBJQ29udHJvbE9wdHMgfCBPYmplY3QpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChlbGVtZW50LCBvcHRzKVxuICAgIH0sXG4gICAgYWRkQ29uZmlnUGFyYW0gKHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBJUGFyYW1TcGVjPGFueT4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5hZGQocGx1Z2luTmFtZSwgcGFyYW1OYW1lLCBzcGVjKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW5OYW1lLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgZ2V0T3RoZXJzQ29uZmlnUGFyYW0gKHBsdWdpbjogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luLCBuYW1lKVxuICAgIH0sXG4gICAgYXN5bmMgc2V0Q29uZmlnUGFyYW0gKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLnNldChwbHVnaW5OYW1lLCBuYW1lLCB2YWx1ZSlcbiAgICB9LFxuICAgIGdldEV2ZW50UmFuZ2UgKGVkaXRvcjogVGV4dEVkaXRvciwgdHlwZU9yRGV0YWlsOiBURXZlbnRSYW5nZVR5cGUgfCBPYmplY3QpIHtcbiAgICAgIGxldCB0eXBlOiBURXZlbnRSYW5nZVR5cGVcbiAgICAgIGlmIChpc1RFdmVudFJhbmdlVHlwZSh0eXBlT3JEZXRhaWwpKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlT3JEZXRhaWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBnZXRFdmVudFR5cGUodHlwZU9yRGV0YWlsKVxuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICAgIHJldHVybiBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICB9XG4gIH1cbn1cbiJdfQ==