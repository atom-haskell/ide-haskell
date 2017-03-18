export function create(pluginManager, disposables) {
    return {
        onWillSaveBuffer(callback) {
            const disp = pluginManager.onWillSaveBuffer(callback);
            disposables.add(disp);
            return disp;
        },
        onDidSaveBuffer(callback) {
            const disp = pluginManager.onDidSaveBuffer(callback);
            disposables.add(disp);
            return disp;
        },
        onDidStopChanging(callback) {
            const disp = pluginManager.onDidStopChanging(callback);
            disposables.add(disp);
            return disp;
        }
    };
}
