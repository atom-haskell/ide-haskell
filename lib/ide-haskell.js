"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const plugin_manager_1 = require("./plugin-manager");
const prettify_1 = require("./prettify");
const utils_1 = require("./utils");
const UPI = require("./upi");
const UPI3 = require("./upi-0.3");
let upiProvided = false;
let disposables;
let pluginManager;
let menu;
let upi3;
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
            if (controller.hasTooltips && controller.hasTooltips()) {
                controller.hideTooltip();
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
    upi3 = new UPI3.UPI(pluginManager);
}
exports.activate = activate;
function deactivate() {
    pluginManager && pluginManager.deactivate();
    pluginManager = null;
    upi3 && upi3.dispose();
    upi3 = null;
    atom.keymaps.removeBindingsFromSource('ide-haskell');
    disposables && disposables.dispose();
    disposables = null;
    menu && menu.dispose();
    menu = null;
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
    return upi3;
}
exports.provideUpi3 = provideUpi3;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaWRlLWhhc2tlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBd0M7QUFDeEMscURBQXNEO0FBQ3RELHlDQUF1QztBQUN2QyxtQ0FBdUM7QUFDdkMsNkJBQTRCO0FBQzVCLGtDQUFpQztBQUVqQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUE7QUFDdkIsSUFBSSxXQUF1QyxDQUFBO0FBQzNDLElBQUksYUFBbUMsQ0FBQTtBQUN2QyxJQUFJLElBQWdDLENBQUE7QUFDcEMsSUFBSSxJQUFxQixDQUFBO0FBRXpCLG1DQUErQjtBQUF2QiwwQkFBQSxNQUFNLENBQUE7QUFFZCx5QkFBbUMsQ0FBQztBQU9wQyxrQkFBMEIsS0FBYTtJQUNyQyxXQUFXLEVBQUUsQ0FBQTtJQUViLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRXhDLFdBQVcsR0FBRyxLQUFLLENBQUE7SUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsVUFBVSxDQUNSO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FDM0I7K0NBQ21DLEVBQ25DLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDeEIsQ0FBQztRQUNILENBQUMsRUFDRCxJQUFJLENBQ0wsQ0FBQTtJQUNILENBQUM7SUFFRCxXQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFB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QTtJQUVsQixJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3RCLElBQUksR0FBRyxJQUFJLENBQUE7SUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ3BCLENBQUM7QUFoQkQsZ0NBZ0JDO0FBRUQ7SUFDRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDbkMsQ0FBQztBQUNILENBQUM7QUFKRCw4QkFJQztBQUVEO0lBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ25DLENBQUM7QUFIRCxnQ0FHQztBQUVEO0lBQ0UsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUNsQixNQUFNLENBQUMsSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUhELGtDQUdDO0FBT0QsdUJBQStCLGFBQThCO0lBQzNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFBO0lBQUMsQ0FBQztJQUMvQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUE7SUFDNUQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDZixDQUFDO0FBTkQsc0NBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge1BsdWdpbk1hbmFnZXIsIElTdGF0ZX0gZnJvbSAnLi9wbHVnaW4tbWFuYWdlcidcbmltcG9ydCB7cHJldHRpZnlGaWxlfSBmcm9tICcuL3ByZXR0aWZ5J1xuaW1wb3J0IHtNQUlOX01FTlVfTEFCRUx9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgKiBhcyBVUEkgZnJvbSAnLi91cGknXG5pbXBvcnQgKiBhcyBVUEkzIGZyb20gJy4vdXBpLTAuMydcblxubGV0IHVwaVByb3ZpZGVkID0gZmFsc2VcbmxldCBkaXNwb3NhYmxlczogQ29tcG9zaXRlRGlzcG9zYWJsZSB8IG51bGxcbmxldCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyIHwgbnVsbFxubGV0IG1lbnU6IENvbXBvc2l0ZURpc3Bvc2FibGUgfCBudWxsXG5sZXQgdXBpMzogVVBJMy5VUEkgfCBudWxsXG5cbmV4cG9ydCB7Y29uZmlnfSBmcm9tICcuL2NvbmZpZydcblxuZnVuY3Rpb24gY2xlYW5Db25maWcgKCkgeyAvKm5vb3AqLyB9XG5cbmRlY2xhcmUgaW50ZXJmYWNlIElFdmVudERlc2Mge1xuICBjdXJyZW50VGFyZ2V0OiBIVE1MRWxlbWVudCAmIHsgZ2V0TW9kZWwgKCk6IEF0b21UeXBlcy5UZXh0RWRpdG9yIH1cbiAgYWJvcnRLZXlCaW5kaW5nPyAoKTogdm9pZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUgKHN0YXRlOiBJU3RhdGUpIHtcbiAgY2xlYW5Db25maWcoKVxuXG4gIGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSkuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuXG4gIHJlcXVpcmUoJ2V0Y2gnKS5zZXRTY2hlZHVsZXIoYXRvbS52aWV3cylcblxuICB1cGlQcm92aWRlZCA9IGZhbHNlXG5cbiAgaWYgKGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwuc3RhcnR1cE1lc3NhZ2VJZGVCYWNrZW5kJykpIHtcbiAgICBzZXRUaW1lb3V0KFxuICAgICAgKCkgPT4ge1xuICAgICAgICBpZiAoIXVwaVByb3ZpZGVkKSB7XG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG4gICAgICAgICAgICBgSWRlLUhhc2tlbGwgbmVlZHMgYmFja2VuZHMgdGhhdCBwcm92aWRlIG1vc3Qgb2YgZnVuY3Rpb25hbGl0eS5cbiAgICAgICAgICAgIFBsZWFzZSByZWZlciB0byBSRUFETUUgZm9yIGRldGFpbHNgLFxuICAgICAgICAgICAge2Rpc21pc3NhYmxlOiB0cnVlfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIDUwMDBcbiAgICApXG4gIH1cblxuICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoc3RhdGUpXG5cbiAgLy8gZ2xvYmFsIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnOiAoKSA9PlxuICAgICAgcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnRvZ2dsZVBhbmVsKClcbiAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yW2RhdGEtZ3JhbW1hcn49XCJoYXNrZWxsXCJdJywge1xuICAgICAgJ2lkZS1oYXNrZWxsOnByZXR0aWZ5LWZpbGUnOiAoe2N1cnJlbnRUYXJnZXR9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIHByZXR0aWZ5RmlsZShjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCkpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsOmNsb3NlLXRvb2x0aXAnOiAoe2N1cnJlbnRUYXJnZXQsIGFib3J0S2V5QmluZGluZ306IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSlcbiAgICAgICAgaWYgKCFjb250cm9sbGVyKSB7IHJldHVybiB9XG4gICAgICAgIGlmIChjb250cm9sbGVyLmhhc1Rvb2x0aXBzICYmIGNvbnRyb2xsZXIuaGFzVG9vbHRpcHMoKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuaGlkZVRvb2x0aXAoKVxuICAgICAgICB9IGVsc2UgaWYgKGFib3J0S2V5QmluZGluZykge1xuICAgICAgICAgIGFib3J0S2V5QmluZGluZygpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnaWRlLWhhc2tlbGw6bmV4dC1lcnJvcic6ICgpID0+IHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5uZXh0RXJyb3IoKSxcbiAgICAgICdpZGUtaGFza2VsbDpwcmV2LWVycm9yJzogKCkgPT4gcGx1Z2luTWFuYWdlciAmJiBwbHVnaW5NYW5hZ2VyLnByZXZFcnJvcigpXG4gICAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yW2RhdGEtZ3JhbW1hcn49XCJjYWJhbFwiXScsIHtcbiAgICAgICdpZGUtaGFza2VsbDpwcmV0dGlmeS1maWxlJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBwcmV0dGlmeUZpbGUoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpICwgJ2NhYmFsJylcbiAgICAgIH1cbiAgICB9KSlcblxuICBhdG9tLmtleW1hcHMuYWRkKCdpZGUtaGFza2VsbCcsIHtcbiAgICAnYXRvbS10ZXh0LWVkaXRvcltkYXRhLWdyYW1tYXJ+PVwiaGFza2VsbFwiXSc6XG4gICAgICB7ZXNjYXBlOiAnaWRlLWhhc2tlbGw6Y2xvc2UtdG9vbHRpcCd9XG4gIH0pXG5cbiAgbWVudSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgbWVudS5hZGQoYXRvbS5tZW51LmFkZChbe1xuICAgIGxhYmVsOiBNQUlOX01FTlVfTEFCRUwsXG4gICAgc3VibWVudTogW1xuICAgICAge2xhYmVsOiAnUHJldHRpZnknLCBjb21tYW5kOiAnaWRlLWhhc2tlbGw6cHJldHRpZnktZmlsZSd9LFxuICAgICAge2xhYmVsOiAnVG9nZ2xlIFBhbmVsJywgY29tbWFuZDogJ2lkZS1oYXNrZWxsOnRvZ2dsZS1vdXRwdXQnfVxuICAgIF19XSkpXG5cbiAgdXBpMyA9IG5ldyBVUEkzLlVQSShwbHVnaW5NYW5hZ2VyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSAoKSB7XG4gIHBsdWdpbk1hbmFnZXIgJiYgcGx1Z2luTWFuYWdlci5kZWFjdGl2YXRlKClcbiAgcGx1Z2luTWFuYWdlciA9IG51bGxcbiAgdXBpMyAmJiB1cGkzLmRpc3Bvc2UoKVxuICB1cGkzID0gbnVsbFxuXG4gIC8vIFRPRE86IG5vIGRlZmluaXRpb25cbiAgYXRvbS5rZXltYXBzLnJlbW92ZUJpbmRpbmdzRnJvbVNvdXJjZSgnaWRlLWhhc2tlbGwnKVxuXG4gIC8vIGNsZWFyIGNvbW1hbmRzXG4gIGRpc3Bvc2FibGVzICYmIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICBkaXNwb3NhYmxlcyA9IG51bGxcblxuICBtZW51ICYmIG1lbnUuZGlzcG9zZSgpXG4gIG1lbnUgPSBudWxsXG4gIGF0b20ubWVudS51cGRhdGUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplICgpIHtcbiAgaWYgKHBsdWdpbk1hbmFnZXIpIHtcbiAgICAgcmV0dXJuIHBsdWdpbk1hbmFnZXIuc2VyaWFsaXplKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVVwaSAoKSB7XG4gIHVwaVByb3ZpZGVkID0gdHJ1ZVxuICByZXR1cm4gbmV3IFVQSS5VUEkocGx1Z2luTWFuYWdlcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVVcGkzICgpIHtcbiAgdXBpUHJvdmlkZWQgPSB0cnVlXG4gIHJldHVybiB1cGkzXG59XG5cbmludGVyZmFjZSBJTGludGVyUmVnaXN0cnkge1xuICAvLyBUT0RPOiBzdGVhbCB0aGlzIGZyb20gYXRvbS10eXBlc2NyaXB0XG4gIHJlZ2lzdGVyOiBGdW5jdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUxpbnRlciAoaW5kaWVSZWdpc3RyeTogSUxpbnRlclJlZ2lzdHJ5KSB7XG4gIGlmICghKGRpc3Bvc2FibGVzICYmIHBsdWdpbk1hbmFnZXIpKSB7IHJldHVybiB9XG4gIGNvbnN0IGxpbnRlciA9IGluZGllUmVnaXN0cnkucmVnaXN0ZXIoe25hbWU6ICdJREUtSGFza2VsbCd9KVxuICBkaXNwb3NhYmxlcy5hZGQobGludGVyKVxuICBwbHVnaW5NYW5hZ2VyLnNldExpbnRlcihsaW50ZXIpXG4gIHJldHVybiBsaW50ZXJcbn1cbiJdfQ==