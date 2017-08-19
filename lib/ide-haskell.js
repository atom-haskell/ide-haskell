"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI2 = require("./upi-2");
const UPI3 = require("./upi-3");
let upiProvided = false;
let disposables;
let pluginManager;
let menu;
var config_1 = require("./config");
exports.config = config_1.config;
function cleanConfig() { }
function activate(state) {
    cleanConfig();
    atom.views.getView(atom.workspace).classList.add('ide-haskell');
    require('etch').setScheduler(atom.views);
    upiProvided = false;
    if (atom.config.get('ide-haskell.startupMessageIdeBackend')) {
        setTimeout(() => {
            if (!upiProvided) {
                atom.notifications.addWarning(`Ide-Haskell needs backends that provide most of functionality.
            Please refer to README for details`, { dismissable: true });
            }
        }, 5000);
    }
    disposables = new atom_1.CompositeDisposable();
    pluginManager = new plugin_manager_1.PluginManager(state);
    disposables.add(atom.commands.add('atom-workspace', {
        'ide-haskell:toggle-output': () => { pluginManager && pluginManager.togglePanel(); },
        'ide-haskell:next-error': () => { pluginManager && pluginManager.nextError(); },
        'ide-haskell:prev-error': () => { pluginManager && pluginManager.prevError(); },
    }), atom.commands.add('atom-text-editor.ide-haskell', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            prettify_1.prettifyFile(currentTarget.getModel());
        },
    }), atom.commands.add('atom-text-editor.ide-haskell--has-tooltips', {
        'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }) => {
            const controller = pluginManager && pluginManager.controller(currentTarget.getModel());
            if (controller && controller.tooltips.has()) {
                controller.tooltips.hide();
            }
            else if (abortKeyBinding) {
                abortKeyBinding();
            }
        },
    }), atom.commands.add('atom-text-editor[data-grammar~="cabal"]', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            prettify_1.prettifyFile(currentTarget.getModel(), 'cabal');
        },
    }));
    menu = new atom_1.CompositeDisposable();
    menu.add(atom.menu.add([{
            label: utils_1.MAIN_MENU_LABEL,
            submenu: [
                { label: 'Prettify', command: 'ide-haskell:prettify-file' },
                { label: 'Toggle Panel', command: 'ide-haskell:toggle-output' },
            ],
        }]));
}
exports.activate = activate;
function deactivate() {
    pluginManager && pluginManager.deactivate();
    disposables && disposables.dispose();
    menu && menu.dispose();
    atom.menu.update();
}
exports.deactivate = deactivate;
function serialize() {
    if (pluginManager) {
        return pluginManager.serialize();
    }
}
exports.serialize = serialize;
function provideUpi() {
    upiProvided = true;
    return {
        registerPlugin(disp, pluginName) {
            if (!pluginManager) {
                return undefined;
            }
            return UPI2.instance(pluginManager, disp, pluginName);
        },
    };
}
exports.provideUpi = provideUpi;
function provideUpi3() {
    upiProvided = true;
    return (options) => {
        if (!pluginManager) {
            throw new Error('IDE-Haskell failed to provide UPI instance: pluginManager is undefined');
        }
        return UPI3.instance(pluginManager, options);
    };
}
exports.provideUpi3 = provideUpi3;
function consumeUpi3(registration) {
    upiProvided = true;
    if (pluginManager) {
        return UPI3.consume(pluginManager, registration);
    }
}
exports.consumeUpi3 = consumeUpi3;
function consumeLinter(indieRegistry) {
    if (!(disposables && pluginManager)) {
        return undefined;
    }
    const linter = indieRegistry.register({ name: 'IDE-Haskell' });
    disposables.add(linter);
    pluginManager.setLinter(linter);
    return linter;
}
exports.consumeLinter = consumeLinter;
function consumeStatusBar(statusBar) {
    if (!pluginManager) {
        return undefined;
    }
    pluginManager.setStatusBar(statusBar);
    return new atom_1.Disposable(() => {
        if (pluginManager) {
            pluginManager.removeStatusBar();
        }
    });
}
exports.consumeStatusBar = consumeStatusBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0U7QUFDbEUscURBQXdEO0FBQ3hELHlDQUF5QztBQUN6QyxtQ0FBeUM7QUFDekMsZ0NBQStCO0FBQy9CLGdDQUErQjtBQUUvQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDdkIsSUFBSSxXQUE0QyxDQUFBO0FBQ2hELElBQUksYUFBd0MsQ0FBQTtBQUM1QyxJQUFJLElBQXFDLENBQUE7QUFFekMsbUNBQWlDO0FBQXhCLDBCQUFBLE1BQU0sQ0FBQTtBQUVmLHlCQUFrQyxDQUFDO0FBRW5DLGtCQUF5QixLQUFhO0lBQ3BDLFdBQVcsRUFBRSxDQUFBO0lBRWIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFeEMsV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLENBQ1I7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUMzQjsrQ0FDbUMsRUFDbkMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQyxFQUNELElBQUksQ0FDTCxDQUFBO0lBQ0gsQ0FBQztJQUVELFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFFdkMsYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUd4QyxXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ2xDLDJCQUEyQixFQUFFLFFBQVEsYUFBYSxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLENBQUM7UUFDbkYsd0JBQXdCLEVBQUUsUUFBUSxhQUFhLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFBLENBQUMsQ0FBQztRQUM5RSx3QkFBd0IsRUFBRSxRQUFRLGFBQWEsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUEsQ0FBQyxDQUFDO0tBQy9FLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRTtRQUNoRCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjO1lBQ3pELHVCQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztLQUNGLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRTtRQUM5RCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBYztZQUMxRSxNQUFNLFVBQVUsR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUN0RixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixlQUFlLEVBQUUsQ0FBQTtZQUNuQixDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRTtRQUMzRCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjO1lBQ3pELHVCQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ2pELENBQUM7S0FDRixDQUFDLENBQ0gsQ0FBQTtJQUVELElBQUksR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssRUFBRSx1QkFBZTtZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtnQkFDM0QsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTthQUNoRTtTQUNGLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBaEVELDRCQWdFQztBQUVEO0lBQ0UsYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUczQyxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXBDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNwQixDQUFDO0FBUkQsZ0NBUUM7QUFFRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0FBQ0gsQ0FBQztBQUpELDhCQUlDO0FBRUQ7SUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLE1BQU0sQ0FBQztRQUNMLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVTtZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtZQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUN2RCxDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFSRCxnQ0FRQztBQUVEO0lBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUNsQixNQUFNLENBQUMsQ0FBQyxPQUFpQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUE7UUFBQyxDQUFDO1FBQ2pILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM5QyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsa0NBTUM7QUFFRCxxQkFBNEIsWUFBc0M7SUFDaEUsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUNsQixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0FBQ0gsQ0FBQztBQUxELGtDQUtDO0FBRUQsdUJBQThCLGFBQW1DO0lBQy9ELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtJQUFDLENBQUM7SUFDekQsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQzlELFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQU5ELHNDQU1DO0FBRUQsMEJBQWlDLFNBQThCO0lBQzdELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFBQyxDQUFDO0lBQ3hDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDckMsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUNqQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBUkQsNENBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRXZlbnREZXNjLCBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIsIElTdGF0ZSB9IGZyb20gJy4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQgeyBwcmV0dGlmeUZpbGUgfSBmcm9tICcuL3ByZXR0aWZ5J1xuaW1wb3J0IHsgTUFJTl9NRU5VX0xBQkVMIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCAqIGFzIFVQSTIgZnJvbSAnLi91cGktMidcbmltcG9ydCAqIGFzIFVQSTMgZnJvbSAnLi91cGktMydcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxubGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIgfCB1bmRlZmluZWRcbmxldCBtZW51OiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5cbmV4cG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5mdW5jdGlvbiBjbGVhbkNvbmZpZygpIHsgLypub29wKi8gfVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IElTdGF0ZSkge1xuICBjbGVhbkNvbmZpZygpXG5cbiAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG5cbiAgcmVxdWlyZSgnZXRjaCcpLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKVxuXG4gIHVwaVByb3ZpZGVkID0gZmFsc2VcblxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQnKSkge1xuICAgIHNldFRpbWVvdXQoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghdXBpUHJvdmlkZWQpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICAgIGBJZGUtSGFza2VsbCBuZWVkcyBiYWNrZW5kcyB0aGF0IHByb3ZpZGUgbW9zdCBvZiBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAgICAgUGxlYXNlIHJlZmVyIHRvIFJFQURNRSBmb3IgZGV0YWlsc2AsXG4gICAgICAgICAgICB7IGRpc21pc3NhYmxlOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICA1MDAwLFxuICAgIClcbiAgfVxuXG4gIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gIHBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcihzdGF0ZSlcblxuICAvLyBnbG9iYWwgY29tbWFuZHNcbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdpZGUtaGFza2VsbDp0b2dnbGUtb3V0cHV0JzogKCkgPT4geyBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIudG9nZ2xlUGFuZWwoKSB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOm5leHQtZXJyb3InOiAoKSA9PiB7IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5uZXh0RXJyb3IoKSB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOnByZXYtZXJyb3InOiAoKSA9PiB7IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5wcmV2RXJyb3IoKSB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yLmlkZS1oYXNrZWxsJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnOiAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgcHJldHRpZnlGaWxlKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgIH0sXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3IuaWRlLWhhc2tlbGwtLWhhcy10b29sdGlwcycsIHtcbiAgICAgICdpZGUtaGFza2VsbDpjbG9zZS10b29sdGlwJzogKHsgY3VycmVudFRhcmdldCwgYWJvcnRLZXlCaW5kaW5nIH06IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgY29udHJvbGxlci50b29sdGlwcy5oYXMoKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoYWJvcnRLZXlCaW5kaW5nKSB7XG4gICAgICAgICAgYWJvcnRLZXlCaW5kaW5nKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcltkYXRhLWdyYW1tYXJ+PVwiY2FiYWxcIl0nLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSc6ICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpLCAnY2FiYWwnKVxuICAgICAgfSxcbiAgICB9KSxcbiAgKVxuXG4gIG1lbnUgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIG1lbnUuYWRkKGF0b20ubWVudS5hZGQoW3tcbiAgICBsYWJlbDogTUFJTl9NRU5VX0xBQkVMLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdQcmV0dGlmeScsIGNvbW1hbmQ6ICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJyB9LFxuICAgICAgeyBsYWJlbDogJ1RvZ2dsZSBQYW5lbCcsIGNvbW1hbmQ6ICdpZGUtaGFza2VsbDp0b2dnbGUtb3V0cHV0JyB9LFxuICAgIF0sXG4gIH1dKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5kZWFjdGl2YXRlKClcblxuICAvLyBjbGVhciBjb21tYW5kc1xuICBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5kaXNwb3NlKClcblxuICBtZW51ICYmIG1lbnUuZGlzcG9zZSgpXG4gIGF0b20ubWVudS51cGRhdGUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiBwbHVnaW5NYW5hZ2VyLnNlcmlhbGl6ZSgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkoKTogVVBJMi5JVVBJUHJvdmlkZWQge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgcmV0dXJuIHtcbiAgICByZWdpc3RlclBsdWdpbihkaXNwLCBwbHVnaW5OYW1lKSB7XG4gICAgICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gICAgICByZXR1cm4gVVBJMi5pbnN0YW5jZShwbHVnaW5NYW5hZ2VyLCBkaXNwLCBwbHVnaW5OYW1lKVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzKCk6IFVQSS5JVVBJUmVnaXN0cmF0aW9uIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiAob3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zKSA9PiB7XG4gICAgaWYgKCFwbHVnaW5NYW5hZ2VyKSB7IHRocm93IG5ldyBFcnJvcignSURFLUhhc2tlbGwgZmFpbGVkIHRvIHByb3ZpZGUgVVBJIGluc3RhbmNlOiBwbHVnaW5NYW5hZ2VyIGlzIHVuZGVmaW5lZCcpIH1cbiAgICByZXR1cm4gVVBJMy5pbnN0YW5jZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lVXBpMyhyZWdpc3RyYXRpb246IFVQSS5JUmVnaXN0cmF0aW9uT3B0aW9ucyk6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gVVBJMy5jb25zdW1lKHBsdWdpbk1hbmFnZXIsIHJlZ2lzdHJhdGlvbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUxpbnRlcihpbmRpZVJlZ2lzdHJ5OiBMaW50ZXIuSW5kaWVSZWdpc3RyeSk6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIShkaXNwb3NhYmxlcyAmJiBwbHVnaW5NYW5hZ2VyKSkgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgY29uc3QgbGludGVyID0gaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdJREUtSGFza2VsbCcgfSlcbiAgZGlzcG9zYWJsZXMuYWRkKGxpbnRlcilcbiAgcGx1Z2luTWFuYWdlci5zZXRMaW50ZXIobGludGVyKVxuICByZXR1cm4gbGludGVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lU3RhdHVzQmFyKHN0YXR1c0JhcjogU3RhdHVzQmFyLlN0YXR1c0Jhcik6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gIHBsdWdpbk1hbmFnZXIuc2V0U3RhdHVzQmFyKHN0YXR1c0JhcilcbiAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgICAgcGx1Z2luTWFuYWdlci5yZW1vdmVTdGF0dXNCYXIoKVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==