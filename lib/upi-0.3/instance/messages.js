import { Point } from 'atom';
export function create(pluginName, pluginManager) {
    return {
        status(status) {
            pluginManager.outputView.backendStatus(pluginName, status);
        },
        add(messages, types) {
            messages = messages.map((m) => {
                if (m.position)
                    m.position = Point.fromObject(m.position);
                return m;
            });
            pluginManager.checkResults.appendResults(messages, types);
        },
        set(messages, types) {
            messages = messages.map((m) => {
                if (m.position)
                    m.position = Point.fromObject(m.position);
                return m;
            });
            pluginManager.checkResults.setResults(messages, types);
        },
        clear(types) {
            pluginManager.checkResults.setResults([], types);
        },
        setTypes(types) {
            for (const type in types) {
                const opts = types[type];
                pluginManager.outputView.createTab(type, opts);
            }
        },
    };
}
