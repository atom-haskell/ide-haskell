"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI3 = require("./upi-3");
const OutputPanel = require("./output-panel");
const AtomTypes = require("atom");
var CompositeDisposable = AtomTypes.CompositeDisposable;
var Disposable = AtomTypes.Disposable;
let upiProvided = false;
let disposables;
let pluginManager;
let outputPanel;
let menu;
function cleanConfig() {
}
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
    disposables = new CompositeDisposable();
    pluginManager = new plugin_manager_1.PluginManager(state, deserializeOutputPanel());
    disposables.add(atom.commands.add('atom-workspace', {
        'ide-haskell:toggle-output': () => {
            if (pluginManager)
                pluginManager.togglePanel();
        },
        'ide-haskell:next-error': () => {
            if (pluginManager)
                pluginManager.nextError();
        },
        'ide-haskell:prev-error': () => {
            if (pluginManager)
                pluginManager.prevError();
        },
    }), atom.commands.add('atom-text-editor.ide-haskell', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            utils_1.handlePromise(prettify_1.prettifyFile(currentTarget.getModel()));
        },
    }), atom.commands.add('atom-text-editor.ide-haskell--has-tooltips', {
        'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }) => {
            const controller = pluginManager && pluginManager.controller(currentTarget.getModel());
            if (controller && controller.tooltips.has()) {
                controller.tooltips.hide();
            }
            else {
                abortKeyBinding();
            }
        },
    }));
    menu = new CompositeDisposable();
    menu.add(atom.menu.add([
        {
            label: utils_1.MAIN_MENU_LABEL,
            submenu: [
                { label: 'Prettify', command: 'ide-haskell:prettify-file' },
                { label: 'Toggle Panel', command: 'ide-haskell:toggle-output' },
            ],
        },
    ]));
}
exports.activate = activate;
function deactivate() {
    if (pluginManager)
        pluginManager.deactivate();
    if (disposables)
        disposables.dispose();
    if (menu)
        menu.dispose();
    atom.menu.update();
    disposables = undefined;
    pluginManager = undefined;
    menu = undefined;
    outputPanel = undefined;
}
exports.deactivate = deactivate;
function serialize() {
    if (pluginManager) {
        return pluginManager.serialize();
    }
    return undefined;
}
exports.serialize = serialize;
function deserializeOutputPanel(state) {
    if (!outputPanel)
        outputPanel = new OutputPanel.OutputPanel(state);
    return outputPanel;
}
exports.deserializeOutputPanel = deserializeOutputPanel;
function provideUpi3(features = {}) {
    return function () {
        upiProvided = true;
        return (options) => {
            if (!pluginManager) {
                throw new Error('IDE-Haskell failed to provide UPI instance: pluginManager is undefined');
            }
            return UPI3.instance(pluginManager, options, features);
        };
    };
}
exports.provideUpi3_0 = provideUpi3();
exports.provideUpi3_1 = provideUpi3({ eventsReturnResults: true });
exports.provideUpi3_2 = provideUpi3({
    eventsReturnResults: true,
    supportsCommands: true,
});
function consumeUpi3(features = {}) {
    return function (registration) {
        upiProvided = true;
        if (pluginManager) {
            return UPI3.consume(pluginManager, registration, features);
        }
        return undefined;
    };
}
exports.consumeUpi3_0 = consumeUpi3({});
exports.consumeUpi3_1 = consumeUpi3({ eventsReturnResults: true });
exports.consumeUpi3_2 = consumeUpi3({
    eventsReturnResults: true,
    supportsCommands: true,
});
function consumeLinter(register) {
    if (!(disposables && pluginManager)) {
        return undefined;
    }
    const linter = register({ name: 'IDE-Haskell' });
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
    return new Disposable(() => {
        if (pluginManager) {
            pluginManager.removeStatusBar();
        }
    });
}
exports.consumeStatusBar = consumeStatusBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBd0Q7QUFDeEQseUNBQXlDO0FBQ3pDLG1DQUF3RDtBQUN4RCxnQ0FBK0I7QUFDL0IsOENBQTZDO0FBQzdDLGtDQUFpQztBQUlqQyxJQUFPLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQTtBQUMxRCxJQUFPLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFBO0FBRXhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtBQUN2QixJQUFJLFdBQTRDLENBQUE7QUFDaEQsSUFBSSxhQUF3QyxDQUFBO0FBQzVDLElBQUksV0FBZ0QsQ0FBQTtBQUNwRCxJQUFJLElBQXFDLENBQUE7QUFFekMsU0FBUyxXQUFXO0FBRXBCLENBQUM7QUFFRCxTQUFnQixRQUFRLENBQUMsS0FBYTtJQUNwQyxXQUFXLEVBQUUsQ0FBQTtJQUViLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhDLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO1FBQzNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FDM0I7K0NBQ3FDLEVBQ3JDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUN0QixDQUFBO2FBQ0Y7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDVDtJQUVELFdB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QUUsSUFBSTtJQUN6QixnQkFBZ0IsRUFBRSxJQUFJO0NBQ3ZCLENBQUMsQ0FBQTtBQUVGLFNBQWdCLGFBQWEsQ0FDM0IsUUFBNEM7SUFFNUMsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sU0FBUyxDQUFBO0tBQ2pCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7SUFDaEQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQVZELHNDQVVDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQzlCLFNBQThCO0lBRTlCLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsT0FBTyxTQUFTLENBQUE7S0FDakI7SUFDRCxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3pCLElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtTQUNoQztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVpELDRDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luTWFuYWdlciwgSVN0YXRlIH0gZnJvbSAnLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vcHJldHRpZnknXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwsIGhhbmRsZVByb21pc2UgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgVVBJMyBmcm9tICcuL3VwaS0zJ1xuaW1wb3J0ICogYXMgT3V0cHV0UGFuZWwgZnJvbSAnLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQgKiBhcyBBdG9tVHlwZXMgZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0ICogYXMgTGludGVyIGZyb20gJ2F0b20vbGludGVyJ1xuaW1wb3J0ICogYXMgU3RhdHVzQmFyIGZyb20gJ2F0b20vc3RhdHVzLWJhcidcbmltcG9ydCBDb21wb3NpdGVEaXNwb3NhYmxlID0gQXRvbVR5cGVzLkNvbXBvc2l0ZURpc3Bvc2FibGVcbmltcG9ydCBEaXNwb3NhYmxlID0gQXRvbVR5cGVzLkRpc3Bvc2FibGVcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxubGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIgfCB1bmRlZmluZWRcbmxldCBvdXRwdXRQYW5lbDogT3V0cHV0UGFuZWwuT3V0cHV0UGFuZWwgfCB1bmRlZmluZWRcbmxldCBtZW51OiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5cbmZ1bmN0aW9uIGNsZWFuQ29uZmlnKCkge1xuICAvKm5vb3AqL1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IElTdGF0ZSkge1xuICBjbGVhbkNvbmZpZygpXG5cbiAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG5cbiAgcmVxdWlyZSgnZXRjaCcpLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKVxuXG4gIHVwaVByb3ZpZGVkID0gZmFsc2VcblxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQnKSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF1cGlQcm92aWRlZCkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICBgSWRlLUhhc2tlbGwgbmVlZHMgYmFja2VuZHMgdGhhdCBwcm92aWRlIG1vc3Qgb2YgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIFBsZWFzZSByZWZlciB0byBSRUFETUUgZm9yIGRldGFpbHNgLFxuICAgICAgICAgIHsgZGlzbWlzc2FibGU6IHRydWUgfSxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sIDUwMDApXG4gIH1cblxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoc3RhdGUsIGRlc2VyaWFsaXplT3V0cHV0UGFuZWwoKSlcblxuICAvLyBnbG9iYWwgY29tbWFuZHNcbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdpZGUtaGFza2VsbDp0b2dnbGUtb3V0cHV0JzogKCkgPT4ge1xuICAgICAgICBpZiAocGx1Z2luTWFuYWdlcikgcGx1Z2luTWFuYWdlci50b2dnbGVQYW5lbCgpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOm5leHQtZXJyb3InOiAoKSA9PiB7XG4gICAgICAgIGlmIChwbHVnaW5NYW5hZ2VyKSBwbHVnaW5NYW5hZ2VyLm5leHRFcnJvcigpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOnByZXYtZXJyb3InOiAoKSA9PiB7XG4gICAgICAgIGlmIChwbHVnaW5NYW5hZ2VyKSBwbHVnaW5NYW5hZ2VyLnByZXZFcnJvcigpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yLmlkZS1oYXNrZWxsJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnOiAoeyBjdXJyZW50VGFyZ2V0IH0pID0+IHtcbiAgICAgICAgaGFuZGxlUHJvbWlzZShwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKSlcbiAgICAgIH0sXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3IuaWRlLWhhc2tlbGwtLWhhcy10b29sdGlwcycsIHtcbiAgICAgICdpZGUtaGFza2VsbDpjbG9zZS10b29sdGlwJzogKHsgY3VycmVudFRhcmdldCwgYWJvcnRLZXlCaW5kaW5nIH0pID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9XG4gICAgICAgICAgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKVxuICAgICAgICBpZiAoY29udHJvbGxlciAmJiBjb250cm9sbGVyLnRvb2x0aXBzLmhhcygpKSB7XG4gICAgICAgICAgY29udHJvbGxlci50b29sdGlwcy5oaWRlKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhYm9ydEtleUJpbmRpbmcoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICApXG5cbiAgbWVudSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgbWVudS5hZGQoXG4gICAgYXRvbS5tZW51LmFkZChbXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgICB7IGxhYmVsOiAnUHJldHRpZnknLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZScgfSxcbiAgICAgICAgICB7IGxhYmVsOiAnVG9nZ2xlIFBhbmVsJywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0pLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICBpZiAocGx1Z2luTWFuYWdlcikgcGx1Z2luTWFuYWdlci5kZWFjdGl2YXRlKClcblxuICAvLyBjbGVhciBjb21tYW5kc1xuICBpZiAoZGlzcG9zYWJsZXMpIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuXG4gIGlmIChtZW51KSBtZW51LmRpc3Bvc2UoKVxuICBhdG9tLm1lbnUudXBkYXRlKClcblxuICBkaXNwb3NhYmxlcyA9IHVuZGVmaW5lZFxuICBwbHVnaW5NYW5hZ2VyID0gdW5kZWZpbmVkXG4gIG1lbnUgPSB1bmRlZmluZWRcbiAgb3V0cHV0UGFuZWwgPSB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5zZXJpYWxpemUoKVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplT3V0cHV0UGFuZWwoc3RhdGU/OiBPdXRwdXRQYW5lbC5JU3RhdGUpIHtcbiAgaWYgKCFvdXRwdXRQYW5lbCkgb3V0cHV0UGFuZWwgPSBuZXcgT3V0cHV0UGFuZWwuT3V0cHV0UGFuZWwoc3RhdGUpXG4gIHJldHVybiBvdXRwdXRQYW5lbFxufVxuXG5mdW5jdGlvbiBwcm92aWRlVXBpMyhmZWF0dXJlczogVVBJMy5GZWF0dXJlU2V0ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCk6IFVQSS5JVVBJUmVnaXN0cmF0aW9uIHtcbiAgICB1cGlQcm92aWRlZCA9IHRydWVcbiAgICByZXR1cm4gKG9wdGlvbnM6IFVQSS5JUmVnaXN0cmF0aW9uT3B0aW9ucykgPT4ge1xuICAgICAgaWYgKCFwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnSURFLUhhc2tlbGwgZmFpbGVkIHRvIHByb3ZpZGUgVVBJIGluc3RhbmNlOiBwbHVnaW5NYW5hZ2VyIGlzIHVuZGVmaW5lZCcsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHJldHVybiBVUEkzLmluc3RhbmNlKHBsdWdpbk1hbmFnZXIsIG9wdGlvbnMsIGZlYXR1cmVzKVxuICAgIH1cbiAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBwcm92aWRlVXBpM18wID0gcHJvdmlkZVVwaTMoKVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG5leHBvcnQgY29uc3QgcHJvdmlkZVVwaTNfMSA9IHByb3ZpZGVVcGkzKHsgZXZlbnRzUmV0dXJuUmVzdWx0czogdHJ1ZSB9KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG5leHBvcnQgY29uc3QgcHJvdmlkZVVwaTNfMiA9IHByb3ZpZGVVcGkzKHtcbiAgZXZlbnRzUmV0dXJuUmVzdWx0czogdHJ1ZSxcbiAgc3VwcG9ydHNDb21tYW5kczogdHJ1ZSxcbn0pXG5cbmZ1bmN0aW9uIGNvbnN1bWVVcGkzKGZlYXR1cmVzOiBVUEkzLkZlYXR1cmVTZXQgPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24oXG4gICAgcmVnaXN0cmF0aW9uOiBVUEkuSVJlZ2lzdHJhdGlvbk9wdGlvbnMsXG4gICk6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICAgIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICAgIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gVVBJMy5jb25zdW1lKHBsdWdpbk1hbmFnZXIsIHJlZ2lzdHJhdGlvbiwgZmVhdHVyZXMpXG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBjb25zdW1lVXBpM18wID0gY29uc3VtZVVwaTMoe30pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBjb25zdW1lVXBpM18xID0gY29uc3VtZVVwaTMoeyBldmVudHNSZXR1cm5SZXN1bHRzOiB0cnVlIH0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBjb25zdW1lVXBpM18yID0gY29uc3VtZVVwaTMoe1xuICBldmVudHNSZXR1cm5SZXN1bHRzOiB0cnVlLFxuICBzdXBwb3J0c0NvbW1hbmRzOiB0cnVlLFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVMaW50ZXIoXG4gIHJlZ2lzdGVyOiAob3B0czoge30pID0+IExpbnRlci5JbmRpZURlbGVnYXRlLFxuKTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghKGRpc3Bvc2FibGVzICYmIHBsdWdpbk1hbmFnZXIpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIGNvbnN0IGxpbnRlciA9IHJlZ2lzdGVyKHsgbmFtZTogJ0lERS1IYXNrZWxsJyB9KVxuICBkaXNwb3NhYmxlcy5hZGQobGludGVyKVxuICBwbHVnaW5NYW5hZ2VyLnNldExpbnRlcihsaW50ZXIpXG4gIHJldHVybiBsaW50ZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVTdGF0dXNCYXIoXG4gIHN0YXR1c0JhcjogU3RhdHVzQmFyLlN0YXR1c0Jhcixcbik6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIXBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgcGx1Z2luTWFuYWdlci5zZXRTdGF0dXNCYXIoc3RhdHVzQmFyKVxuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLnJlbW92ZVN0YXR1c0JhcigpXG4gICAgfVxuICB9KVxufVxuIl19