export function create(pluginName, pluginManager) {
    return {
        add(spec) {
            return pluginManager.addConfigParam(pluginName, spec);
        },
        get(...args) {
            if (args.length < 2) {
                args.unshift(pluginName);
            }
            const [plugin, name] = args;
            return pluginManager.getConfigParam(plugin, name);
        },
        set(...args) {
            if (args.length < 3) {
                args.unshift(pluginName);
            }
            const [plugin, name, value] = args;
            return pluginManager.setConfigParam(plugin, name, value);
        }
    };
}
