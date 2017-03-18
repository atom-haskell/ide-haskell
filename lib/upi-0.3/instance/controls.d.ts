import { Disposable } from 'atom';
import { PluginManager } from '../../plugin-manager';
export interface IControlOpts {
    id: string;
    events: {
        [key: string]: Function;
    };
    classes: string[];
    style: {
        [key: string]: string;
    };
    attrs: {
        [key: string]: string;
    };
}
export interface IUPIControlDefinition {
    element: string | HTMLElement;
    opts: IControlOpts;
}
export interface IMainInterface {
    add(def: IUPIControlDefinition): Disposable;
}
export declare function create(pluginManager: PluginManager): IMainInterface;
