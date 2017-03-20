"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI = require("./upi");
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
        'ide-haskell:toggle-output': () => pluginManager && pluginManager.togglePanel()
    }));
    disposables.add(atom.commands.add('atom-text-editor[data-grammar~="haskell"]', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            prettify_1.prettifyFile(currentTarget.getModel());
        },
        'ide-haskell:close-tooltip': ({ currentTarget, abortKeyBinding }) => {
            const controller = pluginManager && pluginManager.controller(currentTarget.getModel());
            if (!controller) {
                return;
            }
            if (controller.tooltips.has()) {
                controller.tooltips.hide();
            }
            else if (abortKeyBinding) {
                abortKeyBinding();
            }
        },
        'ide-haskell:next-error': () => pluginManager && pluginManager.nextError(),
        'ide-haskell:prev-error': () => pluginManager && pluginManager.prevError()
    }));
    disposables.add(atom.commands.add('atom-text-editor[data-grammar~="cabal"]', {
        'ide-haskell:prettify-file': ({ currentTarget }) => {
            prettify_1.prettifyFile(currentTarget.getModel(), 'cabal');
        }
    }));
    atom.keymaps.add('ide-haskell', {
        'atom-text-editor[data-grammar~="haskell"]': { escape: 'ide-haskell:close-tooltip' }
    });
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
    atom.keymaps.removeBindingsFromSource('ide-haskell');
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
    return new UPI.UPI(pluginManager);
}
exports.provideUpi = provideUpi;
function provideUpi3() {
    upiProvided = true;
    return pluginManager;
}
exports.provideUpi3 = provideUpi3;
function consumeUpi3(registration) {
    upiProvided = true;
    return UPI3.consume(pluginManager, registration);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBd0M7QUFDeEMscURBQXNEO0FBQ3RELHlDQUF1QztBQUN2QyxtQ0FBdUM7QUFDdkMsNkJBQTRCO0FBQzVCLGdDQUErQjtBQUUvQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDdkIsSUFBSSxXQUE0QyxDQUFBO0FBQ2hELElBQUksYUFBd0MsQ0FBQTtBQUM1QyxJQUFJLElBQXFDLENBQUE7QUFFekMsbUNBQStCO0FBQXZCLDBCQUFBLE1BQU0sQ0FBQTtBQUVkLHlCQUFtQyxDQUFDO0FBT3BDLGtCQUEwQixLQUFhO0lBQ3JDLFdBQVcsRUFBRSxDQUFBO0lBRWIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7SUFFL0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFeEMsV0FBVyxHQUFHLEtBQUssQ0FBQTtJQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxVQUFVLENBQ1I7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUMzQjsrQ0FDbUMsRUFDbkMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUN4QixDQUFDO1FBQ0gsQ0FBQyxFQUNELElBQUksQ0FDTCxDQUFBO0lBQ0gsQ0FBQztJQUVELFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7SUFFdkMsYUFBYSxHQUFHLElBQUks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QyxDQUFDO0FBQ0gsQ0FBQztBQUpELDhCQUlDO0FBRUQ7SUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBRWxCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYyxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUpELGdDQUlDO0FBRUQ7SUFDRSxXQUFXLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLE1BQU0sQ0FBQyxhQUFhLENBQUE7QUFDdEIsQ0FBQztBQUhELGtDQUdDO0FBRUQscUJBQTZCLFlBQXVDO0lBQ2xFLFdBQVcsR0FBRyxJQUFJLENBQUE7SUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ25ELENBQUM7QUFKRCxrQ0FJQztBQU9ELHVCQUErQixhQUE4QjtJQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQTtJQUFDLENBQUM7SUFDL0MsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFBO0lBQzVELFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdkIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMvQixNQUFNLENBQUMsTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQU5ELHNDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyLCBJU3RhdGV9IGZyb20gJy4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge3ByZXR0aWZ5RmlsZX0gZnJvbSAnLi9wcmV0dGlmeSdcbmltcG9ydCB7TUFJTl9NRU5VX0xBQkVMfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgVVBJIGZyb20gJy4vdXBpJ1xuaW1wb3J0ICogYXMgVVBJMyBmcm9tICcuL3VwaS0zJ1xuXG5sZXQgdXBpUHJvdmlkZWQgPSBmYWxzZVxubGV0IGRpc3Bvc2FibGVzOiBDb21wb3NpdGVEaXNwb3NhYmxlIHwgdW5kZWZpbmVkXG5sZXQgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlciB8IHVuZGVmaW5lZFxubGV0IG1lbnU6IENvbXBvc2l0ZURpc3Bvc2FibGUgfCB1bmRlZmluZWRcblxuZXhwb3J0IHtjb25maWd9IGZyb20gJy4vY29uZmlnJ1xuXG5mdW5jdGlvbiBjbGVhbkNvbmZpZyAoKSB7IC8qbm9vcCovIH1cblxuZGVjbGFyZSBpbnRlcmZhY2UgSUV2ZW50RGVzYyB7XG4gIGN1cnJlbnRUYXJnZXQ6IEhUTUxFbGVtZW50ICYgeyBnZXRNb2RlbCAoKTogQXRvbVR5cGVzLlRleHRFZGl0b3IgfVxuICBhYm9ydEtleUJpbmRpbmc/ICgpOiB2b2lkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZSAoc3RhdGU6IElTdGF0ZSkge1xuICBjbGVhbkNvbmZpZygpXG5cbiAgYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKS5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG5cbiAgcmVxdWlyZSgnZXRjaCcpLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKVxuXG4gIHVwaVByb3ZpZGVkID0gZmFsc2VcblxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdpZGUtaGFza2VsbC5zdGFydHVwTWVzc2FnZUlkZUJhY2tlbmQnKSkge1xuICAgIHNldFRpbWVvdXQoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICghdXBpUHJvdmlkZWQpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgICAgICAgIGBJZGUtSGFza2VsbCBuZWVkcyBiYWNrZW5kcyB0aGF0IHByb3ZpZGUgbW9zdCBvZiBmdW5jdGlvbmFsaXR5LlxuICAgICAgICAgICAgUGxlYXNlIHJlZmVyIHRvIFJFQURNRSBmb3IgZGV0YWlsc2AsXG4gICAgICAgICAgICB7ZGlzbWlzc2FibGU6IHRydWV9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgNTAwMFxuICAgIClcbiAgfVxuXG4gIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuXG4gIHBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcihzdGF0ZSlcblxuICAvLyBnbG9iYWwgY29tbWFuZHNcbiAgZGlzcG9zYWJsZXMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAnaWRlLWhhc2tlbGw6dG9nZ2xlLW91dHB1dCc6ICgpID0+XG4gICAgICBwbHVnaW5NYW5hZ2VyICYmIHBsdWdpbk1hbmFnZXIudG9nZ2xlUGFuZWwoKVxuICB9KSlcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3JbZGF0YS1ncmFtbWFyfj1cImhhc2tlbGxcIl0nLCB7XG4gICAgICAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSc6ICh7Y3VycmVudFRhcmdldH06IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgcHJldHRpZnlGaWxlKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgIH0sXG4gICAgICAnaWRlLWhhc2tlbGw6Y2xvc2UtdG9vbHRpcCc6ICh7Y3VycmVudFRhcmdldCwgYWJvcnRLZXlCaW5kaW5nfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmNvbnRyb2xsZXIoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpKVxuICAgICAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICAgICAgaWYgKGNvbnRyb2xsZXIudG9vbHRpcHMuaGFzKCkpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnRvb2x0aXBzLmhpZGUoKVxuICAgICAgICB9IGVsc2UgaWYgKGFib3J0S2V5QmluZGluZykge1xuICAgICAgICAgIGFib3J0S2V5QmluZGluZygpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaWRlLWhhc2tlbGw6bmV4dC1lcnJvcic6ICgpID0+IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5uZXh0RXJyb3IoKSxcbiAgICAgICdpZGUtaGFza2VsbDpwcmV2LWVycm9yJzogKCkgPT4gcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnByZXZFcnJvcigpXG4gICAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yW2RhdGEtZ3JhbW1hcn49XCJjYWJhbFwiXScsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpICwgJ2NhYmFsJylcbiAgICAgIH1cbiAgICB9KSlcblxuICBhdG9tLmtleW1hcHMuYWRkKCdpZGUtaGFza2VsbCcsIHtcbiAgICAnYXRvbS10ZXh0LWVkaXRvcltkYXRhLWdyYW1tYXJ+PVwiaGFza2VsbFwiXSc6XG4gICAgICB7ZXNjYXBlOiAnaWRlLWhhc2tlbGw6Y2xvc2UtdG9vbHRpcCd9XG4gIH0pXG5cbiAgbWVudSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgbWVudS5hZGQoYXRvbS5tZW51LmFkZChbe1xuICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgc3VibWVudTogW1xuICAgICAge2xhYmVsOiAnUHJldHRpZnknLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSd9LFxuICAgICAge2xhYmVsOiAnVG9nZ2xlIFBhbmVsJywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnfVxuICAgIF19XSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlICgpIHtcbiAgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLmRlYWN0aXZhdGUoKVxuXG4gIGF0b20ua2V5bWFwcy5yZW1vdmVCaW5kaW5nc0Zyb21Tb3VyY2UoJ2lkZS1oYXNrZWxsJylcblxuICAvLyBjbGVhciBjb21tYW5kc1xuICBkaXNwb3NhYmxlcyAmJiBkaXNwb3NhYmxlcy5kaXNwb3NlKClcblxuICBtZW51ICYmIG1lbnUuZGlzcG9zZSgpXG4gIGF0b20ubWVudS51cGRhdGUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplICgpIHtcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuc2VyaWFsaXplKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVVwaSAoKSB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW5vbi1udWxsLWFzc2VydGlvblxuICByZXR1cm4gbmV3IFVQSS5VUEkocGx1Z2luTWFuYWdlciEpIC8vIFRPRE86IG5vdCBlbnRpcmVseSBzdXJlIGl0J3MgT0suLi5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzICgpIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiBwbHVnaW5NYW5hZ2VyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lVXBpMyAocmVnaXN0cmF0aW9uOiBVUEkzLklSZWdpc3RyYXRpb25PcHRpb25zKSB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW5vbi1udWxsLWFzc2VydGlvblxuICByZXR1cm4gVVBJMy5jb25zdW1lKHBsdWdpbk1hbmFnZXIhLCByZWdpc3RyYXRpb24pIC8vIFRPRE86IG5vdCBlbnRpcmVseSBzdXJlIGl0J3MgT0suLi5cbn1cblxuaW50ZXJmYWNlIElMaW50ZXJSZWdpc3RyeSB7XG4gIC8vIFRPRE86IHN0ZWFsIHRoaXMgZnJvbSBhdG9tLXR5cGVzY3JpcHRcbiAgcmVnaXN0ZXI6IEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lTGludGVyIChpbmRpZVJlZ2lzdHJ5OiBJTGludGVyUmVnaXN0cnkpIHtcbiAgaWYgKCEoZGlzcG9zYWJsZXMgJiYgcGx1Z2luTWFuYWdlcikpIHsgcmV0dXJuIH1cbiAgY29uc3QgbGludGVyID0gaW5kaWVSZWdpc3RyeS5yZWdpc3Rlcih7bmFtZTogJ0lERS1IYXNrZWxsJ30pXG4gIGRpc3Bvc2FibGVzLmFkZChsaW50ZXIpXG4gIHBsdWdpbk1hbmFnZXIuc2V0TGludGVyKGxpbnRlcilcbiAgcmV0dXJuIGxpbnRlclxufVxuIl19