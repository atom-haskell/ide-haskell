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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0U7QUFDbEUscURBQXdEO0FBQ3hELHlDQUF5QztBQUN6QyxtQ0FBeUM7QUFDekMsZ0NBQStCO0FBQy9CLGdDQUErQjtBQUMvQiw4Q0FBNkM7QUFFN0MsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFBO0FBQ3ZCLElBQUksV0FBNEMsQ0FBQTtBQUNoRCxJQUFJLGFBQXdDLENBQUE7QUFDNUMsSUFBSSxXQUFnRCxDQUFBO0FBQ3BELElBQUksSUFBcUMsQ0FBQTtBQUV6QyxtQ0FBaUM7QUFBeEIsMEJBQUEsTUFBTSxDQUFBO0FBRWYseUJBQWtDLENBQUM7QUFFbkMsa0JBQXlCLEtBQWE7SUFDcEMsV0FBVyxFQUFFLENBQUE7SUFFYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUUvRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV4QyxXQUFXLEdBQUcsS0FBSyxDQUFBO0lBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELFVBQVUsQ0FDUjtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQzNCOytDQUNtQyxFQUNuQyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzFCLENBQUM7UUFDSCxDQUFDLEVBQ0QsSUFBSSxDQUNMLENBQUE7SUFDSCxDQUFDO0lBRUQsV0FBVyxHQUFHLElBQUksMEJB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RCxzQ0FNQztBQUVELDBCQUFpQyxTQUE4QjtJQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsU0FBUyxDQUFBO0lBQUMsQ0FBQztJQUN4QyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNsQixhQUFhLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDakMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVJELDRDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUV2ZW50RGVzYywgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyLCBJU3RhdGUgfSBmcm9tICcuL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHsgcHJldHRpZnlGaWxlIH0gZnJvbSAnLi9wcmV0dGlmeSdcbmltcG9ydCB7IE1BSU5fTUVOVV9MQUJFTCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgKiBhcyBVUEkyIGZyb20gJy4vdXBpLTInXG5pbXBvcnQgKiBhcyBVUEkzIGZyb20gJy4vdXBpLTMnXG5pbXBvcnQgKiBhcyBPdXRwdXRQYW5lbCBmcm9tICcuL291dHB1dC1wYW5lbCdcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxubGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIgfCB1bmRlZmluZWRcbmxldCBvdXRwdXRQYW5lbDogT3V0cHV0UGFuZWwuT3V0cHV0UGFuZWwgfCB1bmRlZmluZWRcbmxldCBtZW51OiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5cbmV4cG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5mdW5jdGlvbiBjbGVhbkNvbmZpZygpIHsgLypub29wKi8gfVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IElTdGF0ZSkge1xuICBjbGVhbkNvbmZpZygpXG5cbiAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG5cbiAgcmVxdWlyZSgnZXRjaCcpLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKVxuXG4gIHVwaVByb3ZpZGVkID0gZmFsc2VcblxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQnKSkge1xuICAgIHNldFRpbWVvdXQoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghdXBpUHJvdmlkZWQpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICAgIGBJZGUtSGFza2VsbCBuZWVkcyBiYWNrZW5kcyB0aGF0IHByb3ZpZGUgbW9zdCBvZiBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAgICAgUGxlYXNlIHJlZmVyIHRvIFJFQURNRSBmb3IgZGV0YWlsc2AsXG4gICAgICAgICAgICB7IGRpc21pc3NhYmxlOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICA1MDAwLFxuICAgIClcbiAgfVxuXG4gIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gIHBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcihzdGF0ZSwgb3V0cHV0UGFuZWwgfHwgbmV3IE91dHB1dFBhbmVsLk91dHB1dFBhbmVsKCkpXG5cbiAgLy8gZ2xvYmFsIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6dG9nZ2xlLW91dHB1dCc6ICgpID0+IHsgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnRvZ2dsZVBhbmVsKCkgfSxcbiAgICAgICdpZGUtaGFza2VsbDpuZXh0LWVycm9yJzogKCkgPT4geyBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIubmV4dEVycm9yKCkgfSxcbiAgICAgICdpZGUtaGFza2VsbDpwcmV2LWVycm9yJzogKCkgPT4geyBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIucHJldkVycm9yKCkgfSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvci5pZGUtaGFza2VsbCcsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIHByZXR0aWZ5RmlsZShjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCkpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yLmlkZS1oYXNrZWxsLS1oYXMtdG9vbHRpcHMnLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6Y2xvc2UtdG9vbHRpcCc6ICh7IGN1cnJlbnRUYXJnZXQsIGFib3J0S2V5QmluZGluZyB9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIuY29udHJvbGxlcihjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCkpXG4gICAgICAgIGlmIChjb250cm9sbGVyICYmIGNvbnRyb2xsZXIudG9vbHRpcHMuaGFzKCkpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGFib3J0S2V5QmluZGluZykge1xuICAgICAgICAgIGFib3J0S2V5QmluZGluZygpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSksXG4gIClcblxuICBtZW51ID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBtZW51LmFkZChhdG9tLm1lbnUuYWRkKFt7XG4gICAgbGFiZWw6IE1BSU5fTUVOVV9MQUJFTCxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnUHJldHRpZnknLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZScgfSxcbiAgICAgIHsgbGFiZWw6ICdUb2dnbGUgUGFuZWwnLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6dG9nZ2xlLW91dHB1dCcgfSxcbiAgICBdLFxuICB9XSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIuZGVhY3RpdmF0ZSgpXG5cbiAgLy8gY2xlYXIgY29tbWFuZHNcbiAgZGlzcG9zYWJsZXMgJiYgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG5cbiAgbWVudSAmJiBtZW51LmRpc3Bvc2UoKVxuICBhdG9tLm1lbnUudXBkYXRlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5zZXJpYWxpemUoKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZU91dHB1dFBhbmVsKHN0YXRlOiBPdXRwdXRQYW5lbC5JU3RhdGUpIHtcbiAgb3V0cHV0UGFuZWwgPSBuZXcgT3V0cHV0UGFuZWwuT3V0cHV0UGFuZWwoc3RhdGUpXG4gIHJldHVybiBvdXRwdXRQYW5lbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVVwaSgpOiBVUEkyLklVUElQcm92aWRlZCB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICByZXR1cm4ge1xuICAgIHJlZ2lzdGVyUGx1Z2luKGRpc3AsIHBsdWdpbk5hbWUpIHtcbiAgICAgIGlmICghcGx1Z2luTWFuYWdlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgICAgIHJldHVybiBVUEkyLmluc3RhbmNlKHBsdWdpbk1hbmFnZXIsIGRpc3AsIHBsdWdpbk5hbWUpXG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVVwaTMoKTogVVBJLklVUElSZWdpc3RyYXRpb24ge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgcmV0dXJuIChvcHRpb25zOiBVUEkuSVJlZ2lzdHJhdGlvbk9wdGlvbnMpID0+IHtcbiAgICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgdGhyb3cgbmV3IEVycm9yKCdJREUtSGFza2VsbCBmYWlsZWQgdG8gcHJvdmlkZSBVUEkgaW5zdGFuY2U6IHBsdWdpbk1hbmFnZXIgaXMgdW5kZWZpbmVkJykgfVxuICAgIHJldHVybiBVUEkzLmluc3RhbmNlKHBsdWdpbk1hbmFnZXIsIG9wdGlvbnMpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVVcGkzKHJlZ2lzdHJhdGlvbjogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zKTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiBVUEkzLmNvbnN1bWUocGx1Z2luTWFuYWdlciwgcmVnaXN0cmF0aW9uKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lTGludGVyKGluZGllUmVnaXN0cnk6IExpbnRlci5JbmRpZVJlZ2lzdHJ5KTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghKGRpc3Bvc2FibGVzICYmIHBsdWdpbk1hbmFnZXIpKSB7IHJldHVybiB1bmRlZmluZWQgfVxuICBjb25zdCBsaW50ZXIgPSBpbmRpZVJlZ2lzdHJ5LnJlZ2lzdGVyKHsgbmFtZTogJ0lERS1IYXNrZWxsJyB9KVxuICBkaXNwb3NhYmxlcy5hZGQobGludGVyKVxuICBwbHVnaW5NYW5hZ2VyLnNldExpbnRlcihsaW50ZXIpXG4gIHJldHVybiBsaW50ZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVTdGF0dXNCYXIoc3RhdHVzQmFyOiBTdGF0dXNCYXIuU3RhdHVzQmFyKTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghcGx1Z2luTWFuYWdlcikgeyByZXR1cm4gdW5kZWZpbmVkIH1cbiAgcGx1Z2luTWFuYWdlci5zZXRTdGF0dXNCYXIoc3RhdHVzQmFyKVxuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLnJlbW92ZVN0YXR1c0JhcigpXG4gICAgfVxuICB9KVxufVxuIl19