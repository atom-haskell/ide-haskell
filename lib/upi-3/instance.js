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
    const messageProvider = pluginManager.resultsDB.registerProvider(pluginName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBQy9ELHlCQUEyRDtBQVMzRCxrQkFDRSxhQUE0QixFQUFFLE9BQTZCO0lBRTNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNoQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUVoRCxNQUFNLENBQUM7UUFDTCxPQUFPLENBQUUsSUFBWSxFQUFFLElBQWlCO1lBQ3RDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLEtBQUssRUFBRSx1QkFBZTtvQkFDdEIsT0FBTyxFQUFFLENBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBRTtpQkFDMUM7YUFDQSxDQUFDLENBQUE7WUFDRixXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDakIsQ0FBQztRQUNELFNBQVMsQ0FBRSxNQUFlO1lBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDcEUsQ0FBQztRQUNELFdBQVcsQ0FBRSxRQUF1QjtZQUNsQyxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxhQUFhLENBQUUsSUFBWSxFQUFFLElBQTRCO1lBQ3ZELGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQ0QsV0FBVyxDQUFFLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFxQjtZQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsU0FBUyxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQTtnQkFDbEIsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFBO1lBQ3BCLENBQUM7WUFDRCxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FDdkMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsQ0FDekMsQ0FBQTtRQUNILENBQUM7UUFDRCxlQUFlLENBQUssR0FBK0I7WUFDakQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFDRCxjQUFjLENBQUUsU0FBaUIsRUFBRSxJQUF3QjtZQUN6RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzFFLENBQUM7UUFDSyxjQUFjLENBQUUsSUFBWTs7Z0JBQ2hDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMvRCxDQUFDO1NBQUE7UUFDSyxvQkFBb0IsQ0FBRSxNQUFjLEVBQUUsSUFBWTs7Z0JBQ3RELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMzRCxDQUFDO1NBQUE7UUFDSyxjQUFjLENBQUUsSUFBWSxFQUFFLEtBQWE7O2dCQUMvQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3RFLENBQUM7U0FBQTtRQUNELGFBQWEsQ0FBRSxNQUFrQixFQUFFLFlBQXNDO1lBQ3ZFLElBQUksSUFBcUIsQ0FBQTtZQUN6QixFQUFFLENBQUMsQ0FBQywrQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxZQUFZLENBQUE7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBRyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ25DLENBQUM7WUFDRCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUE7WUFBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7UUFDRCxPQUFPO1lBQ0wsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3ZCLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQXRFRCw0QkFzRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBUZXh0RWRpdG9yIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IE1BSU5fTUVOVV9MQUJFTCwgZ2V0RXZlbnRUeXBlIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtJU3RhdHVzLCBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uLCBUQ29udHJvbERlZmluaXRpb259IGZyb20gJy4uL291dHB1dC1wYW5lbCdcbmltcG9ydCB7SVJlc3VsdEl0ZW19IGZyb20gJy4uL3Jlc3VsdHMtZGInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuaW1wb3J0IHtJUGFyYW1TcGVjfSBmcm9tICcuLi9jb25maWctcGFyYW1zJ1xuaW1wb3J0IHtUVG9vbHRpcEZ1bmN0aW9uLCBJVG9vbHRpcERhdGF9IGZyb20gJy4uL3Rvb2x0aXAtcmVnaXN0cnknXG5pbXBvcnQge2lzVEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC9ldmVudC10YWJsZSdcbmltcG9ydCB7VEF0b21NZW51LCBjb25zdW1lLCBJUmVnaXN0cmF0aW9uT3B0aW9uc30gZnJvbSAnLi8nXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNob3dUb29sdGlwUGFyYW1zIHtcbiAgZWRpdG9yOiBUZXh0RWRpdG9yXG4gIGV2ZW50VHlwZT86IFRFdmVudFJhbmdlVHlwZVxuICBkZXRhaWw/OiBPYmplY3RcbiAgdG9vbHRpcDogVFRvb2x0aXBGdW5jdGlvbiB8IElUb29sdGlwRGF0YVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFuY2UgKFxuICBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyLCBvcHRpb25zOiBJUmVnaXN0cmF0aW9uT3B0aW9uc1xuKSB7XG4gIGNvbnN0IHBsdWdpbk5hbWUgPSBvcHRpb25zLm5hbWVcbiAgY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIGNvbnN0IG1lc3NhZ2VQcm92aWRlciA9IHBsdWdpbk1hbmFnZXIucmVzdWx0c0RCLnJlZ2lzdGVyUHJvdmlkZXIocGx1Z2luTmFtZSlcbiAgZGlzcG9zYWJsZXMuYWRkKG1lc3NhZ2VQcm92aWRlcilcbiAgZGlzcG9zYWJsZXMuYWRkKGNvbnN1bWUocGx1Z2luTWFuYWdlciwgb3B0aW9ucykpXG5cbiAgcmV0dXJuIHtcbiAgICBzZXRNZW51IChuYW1lOiBzdHJpbmcsIG1lbnU6IFRBdG9tTWVudVtdKSB7XG4gICAgICBjb25zdCBtZW51RGlzcCA9IGF0b20ubWVudS5hZGQoW3tcbiAgICAgICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICAgICAgc3VibWVudTogWyB7bGFiZWw6IG5hbWUsIHN1Ym1lbnU6IG1lbnV9IF1cbiAgICAgIH1cbiAgICAgIF0pXG4gICAgICBkaXNwb3NhYmxlcy5hZGQobWVudURpc3ApXG4gICAgICByZXR1cm4gbWVudURpc3BcbiAgICB9LFxuICAgIHNldFN0YXR1cyAoc3RhdHVzOiBJU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogSVJlc3VsdEl0ZW1bXSkge1xuICAgICAgbWVzc2FnZVByb3ZpZGVyLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKVxuICAgIH0sXG4gICAgYWRkTWVzc2FnZVRhYiAobmFtZTogc3RyaW5nLCBvcHRzOiBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmNyZWF0ZVRhYihuYW1lLCBvcHRzKVxuICAgIH0sXG4gICAgc2hvd1Rvb2x0aXAgKHtlZGl0b3IsIGV2ZW50VHlwZSwgZGV0YWlsLCB0b29sdGlwfTogSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0b29sdGlwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHR0ID0gdG9vbHRpcFxuICAgICAgICB0b29sdGlwID0gKCkgPT4gdHRcbiAgICAgIH1cbiAgICAgIHBsdWdpbk1hbmFnZXIudG9vbHRpcFJlZ2lzdHJ5LnNob3dUb29sdGlwKFxuICAgICAgICBlZGl0b3IsIGV2ZW50VHlwZSwge3BsdWdpbk5hbWUsIHRvb2x0aXB9XG4gICAgICApXG4gICAgfSxcbiAgICBhZGRQYW5lbENvbnRyb2w8VD4gKGRlZjogVENvbnRyb2xEZWZpbml0aW9uPE9iamVjdD4pIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLm91dHB1dFBhbmVsLmFkZFBhbmVsQ29udHJvbChkZWYpXG4gICAgfSxcbiAgICBhZGRDb25maWdQYXJhbSAocGFyYW1OYW1lOiBzdHJpbmcsIHNwZWM6IElQYXJhbVNwZWM8T2JqZWN0Pikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmFkZChwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpXG4gICAgfSxcbiAgICBhc3luYyBnZXRDb25maWdQYXJhbSAobmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0KHBsdWdpbk5hbWUsIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBnZXRPdGhlcnNDb25maWdQYXJhbSAocGx1Z2luOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldChwbHVnaW4sIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBzZXRDb25maWdQYXJhbSAobmFtZTogc3RyaW5nLCB2YWx1ZTogT2JqZWN0KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuc2V0KHBsdWdpbk5hbWUsIG5hbWUsIHZhbHVlKVxuICAgIH0sXG4gICAgZ2V0RXZlbnRSYW5nZSAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlT3JEZXRhaWw6IFRFdmVudFJhbmdlVHlwZSB8IE9iamVjdCkge1xuICAgICAgbGV0IHR5cGU6IFRFdmVudFJhbmdlVHlwZVxuICAgICAgaWYgKGlzVEV2ZW50UmFuZ2VUeXBlKHR5cGVPckRldGFpbCkpIHtcbiAgICAgICAgdHlwZSA9IHR5cGVPckRldGFpbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IGdldEV2ZW50VHlwZSh0eXBlT3JEZXRhaWwpXG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICAgIGlmICghY29udHJvbGxlcikgeyByZXR1cm4gfVxuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIH0sXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==