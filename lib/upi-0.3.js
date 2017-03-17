'use babel';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CompositeDisposable, Point, Disposable } from 'atom';
import { MainMenuLabel, getEventType } from './utils';
export class UPIError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, "name", { value: this.constructor.name });
        Object.defineProperty(this, "message", { value: message });
        Error.captureStackTrace(this, this.constructor);
    }
}
export class UPI {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.instances = new Map;
        this.disposables = new CompositeDisposable;
        this.disposables.add(this.pluginManager.onShouldShowTooltip(this.shouldShowTooltip.bind(this)));
    }
    shouldShowTooltip({ editor, pos, eventType }) {
        return __awaiter(this, void 0, void 0, function* () {
            let subs = [];
            for (const [pluginName, inst] of this.instances.entries()) {
                for (const vs of inst.tooltipEvents.values()) {
                    subs.push(Object.assign({ pluginName }, vs));
                }
            }
            subs.sort((a, b) => b.priority - a.priority);
            const controller = this.pluginManager.controller(editor);
            for (const { pluginName, handler } of subs) {
                try {
                    const eventRange = this.getEventRange({ controller, pos, eventType });
                    if (!eventRange)
                        continue;
                    const { crange, pos: newPos } = eventRange;
                    let tt = yield Promise.resolve(handler(editor, crange, eventType));
                    if (tt) {
                        const { range, text } = tt;
                        controller.showTooltip(newPos, range, text, { eventType, subtype: 'external' });
                        break;
                    }
                    else {
                        continue;
                    }
                }
                catch (e) {
                    if (e.message) {
                        console.warn(e);
                        e = {
                            status: 'warning',
                            detail: e.message
                        };
                    }
                    if (!e.ignore) {
                        controller.hideTooltip({ eventType });
                        this.pluginManager.outputView.backendStatus(pluginName, e);
                    }
                }
            }
        });
    }
    consume(options = {}) {
        const { name, menu, messageTypes, events, controls, params, consumer, tooltipEvent } = options;
        if (!name)
            throw new UPIError("name has to be specified for UPI");
        if (this.instances.has(name))
            throw new UPIError(`Plugin ${name} already registered with UPI`);
        const instance = new UPIInstance(this.pluginManager, name, this);
        this.instances.set(name, instance);
        if (menu)
            instance.menu.set(menu);
        if (messageTypes)
            instance.messages.setTypes(messageTypes);
        if (events)
            for (const k of Object.keys(events)) {
                let v = events[k];
                if (!Array.isArray(v))
                    v = [v];
                for (const i of v)
                    instance.events[k](i);
            }
        if (tooltipEvent) {
            let { priority, handler } = tooltipEvent;
            if (!handler) {
                handler = tooltipEvent;
            }
            if (!priority)
                priority = 100;
            instance.tooltips.onShouldShowTooltip(priority, handler);
        }
        if (controls)
            for (const i of controls)
                instance.controls.add(i);
        if (params)
            for (const i of params)
                instance.params.add(i);
        consumer(instance);
        const disp = new Disposable(() => {
            this.instances.delete(name);
            instance.destroy();
        });
        this.disposables.add(disp);
        return disp;
    }
    dispose() {
        this.disposables.dispose();
    }
    withEventRange({ editor, detail, eventType, pos, controller }, callback) {
        if (pos)
            pos = Point.fromObject(pos);
        if (!eventType)
            eventType = getEventType(detail);
        if (!controller)
            controller = this.pluginManager.controller(editor);
        if (!controller)
            return;
        callback(controller.getEventRange(pos, eventType), eventType);
    }
    getEventRange({ editor, detail, eventType, pos, controller }) {
        if (pos)
            pos = Point.fromObject(pos);
        if (!eventType)
            eventType = getEventType(detail);
        if (!controller)
            controller = this.pluginManager.controller(editor);
        if (!controller)
            return;
        return controller.getEventRange(pos, eventType);
    }
}
class UPIInstance {
    constructor(pluginManager, pluginName, main) {
        this.disposables = new CompositeDisposable;
        this.tooltipEvents = new Set;
        this.destroyed = false;
        let instance = this;
        this.utils = { withEventRange: main.withEventRange.bind(main) };
        this.menu = {
            set({ label, menu }) {
                const menuDisp = atom.menu.add([{
                        label: MainMenuLabel,
                        submenu: [{ label: label, submenu: menu }]
                    }]);
                instance.disposables.add(menuDisp);
                return menuDisp;
            }
        };
        this.messages = {
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
        this.tooltips = {
            show({ editor, pos, eventType, detail, tooltip }) {
                const controller = pluginManager.controller(editor);
                main.withEventRange({ controller, pos, detail, eventType }, ({ crange, pos }, eventType) => {
                    Promise.resolve(tooltip(crange)).then(({ range, text, persistOnCursorMove }) => controller.showTooltip(pos, range, text, { eventType, subtype: 'external', persistOnCursorMove }))
                        .catch((status = { status: 'warning' }) => {
                        if (status.message) {
                            console.warn(status);
                            status = { status: 'warning' };
                        }
                        if (!status.ignore) {
                            controller.hideTooltip({ eventType });
                            instance.messages.status(status);
                        }
                    });
                });
            },
            onShouldShowTooltip(...args) {
                if (args.length < 2) {
                    args.unshift(100);
                }
                const [priority, handler] = args;
                const obj = { priority, handler };
                instance.tooltipEvents.add(obj);
                return new Disposable(() => instance.tooltipEvents.delete(obj));
            }
        };
        this.events = {
            onWillSaveBuffer(callback) {
                const disp = pluginManager.onWillSaveBuffer(callback);
                instance.disposables.add(disp);
                return disp;
            },
            onDidSaveBuffer(callback) {
                const disp = pluginManager.onDidSaveBuffer(callback);
                instance.disposables.add(disp);
                return disp;
            },
            onDidStopChanging(callback) {
                const disp = pluginManager.onDidStopChanging(callback);
                instance.disposables.add(disp);
                return disp;
            }
        };
        this.controls = {
            add({ element, opts }) {
                return pluginManager.outputView.addPanelControl(element, opts);
            }
        };
        this.params = {
            add(spec) {
                return pluginManager.addConfigParam(pluginName, spec);
            },
            get(...args) {
                if (args.length < 2) {
                    args.unshift(pluginName);
                }
                return pluginManager.getConfigParam(...args);
            },
            set(...args) {
                if (args.length < 3) {
                    args.unshift(pluginName);
                }
                return pluginManager.setConfigParam(...args);
            }
        };
    }
    destroy() {
        this.disposables.dispose();
        this.tooltipEvents.clear();
        Object.getOwnPropertyNames(this).forEach((p) => {
            this[p] = null;
        });
        this.destroyed = true;
    }
    check() {
        if (this.destroyed)
            throw new UPIError('This UPI interface was destroyed');
        return this;
    }
}
