"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI = require("./upi-2");
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
        }
    }), atom.commands.add('atom-text-editor[data-grammar~="cabal"]', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            prettify_1.prettifyFile(currentTarget.getModel(), 'cabal');
        }
    }));
    menu = new atom_1.CompositeDisposable();
    menu.add(atom.menu.add([{
            label: utils_1.MAIN_MENU_LABEL,
            submenu: [
                { label: 'Prettify', command: 'ide-haskell:prettify-file' },
                { label: 'Toggle Panel', command: 'ide-haskell:toggle-output' }
            ]
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
                return;
            }
            return UPI.instance(pluginManager, disp, pluginName);
        }
    };
}
exports.provideUpi = provideUpi;
function provideUpi3() {
    upiProvided = true;
    return (options) => pluginManager && UPI3.instance(pluginManager, options);
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
        return;
    }
    const linter = indieRegistry.register({ name: 'IDE-Haskell' });
    disposables.add(linter);
    pluginManager.setLinter(linter);
    return linter;
}
exports.consumeLinter = consumeLinter;
function consumeStatusBar(statusBar) {
    if (!pluginManager) {
        return;
    }
    pluginManager.setStatusBar(statusBar);
    return new atom_1.Disposable(() => {
        if (pluginManager) {
            pluginManager.removeStatusBar();
        }
    });
}
exports.consumeStatusBar = consumeStatusBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBb0Q7QUFDcEQscURBQXNEO0FBQ3RELHlDQUF1QztBQUN2QyxtQ0FBdUM7QUFHdkMsK0JBQThCO0FBQzlCLGdDQUErQjtBQVcvQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDdkIsSUFBSSxXQUE0QyxDQUFBO0FBQ2hELElBQUksYUFBd0MsQ0FBQTtBQUM1QyxJQUFJLElBQXFDLENBQUE7QUFFekMsbUNBQStCO0FBQXZCLDBCQUFBLE1BQU0sQ0FBQTtBQUVkLHlCQUFtQyxDQUFDO0FBT3BDLGtCQUEwQixLQUFhO0lBQ3JDLFdBQVcsRUFBRSxDQUFBO0lBRWIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFeEMsV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLENBQ1I7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUMzQjsrQ0FDbUMsRUFDbkMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN4QixDQUFDO1FBQ0gsQ0FBQyxFQUNELElBQUksQ0FDTCxDQUFBO0lBQ0gsQ0FBQztJQUVELFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFFdkMsYUFBYSxHQUFHLElBQUks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QUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ2pDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFSRCw0Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7UGx1Z2luTWFuYWdlciwgSVN0YXRlfSBmcm9tICcuL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtwcmV0dGlmeUZpbGV9IGZyb20gJy4vcHJldHRpZnknXG5pbXBvcnQge01BSU5fTUVOVV9MQUJFTH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7SUxpbnRlclJlZ2lzdHJ5fSBmcm9tICcuL2xpbnRlci1zdXBwb3J0J1xuaW1wb3J0IHtJU3RhdHVzQmFyfSBmcm9tICcuL3N0YXR1cy1iYXInXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnLi91cGktMidcbmltcG9ydCAqIGFzIFVQSTMgZnJvbSAnLi91cGktMydcblxuLy8gZm9yIHR5cGluZ3Ncbi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSAqL1xuaW1wb3J0IHtJU2hvd1Rvb2x0aXBQYXJhbXMsIElSZWdpc3RyYXRpb25PcHRpb25zfSBmcm9tICcuL3VwaS0zJ1xuaW1wb3J0IHtJU3RhdHVzLCBJU2V2ZXJpdHlUYWJEZWZpbml0aW9uLCBJQ29udHJvbE9wdHMsIElFbGVtZW50T2JqZWN0LCBUQ29udHJvbERlZmluaXRpb259IGZyb20gJy4vb3V0cHV0LXBhbmVsJ1xuaW1wb3J0IHtJUmVzdWx0SXRlbSwgVFNldmVyaXR5fSBmcm9tICcuL3Jlc3VsdHMtZGInXG5pbXBvcnQge0lQYXJhbVNwZWN9IGZyb20gJy4vY29uZmlnLXBhcmFtcydcbi8qIHRzbGludDplbmFibGU6bm8tdW51c2VkLXZhcmlhYmxlICovXG4vLyBlbmRcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IHVuZGVmaW5lZFxubGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIgfCB1bmRlZmluZWRcbmxldCBtZW51OiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5cbmV4cG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZydcblxuZnVuY3Rpb24gY2xlYW5Db25maWcgKCkgeyAvKm5vb3AqLyB9XG5cbmRlY2xhcmUgaW50ZXJmYWNlIElFdmVudERlc2Mge1xuICBjdXJyZW50VGFyZ2V0OiBIVE1MRWxlbWVudCAmIHsgZ2V0TW9kZWwgKCk6IEF0b21UeXBlcy5UZXh0RWRpdG9yIH1cbiAgYWJvcnRLZXlCaW5kaW5nPyAoKTogdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUgKHN0YXRlOiBJU3RhdGUpIHtcbiAgY2xlYW5Db25maWcoKVxuXG4gIGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSkuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuXG4gIHJlcXVpcmUoJ2V0Y2gnKS5zZXRTY2hlZHVsZXIoYXRvbS52aWV3cylcblxuICB1cGlQcm92aWRlZCA9IGZhbHNlXG5cbiAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuc3RhcnR1cE1lc3NhZ2VJZGVCYWNrZW5kJykpIHtcbiAgICBzZXRUaW1lb3V0KFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIXVwaVByb3ZpZGVkKSB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG4gICAgICAgICAgICBgSWRlLUhhc2tlbGwgbmVlZHMgYmFja2VuZHMgdGhhdCBwcm92aWRlIG1vc3Qgb2YgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIFBsZWFzZSByZWZlciB0byBSRUFETUUgZm9yIGRldGFpbHNgLFxuICAgICAgICAgICAge2Rpc21pc3NhYmxlOiB0cnVlfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIDUwMDBcbiAgICApXG4gIH1cblxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoc3RhdGUpXG5cbiAgLy8gZ2xvYmFsIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6dG9nZ2xlLW91dHB1dCc6ICgpID0+IHsgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnRvZ2dsZVBhbmVsKCkgfSxcbiAgICAgICdpZGUtaGFza2VsbDpuZXh0LWVycm9yJzogKCkgPT4geyBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIubmV4dEVycm9yKCkgfSxcbiAgICAgICdpZGUtaGFza2VsbDpwcmV2LWVycm9yJzogKCkgPT4geyBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIucHJldkVycm9yKCkgfSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvci5pZGUtaGFza2VsbCcsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKVxuICAgICAgfSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvci5pZGUtaGFza2VsbC0taGFzLXRvb2x0aXBzJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOmNsb3NlLXRvb2x0aXAnOiAoe2N1cnJlbnRUYXJnZXQsIGFib3J0S2V5QmluZGluZ306IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgY29udHJvbGxlci50b29sdGlwcy5oYXMoKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuaGlkZSgpXG4gICAgICAgIH0gZWxzZSBpZiAoYWJvcnRLZXlCaW5kaW5nKSB7XG4gICAgICAgICAgYWJvcnRLZXlCaW5kaW5nKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yW2RhdGEtZ3JhbW1hcn49XCJjYWJhbFwiXScsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpICwgJ2NhYmFsJylcbiAgICAgIH1cbiAgICB9KVxuICApXG5cbiAgbWVudSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgbWVudS5hZGQoYXRvbS5tZW51LmFkZChbe1xuICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgc3VibWVudTogW1xuICAgICAge2xhYmVsOiAnUHJldHRpZnknLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSd9LFxuICAgICAge2xhYmVsOiAnVG9nZ2xlIFBhbmVsJywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnfVxuICAgIF19XSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlICgpIHtcbiAgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmRlYWN0aXZhdGUoKVxuXG4gIC8vIGNsZWFyIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuXG4gIG1lbnUgJiYgbWVudS5kaXNwb3NlKClcbiAgYXRvbS5tZW51LnVwZGF0ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUgKCkge1xuICBpZiAocGx1Z2luTWFuYWdlcikge1xuICAgICByZXR1cm4gcGx1Z2luTWFuYWdlci5zZXJpYWxpemUoKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlVXBpICgpIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIHJldHVybiB7XG4gICAgIHJlZ2lzdGVyUGx1Z2luIChkaXNwOiBDb21wb3NpdGVEaXNwb3NhYmxlLCBwbHVnaW5OYW1lOiBzdHJpbmcpIHtcbiAgICAgICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIH1cbiAgICAgICByZXR1cm4gVVBJLmluc3RhbmNlKHBsdWdpbk1hbmFnZXIsIGRpc3AsIHBsdWdpbk5hbWUpXG4gICAgIH1cbiAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzICgpIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiAob3B0aW9uczogSVJlZ2lzdHJhdGlvbk9wdGlvbnMpID0+IHBsdWdpbk1hbmFnZXIgJiYgVVBJMy5pbnN0YW5jZShwbHVnaW5NYW5hZ2VyLCBvcHRpb25zKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZVVwaTMgKHJlZ2lzdHJhdGlvbjogVVBJMy5JUmVnaXN0cmF0aW9uT3B0aW9ucykge1xuICB1cGlQcm92aWRlZCA9IHRydWVcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICByZXR1cm4gVVBJMy5jb25zdW1lKHBsdWdpbk1hbmFnZXIsIHJlZ2lzdHJhdGlvbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUxpbnRlciAoaW5kaWVSZWdpc3RyeTogSUxpbnRlclJlZ2lzdHJ5KTogRGlzcG9zYWJsZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghKGRpc3Bvc2FibGVzICYmIHBsdWdpbk1hbmFnZXIpKSB7IHJldHVybiB9XG4gIGNvbnN0IGxpbnRlciA9IGluZGllUmVnaXN0cnkucmVnaXN0ZXIoe25hbWU6ICdJREUtSGFza2VsbCd9KVxuICBkaXNwb3NhYmxlcy5hZGQobGludGVyKVxuICBwbHVnaW5NYW5hZ2VyLnNldExpbnRlcihsaW50ZXIpXG4gIHJldHVybiBsaW50ZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWVTdGF0dXNCYXIgKHN0YXR1c0JhcjogSVN0YXR1c0Jhcik6IERpc3Bvc2FibGUgfCB1bmRlZmluZWQge1xuICBpZiAoIXBsdWdpbk1hbmFnZXIpIHsgcmV0dXJuIH1cbiAgcGx1Z2luTWFuYWdlci5zZXRTdGF0dXNCYXIoc3RhdHVzQmFyKVxuICByZXR1cm4gbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgIGlmIChwbHVnaW5NYW5hZ2VyKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLnJlbW92ZVN0YXR1c0JhcigpXG4gICAgfVxuICB9KVxufVxuIl19