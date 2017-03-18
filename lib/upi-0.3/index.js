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
import { getEventType } from '../utils';
import { UPIInstance } from './instance';
import { UPIError } from './error';
export { UPIError };
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
    consume(options) {
        const { name, menu, messageTypes, events, controls, params, consumer, tooltipEvent } = options;
        if (!name)
            throw new UPIError("name has to be specified for UPI");
        if (this.instances.has(name))
            throw new UPIError(`Plugin ${name} already registered with UPI`);
        const instance = new UPIInstance(this.pluginManager, name, this);
        this.instances.set(name, instance);
        const disp = new CompositeDisposable;
        if (menu)
            disp.add(instance.menu.set(menu));
        if (messageTypes)
            instance.messages.setTypes(messageTypes);
        if (events)
            for (const k in events) {
                if (instance.events[k]) {
                    let v = events[k];
                    if (!Array.isArray(v))
                        v = [v];
                    for (const i of v)
                        disp.add(instance.events[k](i));
                }
            }
        if (tooltipEvent) {
            let handler, priority;
            if (typeof tooltipEvent === 'function') {
                handler = tooltipEvent;
                priority = 100;
            }
            else {
                ({ handler, priority } = tooltipEvent);
            }
            if (!priority)
                priority = 100;
            disp.add(instance.tooltips.onShouldShowTooltip(priority, handler));
        }
        if (controls)
            for (const i of controls)
                disp.add(instance.controls.add(i));
        if (params)
            disp.add(instance.params.add(params));
        if (consumer) {
            let d = consumer(instance);
            if (typeof d === 'object') {
                disp.add(d);
            }
        }
        disp.add(new Disposable(() => {
            this.instances.delete(name);
            instance.destroy();
        }));
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
        return callback(controller.getEventRange(pos, eventType), eventType);
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
