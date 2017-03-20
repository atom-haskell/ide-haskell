import { ResultsDB, ResultItem } from '../../results-db';
export declare class OutputPanelItems {
    private model;
    private items;
    private activeFilter;
    private element;
    constructor({model}: {
        model: ResultsDB;
    });
    render(): JSX.Element;
    update(props?: {
        model: ResultsDB;
    }): any;
    destroy(): Promise<void>;
    filter(activeFilter: (item: ResultItem) => boolean): Promise<void>;
    showItem(item: ResultItem): Promise<void>;
    scrollToEnd(): Promise<void>;
    atEnd(): boolean;
    private renderItems();
}
