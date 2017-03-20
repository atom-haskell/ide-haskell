export declare class OutputPanelCheckbox {
    private id?;
    private state;
    private disposables;
    private emitter;
    private element;
    constructor({id, enabled}?: {
        id?: string;
        enabled?: boolean;
    });
    render(): JSX.Element;
    update(props?: {
        enabled?: boolean;
    }): any;
    onCheckboxSwitched(callback: (state: boolean) => void): AtomTypes.Disposable;
    setFileFilter(state: boolean): void;
    getFileFilter(): boolean;
    toggleFileFilter(): void;
    destroy(): Promise<void>;
    private tooltipTitle();
}
