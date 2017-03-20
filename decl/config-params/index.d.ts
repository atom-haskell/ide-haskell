import { CompositeDisposable } from 'atom';
import { IParamSpec, IState as IStoreState } from './param-store';
export { IParamSpec };
import { OutputPanel } from '../output-panel';
declare type IState = IStoreState;
export { IState };
export declare class ConfigParamManager {
    private outputPanel;
    private store;
    constructor(outputPanel: OutputPanel, state: IState);
    destroy(): void;
    serialize(): IStoreState;
    add(pluginName: string, paramName: string, spec: IParamSpec<Object>): CompositeDisposable;
    get(pluginName: string, name: string): Promise<Object>;
    set(pluginName: string, name: string, value: Object): Promise<Object | undefined>;
}
