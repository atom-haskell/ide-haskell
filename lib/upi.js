Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("./utils");
class UPI {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
    }
    registerPlugin(disposables, name) {
        return new UPIInstance(this.pluginManager, disposables, name);
    }
}
exports.UPI = UPI;
class UPIInstance {
    constructor(pluginManager, disposables, pluginName) {
        this.pluginManager = pluginManager;
        this.pluginName = pluginName;
        disposables.add(this.disposables = new atom_1.CompositeDisposable());
    }
    setMenu(name, menu) {
        let menuDisp;
        this.disposables.add(menuDisp = atom.menu.add([{
                label: utils_1.MainMenuLabel,
                submenu: [{ label: name, submenu: menu }]
            }
        ]));
        return menuDisp;
    }
    setStatus(status) {
        return this.pluginManager.outputView.backendStatus(this.pluginName, status);
    }
    addMessages(messages, types) {
        messages = messages.map(function (m) {
            if (m.position != null) {
                m.position = atom_1.Point.fromObject(m.position);
            }
            return m;
        });
        return this.pluginManager.checkResults.appendResults(messages, types);
    }
    setMessages(messages, types) {
        messages = messages.map(function (m) {
            if (m.position != null) {
                m.position = atom_1.Point.fromObject(m.position);
            }
            return m;
        });
        return this.pluginManager.checkResults.setResults(messages, types);
    }
    clearMessages(types) {
        return this.pluginManager.checkResults.setResults([], types);
    }
    setMessageTypes(types) {
        return (() => {
            let result = [];
            for (let type in types) {
                let opts = types[type];
                result.push(this.pluginManager.outputView.createTab(type, opts));
            }
            return result;
        })();
    }
    onShouldShowTooltip(callback) {
        let disp;
        this.disposables.add(disp = this.pluginManager.onShouldShowTooltip(({ editor, pos, eventType }) => {
            return this.showTooltip({
                editor,
                pos,
                eventType,
                tooltip(crange) {
                    let res = callback(editor, crange, eventType);
                    if (res != null) {
                        return Promise.resolve(res);
                    }
                    else {
                        return Promise.reject({ ignore: true });
                    }
                }
            });
        }));
        return disp;
    }
    showTooltip({ editor, pos, eventType, detail, tooltip }) {
        let controller = this.pluginManager.controller(editor);
        return this.withEventRange({ controller, pos, detail, eventType }, ({ crange, pos, eventType }) => {
            return Promise.resolve(tooltip(crange)).then(({ range, text, persistOnCursorMove }) => controller.showTooltip(pos, range, text, { eventType, subtype: 'external', persistOnCursorMove }))
                .catch(status => {
                if (status == null) {
                    status = { status: 'warning' };
                }
                if (status instanceof Error) {
                    console.warn(status);
                    status = { status: 'warning' };
                }
                if (!status.ignore) {
                    controller.hideTooltip({ eventType });
                    return this.setStatus(status);
                }
            });
        });
    }
    onWillSaveBuffer(callback) {
        let disp;
        this.disposables.add(disp = this.pluginManager.onWillSaveBuffer(callback));
        return disp;
    }
    onDidSaveBuffer(callback) {
        let disp;
        this.disposables.add(disp = this.pluginManager.onDidSaveBuffer(callback));
        return disp;
    }
    onDidStopChanging(callback) {
        let disp;
        this.disposables.add(disp = this.pluginManager.onDidStopChanging(callback));
        return disp;
    }
    addPanelControl(element, opts) {
        return this.pluginManager.outputView.addPanelControl(element, opts);
    }
    addConfigParam(spec) {
        return this.pluginManager.addConfigParam(this.pluginName, spec);
    }
    getConfigParam(pluginName, name) {
        if (name == null) {
            name = pluginName;
            ({ pluginName } = this);
        }
        return this.pluginManager.getConfigParam(pluginName, name);
    }
    setConfigParam(pluginName, name, value) {
        if (value == null) {
            value = name;
            name = pluginName;
            ({ pluginName } = this);
        }
        return this.pluginManager.setConfigParam(pluginName, name, value);
    }
    withEventRange({ editor, detail, eventType, pos, controller }, callback) {
        if (pos != null) {
            pos = atom_1.Point.fromObject(pos);
        }
        if (eventType == null) {
            eventType = utils_1.getEventType(detail);
        }
        if (controller == null) {
            controller = this.pluginManager.controller(editor);
        }
        if (controller == null) {
            return;
        }
        return callback((controller.getEventRange(pos, eventType)));
    }
}
