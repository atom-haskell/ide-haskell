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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFzRDtBQUN0RCxvQ0FBd0Q7QUFFeEQsb0NBQTBDO0FBQzFDLHlCQUEwQjtBQUUxQixrQkFDRSxhQUE0QixFQUFFLE9BQWlDO0lBRS9ELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBQzdDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtJQUNsRSxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRWhELE1BQU0sQ0FBQztRQUNMLE9BQU8sQ0FBRSxJQUFZLEVBQUUsSUFBOEI7WUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsS0FBSyxFQUFFLHVCQUFlO29CQUN0QixPQUFPLEVBQUUsQ0FBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFFO2lCQUMxQzthQUNBLENBQUMsQ0FBQTtZQUNGLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsU0FBUyxDQUFFLE1BQW1CO1lBQzVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBQ0QsV0FBVyxDQUFFLFFBQTJCO1lBQ3RDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQUNELGFBQWEsQ0FBRSxJQUFZLEVBQUUsSUFBZ0M7WUFDM0QsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFDRCxXQUFXLENBQUUsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQXlCO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZixTQUFTLEdBQUcsb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNsQyxDQUFDO1lBQ0QsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQ3ZDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQ3pDLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZSxDQUFLLEdBQThCO1lBQ2hELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0QsY0FBYyxDQUFLLFNBQWlCLEVBQUUsSUFBdUI7WUFDM0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxDQUFDO1FBQ0ssY0FBYyxDQUFLLElBQVk7O2dCQUNuQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDbEUsQ0FBQztTQUFBO1FBQ0ssb0JBQW9CLENBQUssTUFBYyxFQUFFLElBQVk7O2dCQUN6RCxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBSSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDOUQsQ0FBQztTQUFBO1FBQ0ssY0FBYyxDQUFLLElBQVksRUFBRSxLQUFTOztnQkFDOUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUksVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN6RSxDQUFDO1NBQUE7UUFDRCxhQUFhLENBQUUsTUFBa0IsRUFBRSxZQUEwQztZQUMzRSxJQUFJLElBQXlCLENBQUE7WUFDN0IsRUFBRSxDQUFDLENBQUMseUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLEdBQUcsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFBO1lBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDO1FBQ0QsT0FBTztZQUNMLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2QixDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFsRUQsNEJBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwsIGdldEV2ZW50VHlwZSB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyfSBmcm9tICcuLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7aXNURXZlbnRSYW5nZVR5cGV9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHtjb25zdW1lfSBmcm9tICcuLydcblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbmNlIChcbiAgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciwgb3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zXG4pOiBVUEkuSVVQSUluc3RhbmNlIHtcbiAgY29uc3QgcGx1Z2luTmFtZSA9IG9wdGlvbnMubmFtZVxuICBjb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgY29uc3QgbWVzc2FnZVByb3ZpZGVyID0gcGx1Z2luTWFuYWdlci5yZXN1bHRzREIucmVnaXN0ZXJQcm92aWRlcigpXG4gIGRpc3Bvc2FibGVzLmFkZChtZXNzYWdlUHJvdmlkZXIpXG4gIGRpc3Bvc2FibGVzLmFkZChjb25zdW1lKHBsdWdpbk1hbmFnZXIsIG9wdGlvbnMpKVxuXG4gIHJldHVybiB7XG4gICAgc2V0TWVudSAobmFtZTogc3RyaW5nLCBtZW51OiBBdG9tVHlwZXMuQXRvbU1lbnVJdGVtW10pIHtcbiAgICAgIGNvbnN0IG1lbnVEaXNwID0gYXRvbS5tZW51LmFkZChbe1xuICAgICAgICBsYWJlbDogTUFJTl9NRU5VX0xBQkVMLFxuICAgICAgICBzdWJtZW51OiBbIHtsYWJlbDogbmFtZSwgc3VibWVudTogbWVudX0gXVxuICAgICAgfVxuICAgICAgXSlcbiAgICAgIGRpc3Bvc2FibGVzLmFkZChtZW51RGlzcClcbiAgICAgIHJldHVybiBtZW51RGlzcFxuICAgIH0sXG4gICAgc2V0U3RhdHVzIChzdGF0dXM6IFVQSS5JU3RhdHVzKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIHN0YXR1cylcbiAgICB9LFxuICAgIHNldE1lc3NhZ2VzIChtZXNzYWdlczogVVBJLklSZXN1bHRJdGVtW10pIHtcbiAgICAgIG1lc3NhZ2VQcm92aWRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcylcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2VUYWIgKG5hbWU6IHN0cmluZywgb3B0czogVVBJLklTZXZlcml0eVRhYkRlZmluaXRpb24pIHtcbiAgICAgIHBsdWdpbk1hbmFnZXIub3V0cHV0UGFuZWwuY3JlYXRlVGFiKG5hbWUsIG9wdHMpXG4gICAgfSxcbiAgICBzaG93VG9vbHRpcCAoe2VkaXRvciwgZXZlbnRUeXBlLCBkZXRhaWwsIHRvb2x0aXB9OiBVUEkuSVNob3dUb29sdGlwUGFyYW1zKSB7XG4gICAgICBpZiAoIWV2ZW50VHlwZSkge1xuICAgICAgICBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZGV0YWlsKVxuICAgICAgfVxuICAgICAgcGx1Z2luTWFuYWdlci50b29sdGlwUmVnaXN0cnkuc2hvd1Rvb2x0aXAoXG4gICAgICAgIGVkaXRvciwgZXZlbnRUeXBlLCB7cGx1Z2luTmFtZSwgdG9vbHRpcH1cbiAgICAgIClcbiAgICB9LFxuICAgIGFkZFBhbmVsQ29udHJvbDxUPiAoZGVmOiBVUEkuVENvbnRyb2xEZWZpbml0aW9uPFQ+KSB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5vdXRwdXRQYW5lbC5hZGRQYW5lbENvbnRyb2woZGVmKVxuICAgIH0sXG4gICAgYWRkQ29uZmlnUGFyYW08VD4gKHBhcmFtTmFtZTogc3RyaW5nLCBzcGVjOiBVUEkuSVBhcmFtU3BlYzxUPikge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmFkZChwbHVnaW5OYW1lLCBwYXJhbU5hbWUsIHNwZWMpXG4gICAgfSxcbiAgICBhc3luYyBnZXRDb25maWdQYXJhbTxUPiAobmFtZTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5jb25maWdQYXJhbU1hbmFnZXIuZ2V0PFQ+KHBsdWdpbk5hbWUsIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBnZXRPdGhlcnNDb25maWdQYXJhbTxUPiAocGx1Z2luOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuY29uZmlnUGFyYW1NYW5hZ2VyLmdldDxUPihwbHVnaW4sIG5hbWUpXG4gICAgfSxcbiAgICBhc3luYyBzZXRDb25maWdQYXJhbTxUPiAobmFtZTogc3RyaW5nLCB2YWx1ZT86IFQpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLmNvbmZpZ1BhcmFtTWFuYWdlci5zZXQ8VD4ocGx1Z2luTmFtZSwgbmFtZSwgdmFsdWUpXG4gICAgfSxcbiAgICBnZXRFdmVudFJhbmdlIChlZGl0b3I6IFRleHRFZGl0b3IsIHR5cGVPckRldGFpbDogVVBJLlRFdmVudFJhbmdlVHlwZSB8IE9iamVjdCkge1xuICAgICAgbGV0IHR5cGU6IFVQSS5URXZlbnRSYW5nZVR5cGVcbiAgICAgIGlmIChpc1RFdmVudFJhbmdlVHlwZSh0eXBlT3JEZXRhaWwpKSB7XG4gICAgICAgIHR5cGUgPSB0eXBlT3JEZXRhaWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBnZXRFdmVudFR5cGUodHlwZU9yRGV0YWlsKVxuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihlZGl0b3IpXG4gICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICAgIHJldHVybiBjb250cm9sbGVyLmdldEV2ZW50UmFuZ2UodHlwZSlcbiAgICB9LFxuICAgIGRpc3Bvc2UgKCkge1xuICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgfVxuICB9XG59XG4iXX0=