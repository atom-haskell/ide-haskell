import { ResultItem } from '../../results-db';
export declare class OutputPanelItem {
    private props;
    constructor(props: {
        model: ResultItem;
    });
    render(): JSX.Element;
    update(props: {
        model: ResultItem;
    }): any;
    destroy(): Promise<void>;
    private renderPosition();
    private didClickPosition();
}
