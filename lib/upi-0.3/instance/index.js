import { CompositeDisposable } from 'atom';
import { UPIError } from '../error';
export { UPIError };
import * as Menu from './menu';
import * as Messages from './messages';
import * as Events from './events';
import * as Tooltips from './tooltips';
import * as Controls from './controls';
import * as Params from './params';
export class UPIInstance {
    constructor(pluginManager, pluginName, main) {
        this.disposables = new CompositeDisposable;
        this.tooltipEvents = new Set;
        this.destroyed = false;
        let instance = this;
        this.utils = { withEventRange: main.withEventRange.bind(main) };
        this.menu = Menu.create(this.disposables);
        this.messages = Messages.create(pluginName, pluginManager);
        this.tooltips = Tooltips.create(pluginManager, main, this);
        this.events = Events.create(pluginManager, this.disposables);
        this.controls = Controls.create(pluginManager);
        this.params = Params.create(pluginName, pluginManager);
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
