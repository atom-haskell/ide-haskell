import { Disposable } from 'atom';
import { ISeverityTabDefinition } from './views/output-panel-buttons';
import { ResultsDB, ResultItem } from '../results-db';
export { ISeverityTabDefinition };
export interface IElementObject<T> {
    element: HTMLElement;
    update(props: T): Promise<void>;
}
export interface IState {
    visibility?: boolean;
    width?: string;
    height?: string;
    fileFilter?: boolean;
    activeTab?: string;
}
export interface INormalStatus {
    status: 'ready' | 'error' | 'warning';
}
export interface IProgressStatus {
    status: 'progress';
    progress?: number;
}
export declare type IStatus = (INormalStatus | IProgressStatus) & {
    detail: string;
};
export declare type TPanelPosition = 'bottom' | 'left' | 'top' | 'right';
export interface ISetTypesParams {
    [severity: string]: ISeverityTabDefinition;
}
export interface IControlOpts {
    id?: string;
    events?: {
        [key: string]: EventListener;
    };
    classes?: string[];
    style?: {
        [key: string]: string;
    };
    attrs?: {
        [key: string]: string;
    };
}
export declare class OutputPanel {
    private state;
    private results;
    private refs;
    private hiddenOutput;
    private elements;
    private statusMap;
    private disposables;
    private pos;
    private panel;
    private element?;
    private currentResult;
    constructor(state: IState | undefined, results: ResultsDB);
    render(): JSX.Element;
    update(): any;
    destroy(): Promise<void>;
    addPanelControl(element: string, opts: IControlOpts): Disposable;
    addPanelControl<T>(element: {
        new (arg: T): IElementObject<T>;
    }, opts: T): Disposable;
    updateItems(): void;
    activateTab(tab: string): void;
    activateFirstNonEmptyTab(): void;
    showItem(item: ResultItem): void;
    getActiveTab(): string | undefined;
    createTab(name: string, opts: ISeverityTabDefinition): void;
    setProgress(progress: number): void;
    toggle(): void;
    serialize(): IState;
    backendStatus(pluginName: string, st: IStatus): void;
    showNextError(): void;
    showPrevError(): void;
    private resizeStart(e);
}
