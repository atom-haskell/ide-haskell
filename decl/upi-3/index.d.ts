import { Disposable } from 'atom';
import { PluginManager } from '../plugin-manager';
import { TTextBufferCallback } from '../editor-control';
import { ISetTypesParams, IControlOpts, IElementObject } from '../output-panel';
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
export interface IUPIControlSimpleDefinition {
    element: string;
    opts: IControlOpts;
}
export interface IUPIControlCustomDefinition<T> {
    element: {
        new (arg: T): IElementObject<T>;
    };
    opts: T;
}
export declare type TUPIControlDefinition = IUPIControlCustomDefinition<Object> | IUPIControlSimpleDefinition;
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
    controls?: TUPIControlDefinition[];
    params?: {
        [paramName: string]: IParamSpec<Object>;
    };
    tooltip?: TTooltipHandler | {
        priority?: number;
        handler: TTooltipHandler;
    };
}
export declare function consume(pluginManager: PluginManager, options: IRegistrationOptions): Disposable;
