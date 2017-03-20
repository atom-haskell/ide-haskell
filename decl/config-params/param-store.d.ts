import { Disposable } from 'atom';
export interface IParamSpec<T> {
    onChanged: (value: T) => void;
    items: T[] | Promise<T[]> | (() => T[] | Promise<T[]>);
    itemTemplate: (item: T) => string;
    itemFilterKey: string;
    description?: string;
    displayName?: string;
    displayTemplate: (item: T) => string;
    default: T;
}
export interface IState {
    [pluginNameParamName: string]: Object;
}
export declare type TUpdatedCallback = (arg: {
    pluginName: string;
    paramName: string;
    value: Object;
}) => void;
export declare class ConfigParamStore {
    private disposables;
    private emitter;
    private saved;
    private plugins;
    constructor(state?: IState);
    serialize(): IState;
    destroy(): void;
    onDidUpdate(callback: TUpdatedCallback): Disposable;
    addParamSpec<T>(pluginName: string, paramName: string, spec: IParamSpec<T>): Disposable;
    setValue(pluginName: string, paramName: string, value?: Object): Promise<Object | undefined>;
    getValue(pluginName: string, paramName: string): Promise<Object>;
    getValueRaw(pluginName: string, paramName: string): Object;
    private getParamConfig(pluginName, paramName, reason);
    private showSelect<T>(spec);
}
