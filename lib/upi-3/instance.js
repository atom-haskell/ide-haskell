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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFPeEQsK0RBQStEO0FBQy9ELHlCQUEyRDtBQVMzRCxrQkFDRSxhQUE0QixFQUFFLE9BQTZCO0lBRTNELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBaUI7WUFDdEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQWU7WUFDeEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNwRSxDQUFDO1FBQ0QsV0FBVyxDQUFFLFFBQXVCO1lBQ2xDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELGFBQWEsQ0FBRSxJQUFZLEVBQUUsSUFBNEI7WUFDdkQsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFDRCxXQUFXLENBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQXFCO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFBO2dCQUNsQixPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUE7WUFDcEIsQ0FBQztZQUNELGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUN2QyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUN6QyxDQUFBO1FBQ0gsQ0FBQztRQUNELGVBQWUsQ0FBSyxHQUEwQjtZQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkQsQ0FBQztRQUNELGNBQWMsQ0FBRSxTQUFpQixFQUFFLElBQXdCO1lBQ3pELE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUUsQ0FBQztRQUNLLGNBQWMsQ0FBRSxJQUFZOztnQkFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQy9ELENBQUM7U0FBQTtRQUNLLG9CQUFvQixDQUFFLE1BQWMsRUFBRSxJQUFZOztnQkFDdEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQzNELENBQUM7U0FBQTtRQUNLLGNBQWMsQ0FBRSxJQUFZLEVBQUUsS0FBYTs7Z0JBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEUsQ0FBQztTQUFBO1FBQ0QsYUFBYSxDQUFFLE1BQWtCLEVBQUUsWUFBc0M7WUFDdkUsSUFBSSxJQUFxQixDQUFBO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLCtCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLFlBQVksQ0FBQTtZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFHLG9CQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDbkMsQ0FBQztZQUNELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQTtZQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELE9BQU87WUFDTCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBdEVELDRCQXNFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIFRleHRFZGl0b3IgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMLCBnZXRFdmVudFR5cGUgfSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge0lTdGF0dXMsIElTZXZlcml0eVRhYkRlZmluaXRpb24sIFRDb250cm9sRGVmaW5pdGlvbn0gZnJvbSAnLi4vb3V0cHV0LXBhbmVsJ1xuaW1wb3J0IHtJUmVzdWx0SXRlbX0gZnJvbSAnLi4vcmVzdWx0cy1kYidcbmltcG9ydCB7VEV2ZW50UmFuZ2VUeXBlfSBmcm9tICcuLi9lZGl0b3ItY29udHJvbC90b29sdGlwLW1hbmFnZXInXG5pbXBvcnQge0lQYXJhbVNwZWN9IGZyb20gJy4uL2NvbmZpZy1wYXJhbXMnXG5pbXBvcnQge1RUb29sdGlwRnVuY3Rpb24sIElUb29sdGlwRGF0YX0gZnJvbSAnLi4vdG9vbHRpcC1yZWdpc3RyeSdcbmltcG9ydCB7aXNURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL2VkaXRvci1jb250cm9sL2V2ZW50LXRhYmxlJ1xuaW1wb3J0IHtUQXRvbU1lbnUsIGNvbnN1bWUsIElSZWdpc3RyYXRpb25PcHRpb25zfSBmcm9tICcuLydcblxuZXhwb3J0IGludGVyZmFjZSBJU2hvd1Rvb2x0aXBQYXJhbXMge1xuICBlZGl0b3I6IFRleHRFZGl0b3JcbiAgZXZlbnRUeXBlPzogVEV2ZW50UmFuZ2VUeXBlXG4gIGRldGFpbD86IE9iamVjdFxuICB0b29sdGlwOiBUVG9vbHRpcEZ1bmN0aW9uIHwgSVRvb2x0aXBEYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW5jZSAoXG4gIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIsIG9wdGlvbnM6IElSZWdpc3RyYXRpb25PcHRpb25zXG4pIHtcbiAgY29uc3QgcGx1Z2luTmFtZSA9IG9wdGlvbnMubmFtZVxuICBjb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgY29uc3QgbWVzc2FnZVByb3ZpZGVyID0gcGx1Z2luTWFuYWdlci5yZXN1bHRzREIucmVnaXN0ZXJQcm92aWRlcigpXG4gIGRpc3Bvc2FibGVzLmFkZChtZXNzYWdlUHJvdmlkZXIpXG4gIGRpc3Bvc2FibGVzLmFkZChjb25zdW1lKHBsdWdpbk1hbmFnZXIsIG9wdGlvbnMpKVxuXG4gIHJldHVybiB7XG4gICAgc2V0TWVudSAobmFtZTogc3RyaW5nLCBtZW51OiBUQXRvbU1lbnVbXSkge1xuICAgICAgY29uc3QgbWVudURpc3AgPSBhdG9tLm1lbnUuYWRkKFt7XG4gICAgICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgICAgIHN1Ym1lbnU6IFsge2xhYmVsOiBuYW1lLCBzdWJtZW51OiBtZW51fSBdXG4gICAgICB9XG4gICAgICBdKVxuICAgICAgZGlzcG9zYWJsZXMuYWRkKG1lbnVEaXNwKVxuICAgICAgcmV0dXJuIG1lbnVEaXNwXG4gICAgfSxcbiAgICBzZXRTdGF0dXMgKHN0YXR1czogSVN0YXR1cykge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBzdGF0dXMpXG4gICAgfSxcbiAgICBzZXRNZXNzYWdlcyAobWVzc2FnZXM6IElSZXN1bHRJdGVtW10pIHtcbiAgICAgIG1lc3NhZ2VQcm92aWRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2VUYWIgKG5hbWU6IHN0cmluZywgb3B0czogSVNldmVyaXR5VGFiRGVmaW5pdGlvbikge1xuICAgICAgcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5jcmVhdGVUYWIobmFtZSwgb3B0cylcbiAgICB9LFxuICAgIHNob3dUb29sdGlwICh7ZWRpdG9yLCBldmVudFR5cGUsIGRldGFpbCwgdG9vbHRpcH06IElTaG93VG9vbHRpcFBhcmFtcykge1xuICAgICAgaWYgKCFldmVudFR5cGUpIHtcbiAgICAgICAgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGRldGFpbClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdG9vbHRpcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCB0dCA9IHRvb2x0aXBcbiAgICAgICAgdG9vbHRpcCA9ICgpID0+IHR0XG4gICAgICB9XG4gICAgICBwbHVnaW5NYW5hZ2VyLnRvb2x0aXBSZWdpc3RyeS5zaG93VG9vbHRpcChcbiAgICAgICAgZWRpdG9yLCBldmVudFR5cGUsIHtwbHVnaW5OYW1lLCB0b29sdGlwfVxuICAgICAgKVxuICAgIH0sXG4gICAgYWRkUGFuZWxDb250cm9sPFQ+IChkZWY6IFRDb250cm9sRGVmaW5pdGlvbjxUPikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuYWRkUGFuZWxDb250cm9sKGRlZilcbiAgICB9LFxuICAgIGFkZENvbmZpZ1BhcmFtIChwYXJhbU5hbWU6IHN0cmluZywgc3BlYzogSVBhcmFtU3BlYzxPYmplY3Q+KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuYWRkKHBsdWdpbk5hbWUsIHBhcmFtTmFtZSwgc3BlYylcbiAgICB9LFxuICAgIGFzeW5jIGdldENvbmZpZ1BhcmFtIChuYW1lOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5nZXQocGx1Z2luTmFtZSwgbmFtZSlcbiAgICB9LFxuICAgIGFzeW5jIGdldE90aGVyc0NvbmZpZ1BhcmFtIChwbHVnaW46IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0KHBsdWdpbiwgbmFtZSlcbiAgICB9LFxuICAgIGFzeW5jIHNldENvbmZpZ1BhcmFtIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBPYmplY3QpIHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5zZXQocGx1Z2luTmFtZSwgbmFtZSwgdmFsdWUpXG4gICAgfSxcbiAgICBnZXRFdmVudFJhbmdlIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGVPckRldGFpbDogVEV2ZW50UmFuZ2VUeXBlIHwgT2JqZWN0KSB7XG4gICAgICBsZXQgdHlwZTogVEV2ZW50UmFuZ2VUeXBlXG4gICAgICBpZiAoaXNURXZlbnRSYW5nZVR5cGUodHlwZU9yRGV0YWlsKSkge1xuICAgICAgICB0eXBlID0gdHlwZU9yRGV0YWlsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gZ2V0RXZlbnRUeXBlKHR5cGVPckRldGFpbClcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoZWRpdG9yKVxuICAgICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgICByZXR1cm4gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgfSxcbiAgICBkaXNwb3NlICgpIHtcbiAgICAgIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIH1cbiAgfVxufVxuIl19