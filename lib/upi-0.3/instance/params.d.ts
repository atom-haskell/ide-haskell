import { Disposable } from 'atom';
import { PluginManager } from '../../plugin-manager';
export interface IParamSpec<T> {
    onChanged: (value: T) => void;
    items: Array<T> | (() => Array<T>);
    itemTemplate: (item: T) => String;
    itemFilterKey: string;
    description?: string;
    displayName?: string;
    displayTemplate: (item: T) => String;
    default: T;
}
export interface IMainInterface {
    add(spec: {
        [param_name: string]: IParamSpec<any>;
    }): Disposable;
    get<T>(plugin: string, name: string): Promise<T>;
    get<T>(name: string): Promise<T>;
    set<T>(plugin: string, name: string, value?: T): Promise<T>;
    set<T>(name: string, value?: T): Promise<T>;
}
export declare function create(pluginName: string, pluginManager: PluginManager): IMainInterface;
