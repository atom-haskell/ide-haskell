import { PluginManager } from '../../plugin-manager';
import { UPIError } from '../error';
import { UPI } from '../';
export { UPIError };
import * as Menu from './menu';
import * as Messages from './messages';
import * as Events from './events';
import * as Tooltips from './tooltips';
import * as Controls from './controls';
import * as Params from './params';
import * as Utils from './utils';
export declare type TTooltipHandlerSpec = {
    priority: number;
    handler: Tooltips.TTooltipHandler;
};
export declare class UPIInstance {
    menu: Menu.IMainInterface;
    messages: Messages.IMainInterface;
    events: Events.IMainInterface;
    tooltips: Tooltips.IMainInterface;
    controls: Controls.IMainInterface;
    params: Params.IMainInterface;
    utils: Utils.IMainInterface;
    tooltipEvents: Set<TTooltipHandlerSpec>;
    private disposables;
    private destroyed;
    constructor(pluginManager: PluginManager, pluginName: string, main: UPI);
    destroy(): void;
    check(): this;
}
