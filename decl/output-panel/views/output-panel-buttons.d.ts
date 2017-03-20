import { IProps as IBtnProps } from './output-panel-button';
export interface ISeverityTabDefinition {
    uriFilter?: boolean;
    autoScroll?: boolean;
}
export interface IBtnDesc extends IBtnProps {
    uriFilter: boolean;
    autoScroll: boolean;
}
export declare class OutputPanelButtons {
    private disposables;
    private emitter;
    private buttons;
    private refs;
    constructor();
    render(): JSX.Element;
    update(): any;
    createButton(btn: string, {uriFilter, autoScroll}?: ISeverityTabDefinition): void;
    options(btn: string): IBtnDesc | undefined;
    onButtonClicked(callback: (btnName: string) => void): AtomTypes.Disposable;
    buttonNames(): string[];
    disableAll(name?: string): void;
    setCount(btn: string, count: number): void;
    getCount(btn: string): void;
    clickButton(btn: string): void;
    destroy(): Promise<void>;
    getActive(): string | undefined;
    private renderButtons();
}
