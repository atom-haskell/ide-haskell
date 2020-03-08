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
            prettify_1.prettifyFile(currentTarget.getModel());
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
function provideUpi3() {
    upiProvided = true;
    return (options) => {
        if (!pluginManager) {
            throw new Error('IDE-Haskell failed to provide UPI instance: pluginManager is undefined');
        }
        return UPI3.instance(pluginManager, options, {
            eventsReturnResults: false,
        });
    };
}
exports.provideUpi3 = provideUpi3;
function consumeUpi3_0(registration) {
    upiProvided = true;
    if (pluginManager) {
        return UPI3.consume(pluginManager, registration, {
            eventsReturnResults: false,
        });
    }
    return undefined;
}
exports.consumeUpi3_0 = consumeUpi3_0;
function consumeUpi3(registration) {
    upiProvided = true;
    if (pluginManager) {
        return UPI3.consume(pluginManager, registration, {
            eventsReturnResults: true,
        });
    }
    return undefined;
}
exports.consumeUpi3 = consumeUpi3;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBd0Q7QUFDeEQseUNBQXlDO0FBQ3pDLG1DQUF5QztBQUN6QyxnQ0FBK0I7QUFDL0IsOENBQTZDO0FBQzdDLGtDQUFpQztBQUlqQyxJQUFPLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQTtBQUMxRCxJQUFPLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFBO0FBRXhDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQTtBQUN2QixJQUFJLFdBQTRDLENBQUE7QUFDaEQsSUFBSSxhQUF3QyxDQUFBO0FBQzVDLElBQUksV0FBZ0QsQ0FBQTtBQUNwRCxJQUFJLElBQXFDLENBQUE7QUFFekMsU0FBUyxXQUFXO0FBRXBCLENBQUM7QUFFRCxTQUFnQixRQUFRLENBQUMsS0FBYTtJQUNwQyxXQUFXLEVBQUUsQ0FBQTtJQUViLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhDLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFO1FBQzNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FDM0I7K0NBQ3FDLEVBQ3JDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUN0QixDQUFBO2FBQ0Y7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDVDtJQUVELFdB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V0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQVZELHNDQVVDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQzlCLFNBQThCO0lBRTlCLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsT0FBTyxTQUFTLENBQUE7S0FDakI7SUFDRCxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3pCLElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtTQUNoQztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVpELDRDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luTWFuYWdlciwgSVN0YXRlIH0gZnJvbSAnLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7IHByZXR0aWZ5RmlsZSB9IGZyb20gJy4vcHJldHRpZnknXG5pbXBvcnQgeyBNQUlOX01FTlVfTEFCRUwgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgVVBJMyBmcm9tICcuL3VwaS0zJ1xuaW1wb3J0ICogYXMgT3V0cHV0UGFuZWwgZnJvbSAnLi9vdXRwdXQtcGFuZWwnXG5pbXBvcnQgKiBhcyBBdG9tVHlwZXMgZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIFVQSSBmcm9tICdhdG9tLWhhc2tlbGwtdXBpJ1xuaW1wb3J0ICogYXMgTGludGVyIGZyb20gJ2F0b20vbGludGVyJ1xuaW1wb3J0ICogYXMgU3RhdHVzQmFyIGZyb20gJ2F0b20vc3RhdHVzLWJhcidcbmltcG9ydCBDb21wb3NpdGVEaXNwb3NhYmxlID0gQXRvbVR5cGVzLkNvbXBvc2l0ZURpc3Bvc2FibGVcbmltcG9ydCBEaXNwb3NhYmxlID0gQXRvbVR5cGVzLkRpc3Bvc2FibGVcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxubGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIgfCB1bmRlZmluZWRcbmxldCBvdXRwdXRQYW5lbDogT3V0cHV0UGFuZWwuT3V0cHV0UGFuZWwgfCB1bmRlZmluZWRcbmxldCBtZW51OiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5cbmZ1bmN0aW9uIGNsZWFuQ29uZmlnKCkge1xuICAvKm5vb3AqL1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IElTdGF0ZSkge1xuICBjbGVhbkNvbmZpZygpXG5cbiAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG5cbiAgcmVxdWlyZSgnZXRjaCcpLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKVxuXG4gIHVwaVByb3ZpZGVkID0gZmFsc2VcblxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQnKSkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF1cGlQcm92aWRlZCkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICBgSWRlLUhhc2tlbGwgbmVlZHMgYmFja2VuZHMgdGhhdCBwcm92aWRlIG1vc3Qgb2YgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIFBsZWFzZSByZWZlciB0byBSRUFETUUgZm9yIGRldGFpbHNgLFxuICAgICAgICAgIHsgZGlzbWlzc2FibGU6IHRydWUgfSxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sIDUwMDApXG4gIH1cblxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoc3RhdGUsIGRlc2VyaWFsaXplT3V0cHV0UGFuZWwoKSlcblxuICAvLyBnbG9iYWwgY29tbWFuZHNcbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICdpZGUtaGFza2VsbDp0b2dnbGUtb3V0cHV0JzogKCkgPT4ge1xuICAgICAgICBpZiAocGx1Z2luTWFuYWdlcikgcGx1Z2luTWFuYWdlci50b2dnbGVQYW5lbCgpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOm5leHQtZXJyb3InOiAoKSA9PiB7XG4gICAgICAgIGlmIChwbHVnaW5NYW5hZ2VyKSBwbHVnaW5NYW5hZ2VyLm5leHRFcnJvcigpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOnByZXYtZXJyb3InOiAoKSA9PiB7XG4gICAgICAgIGlmIChwbHVnaW5NYW5hZ2VyKSBwbHVnaW5NYW5hZ2VyLnByZXZFcnJvcigpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yLmlkZS1oYXNrZWxsJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnOiAoeyBjdXJyZW50VGFyZ2V0IH0pID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIHByZXR0aWZ5RmlsZShjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCkpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yLmlkZS1oYXNrZWxsLS1oYXMtdG9vbHRpcHMnLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6Y2xvc2UtdG9vbHRpcCc6ICh7IGN1cnJlbnRUYXJnZXQsIGFib3J0S2V5QmluZGluZyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPVxuICAgICAgICAgIHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgY29udHJvbGxlci50b29sdGlwcy5oYXMoKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWJvcnRLZXlCaW5kaW5nKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgKVxuXG4gIG1lbnUgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIG1lbnUuYWRkKFxuICAgIGF0b20ubWVudS5hZGQoW1xuICAgICAge1xuICAgICAgICBsYWJlbDogTUFJTl9NRU5VX0xBQkVMLFxuICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgeyBsYWJlbDogJ1ByZXR0aWZ5JywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnIH0sXG4gICAgICAgICAgeyBsYWJlbDogJ1RvZ2dsZSBQYW5lbCcsIGNvbW1hbmQ6ICdpZGUtaGFza2VsbDp0b2dnbGUtb3V0cHV0JyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdKSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHBsdWdpbk1hbmFnZXIuZGVhY3RpdmF0ZSgpXG5cbiAgLy8gY2xlYXIgY29tbWFuZHNcbiAgaWYgKGRpc3Bvc2FibGVzKSBkaXNwb3NhYmxlcy5kaXNwb3NlKClcblxuICBpZiAobWVudSkgbWVudS5kaXNwb3NlKClcbiAgYXRvbS5tZW51LnVwZGF0ZSgpXG5cbiAgZGlzcG9zYWJsZXMgPSB1bmRlZmluZWRcbiAgcGx1Z2luTWFuYWdlciA9IHVuZGVmaW5lZFxuICBtZW51ID0gdW5kZWZpbmVkXG4gIG91dHB1dFBhbmVsID0gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuc2VyaWFsaXplKClcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZU91dHB1dFBhbmVsKHN0YXRlPzogT3V0cHV0UGFuZWwuSVN0YXRlKSB7XG4gIGlmICghb3V0cHV0UGFuZWwpIG91dHB1dFBhbmVsID0gbmV3IE91dHB1dFBhbmVsLk91dHB1dFBhbmVsKHN0YXRlKVxuICByZXR1cm4gb3V0cHV0UGFuZWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzKCk6IFVQSS5JVVBJUmVnaXN0cmF0aW9uIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiAob3B0aW9uczogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zKSA9PiB7XG4gICAgaWYgKCFwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJREUtSGFza2VsbCBmYWlsZWQgdG8gcHJvdmlkZSBVUEkgaW5zdGFuY2U6IHBsdWdpbk1hbmFnZXIgaXMgdW5kZWZpbmVkJyxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIFVQSTMuaW5zdGFuY2UocGx1Z2luTWFuYWdlciwgb3B0aW9ucywge1xuICAgICAgZXZlbnRzUmV0dXJuUmVzdWx0czogZmFsc2UsXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZVVwaTNfMChcbiAgcmVnaXN0cmF0aW9uOiBVUEkuSVJlZ2lzdHJhdGlvbk9wdGlvbnMsXG4pOiBEaXNwb3NhYmxlIHwgdW5kZWZpbmVkIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgcmV0dXJuIFVQSTMuY29uc3VtZShwbHVnaW5NYW5hZ2VyLCByZWdpc3RyYXRpb24sIHtcbiAgICAgIGV2ZW50c1JldHVyblJlc3VsdHM6IGZhbHNlLFxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZVVwaTMoXG4gIHJlZ2lzdHJhdGlvbjogVVBJLklSZWdpc3RyYXRpb25PcHRpb25zLFxuKTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiBVUEkzLmNvbnN1bWUocGx1Z2luTWFuYWdlciwgcmVnaXN0cmF0aW9uLCB7XG4gICAgICBldmVudHNSZXR1cm5SZXN1bHRzOiB0cnVlLFxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUxpbnRlcihcbiAgcmVnaXN0ZXI6IChvcHRzOiB7fSkgPT4gTGludGVyLkluZGllRGVsZWdhdGUsXG4pOiBEaXNwb3NhYmxlIHwgdW5kZWZpbmVkIHtcbiAgaWYgKCEoZGlzcG9zYWJsZXMgJiYgcGx1Z2luTWFuYWdlcikpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgY29uc3QgbGludGVyID0gcmVnaXN0ZXIoeyBuYW1lOiAnSURFLUhhc2tlbGwnIH0pXG4gIGRpc3Bvc2FibGVzLmFkZChsaW50ZXIpXG4gIHBsdWdpbk1hbmFnZXIuc2V0TGludGVyKGxpbnRlcilcbiAgcmV0dXJuIGxpbnRlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZVN0YXR1c0JhcihcbiAgc3RhdHVzQmFyOiBTdGF0dXNCYXIuU3RhdHVzQmFyLFxuKTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghcGx1Z2luTWFuYWdlcikge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuICBwbHVnaW5NYW5hZ2VyLnNldFN0YXR1c0JhcihzdGF0dXNCYXIpXG4gIHJldHVybiBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICAgIHBsdWdpbk1hbmFnZXIucmVtb3ZlU3RhdHVzQmFyKClcbiAgICB9XG4gIH0pXG59XG4iXX0=