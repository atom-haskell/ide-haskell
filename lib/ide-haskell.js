"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI2 = require("./upi-2");
const UPI3 = require("./upi-3");
const OutputPanel = require("./output-panel");
let upiProvided = false;
let disposables;
let pluginManager;
let outputPanel;
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
    pluginManager = new plugin_manager_1.PluginManager(state, outputPanel || new OutputPanel.OutputPanel());
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
function deserializeOutputPanel(state) {
    outputPanel = new OutputPanel.OutputPanel(state);
    return outputPanel;
}
exports.deserializeOutputPanel = deserializeOutputPanel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0U7QUFDbEUscURBQXdEO0FBQ3hELHlDQUF5QztBQUN6QyxtQ0FBeUM7QUFDekMsZ0NBQStCO0FBQy9CLGdDQUErQjtBQUMvQiw4Q0FBNkM7QUFFN0MsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO0FBQ3ZCLElBQUksV0FBNEMsQ0FBQTtBQUNoRCxJQUFJLGFBQXdDLENBQUE7QUFDNUMsSUFBSSxXQUFnRCxDQUFBO0FBQ3BELElBQUksSUFBcUMsQ0FBQTtBQUV6QyxtQ0FBaUM7QUFBeEIsMEJBQUEsTUFBTSxDQUFBO0FBRWYseUJBQWtDLENBQUM7QUFFbkMsa0JBQXlCLEtBQWE7SUFDcEMsV0FBVyxFQUFFLENBQUE7SUFFYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUUvRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV4QyxXQUFXLEdBQUcsS0FBSyxDQUFBO0lBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsQ0FDUjtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQzNCOytDQUNtQyxFQUNuQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzFCLENBQUM7UUFDSCxDQUFDLEVBQ0QsSUFBSSxDQUNMLENBQUE7SUFDSCxDQUFDO0lBRUQsV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtJQUV2QyxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUFDLEtBQUssRUFBRSxXQUFXLElBQUksSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtJQUd0RixXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ2xDLDJCQUEyQixFQUFFLFFBQVEsYUFBYSxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLENBQUM7UUFDbkYsd0JBQXdCLEVBQUUsUUFBUSxhQUFhLElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFBLENBQUMsQ0FBQztRQUM5RSx3QkFBd0IsRUFBRSxRQUFRLGFBQWEsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUEsQ0FBQyxDQUFDO0tBQy9FLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRTtRQUNoRCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjO1lBQ3pELHVCQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztLQUNGLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRTtRQUM5RCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBYztZQUMxRSxNQUFNLFVBQVUsR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUN0RixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixlQUFlLEVBQUUsQ0FBQTtZQUNuQixDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRTtRQUMzRCwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjO1lBQ3pELHVCQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ2pELENBQUM7S0FDRixDQUFDLENBQ0gsQ0FBQTtJQUVELElBQUksR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEtBQUssRUFBRSx1QkFBZTtZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTtnQkFDM0QsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRTthQUNoRTtTQUNGLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBaEVELDRCQWdFQztBQUVEO0lBQ0UsYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUczQyxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXBDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNwQixDQUFDO0FBUkQsZ0NBUUM7QUFFRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0FBQ0gsQ0FBQztBQUpELDhCQUlDO0FBRUQsZ0NBQXVDLEtBQXlCO0lBQzlELFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQTtBQUNwQixDQUFDO0FBSEQsd0RBR0M7QUFFRDtJQUNFLFdBQVcsR0FBRyxJQUFJLENBQUE7SUFDbEIsTUFBTSxDQUFDO1FBQ0wsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO1lBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ3ZELENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQVJELGdDQVFDO0FBRUQ7SUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLE1BQU0sQ0FBQyxDQUFDLE9BQWlDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFDakgsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzlDLENBQUMsQ0FBQTtBQUNILENBQUM7QUFORCxrQ0FNQztBQUVELHFCQUE0QixZQUFzQztJQUNoRSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ2xELENBQUM7QUFDSCxDQUFDO0FBTEQsa0NBS0M7QUFFRCx1QkFBOEIsYUFBbUM7SUFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO0lBQUMsQ0FBQztJQUN6RCxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7SUFDOUQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDO0FBTkQsc0NBTUM7QUFFRCwwQkFBaUMsU0FBOEI7SUFDN0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQTtJQUFDLENBQUM7SUFDeEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyQyxNQUFNLENBQUMsSUFBSSxpQkFBVSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFSRCw0Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElFdmVudERlc2MsIENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciwgSVN0YXRlIH0gZnJvbSAnLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vcHJldHRpZnknXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgVVBJMiBmcm9tICcuL3VwaS0yJ1xuaW1wb3J0ICogYXMgVVBJMyBmcm9tICcuL3VwaS0zJ1xuaW1wb3J0ICogYXMgT3V0cHV0UGFuZWwgZnJvbSAnLi9vdXRwdXQtcGFuZWwnXG5cbmxldCB1cGlQcm92aWRlZCA9IGZhbHNlXG5sZXQgZGlzcG9zYWJsZXM6IENvbXBvc2l0ZURpc3Bvc2FibGUgfCB1bmRlZmluZWRcbmxldCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyIHwgdW5kZWZpbmVkXG5sZXQgb3V0cHV0UGFuZWw6IE91dHB1dFBhbmVsLk91dHB1dFBhbmVsIHwgdW5kZWZpbmVkXG5sZXQgbWVudTogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxuXG5leHBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuZnVuY3Rpb24gY2xlYW5Db25maWcoKSB7IC8qbm9vcCovIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlOiBJU3RhdGUpIHtcbiAgY2xlYW5Db25maWcoKVxuXG4gIGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSkuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuXG4gIHJlcXVpcmUoJ2V0Y2gnKS5zZXRTY2hlZHVsZXIoYXRvbS52aWV3cylcblxuICB1cGlQcm92aWRlZCA9IGZhbHNlXG5cbiAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuc3RhcnR1cE1lc3NhZ2VJZGVCYWNrZW5kJykpIHtcbiAgICBzZXRUaW1lb3V0KFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIXVwaVByb3ZpZGVkKSB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG4gICAgICAgICAgICBgSWRlLUhhc2tlbGwgbmVlZHMgYmFja2VuZHMgdGhhdCBwcm92aWRlIG1vc3Qgb2YgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIFBsZWFzZSByZWZlciB0byBSRUFETUUgZm9yIGRldGFpbHNgLFxuICAgICAgICAgICAgeyBkaXNtaXNzYWJsZTogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgNTAwMCxcbiAgICApXG4gIH1cblxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoc3RhdGUsIG91dHB1dFBhbmVsIHx8IG5ldyBPdXRwdXRQYW5lbC5PdXRwdXRQYW5lbCgpKVxuXG4gIC8vIGdsb2JhbCBjb21tYW5kc1xuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnOiAoKSA9PiB7IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci50b2dnbGVQYW5lbCgpIH0sXG4gICAgICAnaWRlLWhhc2tlbGw6bmV4dC1lcnJvcic6ICgpID0+IHsgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLm5leHRFcnJvcigpIH0sXG4gICAgICAnaWRlLWhhc2tlbGw6cHJldi1lcnJvcic6ICgpID0+IHsgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnByZXZFcnJvcigpIH0sXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3IuaWRlLWhhc2tlbGwnLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSc6ICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKVxuICAgICAgfSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvci5pZGUtaGFza2VsbC0taGFzLXRvb2x0aXBzJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOmNsb3NlLXRvb2x0aXAnOiAoeyBjdXJyZW50VGFyZ2V0LCBhYm9ydEtleUJpbmRpbmcgfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKVxuICAgICAgICBpZiAoY29udHJvbGxlciAmJiBjb250cm9sbGVyLnRvb2x0aXBzLmhhcygpKSB7XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKClcbiAgICAgICAgfSBlbHNlIGlmIChhYm9ydEtleUJpbmRpbmcpIHtcbiAgICAgICAgICBhYm9ydEtleUJpbmRpbmcoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yW2RhdGEtZ3JhbW1hcn49XCJjYWJhbFwiXScsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIHByZXR0aWZ5RmlsZShjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCksICdjYWJhbCcpXG4gICAgICB9LFxuICAgIH0pLFxuICApXG5cbiAgbWVudSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgbWVudS5hZGQoYXRvbS5tZW51LmFkZChbe1xuICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ1ByZXR0aWZ5JywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnIH0sXG4gICAgICB7IGxhYmVsOiAnVG9nZ2xlIFBhbmVsJywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnIH0sXG4gICAgXSxcbiAgfV0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmRlYWN0aXZhdGUoKVxuXG4gIC8vIGNsZWFyIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuXG4gIG1lbnUgJiYgbWVudS5kaXNwb3NlKClcbiAgYXRvbS5tZW51LnVwZGF0ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuc2VyaWFsaXplKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVPdXRwdXRQYW5lbChzdGF0ZTogT3V0cHV0UGFuZWwuSVN0YXRlKSB7XG4gIG91dHB1dFBhbmVsID0gbmV3IE91dHB1dFBhbmVsLk91dHB1dFBhbmVsKHN0YXRlKVxuICByZXR1cm4gb3V0cHV0UGFuZWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkoKTogVVBJMi5JVVBJUHJvdmlkZWQge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgcmV0dXJuIHtcbiAgICByZWdpc3RlclBsdWdpbihkaXNwLCBwbHVnaW5OYW1lKSB7XG4gICAgICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gICAgICByZXR1cm4gVVBJMi5pbnN0YW5jZShwbHVnaW5NYW5hZ2VyLCBkaXNwLCBwbHVnaW5OYW1lKVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzKCk6IFVQSS5JVVBJUmVnaXN0cmF0aW9uIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiAob3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zKSA9PiB7XG4gICAgaWYgKCFwbHVnaW5NYW5hZ2VyKSB7IHRocm93IG5ldyBFcnJvcignSURFLUhhc2tlbGwgZmFpbGVkIHRvIHByb3ZpZGUgVVBJIGluc3RhbmNlOiBwbHVnaW5NYW5hZ2VyIGlzIHVuZGVmaW5lZCcpIH1cbiAgICByZXR1cm4gVVBJMy5pbnN0YW5jZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lVXBpMyhyZWdpc3RyYXRpb246IFVQSS5JUmVnaXN0cmF0aW9uT3B0aW9ucyk6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gVVBJMy5jb25zdW1lKHBsdWdpbk1hbmFnZXIsIHJlZ2lzdHJhdGlvbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUxpbnRlcihpbmRpZVJlZ2lzdHJ5OiBMaW50ZXIuSW5kaWVSZWdpc3RyeSk6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIShkaXNwb3NhYmxlcyAmJiBwbHVnaW5NYW5hZ2VyKSkgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgY29uc3QgbGludGVyID0gaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6ICdJREUtSGFza2VsbCcgfSlcbiAgZGlzcG9zYWJsZXMuYWRkKGxpbnRlcilcbiAgcGx1Z2luTWFuYWdlci5zZXRMaW50ZXIobGludGVyKVxuICByZXR1cm4gbGludGVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lU3RhdHVzQmFyKHN0YXR1c0JhcjogU3RhdHVzQmFyLlN0YXR1c0Jhcik6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG4gIHBsdWdpbk1hbmFnZXIuc2V0U3RhdHVzQmFyKHN0YXR1c0JhcilcbiAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgICAgcGx1Z2luTWFuYWdlci5yZW1vdmVTdGF0dXNCYXIoKVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==