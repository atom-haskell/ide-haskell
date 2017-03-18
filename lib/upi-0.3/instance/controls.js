export function create(pluginManager) {
    return {
        add({ element, opts }) {
            return pluginManager.outputView.addPanelControl(element, opts);
        }
    };
}
