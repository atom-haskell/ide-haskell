import { Disposable } from 'atom';
import { PluginManager } from '../plugin-manager';
import { TTextBufferCallback, TEventRangeType } from '../editor-control';
import { ISetTypesParams, TControlDefinition } from '../output-panel';
import { IParamSpec } from '../config-params';
import { TTooltipHandler } from '../tooltip-registry';
export * from './instance';
export interface IAtomMenuCommand {
    label: string;
    command: string;
}
export interface IAtomSubmenu {
    label: string;
    submenu: TAtomMenu[];
}
export declare type TAtomMenu = IAtomMenuCommand | IAtomSubmenu;
export declare type TSingleOrArray<T> = T | T[];
export interface IRegistrationOptions {
    name: string;
    menu?: {
        label: string;
        menu: TAtomMenu;
    };
    messageTypes?: ISetTypesParams;
    events?: {
        onWillSaveBuffer?: TSingleOrArray<TTextBufferCallback>;
        onDidSaveBuffer?: TSingleOrArray<TTextBufferCallback>;
        onDidStopChanging?: TSingleOrArray<TTextBufferCallback>;
    };
    controls?: Array<TControlDefinition<Object>>;
    params?: {
        [paramName: string]: IParamSpec<Object>;
    };
    tooltip?: TTooltipHandler | {
        priority?: number;
        handler: TTooltipHandler;
        eventTypes?: TEventRangeType[];
    };
}
export declare function consume(pluginManager: PluginManager, options: IRegistrationOptions): Disposable;
