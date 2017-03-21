import { IParamSpec, ConfigParamStore } from './param-store';
import { IElementObject } from '../output-panel';
export interface IProps<T> {
    pluginName: string;
    name: string;
    spec: IParamSpec<T>;
    store: ConfigParamStore;
}
export declare class ParamControl<T> implements IElementObject<IProps<T>> {
    element: HTMLElement;
    private pluginName;
    private name;
    private spec;
    private store;
    private disposables;
    private hiddenValue?;
    private value;
    private storeDisposable?;
    constructor({pluginName, name, spec, store}: IProps<T>);
    render(): JSX.Element;
    update(props?: IProps<T>): any;
    setValue(e: T): Promise<void>;
    destroy(): Promise<void>;
    private initStore();
    private initSpec();
    private tooltipTitle();
}
